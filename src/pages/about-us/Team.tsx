
import React from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LinkedinIcon, TwitterIcon, GlobeIcon } from 'lucide-react';

const Team = () => {
  const leadershipTeam = [
    {
      name: "Dr. Sarah Johnson",
      role: "Founder & CEO",
      bio: "Dr. Johnson holds a Ph.D. in Computer Science and has 15 years of experience in aviation safety. Prior to founding Safe Land AI, she was the Head of Safety Innovation at AeroTech Industries and led research projects at NASA's Aviation Safety Program.",
      image: "/placeholder.svg",
      links: {
        linkedin: "https://linkedin.com/in/sarahjohnson",
        twitter: "https://twitter.com/sarahjohnson",
        website: "https://drsarahjohnson.com"
      }
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      bio: "With a background as both a commercial pilot and a computer scientist, Michael brings a unique perspective to Safe Land AI. He specializes in neural network design and has developed award-winning algorithms for flight path optimization.",
      image: "/placeholder.svg",
      links: {
        linkedin: "https://linkedin.com/in/michaelchen",
        twitter: "https://twitter.com/michaelchen"
      }
    },
    {
      name: "Dr. James Wilson",
      role: "Chief Data Scientist",
      bio: "Dr. Wilson leads our data science team, leveraging his expertise in machine learning and atmospheric physics. He previously worked at the National Weather Service, developing predictive models for aviation weather hazards.",
      image: "/placeholder.svg",
      links: {
        linkedin: "https://linkedin.com/in/jameswilson",
        website: "https://jameswilson.tech"
      }
    },
    {
      name: "Elizabeth Taylor",
      role: "Chief Operations Officer",
      bio: "Elizabeth has 20 years of experience in aviation operations and safety management. She oversees the implementation of Safe Land AI's technology at partner airlines and ensures operational excellence across the organization.",
      image: "/placeholder.svg",
      links: {
        linkedin: "https://linkedin.com/in/elizabethtaylor"
      }
    }
  ];

  const engineeringTeam = [
    {
      name: "David Rodriguez",
      role: "Lead Software Engineer",
      bio: "David specializes in real-time systems and cloud architecture. He leads the development of our core prediction engine and integration with aircraft systems.",
      image: "/placeholder.svg"
    },
    {
      name: "Aisha Patel",
      role: "Machine Learning Engineer",
      bio: "Aisha focuses on optimizing our neural network models and enhancing prediction accuracy through innovative ML techniques.",
      image: "/placeholder.svg"
    },
    {
      name: "Thomas Schmidt",
      role: "Systems Integration Specialist",
      bio: "Thomas works on seamlessly connecting our AI system with existing aviation systems, ensuring reliable data flow and compliance with industry standards.",
      image: "/placeholder.svg"
    },
    {
      name: "Olivia Kim",
      role: "UX/UI Designer",
      bio: "Olivia designs intuitive interfaces that deliver critical information to pilots and aviation professionals in a clear, actionable format.",
      image: "/placeholder.svg"
    }
  ];

  const advisoryBoard = [
    {
      name: "Capt. Robert Thompson",
      role: "Former Airline Chief Pilot",
      bio: "Captain Thompson brings 40 years of flying experience and leadership in aviation safety initiatives to our advisory board.",
      image: "/placeholder.svg"
    },
    {
      name: "Dr. Elena Martinez",
      role: "Professor of Aerospace Engineering",
      bio: "Dr. Martinez is a renowned researcher in aircraft dynamics and contributes valuable academic insights to our technology development.",
      image: "/placeholder.svg"
    },
    {
      name: "Jonathan Parker",
      role: "Aviation Regulatory Expert",
      bio: "Jonathan has 25 years of experience working with aviation authorities worldwide and helps navigate the complex regulatory landscape.",
      image: "/placeholder.svg"
    }
  ];

  return (
    <PageTemplate
      title="Our Team"
      subtitle="Meet the experts behind Safe Land AI's innovative technology"
    >
      <Tabs defaultValue="leadership" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="leadership">Leadership</TabsTrigger>
          <TabsTrigger value="engineering">Engineering</TabsTrigger>
          <TabsTrigger value="advisory">Advisory Board</TabsTrigger>
        </TabsList>
        
        <TabsContent value="leadership">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leadershipTeam.map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="h-48 md:h-full bg-gray-200">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'women' : 'men'}/${index + 1}.jpg`;
                        }}
                      />
                    </div>
                  </div>
                  <div className="p-6 md:w-2/3">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-blue-700 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                    {member.links && (
                      <div className="flex space-x-3">
                        {member.links.linkedin && (
                          <a href={member.links.linkedin} className="text-gray-500 hover:text-blue-700" target="_blank" rel="noopener noreferrer">
                            <LinkedinIcon className="h-5 w-5" />
                          </a>
                        )}
                        {member.links.twitter && (
                          <a href={member.links.twitter} className="text-gray-500 hover:text-blue-500" target="_blank" rel="noopener noreferrer">
                            <TwitterIcon className="h-5 w-5" />
                          </a>
                        )}
                        {member.links.website && (
                          <a href={member.links.website} className="text-gray-500 hover:text-purple-700" target="_blank" rel="noopener noreferrer">
                            <GlobeIcon className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="engineering">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {engineeringTeam.map((member, index) => (
              <Card key={index} className="overflow-hidden flex flex-col">
                <div className="h-48 bg-gray-200">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 5}.jpg`;
                    }}
                  />
                </div>
                <CardContent className="pt-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-blue-600 text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="advisory">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {advisoryBoard.map((member, index) => (
              <Card key={index} className="overflow-hidden flex flex-col">
                <div className="h-48 bg-gray-200">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 9}.jpg`;
                    }}
                  />
                </div>
                <CardContent className="pt-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-blue-600 text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg border border-blue-100">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700 text-center">Join Our Team</h2>
        <p className="text-gray-700 mb-6 text-center max-w-3xl mx-auto">
          We're always looking for talented individuals who are passionate about aviation safety and
          machine learning. If you're interested in contributing to our mission, check out our open positions.
        </p>
        <div className="flex justify-center">
          <button className="px-6 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors">
            View Open Positions
          </button>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Team;
