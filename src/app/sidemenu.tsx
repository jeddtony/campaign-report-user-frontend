import React, { useState, useEffect } from 'react';
import {
  UserAddOutlined,
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined,
  CalendarOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons';
import {
  Layout,
  Menu,
  theme,
  Button,
  Form,
  Dropdown,
  Avatar,
  Typography,
} from 'antd';
import Link from 'next/link';
import { getProfile } from '@/api/Api';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const SideMenu = ({ children, active }: { children: React.ReactNode, active: string }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [detail, setDetail] = useState <any>();

  useEffect(() => {
    async function fetch() {
        let result = await getProfile();
        setDetail(result);
    }

    fetch();
}, [])

  const menu = (
    <Menu>
      <Menu.Item>
        <strong>Name:</strong> {detail?.name}
      </Menu.Item>
      {/* <Menu.Item>
        <strong>Email:</strong> {detail?.email}
      </Menu.Item> */}
      <Menu.Item>
        <strong>Congregation:</strong> {detail?.congregation.name}
      </Menu.Item>
      <Menu.Item>
        <strong>Territory:</strong> {detail?.congregation.territory}
      </Menu.Item>
      <Menu.Divider />
      {/* <Menu.Item>
        <Link href="/profile">Profile</Link>
      </Menu.Item> */}
      <Menu.Item>
        <Link href="/login">Logout</Link>
      </Menu.Item>
    </Menu>
  );

  
  return (
    <Layout style={{ height: 'inherit' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
   
        }}
        onCollapse={(collapsed, type) => {
   
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline"
        defaultSelectedKeys={[active]}>
          <Menu.Item key="dashboard" icon={<HomeOutlined />}>
            <Link href="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="hourReport" icon={<CalendarOutlined />}>
            <Link href="/hourReport">Hour Report</Link>
          </Menu.Item>
          <Menu.Item key="contacts" icon={<UsergroupAddOutlined />}>
            <Link href="/contacts">View Contacts</Link>
          </Menu.Item>
          <Menu.Item key="field_report" icon={<UserAddOutlined />}>
            <Link href="/contactAddress">Create Contacts</Link>
          </Menu.Item>
          <Menu.Item key="experiences" icon={<UserAddOutlined />}>
            <Link href="/experiences">View experiences</Link>
          </Menu.Item>
          <Menu.Item key="addExperience" icon={<UserAddOutlined />}>
            <Link href="/addExperiences">Add Experience</Link>
          </Menu.Item>
          {/* <Menu.Item key="schedule" icon={<UserAddOutlined />}>
            <Link href="/schedule">View Schedule</Link>
          </Menu.Item> */}
          <Menu.Item key="login" icon={<VideoCameraOutlined />}>
            <Link href="/login">Logout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '24px' }}>
            <Dropdown overlay={menu}>
            <Avatar icon={<UserOutlined />} size="large" style={{ marginRight: '12px' }} />
            </Dropdown>
          </div>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}></Footer>
      </Layout>
    </Layout>
  );
};

export default SideMenu;
