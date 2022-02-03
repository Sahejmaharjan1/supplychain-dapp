import { Form, Input, InputNumber, Button, Select } from "antd";
import React, { useState } from "react";
import QRcode from "qrcode";
import Web3 from "web3";
import { useWeb3Context } from "../../../Utils/Web3Context";
import { ProductInfoModal } from "../CoreUI/ProductInfoModal/ProductInfoModal";
import { Auth } from "aws-amplify";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const AddProduct = () => {
  const [productData, setProductData] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { provider, ercContract, currentAccount } = useWeb3Context();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const generateQrCode = async (values, id) => {
    try {
      const response = await QRcode.toDataURL(id);
      setProductData(values);
      setImageUrl(response);
      showModal(true);
    } catch (error) {
      console.log(error);
    }
  };
  const onFinish = async (values) => {
    console.log(values);
    const web3 = new Web3(provider);
    web3.eth.getAccounts().then(async function (accounts) {
      console.log("accounts testing ", accounts);
      const user = await Auth.currentAuthenticatedUser();
      ercContract.methods
        .newItem(
          values.name,
          Date.now().toString(),
          values.tags.toString(),
          values.price,
          values.manufactureAddress,
          user?.signInUserSession?.idToken?.payload?.["custom:registeredName"],
          values.detail
        )
        .send({ from: accounts[0], gas: 1000000 })
        .then((receipt) => {
          console.log("receipt", receipt.events.Added.returnValues[0]);
          generateQrCode(values, receipt.events.Added.returnValues[0]);
        })
        .catch((e) => {
          console.log("error", e);
        });
    });
  };

  return (
    <>
      <Form
        {...layout}
        name='nest-messages'
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={"name"}
          label='Product Name'
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"manufactureAddress"}
          label='Address'
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"detail"}
          label='Product Detail'
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name={"price"}
          label='Price'
          rules={[{ type: "number", min: 0, max: 100000 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item name={"tags"} label='Tags'>
          <Select mode='tags' size='middle' placeholder='Please select' />
        </Form.Item>
        <Form.Item name={"website"} label='Website'>
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <ProductInfoModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        productData={productData}
        imageUrl={imageUrl}
      />
    </>
  );
};
export default React.memo(AddProduct);
