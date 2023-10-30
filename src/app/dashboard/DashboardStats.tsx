'use client';

import React from 'react';
import { Row, Col, Card } from 'antd';
import { UserOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

const cardStyle = {
  marginBottom: '16px', // Add some spacing between cards
  borderRadius: '8px',  // Add rounded corners to the cards
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add a subtle shadow
};

const DashboardStats: React.FC<any> = ({dashboard}) => {
  return (
    <div>
      <h2>Your Field Report</h2>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card style={cardStyle}>
            <h3>Hours</h3>
            <p>{dashboard?.hours?? 0}</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
        <Card style={cardStyle}>
            <h3>Placements</h3>
            <p>{dashboard?.placement?? 0}</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
        <Card style={cardStyle}>
            <h3>Return Visit</h3>
            <p>{dashboard?.rv?? 0}</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
        <Card style={cardStyle}>
            <h3>Bible Studies</h3>
            <p>{dashboard?.bs?? 0}</p>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6}>
        <Card style={cardStyle}>
            <h3>Video Showings</h3>
            <p>{dashboard?.video_showing?? 0}</p>
          </Card>
        </Col>

        {/* Repeat similar structure for other stats */}
      </Row>
    </div>
  );
};

export default DashboardStats;
