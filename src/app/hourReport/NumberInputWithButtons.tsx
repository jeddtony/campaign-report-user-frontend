'use client';

import React, {SetStateAction, useState} from 'react';

import { Button, InputNumber } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';



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
  

  export default NumberInputWithButtons