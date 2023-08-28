'use client';

import React from 'react';
import SideMenu from '../sidemenu';
import { Form, Input, Button, InputNumber } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

const ResponsiveForm: React.FC = () => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };

  const inputWidth = '80%';

  return (
    <SideMenu>
      <h1>Hour Report</h1>
    <Form {...layout}>
      <Form.Item label="Hours">
        <Input.Group compact>
          <Button icon={<MinusOutlined />} />
          <Form.Item name="hours" noStyle>
            <InputNumber style={{ width: inputWidth }} />
          </Form.Item>
          <Button icon={<PlusOutlined />} />
        </Input.Group>
      </Form.Item>

      <Form.Item label="Placements">
        <Input.Group compact>
          <Button icon={<MinusOutlined />} />
          <Form.Item name="placements" noStyle>
            <InputNumber style={{ width: inputWidth }} />
          </Form.Item>
          <Button icon={<PlusOutlined />} />
        </Input.Group>
      </Form.Item>

      <Form.Item label="Video Showings">
        <Input.Group compact>
          <Button icon={<MinusOutlined />} />
          <Form.Item name="videoShowings" noStyle>
            <InputNumber style={{ width: inputWidth }} />
          </Form.Item>
          <Button icon={<PlusOutlined />} />
        </Input.Group>
      </Form.Item>

      <Form.Item label="Return Visits">
        <Input.Group compact>
          <Button icon={<MinusOutlined />} />
          <Form.Item name="returnVisits" noStyle>
            <InputNumber style={{ width: inputWidth }} />
          </Form.Item>
          <Button icon={<PlusOutlined />} />
        </Input.Group>
      </Form.Item>

      <Form.Item label="Bible Studies">
        <Input.Group compact>
          <Button icon={<MinusOutlined />} />
          <Form.Item name="bibleStudies" noStyle>
            <InputNumber style={{ width: inputWidth }} />
          </Form.Item>
          <Button icon={<PlusOutlined />} />
        </Input.Group>
      </Form.Item>

      <Form.Item label="Comment" name="comment">
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </SideMenu>
  );
};

export default ResponsiveForm;
