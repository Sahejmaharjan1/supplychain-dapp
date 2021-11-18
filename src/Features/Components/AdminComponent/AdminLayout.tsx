import React, { useState } from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Button,
  Modal,
  Row,
  Col,
  Typography,
} from "antd";
import AddProduct from "./AddProduct";
import { ViewProduct } from "./ViewProduct";
import Auth from "@aws-amplify/auth";
import { useRouter } from "next/dist/client/router";
import QRcode from "qrcode";

const { Header, Content, Footer } = Layout;

const MenuBar = [
  {
    name: "Dashboard",
    key: 1,
  },
  {
    name: "Add Product",
    key: 2,
  },
  {
    name: "View Product",
    key: 3,
  },
];
const AdminLayout = () => {
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
      showModal();
    } catch (error) {
      console.log(error);
    }
  };
  const [allProductData, setAllProductData] = useState(null);
  const [routeSelected, setRouteSelected] = useState(MenuBar[0]);
  const router = useRouter();
  const onNavClick = (item) => {
    setRouteSelected(item);
  };
  const onLogOut = async () => {
    await Auth.signOut();
    router.reload();
  };
  const setValues = (values) => {
    setAllProductData((prev) => (!prev ? [values] : [...prev, values]));
    generateQrCode(values);
  };
  const MainContent = () => {
    switch (routeSelected.name) {
      case MenuBar[0].name:
        return <>dashbaord</>;

      case MenuBar[1].name:
        return (
          <AddProduct
            setAllProductData={setAllProductData}
            setValues={setValues}
          />
        );
      case MenuBar[2].name:
        return (
          <>
            <ViewProduct
              allProductData={allProductData}
              setAllProductData={setAllProductData}
            />
          </>
        );

      default:
        return <>dashbaord</>;
    }
  };
  return (
    <>
      <Layout>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <div className='logo' />
          <Menu
            theme='dark'
            mode='horizontal'
            //     defaultSelectedKeys={[routeSelected.key]}
            defaultSelectedKeys={[routeSelected.key.toString()]}
          >
            {MenuBar.map((item) => (
              <Menu.Item key={item.key} onClick={() => onNavClick(item)}>
                {item.name}
              </Menu.Item>
            ))}
          </Menu>
          <div style={{ textAlign: "right" }}>
            <Button type='primary' htmlType='button' onClick={onLogOut}>
              Logout
            </Button>
          </div>
        </Header>
        <Content
          className='site-layout'
          style={{ padding: "0 50px", marginTop: 64 }}
        >
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>{routeSelected.name}</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className='site-layout-background'
            style={{ padding: 24, minHeight: 380 }}
          >
            <MainContent />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
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
    </>
  );
};

export default AdminLayout;
