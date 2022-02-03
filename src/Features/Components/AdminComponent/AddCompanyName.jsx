import { Button, Form, Input, Modal } from "antd";
import { Auth } from "aws-amplify";
import React from "react";

export function AddCompanyName({ setUser }) {
  const onFinish = async (values) => {
    const user = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, {
      "custom:registeredName": values.registeredName,
    });
    setUser(await Auth.currentAuthenticatedUser());
  };
  return (
    <Modal title='Registration' visible={true} footer={null}>
      <Form
        labelCol={{ xs: { span: 6 } }}
        wrapperCol={{ xs: { span: 12 } }}
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name='registeredName'
          label='Company Name'
          rules={[{ required: true, message: "This field is required." }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
