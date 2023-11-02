'use client';

import React, { useState, useEffect } from 'react';
import SideMenu from '../sidemenu';
import { Form, Input, Button, InputNumber } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import Swal from 'sweetalert2';
import NumberInputWithButtons from '../hourReport/NumberInputWithButtons';
import { getDashboard, postReport } from '@/api/Api';
import { Dashboard } from '../dashboard/page';

// Define the interface for report data
interface ReportData {
  hours: number;
  placements: number;
  videoShowing: number;
  returnVisit: number;
  bibleStudy: number;
  comment: string;
}

const ResponsiveForm: React.FC = () => {
  // Assume you have fetched existing report data
  const existingReportData: ReportData = {
    hours: 5,
    placements: 10,
    videoShowing: 3,
    returnVisit: 2,
    bibleStudy: 7,
    comment: "This is the existing comment for editing.",
  };

  const [dashboard, setDashboard] = useState<Dashboard>();
  
    // Define state variables for form fields
    const [hours, setHours] = useState<number>(0);
    const [placements, setPlacement] = useState<number>(dashboard?.placement?? 0);
    const [videoShowing, setVideoShowing] = useState<number>(dashboard?.video_showing?? 0);
    const [returnVisit, setReturnVisit] = useState<number>(dashboard?.rv?? 0);
    const [bibleStudy, setBibleStudy] = useState<number>(dashboard?.bs ?? 0);

    
  useEffect(() => {
    async function fetchStudents() {
        let result = await getDashboard();
        console.log(result.report);
        setDashboard(result.report);
        let report = result.report;
        setHours(report.hours);
        setPlacement(report.placement);
        setVideoShowing(report.video_showing);
        setReturnVisit(report.rv);
        setBibleStudy(report.bs);
    }

    fetchStudents();
}, [])



  // Layout for Form
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };

  const onFinish = () => {

        let formData = {
          hours: hours,
          date: moment().format('YYYY-MM-DD'),
          return_visits: returnVisit,
          bible_studies: bibleStudy,
          placements: placements,
          video_showing: videoShowing,
          final_report: 1
        }

        Swal.fire({
            title: 'Saving this change will replace all your previous reports',
            // text: "This will replace all your previous reports",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
             postForm();
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })

    
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

  };

  // ... Rest of your code ...

  return (
    <SideMenu active='finalReport'>
      <h1>Edit Field Report for the Campaign Only</h1>
      <Form {...layout} onFinish={onFinish} initialValues={dashboard}>
      <NumberInputWithButtons label="Hours" value={hours} onValueChange={setHours} />
        <NumberInputWithButtons label="Placements" value={placements} onValueChange={setPlacement} />
        <NumberInputWithButtons label="Video Showings" value={videoShowing} onValueChange={setVideoShowing} />
        <NumberInputWithButtons label="Return Visits" value={returnVisit} onValueChange={setReturnVisit} />
        <NumberInputWithButtons label="Bible Studies" value={bibleStudy} onValueChange={setBibleStudy} />

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
