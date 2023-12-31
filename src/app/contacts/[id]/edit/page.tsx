'use client';

import React, {useState, useEffect} from 'react';
import { Form, Input, Button, Spin, message, Select, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import SideMenu from '../../../sidemenu';
import { postStudent } from '@/api/Api';
import Swal from 'sweetalert2';
import { Contact } from '../../page';
import { getOneStudent } from "@/api/Api";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { Option } = Select;

const languages: string[] =  ['English', 'Twi', 'Ewe', 'Ga', 'Dangme', 'Hausa', 'Yoruba', 'Others']


const MobileResponsiveForm: React.FC = ({ params } : any)  => {

  const [contact, setContact] = useState<any>({});
    const id = params?.id;

const [defaultLanguage, setDefaultLanguage] = useState<string>('Pidgin (West Africa)');
const [showSecondaryLanguage, setShowSecondaryLanguage] = useState<boolean>(false);
const [showOtherLanguages, setShowOtherLanguages] = useState<boolean>(false);
const [loading, setLoading] = useState(false);

const [form] = Form.useForm();
  
useEffect(() => {
  async function fetchStudents() {
      let result = await getOneStudent(id);
      setContact(result.data[0]);
      console.log(result.data[0]);
      let data = result.data[0];
      form.setFieldsValue({
        name: data.name,
        phoneNumber: data.phone_number,
        landmark: data.land_mark,
        last_discussion: data.last_discussion,
        next_discussion: data.next_discussion,
        publication: data.publication_offered,
        address: data.address,
        language: data.preferred_language
      })
  }

  fetchStudents();
}, [])

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    // setValue(e.target.value);
    if (e.target.value == 'Pidgin (West Africa)' ) {
      setDefaultLanguage('Pidgin (West Africa)');
      setShowSecondaryLanguage(false);
    } else{
      setShowSecondaryLanguage(true)
      setDefaultLanguage(e.target.value);
    }
  };

  const onChangeOthers = (e: any) => {
    // setValue(e.target.value);
    console.log(e);
    if (e == 'Others' ) {
      setShowOtherLanguages(true);
    } else{
      // setShowOtherLanguages(false);
      setDefaultLanguage(e)
    }
  };

  const onFinish = (values: any) => {
    let formData = {
      id,
      name: values.name,
      phone_number: values.phoneNumber,
      address: values.address,
      geo_cord: '99,89',
      land_mark: values.landmark,
      preferred_language: values.language,
      last_discussion: values.last_discussion,
      next_discussion: values.next_discussion,
      publication_offered: values.publication
    }

    const postForm = async() => {
      setLoading(true);
      let results = await postStudent(formData);
      // console.log(results);
      setLoading(false);
      if(results.status == 'success') {
        message.success('Student updated successfully');
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Contact updated successfully!',
        });

        setTimeout(() => {
          window.location.replace("/contacts");
      }, 3000);

      }
    }
    postForm();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <SideMenu active='field_report'>
      <h1>Edit Contact</h1>
    <Form
      {...layout}
      name="editContact"
      form={form}
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
        rules={[{ required: false}]}
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
        label="Nearest Landmark"
        name="landmark"
      >
        <Input size="large" />
      </Form.Item>

      <Form.Item
        label="Language"
        name="language"
      >
        <Input size="large" disabled={true}/>
      </Form.Item>
      
    {showSecondaryLanguage && 
      <Form.Item
        label="Secondary language"
        name="language"
        rules={[
          { required: true, message: 'Enter language' },
        ]}
      >
        <Select placeholder="Select a language" size='large' onChange={onChangeOthers}>
          {languages.map((language, index) => (
              <Option key={index} value={language}>{language}</Option>
            ))}

          </Select>
      </Form.Item>
    }

{showOtherLanguages && 
      <Form.Item
        label="Other language"
        
        rules={[
          { required: true, message: 'Enter language' },
        ]}
      >
        <Input size="large" onChange={onChangeOthers} />
      </Form.Item>
    }
      <Form.Item
        label="Publication placed"
        name="publication"
        rules={[{ required: false}]}
      >
        <Input size="large" />
      </Form.Item>

      <Form.Item
        label="Topic discussed last"
        name="last_discussion"
        rules={[
          { required: true, message: 'Enter topic discussed on last visit' },
        ]}
      >
        <Input size="large" />
      </Form.Item>

      <Form.Item
        label="Next topic to discuss"
        name="next_discussion"
        rules={[
          { required: true, message: 'Enter topic to be discussed on next visit' },
        ]}
      >
        <Input size="large" />
      </Form.Item>

      {/* <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please input your email!', type: 'email' },
        ]}
      >
        <Input size="large" />
      </Form.Item> */}

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
