import {
  Form,
  Input,
  InputNumber,
  Button,
  Modal,
  Typography,
  Row,
  Col,
  Select,
} from "antd";
import React, { useState } from "react";
import QRcode from "qrcode";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
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
/* eslint-enable no-template-curly-in-string */

const AddProduct = ({ setAllProductData, setValues }) => {
  function objToString(obj) {
    var str = "";
    for (var p in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, p)) {
        str += p + "::" + obj[p] + "\n";
      }
    }
    return str;
  }
  const [imageUrl, setImageUrl] = useState("");
  const [productData, setProductData] = useState(null);
  const [scanResultFile, setScanResultFile] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const generateQrCode = async (values) => {
    try {
      const response = await QRcode.toDataURL(JSON.stringify(values));

      setProductData(values);
      setImageUrl(response);
      showModal(true);
    } catch (error) {
      console.log(error);
    }
  };
  const onFinish = (values) => {
    console.log(values);
    generateQrCode(values);
    setValues(values);
    // setAllProductData((prev) => (!prev ? [values] : [...prev, values]));
    // setAllProductData([values]);
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
          name={"address"}
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
          <Select
            mode='tags'
            size='middle'
            placeholder='Please select'
            // className={styles.input}
          />
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
    </>
  );
};
export default React.memo(AddProduct);
