import { Button, Col, Divider, Form, Input, Modal, Row, Select, Typography } from 'antd'
import React, { ChangeEventHandler, FC, useEffect, useMemo, useState } from 'react'

import { genderOptions } from '../../../Utils/constants'
import {
  FormSubmitParameters,
  FunctionWithNoParam,
  FunctionWithParam,
  Nullable,
  SelectOptionDataType,
} from '../../../Utils/types'
import { CustomRoles } from '../../../Utils/enums'
import { FieldTypeUserCreate, FieldTypeUserMain, FieldTypeUserUpdate } from '../../../Redux/User/Types'

const { Option } = Select

interface UserAddUpdateFormProps {
    customRole: CustomRoles,
    closeModal: FunctionWithNoParam,
    modalVisibility: boolean,
    toUpdateUserDetails: Nullable<FieldTypeUserMain>,
    handleCreateOrUpdate: FunctionWithParam<FormSubmitParameters<FieldTypeUserCreate | FieldTypeUserUpdate>>
    isSubmitting: boolean,
    otherRequiredData: {
        organizationList: SelectOptionDataType[],
        portalList: (SelectOptionDataType & { organizationId: string })[],
    }
}

export const UserAddUpdateForm:FC<UserAddUpdateFormProps> = ({ customRole, closeModal, modalVisibility, toUpdateUserDetails, handleCreateOrUpdate, isSubmitting, otherRequiredData : { organizationList, portalList } }) => {

  const isAdmin: boolean = useMemo(() => customRole === CustomRoles.PORTAL_ADMIN, [customRole])

  const initialValues: FieldTypeUserCreate = useMemo(() => ({
    name: '',
    email: '',
    gender: genderOptions[0].value,
    phoneNumber: '',
    portalsId: [],
    role: customRole,
    ...Object.assign({} , isAdmin ? { organizationId: '' } : null),
  }), [isAdmin, customRole])

  const [formState, setFormState] = useState<FieldTypeUserCreate | FieldTypeUserUpdate>(initialValues)

  const isUpdate = useMemo(() => !!toUpdateUserDetails, [toUpdateUserDetails])

  useEffect(() => {
    if(toUpdateUserDetails){
      setFormState({
        userId: toUpdateUserDetails.id,
        name: toUpdateUserDetails.name,
        phoneNumber: toUpdateUserDetails.phoneNumber,
        gender: toUpdateUserDetails.gender,
        role: toUpdateUserDetails.role,
        portalsId: toUpdateUserDetails?.portals.map(p =>  p.id) as string[],
      } as FieldTypeUserUpdate)
    }
  }, [toUpdateUserDetails])

  const handleInputChange:ChangeEventHandler<HTMLInputElement> = e => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSelectChange:FunctionWithParam<{ value: string, name: string }> = ({ value, name }) => {
    if(name === 'organizationId' && value !== (formState as FieldTypeUserCreate).organizationId){
      setFormState(prevState => ({ ...prevState, portalsId: [] }))
    }
    setFormState(prevState => ({ ...prevState, [name]: value }))
  }

  const handleMultipleSelectChange:FunctionWithParam<{ value: string[], name: string }> = ({ value, name }) => {
    setFormState({ ...formState, [name]: value })
  }

  const handleFinish: FunctionWithNoParam = () => {
    const toSendValues = { ...formState }
    if(!isAdmin) delete (toSendValues as FieldTypeUserCreate).organizationId
    handleCreateOrUpdate({ isUpdate, values: toSendValues })
  }

  return (
    <Modal
      closable={true}
      onCancel={closeModal}
      width={900}
      footer={null}
      visible={modalVisibility}
      destroyOnClose={true}
      afterClose={() => setFormState(initialValues)}
      title={<Typography.Title level={3}>{isUpdate ? 'Update' : 'Add'} User</Typography.Title>}
    >
      <Form
        layout="vertical"
        name="user add update"
        initialValues={formState}
        onFinish={handleFinish}
      >
        <Row gutter={[10,10]}>
          <Col span={8}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input name="name" onChange={handleInputChange} autoFocus={true}/>
            </Form.Item>
          </Col>
          {!isUpdate
          && <>
            <Col span={8}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'The input is not valid E-mail!' },
                ]}
              >
                <Input name="email" onChange={handleInputChange}/>
              </Form.Item>
            </Col>
          </>
          }
          <Col span={8}>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[
                { validator: (rule, value) => {
                  return new Promise((res, rej) => {
                    const errorMessage = isNaN(value) ? 'Invalid Phone number' : value.length !== 10 ? 'Number should be of 10 digits' : null
                    errorMessage
                      ? rej(errorMessage)
                      : res('')
                  })
                } },
                { required: true, message: 'Phone number is required.' }
              ]}
            >
              <Input name="phoneNumber" onChange={handleInputChange}/>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Gender"
              name="gender"
            >
              <Select onChange={(value: string) => handleSelectChange({ value, name: 'gender' })}>
                {genderOptions.map((each, index)=>
                  <Option key={index} value={each.value}>{each.label}</Option> )}
              </Select>
            </Form.Item></Col>
          {isUpdate || !isAdmin
            ? null
            :
            <Col span={8}>
              <Form.Item
                label="Organization"
                name="organizationId"
                rules={[{ required: true, message: 'Please select organization!' }]}
              >
                <Select onChange={(value: string) => handleSelectChange({ value, name: 'organizationId' })}
                  placeholder="Select Organization">
                  {organizationList?.map((each, index) =>
                    <Option key={index} value={each.value as string}>{each.name}</Option>)}
                </Select>
              </Form.Item>
            </Col>
          }
          <Col span={isUpdate ? 24 : 8}>
            <Form.Item
              label="Portals"
              name="portalsId"
              rules={[{ required: true, message: 'Please select portal!' }]}
            >
              <Select onChange={(value: string[]) => handleMultipleSelectChange({ value, name: 'portalsId' })} mode="multiple" placeholder="Select Portals">
                {portalList && portalList.length > 0 && portalList?.filter(pd => (!isAdmin || pd?.organizationId === (isUpdate ? toUpdateUserDetails?.organization.id : (formState as FieldTypeUserCreate).organizationId)) && pd.enabled ).map((each, index)=>
                  <Option key={index} value={each.value as string}>{each.name}</Option> )}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Button type="link" onClick={closeModal}>Cancel</Button>
        <Button htmlType="submit" loading={isSubmitting} type="primary">
          {isUpdate ? isSubmitting ? 'Updating' : 'Update' : isSubmitting ? 'Creating' : 'Create'}
        </Button>
      </Form>
    </Modal>
  )
}


