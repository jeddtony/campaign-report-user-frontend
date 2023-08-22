'use client';

import React, { useState }  from 'react';
import { Layout, Menu, theme,  Button, Form, Input, InputNumber } from 'antd';
import SideMenu from '../sidemenu';

const { Header, Content, Footer, Sider } = Layout;

type LayoutType = Parameters<typeof Form>[0]['layout'];

const Dashboard: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === 'horizontal' ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } } : null;

  const buttonItemLayout =
    formLayout === 'horizontal' ? { wrapperCol: { span: 14, offset: 4 } } : null;



  return (
<SideMenu>
          <Form
      {...formItemLayout}
      layout={'horizontal'}
      form={form}
      initialValues={{ layout: formLayout }}
      onValuesChange={onFormLayoutChange}
      style={{ maxWidth: formLayout === 'inline' ? 'none' : 600 }}
    >
      <Form.Item label="Hours">
        <InputNumber placeholder="Enter number of hours" />
      </Form.Item>
      <Form.Item label="Placements">
        <InputNumber placeholder="input placements" />
      </Form.Item>
      <Form.Item label="Video Showings">
        <InputNumber placeholder="input videos" />
      </Form.Item>
      <Form.Item label="Return Visits">
        <InputNumber placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Bible Studies">
        <InputNumber placeholder="input placeholder" />
      </Form.Item>
      <Form.Item {...buttonItemLayout}>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </Form>

    </SideMenu>
  );
};

export default Dashboard;