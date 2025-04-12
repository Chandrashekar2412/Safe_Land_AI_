import React from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Card, CardContent } from '@/components/ui/card';
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon } from 'lucide-react';

const Contact = () => {
  const contactInfo = {
    address: "Sreenidhi Institute of Science and Technology, Yamnampet, Ghatkesar, Hyderabad, Telangana 501301",
    phone: "+91 40 2763 1234",
    email: "info@sreenidhi.edu.in",
    workingHours: "Monday - Friday: 9:00 AM - 5:00 PM"
  };

  return (
    <PageTemplate
      title="Contact Us"
      subtitle="Get in touch with us"
    >
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPinIcon className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-gray-600">{contactInfo.address}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <PhoneIcon className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-gray-600">{contactInfo.phone}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MailIcon className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600">{contactInfo.email}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <ClockIcon className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Working Hours</h3>
                    <p className="text-gray-600">{contactInfo.workingHours}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
};

export default Contact; 