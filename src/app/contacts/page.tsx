'use client';

import React, {useState} from 'react'
import SideMenu from '../sidemenu';
import { Card, Avatar, List, Pagination, Input, DatePicker } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, HomeOutlined } from '@ant-design/icons';
import moment from 'moment';

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
      const [searchText, setSearchText] = useState('');
  const [searchDate, setSearchDate] = useState<null | moment.Moment>(null);

  const pageSize = 6; // Number of cards per page

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedContacts = contacts.slice(startIndex, endIndex);

const filteredContacts = contacts.filter(contact => {
    const nameMatch = contact.name.toLowerCase().includes(searchText.toLowerCase());
    const contactMatch = contact.email.toLowerCase().includes(searchText.toLowerCase());
    const phoneMatch = contact.phoneNumber.includes(searchText);
    const dateMatch = !searchDate || (contact.id % 2 === 0); // Replace with your date filtering logic

    return nameMatch || contactMatch || phoneMatch || dateMatch;
  });

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchDateChange = (date: moment.Moment | null) => {
    setSearchDate(date);
    setCurrentPage(1);
  };

  return (
   <SideMenu>
<div>
<h1>Contacts</h1>

<div style={{ marginBottom: '16px' }}>
        <Input
          placeholder="Search by Name, Contact, or Phone Number"
          value={searchText}
          onChange={handleSearchTextChange}
          style={{ marginRight: '16px', width: '300px' }}
        />
        <DatePicker
          placeholder="Search by Date"
        //   value={searchDate}
        //   onChange={handleSearchDateChange}
        />
      </div>

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
