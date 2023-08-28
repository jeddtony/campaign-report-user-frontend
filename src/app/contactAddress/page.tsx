'use client';

import React from 'react';
import { Form, Input, Button } from 'antd';
import SideMenu from '../sidemenu';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const MobileResponsiveForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <SideMenu>
      <h1>Create Contact</h1>
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input size="large" />
      </Form.Item>

      <Form.Item
        label="Phone Number"
        name="phoneNumber"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input size="large" />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: 'Please input your address!' }]}
      >
        <Input size="large" />
      </Form.Item>

      <Form.Item
        label="Geo Coordinates"
        name="geoCoordinates"
        rules={[
          { required: true, message: 'Please input the geo coordinates!' },
        ]}
      >
        <Input size="large" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please input your email!', type: 'email' },
        ]}
      >
        <Input size="large" />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </SideMenu>
  );
};

export default MobileResponsiveForm;
