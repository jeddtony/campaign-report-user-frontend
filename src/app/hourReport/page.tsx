'use client';

import React, {SetStateAction, useState} from 'react';
import SideMenu from '../sidemenu';
import { Form, Input, Button, InputNumber } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import moment, { now } from 'moment';
import { postReport } from '@/api/Api';
import Swal from 'sweetalert2';


const ResponsiveForm: React.FC = () => {
  const [hours, setHours] = useState(0);
  const [placements, setPlacement] = useState(0);
  const [videoShowing, setVideoShowing] = useState(0);
  const [returnVisit, setReturnVisit] = useState(0);
  const [bibleStudy, setBibleStudy] = useState(0);

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };

  const inputWidth = '80%';

  const onFinish = (values: any) => {
    let formData = {
      hours: hours,
      date: moment().format('YYYY-MM-DD'),
      return_visits: returnVisit,
      bible_studies: bibleStudy,
      placements: placements,
      video_showing: videoShowing,
    }

    const postForm = async() => {
      let results = await postReport(formData);
      console.log(results);
      if(results.status == 'success') {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Report submitted successfully!',
      });

      setTimeout(() => {
        window.location.replace("/dashboard");
    }, 3000);
    }
  
    }
    postForm();
  }

  return (
    <SideMenu active='hourReport'>
      <h1>Field Report for the Campaign Only</h1>
    <Form {...layout} 
    onFinish={onFinish}>
<NumberInputWithButtons label="Hours" value={hours} onValueChange={setHours} />
<NumberInputWithButtons label="Placements" value={placements} onValueChange={setPlacement} />
<NumberInputWithButtons label="Video Showings" value={videoShowing} onValueChange={setVideoShowing} />
<NumberInputWithButtons label="Return Visits" value={returnVisit} onValueChange={setReturnVisit} />
<NumberInputWithButtons label="Bible Studies" value={bibleStudy} onValueChange={setBibleStudy} />


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


interface NumberInputWithButtonsProps {
  label: string;
  value: number;
  onValueChange: any
}
const NumberInputWithButtons: React.FC<NumberInputWithButtonsProps> = ({
  label,
  value,
  onValueChange,
}) => {
  const handleIncrement = () => {
    onValueChange(++value);
  };

  const handleDecrement = () => {
    if (value === 0) {
      onValueChange(0);
      return;
    }
    onValueChange(value - 1);
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ marginRight: 8, marginBottom: 8 }}>{label}: </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
      >

        <Button style={{ backgroundColor: 'lightblue' }} icon={<MinusOutlined />} onClick={handleDecrement} />
        <InputNumber value={value} onChange={onValueChange} style={{ margin: '0 8px', flex: 1 }} min={0} />
        <Button style={{ backgroundColor: 'lightblue' }} icon={<PlusOutlined />} onClick={handleIncrement} />
      </div>

    </div>
  );
};

export {NumberInputWithButtons}
