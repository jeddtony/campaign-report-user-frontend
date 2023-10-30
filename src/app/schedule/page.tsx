'use client';

import React, {useState, useEffect} from 'react';
import { Tabs, Typography, Divider, Button } from 'antd';
import type { TabsProps } from 'antd';
import SideMenu from '../sidemenu';
import { getSchedule } from '@/api/Api';
import moment from 'moment';
import type { Dayjs } from 'dayjs';
import { Calendar, theme } from 'antd';
import type { CalendarProps } from 'antd';
import Link from 'next/link';

const { Title, Text } = Typography;

const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log('calling panel change');
    console.log(value.format('YYYY-MM-DD'), mode);
  };



const App: React.FC = () => {

    const [schedule, setSchedule] = useState<any>();
    const [scheduleDate, setScheduleDate] = useState<string>(moment().format('YYYY-MM-DD'));
    const [refresh, setRefresh] = useState<Number>(0);

    useEffect(() => {
        async function fetchStudents() {
            let result = await getSchedule(scheduleDate);
            console.log(result);
            setSchedule(result.data[0]);
        }

        fetchStudents();
    }, [refresh])

    const onCalendarChange= (value: any) => {
        setScheduleDate(value.format('YYYY-MM-DD'));
        setRefresh(Math.random());
    }

    const onChange = (key: string) => {
        console.log(key);
        if(key == '1') {
            setScheduleDate(moment().format('YYYY-MM-DD'));
        }
        setRefresh(Math.random());
      };


    const { token } = theme.useToken();
    const wrapperStyle: React.CSSProperties = {
        width: 300,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
      };


    const items: TabsProps['items'] = [
        {
          key: '1',
          label: 'Today',
          children: (<>
          <Text strong>Date:</Text> <Text>{schedule?.date}</Text> <br /> <br />
          <Text strong>Meeting Place:</Text> <Text>{schedule?.venue}</Text> <br /> <br />
          <Link href={schedule?.venue_google_link?? ''}>
                    <Button type="primary">View location on Google Map</Button>
                  </Link>
          </>),
        },
        {
          key: '2',
          label: 'Calendar',
          children:(
            <>
            <Text strong>Date:</Text> <Text>{schedule?.date}</Text> <br /> <br />
          <Text strong>Meeting Place:</Text> <Text>{schedule?.venue}</Text> <br /> <br />
          <Link href={schedule?.venue_google_link?? ''}>
                    <Button type="primary">View location on Google Map</Button>
                  </Link>
          <Divider orientation='left'>Select date to view Venue</Divider>
    <div style={wrapperStyle}>
      <Calendar fullscreen={false} onPanelChange={onPanelChange} onChange={onCalendarChange}/>
    </div>
    </>
          ),
        },
        
      ];

    return (
        <SideMenu active='schedule'>
            <h1>View Meeting Places</h1>
<Tabs defaultActiveKey="1" items={items} onChange={onChange} />
</SideMenu>
)
}

export default App;