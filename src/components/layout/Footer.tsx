import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Safe Land Assist</h3>
            <p className="text-gray-300 text-sm">
              A machine learning based system for hard landing prediction and pilot assistance in commercial flights.
            </p>
            <div className="mt-4">
              <img src="/logo.png" alt="Safe Land Assist Logo" className="h-12 bg-white p-1 rounded" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/landing-predictor" className="text-gray-300 hover:text-white">Landing Predictor</Link></li>
              <li><Link to="/pilot-assistance" className="text-gray-300 hover:text-white">Pilot Assistance</Link></li>
              <li><Link to="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link></li>
              <li><Link to="/resources/blogs" className="text-gray-300 hover:text-white">Blogs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/resources/blogs" className="text-gray-300 hover:text-white">Blogs</Link></li>
              <li><Link to="/resources/papers" className="text-gray-300 hover:text-white">Research Papers</Link></li>
              <li><Link to="/resources/news-events" className="text-gray-300 hover:text-white">News & Events</Link></li>
              <li><Link to="/dataset-parameters" className="text-gray-300 hover:text-white">Dataset Parameters</Link></li>
              <li><Link to="/aviation-safety" className="text-gray-300 hover:text-white">Aviation Safety</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-300">Email: info@sreenidhi.edu.in</li>
              <li className="text-gray-300">Phone: +91 40 2763 1234</li>
              <li className="text-gray-300">Address: Sreenidhi Institute of Science and Technology, Yamnampet, Ghatkesar, Hyderabad, Telangana 501301</li>
              <li className="mt-4">
                <Link to="/contact-us/message" className="text-blue-400 hover:text-blue-300">Send us a message</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Safe Land Assist. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
