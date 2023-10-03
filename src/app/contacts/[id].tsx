// pages/[id].tsx

import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Card, Avatar } from 'antd';
import { Contact } from './page'; // Define the Contact type in your project
import ContactDetail from './ContactDetail';

interface ContactPageProps {
  contact: Contact;
}

const ContactPage: React.FC<ContactPageProps> = ({ contact }) => {
  return <ContactDetail contact={contact} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch the list of contacts and create an array of paths
  const paths = [
    // Replace with your dynamic paths
    { params: { id: '1' } },
    { params: { id: '2' } },
    // Add more contact IDs as needed
  ];

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<ContactPageProps> = async ({ params }) => {
  // Fetch the contact details based on the ID from params
  const contactId = params?.id;
  const contact: Contact = {
    // Replace with your data fetching logic based on the contactId
    id: Number(contactId),
    name: 'John Doe',
    email: 'john@example.com',
    phone_number: '123-456-7890',
    address: '123 Main St, City, Country',
    coordinates: '68,99',
    avatar: 'https://via.placeholder.com/150',
  };

  return {
    props: {
      contact,
    },
  };
};

export default ContactPage;
