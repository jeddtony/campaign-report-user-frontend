'use client';

import React, { useState }  from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme,  Button, Form, Input, InputNumber } from 'antd';
import Link from 'next/link';

const { Header, Content, Footer, Sider } = Layout;

const SideMenu = ({ children }: { children: React.ReactNode })=> {
    const {
        token: { colorBgContainer },
      } = theme.useToken();
    

      let menuItems = ['Dashboard', 'Field Report', 'Contact Addresses', 'Experiences']
      return (
        <Layout style={{'height': 'inherit'}}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="demo-logo-vertical" />
           <Menu
            theme="dark"
            mode="inline">
                <Menu.Item
                    key="dashboard"
                    icon={<UserOutlined />}>
                        <Link href="/dashboard">
                        Dashboard
                        </Link>
                    </Menu.Item>

                    <Menu.Item
                    key="field_report"
                    icon={<VideoCameraOutlined />}>
                        <Link href="/contactAddress">
                        Contact Addresses
                        </Link>
                    </Menu.Item>
            </Menu>
        </Sider>
        <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>

              {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
      )
}

export default SideMenu;