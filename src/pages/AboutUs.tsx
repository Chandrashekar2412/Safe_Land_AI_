import React from 'react';
import Layout from '@/components/layout/Layout';
import { LinkedinIcon, MailIcon } from 'lucide-react';

const AboutUs = () => {
  const teamMembers = [
    {
      name: "V. Chandrashekar",
      role: "Team Member",
      bio: "Information Technology, B.Tech, Sreenidhi Institute of Science and Technology",
      image: "/team-photos/chandrashekar.jpg",
      fallbackImage: "/placeholder.svg",
      links: {
        linkedin: "https://www.linkedin.com/in/v-chandrashekar-1293",
        email: "mailto:21311a1293@sreenidhi.edu.in"
      }
    },
    {
      name: "C. Praneeth Kumar",
      role: "Team Member",
      bio: "Information Technology, B.Tech, Sreenidhi Institute of Science and Technology",
      image: "/team-photos/praneeth.jpg",
      fallbackImage: "/placeholder.svg",
      links: {
        linkedin: "https://www.linkedin.com/in/praneeth-kumar-c",
        email: "mailto:21311a1294@sreenidhi.edu.in"
      }
    },
    {
      name: "C. Rajashekar",
      role: "Team Member",
      bio: "Information Technology, B.Tech, Sreenidhi Institute of Science and Technology",
      image: "/team-photos/rajashekar.jpg",
      fallbackImage: "/placeholder.svg",
      links: {
        linkedin: "https://www.linkedin.com/in/rajashekar-c-1210",
        email: "mailto:22315a1210@sreenidhi.edu.in"
      }
    }
  ];

  return (
    <Layout>
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-4">About Safe Land Assist</h1>
          <p className="text-xl max-w-3xl">
            Learn about our mission to enhance aviation safety through advanced machine learning technology.
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              Safe Land Assist is dedicated to revolutionizing aviation safety through advanced artificial intelligence 
              and machine learning technologies. Our mission is to predict and prevent hard landings, 
              thereby reducing incidents, saving lives, and minimizing aircraft damage.
            </p>
            <p className="text-gray-600 mb-4">
              With our innovative algorithms and comprehensive datasets, we provide pilots, airlines, and air traffic controllers 
              with actionable insights and recommendations to ensure every landing is as safe as possible.
            </p>
            <h2 className="text-2xl font-semibold mb-4 mt-8">Our Technology</h2>
            <p className="text-gray-600">
              Our advanced AI models analyze thousands of variables from flight data, weather conditions, airport characteristics, 
              and historical landing patterns to predict landing outcomes with remarkable accuracy. By identifying potential risks 
              before they become critical, our technology empowers aviation professionals to make informed decisions that enhance safety.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Core Values</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg shadow-sm">
                <h3 className="font-medium text-lg text-blue-700">Safety First</h3>
                <p className="text-gray-600">We believe that every flight deserves a safe landing, and we're committed to making that a reality.</p>
              </div>
              <div className="p-4 border rounded-lg shadow-sm">
                <h3 className="font-medium text-lg text-blue-700">Innovation</h3>
                <p className="text-gray-600">We continuously push the boundaries of what's possible with AI in aviation safety.</p>
              </div>
              <div className="p-4 border rounded-lg shadow-sm">
                <h3 className="font-medium text-lg text-blue-700">Accuracy</h3>
                <p className="text-gray-600">Our models are rigorously tested and refined to ensure the highest level of prediction accuracy.</p>
              </div>
              <div className="p-4 border rounded-lg shadow-sm">
                <h3 className="font-medium text-lg text-blue-700">Collaboration</h3>
                <p className="text-gray-600">We work closely with aviation experts, regulatory bodies, and airlines to develop solutions that meet real-world needs.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
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
                <h3 className="font-medium text-lg">{member.name}</h3>
                <p className="text-blue-700 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-gray-600 mb-4">{member.bio}</p>
                <div className="flex justify-center space-x-4">
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
