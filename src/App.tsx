import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AdminRoute from "@/components/auth/AdminRoute";
import { ChatBot } from "@/components/ChatBot";

import Index from "./pages/Index";
import Services from "./pages/Services";
import Resources from "./pages/Resources";
import Dashboard from "./pages/Dashboard";
import LandingPredictor from "./pages/services/LandingPredictor";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import ContactUs from "./pages/contact-us/ContactUs";

// Home Section Pages
import AboutSafelands from "./pages/home/AboutSafelands";
import Mission from "./pages/home/Mission";
import DatasetParameters from "./pages/home/DatasetParameters";
import AviationSafety from "./pages/home/AviationSafety";
import QuickLinks from "./pages/home/QuickLinks";

// Services Section Pages
import PilotAssistance from "./pages/services/PilotAssistance";
import CorrectiveMeasures from "./pages/services/CorrectiveMeasures";
import AdvancedAnalytics from "./pages/services/AdvancedAnalytics";

// Dashboard Section Pages
import UserDetails from "./pages/dashboard/UserDetails";
import PredictionHistory from "./pages/dashboard/PredictionHistory";
import Profile from "./pages/dashboard/Profile";
import Settings from "./pages/dashboard/Settings";

// Resources Section Pages
import Blogs from "./pages/resources/Blogs";
import Papers from "./pages/resources/Papers";
import NewsEvents from "./pages/resources/NewsEvents";

// About Us Section Pages
import SafeLandAI from "./pages/about-us/SafeLandAI";
import Team from "./pages/about-us/Team";
import ProjectGuide from "./pages/about-us/ProjectGuide";

// Contact Us Section Pages
import ContactDetails from "./pages/contact-us/ContactDetails";
import FAQs from "./pages/contact-us/FAQs";
import SendMessage from "./pages/contact-us/SendMessage";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminRegister from "./pages/auth/AdminRegister";
import AdminLogin from "./pages/auth/AdminLogin";

// Admin Section Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import SystemSettings from "./pages/admin/SystemSettings";
import AdminProfile from "./pages/admin/AdminProfile";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <div className="fixed bottom-4 right-4 z-50">
            <ChatBot />
          </div>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Home Section Routes */}
            <Route path="/about-safelands" element={<AboutSafelands />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/dataset-parameters" element={<DatasetParameters />} />
            <Route path="/aviation-safety" element={<AviationSafety />} />
            <Route path="/quick-links" element={<QuickLinks />} />
            
            {/* Services Section Routes */}
            <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
            <Route path="/landing-predictor" element={<ProtectedRoute><LandingPredictor /></ProtectedRoute>} />
            <Route path="/pilot-assistance" element={<ProtectedRoute><PilotAssistance /></ProtectedRoute>} />
            <Route path="/corrective-measures" element={<ProtectedRoute><CorrectiveMeasures /></ProtectedRoute>} />
            <Route path="/advanced-analytics" element={<ProtectedRoute><AdvancedAnalytics /></ProtectedRoute>} />
            
            {/* Protected Dashboard Section Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/user-details" element={<ProtectedRoute><UserDetails /></ProtectedRoute>} />
            <Route path="/dashboard/prediction-history" element={<ProtectedRoute><PredictionHistory /></ProtectedRoute>} />
            <Route path="/dashboard/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            
            {/* Resources Section Routes */}
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/blogs" element={<Blogs />} />
            <Route path="/resources/papers" element={<Papers />} />
            <Route path="/resources/news-events" element={<NewsEvents />} />
            
            {/* About Us Section Routes */}
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/about-us/safe-land-ai" element={<SafeLandAI />} />
            <Route path="/about-us/team" element={<Team />} />
            <Route path="/about-us/project-guide" element={<ProjectGuide />} />
            
            {/* Contact Us Section Routes */}
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/contact-us/details" element={<ContactDetails />} />
            <Route path="/contact-us/faqs" element={<FAQs />} />
            <Route path="/contact-us/message" element={<SendMessage />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Admin Section Routes */}
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><UserManagement /></AdminRoute>} />
            <Route path="/admin/settings" element={<AdminRoute><SystemSettings /></AdminRoute>} />
            <Route path="/admin/profile" element={<AdminRoute><AdminProfile /></AdminRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
