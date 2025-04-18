import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home,
  Briefcase,
  BarChart2,
  FileText,
  Users,
  MessageSquare,
  LogIn,
  LogOut,
  UserPlus,
  Search,
  Menu,
  X,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout, isAuthenticated } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
  };

  const handleDropdownEnter = (index: number) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
    }
    setActiveDropdown(index);
  };

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 200); // Small delay to allow moving to dropdown
    setDropdownTimeout(timeout);
  };

  const navItems = [
    {
      name: 'Home',
      link: '/',
      icon: <Home className="h-4 w-4 mr-2" />,
      dropdown: [
        { name: 'About Safe Land Assist', link: '/about-safelands' },
        { name: 'Our Mission', link: '/mission' },
        { name: 'Dataset Parameters', link: '/dataset-parameters' },
        { name: 'Aviation Safety', link: '/aviation-safety' },
        { name: 'Quick Links', link: '/quick-links' },
      ],
    },
    {
      name: 'Services',
      link: '/services',
      icon: <Briefcase className="h-4 w-4 mr-2" />,
      dropdown: [
        { name: 'Landing Predictor', link: '/landing-predictor' },
        { name: 'Pilot Assistance', link: '/pilot-assistance' },
        { name: 'Corrective Measures', link: '/corrective-measures' },
        { name: 'Advanced Analytics', link: '/advanced-analytics' },
      ],
    },
    {
      name: 'Dashboard',
      link: '/dashboard',
      icon: <BarChart2 className="h-4 w-4 mr-2" />,
      dropdown: [
        { name: 'User Details', link: '/dashboard/user-details' },
        { name: 'Prediction History', link: '/dashboard/prediction-history' },
        { name: 'Profile', link: '/dashboard/profile' },
        { name: 'Settings', link: '/dashboard/settings' },
      ],
    },
    {
      name: 'Resources',
      link: '/resources',
      icon: <FileText className="h-4 w-4 mr-2" />,
      dropdown: [
        { name: 'Blogs', link: '/resources/blogs' },
        { name: 'Papers', link: '/resources/papers' },
        { name: 'News & Events', link: '/resources/news-events' },
      ],
    },
    {
      name: 'About Us',
      link: '/about-us',
      icon: <Users className="h-4 w-4 mr-2" />,
      dropdown: [
        { name: 'Our Safe Land Assist', link: '/about-us/safe-land-ai' },
        { name: 'Team Members', link: '/about-us/team' },
        { name: 'Project Guide', link: '/about-us/project-guide' },
      ],
    },
    {
      name: 'Contact Us',
      link: '/contact-us',
      icon: <MessageSquare className="h-4 w-4 mr-2" />,
      dropdown: [
        { name: 'Contact Details', link: '/contact-us/details' },
        { name: 'FAQs', link: '/contact-us/faqs' },
        { name: 'Send Message', link: '/contact-us/message' },
      ],
    },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-8">
              <Link to="/">
                <img className="h-10 w-auto" src="/logo.png" alt="Safe Land Assist Logo" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/150x50?text=Safe+Land+AI";
                  }}
                />
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              {navItems.map((item, index) => (
                <div 
                  key={index} 
                  className="relative group"
                  onMouseEnter={() => handleDropdownEnter(index)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link 
                    to={item.link}
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                  {activeDropdown === index && item.dropdown && (
                    <div 
                      className="absolute z-50 left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                      onMouseEnter={() => handleDropdownEnter(index)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        {item.dropdown.map((dropdownItem, dropdownIndex) => (
                          <Link
                            key={dropdownIndex}
                            to={dropdownItem.link}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center ml-4 space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <input
                className="pl-8 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard/profile">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    {user?.firstName}
                  </Button>
                </Link>
                <Button variant="outline" size="sm" className="flex items-center" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="flex items-center">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMenu}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item, index) => (
              <div key={index}>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleDropdownEnter(index)}
                >
                  {item.icon}
                  {item.name}
                </Button>
                {activeDropdown === index && item.dropdown && (
                  <div className="pl-4 space-y-1">
                    {item.dropdown.map((dropdownItem, dropdownIndex) => (
                      <Link
                        key={dropdownIndex}
                        to={dropdownItem.link}
                        className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                        onClick={() => {
                          setIsOpen(false);
                          setActiveDropdown(null);
                        }}
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  className="w-full pl-8 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard/profile" className="w-full" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full flex items-center justify-center">
                      <User className="h-4 w-4 mr-2" />
                      {user?.firstName}
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center"
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="w-full" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full flex items-center justify-center">
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" className="w-full" onClick={() => setIsOpen(false)}>
                    <Button className="w-full flex items-center justify-center">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
