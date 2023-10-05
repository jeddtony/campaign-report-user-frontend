'use client';

import React, {useState, useEffect} from 'react';
import { Form, Input, Button, Select, Spin, message, Alert, InputNumber } from 'antd';
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

const [loading, setLoading] = useState(false);

const [error, setError] = useState();

useEffect(() => {
    async function fetchCongregations() {
      try {
        const response = await axios.get('https://test.ecofitnesshub.com/api/congregations');
        // const response = await axios.get('http://localhost:8000/api/congregations');
        setCongregations(response.data.data);
      } catch (error) {
        console.error('Error fetching congregations:', error);
      }
    }

    fetchCongregations();
  }, []);

  const onFinish = (values: any) => {
    let formData = {
        phone_number: values.phone_number,
        congregation_id: values.congregation
    }
    
    const postForm = async() => {
        setLoading(true);
        let results = await login(formData);
        setLoading(false);
        if(results.status == 'success') {
            console.log("it was successful");
            setToken(results.auth_token);

            window.location.replace("/dashboard");
        } else {
          setError(results.message);
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
        labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }} 
        style={{ border: '1px solid #d9d9d9', padding: '20px', borderRadius: '5px', minWidth: '300px', width: '80%' }}
      >
        <h2 style={{ textAlign: 'center' }}>Login</h2>

        { error && <Alert message={error} type="error" style={{marginBottom: "10px"}}/>}

        <Form.Item name="congregation" label="Congregation" rules={[{ required: false, message: 'Please select a congregation!' }]}>
          <Select placeholder="Select a congregation">
          {congregations.map((congregation, index) => (
              <Option key={index} value={congregation.id}>{congregation.name}</Option>
            ))}

          </Select>
        </Form.Item>
        <Form.Item name="phone_number" label="Phone Number" rules={[{ required: false, message: 'Please input your phone number!' }]}>
          <Input type='text' style={{ width: '100%' }} placeholder="Phone Number" />
        </Form.Item>
        {/* <Form.Item name="password" label="Password" rules={[{ required: false, message: 'Please input your password!' }]}>
          <Input.Password placeholder="Password" />
        </Form.Item> */}
        <Form.Item  wrapperCol={{
    xs: { span: 24 }, // Full width on extra-small screens
    sm: { span: 20, offset: 2 }, // 20 columns offset by 2 on small screens
    md: { span: 16, offset: 4 }, // 16 columns offset by 4 on medium screens
    lg: { span: 12, offset: 6 }, // 12 columns offset by 6 on large screens
  }}>
            
          <Button type="primary" htmlType="submit" block disabled={loading}> Log in &nbsp; &nbsp;
          {loading ? <Spin /> : ' '}
           
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
