'use client';

import Link from 'next/link';
import React from 'react';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const Login: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Form values:', values);
    // Here you can handle the login logic
    
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Form
        name="login"
        initialValues={{ congregation: '', email: '', password: '' }}
        onFinish={onFinish}
        style={{ border: '1px solid #d9d9d9', padding: '20px', borderRadius: '5px', minWidth: '300px', width: '80%' }}
      >
        <h2 style={{ textAlign: 'center' }}>Login</h2>
        <Form.Item name="congregation" label="Congregation" rules={[{ required: false, message: 'Please select a congregation!' }]}>
          <Select placeholder="Select a congregation">
            <Option value="congregation1">Congregation 1</Option>
            <Option value="congregation2">Congregation 2</Option>
            {/* Add more options here */}
          </Select>
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: false, message: 'Please input your email!' }]}>
          <Input type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: false, message: 'Please input your password!' }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
            <Link href="/dashboard">
          <Button type="primary" htmlType="submit" block>
            
            Log in
          </Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
