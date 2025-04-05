
import React from 'react';
import PageTemplate from '@/components/PageTemplate';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Blogs = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Hard Landing Prevention Technology",
      excerpt: "Exploring how AI and machine learning are revolutionizing landing safety in commercial aviation.",
      author: "Dr. Sarah Johnson",
      date: "April 3, 2025",
      readTime: "8 min read",
      categories: ["Technology", "Safety", "AI"],
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Understanding G-Forces During Aircraft Landing",
      excerpt: "A detailed look at how g-forces affect aircraft during landing and their impact on passenger safety.",
      author: "Capt. Michael Chen",
      date: "March 28, 2025",
      readTime: "6 min read",
      categories: ["Physics", "Engineering", "Safety"],
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Weather Patterns and Their Effect on Landing Safety",
      excerpt: "How different weather conditions affect landing outcomes and how AI can help predict these effects.",
      author: "Dr. James Wilson",
      date: "March 21, 2025",
      readTime: "10 min read",
      categories: ["Weather", "Safety", "Analysis"],
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "Case Study: How Safe Land AI Prevented a Hard Landing at JFK",
      excerpt: "A real-world example of how our predictive system helped a pilot avoid a potential hard landing.",
      author: "Capt. Lisa Rodriguez",
      date: "March 15, 2025",
      readTime: "7 min read",
      categories: ["Case Study", "Success Story"],
      image: "/placeholder.svg"
    },
    {
      id: 5,
      title: "The Economics of Aviation Safety: ROI of Landing Prediction Systems",
      excerpt: "Analyzing the financial benefits of implementing advanced landing prediction technology.",
      author: "Elizabeth Taylor, MBA",
      date: "March 10, 2025",
      readTime: "9 min read",
      categories: ["Economics", "Business", "ROI"],
      image: "/placeholder.svg"
    }
  ];

  const categories = ["Technology", "Safety", "AI", "Physics", "Engineering", "Weather", "Analysis", "Case Study", "Economics", "Business"];

  return (
    <PageTemplate
      title="Blog Articles"
      subtitle="Insights, research, and news about aviation safety and landing technology"
    >
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search articles..." className="pl-9" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className="cursor-pointer" variant="outline">All Categories</Badge>
            {categories.slice(0, 5).map((category, index) => (
              <Badge key={index} className="cursor-pointer" variant="secondary">{category}</Badge>
            ))}
            <Badge className="cursor-pointer" variant="outline">More...</Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden flex flex-col">
              <div className="h-48 bg-gray-200">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1587162146766-e06b1189b907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
                  }}
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex gap-2 flex-wrap mb-2">
                  {post.categories.map((category, index) => (
                    <Badge key={index} variant="outline" className="text-xs">{category}</Badge>
                  ))}
                </div>
                <CardTitle className="text-lg">{post.title}</CardTitle>
                <CardDescription className="flex justify-between text-xs">
                  <span>{post.author}</span>
                  <span>{post.date} • {post.readTime}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-gray-600 mb-4">{post.excerpt}</p>
              </CardContent>
              <div className="px-6 pb-6 mt-auto">
                <Button variant="outline" className="w-full">Read Article</Button>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <Button variant="outline">Load More Articles</Button>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-4">
            Stay updated with the latest developments in aviation safety and landing technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input placeholder="Enter your email" className="flex-1" />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Blogs;
