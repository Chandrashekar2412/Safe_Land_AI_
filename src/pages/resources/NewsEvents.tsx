
import React from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

const NewsEvents = () => {
  const newsItems = [
    {
      id: 1,
      title: "Safe Land AI Selected as Finalist for Aviation Technology Award",
      date: "April 3, 2025",
      content: "Safe Land AI has been selected as a finalist for the prestigious Global Aviation Technology Award, recognizing our innovative approach to landing safety enhancement through machine learning.",
      category: "Company News",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Partnership Announced with Leading European Airline",
      date: "March 28, 2025",
      content: "We're excited to announce a new partnership with EuroWings Airlines to implement our landing prediction technology across their entire fleet, enhancing safety for millions of passengers.",
      category: "Partnership",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Research Study Shows 94% Reduction in Hard Landings",
      date: "March 20, 2025",
      content: "A 12-month study with our airline partners has shown that Safe Land AI's prediction system led to a 94% reduction in hard landings, significantly improving passenger comfort and reducing aircraft wear.",
      category: "Research",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "Safe Land AI Expands Team with Top AI Researchers",
      date: "March 15, 2025",
      content: "We're pleased to welcome Dr. Elena Rodriguez and Dr. James Chen to our research team, bringing expertise in deep learning and aviation systems to enhance our prediction algorithms.",
      category: "Team News",
      image: "/placeholder.svg"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Global Aviation Safety Conference 2025",
      date: "May 15-17, 2025",
      location: "London, UK",
      time: "9:00 AM - 5:00 PM",
      description: "Join us at the premier aviation safety event where we'll be presenting our latest research on hard landing prediction technology.",
      attendees: 1500,
      type: "Conference",
      speaking: true
    },
    {
      id: 2,
      title: "AI in Aviation Webinar Series",
      date: "April 22, 2025",
      location: "Online",
      time: "2:00 PM - 3:30 PM EST",
      description: "A virtual session exploring the latest applications of artificial intelligence in aviation safety, featuring our Chief Data Scientist.",
      attendees: 500,
      type: "Webinar",
      speaking: true
    },
    {
      id: 3,
      title: "Airline Technology Expo 2025",
      date: "June 8-10, 2025",
      location: "Singapore",
      time: "9:00 AM - 6:00 PM",
      description: "Visit our booth #342 to see live demonstrations of our landing prediction system and meet our technical team.",
      attendees: 2000,
      type: "Expo",
      speaking: false
    }
  ];

  const pastEvents = [
    {
      id: 1,
      title: "Aviation Safety Summit 2024",
      date: "November 10-12, 2024",
      location: "Chicago, USA",
      type: "Conference",
      speaking: true,
      summary: "Presented our research paper on 'Predictive Analytics in Hard Landing Prevention' to an audience of industry professionals."
    },
    {
      id: 2,
      title: "Machine Learning for Aviation Workshop",
      date: "September 25, 2024",
      location: "Berlin, Germany",
      type: "Workshop",
      speaking: true,
      summary: "Conducted a hands-on workshop demonstrating how machine learning models can be applied to aviation safety challenges."
    }
  ];

  return (
    <PageTemplate
      title="News & Events"
      subtitle="Latest announcements, industry events, and company updates"
    >
      <Tabs defaultValue="news" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-3">
          <TabsTrigger value="news">Company News</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="news">
          <div className="space-y-8">
            {newsItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 h-48 md:h-auto bg-gray-200">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1608023136037-64c4fcad43cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80";
                      }}
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <Badge className="mb-2">{item.category}</Badge>
                    <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                    <p className="text-sm text-gray-500 mb-4">{item.date}</p>
                    <p className="text-gray-600 mb-6">{item.content}</p>
                    <Button variant="outline">Read Full Story</Button>
                  </div>
                </div>
              </Card>
            ))}
            
            <div className="flex justify-center">
              <Button variant="outline">View All News</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <Badge>{event.type}</Badge>
                    {event.speaking && <Badge variant="secondary">Speaking</Badge>}
                  </div>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{event.date}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      <span>Expected Attendees: {event.attendees}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{event.description}</p>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                  <Button className="w-full">Event Details</Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="past">
          <div className="space-y-6">
            {pastEvents.map((event) => (
              <Card key={event.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center mb-1">
                    <Badge variant="outline">{event.type}</Badge>
                    <span className="text-sm text-gray-500">{event.date}</span>
                  </div>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center text-sm mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{event.location}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{event.summary}</p>
                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm">View Presentation</Button>
                    <Button variant="outline" size="sm">Photos</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="flex justify-center mt-8">
              <Button variant="outline">View All Past Events</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-12 bg-blue-50 p-6 rounded-lg border border-blue-100">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Subscribe to Event Notifications</h2>
        <p className="text-gray-600 mb-4">
          Stay updated on our upcoming conferences, webinars, and other industry events.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input 
            className="px-4 py-2 border rounded-md flex-1" 
            placeholder="Enter your email"
          />
          <Button>Subscribe</Button>
        </div>
      </div>
    </PageTemplate>
  );
};

export default NewsEvents;
