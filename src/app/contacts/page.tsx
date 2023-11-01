'use client';

import React, {useState, useEffect} from 'react'
import SideMenu from '../sidemenu';
import { Card, Avatar, List, Pagination, Input, DatePicker, Button } from 'antd';
import { MailOutlined, PhoneOutlined, AimOutlined, HomeOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getStudents } from '@/api/Api';
import Link from 'next/link';
import dynamic from 'next/dynamic';

export interface Contact {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    address: string;
    coordinates: string;
    avatar: string;
    land_mark: string;
    preferred_language: string;
    last_discussion: string;
    next_discussion: string;
  }

  const cardStyle = {
    marginBottom: '16px', // Add some spacing between cards
    borderRadius: '8px',  // Add rounded corners to the cards
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add a subtle shadow
  };
  

function Page() {

    const [contacts, setContacts] = useState<Contact []>([]);

    useEffect(() => {
        async function fetchStudents() {
            let result = await getStudents();
            setContacts(result.data);
        }

        fetchStudents();
    }, [])
    


      const [currentPage, setCurrentPage] = useState(1);
      const [searchText, setSearchText] = useState('');
  const [searchDate, setSearchDate] = useState<null | moment.Moment>(null);

  const pageSize = 6; // Number of cards per page

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedContacts = contacts.slice(startIndex, endIndex);

// const filteredContacts = contacts.filter(contact => {
//     const nameMatch = contact.name.toLowerCase().includes(searchText.toLowerCase());
//     const contactMatch = contact.email.toLowerCase().includes(searchText.toLowerCase());
//     const phoneMatch = contact.phoneNumber.includes(searchText);
//     const dateMatch = !searchDate || (contact.id % 2 === 0); // Replace with your date filtering logic

//     return nameMatch || contactMatch || phoneMatch || dateMatch;
//   });

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchDateChange = (date: moment.Moment | null) => {
    setSearchDate(date);
    setCurrentPage(1);
  };

  const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;

  return (
    <SideMenu active="contacts">
      <div>
        <h1>Contacts</h1>

        <div
          style={{
            marginBottom: "16px",
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
          }}
        >
          <div style={{ marginRight: isSmallScreen ? "0" : "16px", flex: "1" }}>
            <Input
              placeholder="Search by Name, Contact, or Phone Number"
              value={searchText}
              onChange={handleSearchTextChange}
            />
          </div>
          {isSmallScreen && <br />} {/* Add a line break on small screens */}
          <div style={{ flex: "1" }}>
            <DatePicker
              placeholder="Date Search"
              //   value={searchDate}
              //   onChange={handleSearchDateChange}
            />
          </div>
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
              <Card style={cardStyle}>
                <Card.Meta
                  avatar={<Avatar src={contact.avatar} />}
                  title={contact.name}
                  description={contact.email}
                />
                <p>
                  <PhoneOutlined /> {contact.phone_number}
                </p>
                <p>
                  <HomeOutlined /> {contact.address}
                </p>
                <p>
                <Link href={`https://www.google.com/maps?q=${contact.geo_cord}`}>
                   <AimOutlined /> View on Map
                   </Link>
                </p>

                {/* <p><EnvironmentOutlined /> <a>Click to view on map</a>{contact.coordinates}</p> */}
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Link href={`/contacts/${contact.id}`}>
                    <Button type="primary">View</Button>
                  </Link>
                  <Link href={`/contacts/${contact.id}/edit`}>
                  <Button type="default" >
                    Edit
                  </Button>
                  </Link>
                </div>
              </Card>
            </List.Item>
          )}
        />
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={contacts.length}
          // onChange={handlePageChange}
          style={{ marginTop: "16px", textAlign: "center" }}
        />
      </div>
    </SideMenu>
  );
}

export default dynamic(() => Promise.resolve(Page), {
  ssr: false
})