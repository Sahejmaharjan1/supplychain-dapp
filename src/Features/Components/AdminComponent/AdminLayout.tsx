import React, { useState } from "react";
import { Layout, Menu, Breadcrumb, Button } from "antd";
import AddProduct from "./AddProduct";
import { ScanShipmentProduct } from "./ScanShipmentProduct";
import { ViewProduct } from "./ViewProduct";
import Auth from "@aws-amplify/auth";
import { useRouter } from "next/dist/client/router";

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
  {
    name: "Scan Shipment",
    key: 4,
  },
];
const AdminLayout = () => {
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
  const MainContent = () => {
    switch (routeSelected.name) {
      case MenuBar[0].name:
        return <>dashbaord</>;

      case MenuBar[1].name:
        return <AddProduct />;
      case MenuBar[2].name:
        return (
          <>
            <ViewProduct
              allProductData={allProductData}
              setAllProductData={setAllProductData}
            />
          </>
        );
      case MenuBar[3].name:
        return (
          <>
            <ScanShipmentProduct />
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
    </>
  );
};

export default AdminLayout;
