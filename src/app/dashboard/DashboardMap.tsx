'use client';

import React from 'react';
import { Card } from 'antd';

const DashboardMap: React.FC = () => {
  return (
    <div>
      <h2>Map</h2>
      <Card>
        {/* Embed Google Map here */}
        <div style={{ height: '400px' }}>Google Map Placeholder</div>
      </Card>
    </div>
  );
};

export default DashboardMap;
