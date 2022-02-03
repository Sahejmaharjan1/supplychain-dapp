import React, { useState } from "react";
import { Layout, Menu, Breadcrumb, Button } from "antd";
import Auth from "@aws-amplify/auth";
import { useRouter } from "next/dist/client/router";
import { CheckProduct } from "./CheckProduct";

const { Header, Content, Footer } = Layout;

const MenuBar = [
  {
    name: "Check Product",
    key: 1,
  },
];
const UserLayout = () => {
  const [routeSelected, setRouteSelected] = useState(MenuBar[0]);
  const router = useRouter();
  const onNavClick = (item) => {
    setRouteSelected(item);
  };
  const MainContent = () => {
    switch (routeSelected.name) {
      case MenuBar[0].name:
        return (
          <>
            <CheckProduct />
          </>
        );

      default:
        return <>dashbaord</>;
    }
  };
  const onLogOut = async () => {
    await Auth.signOut();
    router.reload();
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

export default UserLayout;
