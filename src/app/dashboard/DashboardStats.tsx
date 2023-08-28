'use client';

import React from 'react';
import { Row, Col, Card } from 'antd';
import { UserOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';


const DashboardStats: React.FC = () => {
  return (
    <div>
      <h2>Statistics</h2>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <h3><UserOutlined />Contacts</h3>
            <p>100</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <h3>Hours</h3>
            <p>500</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <h3>Placement</h3>
            <p>500</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <h3>Video</h3>
            <p>500</p>
          </Card>
        </Col>
        {/* Repeat similar structure for other stats */}
      </Row>
    </div>
  );
};

export default DashboardStats;
