'use client';

import React, {useState} from 'react';
import { Form, Input, Button, Spin, message } from 'antd';
import SideMenu from '../sidemenu';
import { postExperience, postStudent } from '@/api/Api';
import Swal from 'sweetalert2';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { TextArea } = Input;

const MobileResponsiveForm: React.FC = () => {

  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    // console.log('Received values:', values);
    
    let formData = {
      title: values.title,
      experience: values.description,
      
    }

    const postForm = async() => {
      setLoading(true);
      let results = await postExperience(formData);
      // console.log(results);
      setLoading(false);
      if(results.status == 'success') {
        message.success('Experience submitted successfully');

        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Experience submitted successfully!',
          });

          setTimeout(() => {
            window.location.replace("/experiences");
        }, 3000);
      }
    }
    postForm();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <SideMenu>
      <h1>New Experience/ Outstanding Comments</h1>
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please input your title!' }]}
      >
        <Input size="large" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Enter your description!' }]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" disabled={loading}>
          Submit{loading ? 
          <> &nbsp; &nbsp; <Spin /> </>: ' '}
        </Button>
      </Form.Item>
    </Form>
    </SideMenu>
  );
};

export default MobileResponsiveForm;
