'use client';

import React from 'react';
import DashboardStats from './DashboardStats';
import DashboardMap from './DashboardMap';
import SideMenu from '../sidemenu';

const DashboardPage: React.FC = () => {
  return (
    <SideMenu>
    <div>
      <h1>Dashboard</h1>
      <DashboardStats />
      <DashboardMap />
    </div>
    </SideMenu>
  );
};

export default DashboardPage;