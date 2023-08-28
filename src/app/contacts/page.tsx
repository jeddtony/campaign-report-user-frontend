'use client';

import React, {useState} from 'react'
import SideMenu from '../sidemenu';
import { Card, Avatar, List, Pagination } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, HomeOutlined } from '@ant-design/icons';

interface Contact {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    avatar: string;
  }


export default function Page() {

    const contacts: Contact[] = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          phoneNumber: '123-456-7890',
    address: '123 Main St, City, Country',
    coordinates: {
      latitude: 40.7128,
      longitude: -74.0060,
    },
    avatar: 'https://via.placeholder.com/150',
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          phoneNumber: '123-456-7890',
    address: '123 Main St, City, Country',
    coordinates: {
      latitude: 40.7128,
      longitude: -74.0060,
    },
    avatar: 'https://via.placeholder.com/150',
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            phoneNumber: '123-456-7890',
    address: '123 Main St, City, Country',
    coordinates: {
      latitude: 40.7128,
      longitude: -74.0060,
    },
    avatar: 'https://via.placeholder.com/150',
          },
          {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            phoneNumber: '123-456-7890',
    address: '123 Main St, City, Country',
    coordinates: {
      latitude: 40.7128,
      longitude: -74.0060,
    },
    avatar: 'https://via.placeholder.com/150',
          },
          {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            phoneNumber: '123-456-7890',
    address: '123 Main St, City, Country',
    coordinates: {
      latitude: 40.7128,
      longitude: -74.0060,
    },
    avatar: 'https://via.placeholder.com/150',
          },
        // Add more contacts here...
      ];

      const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // Number of cards per page

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedContacts = contacts.slice(startIndex, endIndex);


  return (
   <SideMenu>
<div>
<h1>Contacts</h1>
<List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
      }}
      dataSource={contacts}
      renderItem={(contact) => (
        <List.Item>
          <Card>
            <Card.Meta
              avatar={<Avatar src={contact.avatar} />}
              title={contact.name}
              description={contact.email}
            />
            <p><PhoneOutlined /> {contact.phoneNumber}</p>
            <p><HomeOutlined /> {contact.address}</p>
            <p><EnvironmentOutlined /> {contact.coordinates.latitude}, {contact.coordinates.longitude}</p>
          </Card>
        </List.Item>
      )}
    />
<Pagination
        current={currentPage}
        pageSize={pageSize}
        total={contacts.length}
        // onChange={handlePageChange}
        style={{ marginTop: '16px', textAlign: 'center' }}
      />
</div>
   </SideMenu>
  )
}
