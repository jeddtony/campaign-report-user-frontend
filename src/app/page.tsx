import React from 'react';
import { Button, ConfigProvider } from 'antd';
import theme from '../theme/themeConfig';

const HomePage = () => (
  <ConfigProvider theme={theme}>
    <div className="App">
      <Button type="primary" href='/dashboard'>Go to dashboard</Button>
    </div>
  </ConfigProvider>
);

export default HomePage;