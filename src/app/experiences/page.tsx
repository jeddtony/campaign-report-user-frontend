'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button, Modal } from 'antd';
import SideMenu from '../sidemenu';
import { getExperiences } from '@/api/Api';
import moment, { now } from 'moment';
import './styles.css'; 
import { Form, Input, Spin, message } from 'antd';
import { postExperience, postStudent } from '@/api/Api';
import Swal from 'sweetalert2';

const { Meta } = Card;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { TextArea } = Input;

export default function Page() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<any | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    async function fetch() {
      let result = await getExperiences();
      console.log(result);
      setExperiences(result.data);
    }

    fetch();
  }, []);

  const handleViewDetails = (experience: any) => {
    setSelectedExperience(experience);
    setIsModalVisible(true);
  };

  const handleEditDetails = (experience: any) => {
    setSelectedExperience(experience);
    form.setFieldsValue({
      title: experience.title,
      description: experience.experiences
    })
    setIsEditModalVisible(true);
  };


  const onFinish = (values: any) => {
    
    let formData = {
      title: values.title,
      experience: values.description,
      id: selectedExperience.id
    }

    const postForm = async() => {
      setLoading(true);
      let results = await postExperience(formData);
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
    <SideMenu active='experiences'>
      <h1>View Your Submitted Experiences</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {experiences.map((post, index) => (
          <Card key={index} style={{ width: 300 }}>
            <Meta
              title={post.title}
              description={
                <>
                  <p>Author: {post.user?.name}</p>
                  <p>Date: {moment(post.created_at).format('YYYY-MM-DD')}</p>
                  <Button type="primary" onClick={() => handleViewDetails(post)}>
                    View Details
                  </Button>
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  <Button type="primary" onClick={() => handleEditDetails(post)}>
                    Edit
                  </Button>
                </>
              }
            />
          </Card>
        ))}
      </div>

      <Modal
        title="Experience Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedExperience && (
          <>
            <p className="experience-title">Title: {selectedExperience.title}</p>
            <p className="experience-author">Author: {selectedExperience.user?.name}</p>
            <p className="experience-date">Date: {moment(selectedExperience.created_at).format('YYYY-MM-DD')}</p>
            <p >Body: {selectedExperience.experiences}</p>
          </>
        )}
      </Modal>

      <Modal
        title="Edit Experience"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        {selectedExperience && (
          
    <Form
      {...layout}
      form={form}
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
        <Input size="large" autoComplete='off'/>
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
          Update{loading ? 
          <> &nbsp; &nbsp; <Spin /> </>: ' '}
        </Button>
      </Form.Item>
    </Form>
          
        )}
      </Modal>
    </SideMenu>
  );
}
