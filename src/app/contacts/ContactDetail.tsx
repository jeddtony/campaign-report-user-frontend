
import React from 'react';
import { Card, Avatar, Descriptions } from 'antd';
import { Contact } from './page'; // Define the Contact type in your project

interface ContactDetailProps {
  contact: Contact;
}

const ContactDetail: React.FC<ContactDetailProps> = ({ contact }) => {
  return (
    <div className="profile-container">
      <Card>
        <Card.Meta
          avatar={<Avatar src={contact.avatar} />}
          title={contact.name}
          description={contact.email}
        />
        <Descriptions title="Contact Detailsas">
          <Descriptions.Item label="Email">{contact.email}</Descriptions.Item>
          <Descriptions.Item label="Phone Number">{contact.phone_number}</Descriptions.Item>
          <Descriptions.Item label="Address">{contact.address}</Descriptions.Item>
          <Descriptions.Item label="Landmark">{contact.land_mark}</Descriptions.Item>
          <Descriptions.Item label="Language">{contact.preferred_language}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default ContactDetail;
