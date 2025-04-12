import React from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Card, CardContent } from '@/components/ui/card';
import { LinkedinIcon, MailIcon, GlobeIcon } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      name: "V. Chandrashekar",
      role: "Team Member",
      bio: "Information Technology, B.Tech, Sreenidhi Institute of Science and Technology, Yamnampet, Hyderabad. Roll No: 21311a1293",
      image: "/team-photos/chandrashekar.jpg",
      fallbackImage: "/placeholder.svg",
      links: {
        linkedin: "https://www.linkedin.com/in/v-chandrashekar-1293",
        email: "mailto:21311a1293@sreenidhi.edu.in",
        website: "#"
      }
    },
    {
      name: "C. Praneeth Kumar",
      role: "Team Member",
      bio: "Information Technology, B.Tech, Sreenidhi Institute of Science and Technology, Yamnampet, Hyderabad. Roll No: 21311a1286",
      image: "/team-photos/praneeth.jpg",
      fallbackImage: "/placeholder.svg",
      links: {
        linkedin: "https://www.linkedin.com/in/praneeth-kumar-c",
        email: "mailto:21311a1286@sreenidhi.edu.in",
        website: "#"
      }
    },
    {
      name: "C. Rajashekar",
      role: "Team Member",
      bio: "Information Technology, B.Tech, Sreenidhi Institute of Science and Technology, Yamnampet, Hyderabad. Roll No: 22315a1210",
      image: "/team-photos/rajashekar.jpg",
      fallbackImage: "/placeholder.svg",
      links: {
        linkedin: "https://www.linkedin.com/in/rajashekar-c-1210",
        email: "mailto:22315a1210@sreenidhi.edu.in",
        website: "#"
      }
    }
  ];

  return (
    <PageTemplate
      title="Our Team"
      subtitle="Meet the team behind Safe Land Assist"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <div className="h-48 md:h-full bg-gray-200 relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = member.fallbackImage;
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
                      <a href={member.links.linkedin} className="text-gray-500 hover:text-blue-700" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                        <LinkedinIcon className="h-5 w-5" />
                      </a>
                    )}
                    {member.links.email && (
                      <a href={member.links.email} className="text-gray-500 hover:text-red-600" target="_blank" rel="noopener noreferrer" title="Email">
                        <MailIcon className="h-5 w-5" />
                      </a>
                    )}
                    {member.links.website && (
                      <a href={member.links.website} className="text-gray-500 hover:text-purple-700" target="_blank" rel="noopener noreferrer" title="Website">
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
    </PageTemplate>
  );
};

export default Team;
