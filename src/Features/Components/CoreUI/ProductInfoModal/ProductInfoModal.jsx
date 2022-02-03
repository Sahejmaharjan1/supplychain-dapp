import { Col, Modal, Row, Typography } from "antd";
import React from "react";

export const ProductInfoModal = ({
  isModalVisible,
  setIsModalVisible,
  productData,
  imageUrl,
}) => {
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <Modal
      title='Product Detail'
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Row>
        <Col xs={6}>
          {imageUrl ? (
            <a href={imageUrl} download>
              <img src={imageUrl} alt='img' />
            </a>
          ) : null}
        </Col>
        <Col xs={18}>
          <Typography.Text>Product Id:{productData?.key}</Typography.Text>
          <br />
          <Typography.Text>Product Name:{productData?.name}</Typography.Text>
          <br />
          <Typography.Text>
            Product Description:{productData?.detail}
          </Typography.Text>
          <br />
          {productData?.price && (
            <Typography.Text>
              Product Price:{productData?.price} rupees
            </Typography.Text>
          )}
          <br />
          {productData?.tags && (
            <Typography.Text>
              Product Tags:
              {productData?.tags?.map((item, index) => (
                <Typography.Text key={index.toString()}>
                  {item} &nbsp;
                </Typography.Text>
              ))}
            </Typography.Text>
          )}
          <br />
          {productData?.registeredName && (
            <Typography.Text>
              Manufactured by:
              <Typography.Text>{productData.registeredName}</Typography.Text>
            </Typography.Text>
          )}
          <br />
          {productData?.manufactureAddress && (
            <Typography.Text>
              Manufacture Address:
              <Typography.Text>
                {productData.manufactureAddress}
              </Typography.Text>
            </Typography.Text>
          )}
          <br />
          {productData?.address && (
            <Typography.Text>
              Shipping Address:
              <Typography.Text>{productData.address}</Typography.Text>
            </Typography.Text>
          )}
          <br />
          {productData?.website && (
            <Typography.Text>
              Product Website:
              <a href={productData?.website} target='_blank' rel='noreferrer'>
                {productData?.website}
              </a>
            </Typography.Text>
          )}
        </Col>
      </Row>
    </Modal>
  );
};
