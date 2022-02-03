import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Modal, Row, Col, Typography } from "antd";
import { useWeb3Context } from "../../../Utils/Web3Context";
import QRcode from "qrcode";
import { Auth } from "aws-amplify";

export function ViewProduct({ allProductData, setAllProductData }) {
  const [products, setProducts] = useState([]);
  const { ercContract, currentAccount } = useWeb3Context();
  const [productData, setProductData] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

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
  useEffect(() => {
    const getAll = async () => {
      const count = await ercContract.methods.items().call();
      console.log("count", count);
      for (let i = 0; i < count; i++) {
        const val = await ercContract.methods.allProducts(i).call();
        const user = await Auth.currentAuthenticatedUser();
        if (
          user?.signInUserSession?.idToken?.payload?.[
            "custom:registeredName"
          ] === val?.registeredName
        ) {
          console.log("inside", val);
          setProducts((prev) => [
            ...prev,
            {
              key: val.productId,
              name: val.productName,
              price: val.price,
              manufactureAddress: val.manufactureAddress,
              tags: val.tags.split(","),
              address: val.address,
              detail: val.description,
              registeredName: val.registeredName,
            },
          ]);
        }
      }
    };
    getAll();
  }, [currentAccount, ercContract.methods]);
  console.log(products);
  const generateQrCode = async (values, id) => {
    try {
      // const response = await QRcode.toDataURL(JSON.stringify(values));
      const response = await QRcode.toDataURL(id);
      setProductData(values);
      setImageUrl(response);
      showModal();
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (tags) => (
        <>
          {tags?.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if ((tag === "shoes", "clothing")) {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        const onDeleteHandler = () => {
          console.log("onDeleteHandler", text, record);
          setAllProductData((prev) =>
            prev.filter((item) => item.name !== text.name)
          );
        };
        const onViewHandler = async () => {
          conosole.log("view", record);
          console.log("onViewHandler", text, record.key);
          generateQrCode(record, record.key);
        };
        return (
          <Space size='middle'>
            <div onClick={onViewHandler}>
              <a>View {record.name}</a>
            </div>

            <div onClick={onDeleteHandler}>
              <a>Delete</a>
            </div>
          </Space>
        );
      },
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={products} />
      <Modal
        title='Product Detail'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row>
          <Col xs={12}>
            {imageUrl ? (
              <a href={imageUrl} download>
                <img src={imageUrl} alt='img' />
              </a>
            ) : null}
          </Col>
          <Col xs={12}>
            <Typography.Text>Product Id:{Date.now()}</Typography.Text>
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
    </div>
  );
}
