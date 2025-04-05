
import React from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, MessageSquare, Clock, Mail } from 'lucide-react';

const SendMessage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the form data to a backend service
    alert("Your message has been sent. We'll respond shortly!");
  };

  return (
    <PageTemplate
      title="Send Message"
      subtitle="Get in touch with our team for questions, support, or information"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Contact Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" required />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter your email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input id="phone" placeholder="Enter your phone number" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company/Organization (Optional)</Label>
                  <Input id="company" placeholder="Enter your company or organization name" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select>
                    <SelectTrigger id="subject" className="w-full">
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="sales">Product Information</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                      <SelectItem value="careers">Career Information</SelectItem>
                      <SelectItem value="media">Media Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Type your message here..." 
                    className="min-h-[150px]"
                    required
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="privacy" className="h-4 w-4" required />
                  <Label htmlFor="privacy" className="text-sm">
                    I agree to the processing of my personal data in accordance with the 
                    <a href="#" className="text-blue-600 hover:underline"> Privacy Policy</a>.
                  </Label>
                </div>
                
                <div className="pt-4">
                  <Button type="submit" className="w-full md:w-auto">
                    Send Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-600" />
                Response Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We typically respond to inquiries within 1-2 business days.
                For urgent matters, please indicate in your message.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-blue-600" />
                Direct Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">
                You can also reach us directly by email:
              </p>
              <a href="mailto:info@safelandai.com" className="text-blue-600 hover:underline">
                info@safelandai.com
              </a>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
                Live Chat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Chat with our support team during business hours:
                <br />Monday-Friday, 9AM-5PM EST
              </p>
              <Button variant="outline" className="w-full">
                Start Chat
              </Button>
            </CardContent>
          </Card>
          
          <div className="bg-green-50 p-6 rounded-lg border border-green-100">
            <div className="flex items-center mb-4">
              <CheckCircle2 className="h-6 w-6 text-green-600 mr-3" />
              <h3 className="font-medium text-lg text-green-800">We're Here to Help</h3>
            </div>
            <p className="text-gray-600">
              Our dedicated team is available to assist with any questions about our technology,
              implementation process, or how Safe Land AI can benefit your organization.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="font-medium text-lg mb-2">What information should I include in my message?</h3>
            <p className="text-gray-600">
              For the fastest response, please include details about your organization, specific questions, and any relevant technical information or requirements.
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="font-medium text-lg mb-2">How do I request a product demonstration?</h3>
            <p className="text-gray-600">
              Select "Product Information" in the subject dropdown and mention that you're interested in a demonstration. A member of our sales team will coordinate a time with you.
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="font-medium text-lg mb-2">How can I get technical support?</h3>
            <p className="text-gray-600">
              Existing customers should select "Technical Support" in the subject dropdown and include your account ID for the fastest assistance.
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="font-medium text-lg mb-2">Do you offer customized solutions?</h3>
            <p className="text-gray-600">
              Yes, we tailor our solutions to meet specific requirements. Please describe your needs in detail when contacting us, and our team will follow up to discuss customization options.
            </p>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default SendMessage;
