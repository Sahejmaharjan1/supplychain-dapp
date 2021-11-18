import React, { FC, useEffect, useMemo, useState } from "react";
import { Col, Image, Layout, Menu, Row, Typography } from "antd";

import { SignOutBut } from "../SignOut";

import {
  SuperAdminSidebarItems,
  userInfoRole,
} from "../../../../Utils/constants";
import { FunctionWithNoParam } from "../../../../Utils/types";
import { ChangePassword } from "../ChangePassword";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch } from "../../../../Redux/Store";
import { AuthReducerState } from "../../../../Redux/AuthRedux/AuthTypes";
import { RootState } from "../../../../Redux/rootReducers";
import { selfInfo } from "../../../../Redux/AuthRedux/AuthActions";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const SuperAdminLayout: FC = (props) => {
  const { children } = props;
  const dispatch = useDispatch<RootDispatch>();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { userInformation }: AuthReducerState = useSelector(
    (state: RootState) => state.AuthReducer
  );

  useEffect(() => {
    if (!userInformation) dispatch(selfInfo.request());
  }, [userInformation, dispatch]);

  const handleCollapse: FunctionWithNoParam = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        className='header unselectable'
        style={{
          position: "fixed",
          zIndex: 999,
          width: "100%",
          height: "60px",
        }}
      >
        <Row>
          <Col span={8} style={{ textAlign: "left", alignItems: "center" }}>
            <Typography.Text style={{ color: "whitesmoke" }} title='User'>
              {userInformation?.name}
            </Typography.Text>
          </Col>
          <Col span={8} style={{ textAlign: "center" }}>
            <Image src={`${process.env.PUBLIC_URL}/Images/LOGO.svg`} />
          </Col>
          <Col span={8} style={{ textAlign: "right" }}>
            <SignOutBut />
            <ChangePassword />
          </Col>
        </Row>
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={handleCollapse}
          className='site-layout-background unselectable'
          style={{
            overflow: "auto",
            height: "100vh",
            margin: "60px 0 0",
            position: "fixed",
            left: 0,
          }}
        >
          <div
            style={{
              height: "32px",
              margin: "16px",
              background: "rgba(255, 255, 255, 0.3)",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
            title='User Role'
          >
            <Typography.Text style={{ color: "white" }}>
              {userInfoRole[userInformation?.role as string]}
            </Typography.Text>
          </div>
          <Menu theme='dark' mode='inline' defaultOpenKeys={["sub1"]}>
            {SuperAdminSidebarItems.map((each) =>
              each.subMenu.length ? (
                <SubMenu key={each.key} icon={<each.icon />} title={each.label}>
                  {each.subMenu.map((itm) => (
                    <Menu.Item>{itm.label}</Menu.Item>
                  ))}
                </SubMenu>
              ) : (
                <Menu.Item key={each.key} icon={<each.icon />}>
                  {each.label}
                </Menu.Item>
              )
            )}
          </Menu>
        </Sider>
        <Layout className='site-layout'>
          <Content
            className='site-layout-background'
            style={{
              margin: collapsed ? "60px 0 0 80px" : "60px 0 0 200px",
              overflow: "hidden",
              padding: 24,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export { SuperAdminLayout };
