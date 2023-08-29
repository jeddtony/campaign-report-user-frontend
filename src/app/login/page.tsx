'use client';

import Link from 'next/link';
import React, {useState, useEffect} from 'react';
import { Form, Input, Button, Select } from 'antd';
import axios from 'axios';
import {login} from '../../api/Api';
import { setToken } from '@/helpers/localStorage';

const { Option } = Select;

interface Congregation {
    id: string,
    name: string
}

const Login: React.FC = () => {

const [congregations, setCongregations] = useState<Congregation[]>([]);

useEffect(() => {
    async function fetchCongregations() {
      try {
        const response = await axios.get('https://test.ecofitnesshub.com/api/congregations');
        setCongregations(response.data.data);
      } catch (error) {
        console.error('Error fetching congregations:', error);
      }
    }

    fetchCongregations();
  }, []);

  const onFinish = (values: any) => {
    console.log('Form values:', values);
    let formData = {
        email: values.email,
        congregation_id: values.congregation
    }
    
    const postForm = async() => {
        let results = await login(formData);
        if(results.status == 'success') {
            console.log("it was successful");
            setToken(results.auth_token);

            window.location.replace("/dashboard");
        }
    }
    
    postForm();
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
          {congregations.map((congregation, index) => (
              <Option key={index} value={congregation.id}>{congregation.name}</Option>
            ))}

          </Select>
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: false, message: 'Please input your email!' }]}>
          <Input type="email" placeholder="Email" />
        </Form.Item>
        {/* <Form.Item name="password" label="Password" rules={[{ required: false, message: 'Please input your password!' }]}>
          <Input.Password placeholder="Password" />
        </Form.Item> */}
        <Form.Item>
            {/* <Link href="/dashboard"> */}
          <Button type="primary" htmlType="submit" block>
            
            Log in
          </Button>
          {/* </Link> */}
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
