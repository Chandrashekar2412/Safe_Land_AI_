
import React from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MessageSquare, HelpCircle, Phone } from 'lucide-react';

const ContactUs = () => {
  return (
    <PageTemplate
      title="Contact Us"
      subtitle="Get in touch with our team for support, inquiries, or partnership opportunities"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-center mb-4">
            <MessageSquare className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold mb-2 text-center">Send a Message</h2>
          <p className="text-gray-600 mb-4 text-center">
            Have questions or feedback? Send us a message and we'll respond as soon as possible.
          </p>
          <div className="flex justify-center">
            <Link to="/contact-us/message">
              <Button>Contact Form</Button>
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-center mb-4">
            <HelpCircle className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold mb-2 text-center">FAQs</h2>
          <p className="text-gray-600 mb-4 text-center">
            Find answers to commonly asked questions about our services and technology.
          </p>
          <div className="flex justify-center">
            <Link to="/contact-us/faqs">
              <Button>View FAQs</Button>
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-center mb-4">
            <Phone className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold mb-2 text-center">Contact Details</h2>
          <p className="text-gray-600 mb-4 text-center">
            View our contact information, including phone numbers, email addresses, and office locations.
          </p>
          <div className="flex justify-center">
            <Link to="/contact-us/details">
              <Button>View Details</Button>
            </Link>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default ContactUs;
