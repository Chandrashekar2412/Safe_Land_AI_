
import React from 'react';
import Layout from './layout/Layout';

interface PageTemplateProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const PageTemplate = ({ title, subtitle, children }: PageTemplateProps) => {
  return (
    <Layout>
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          {subtitle && (
            <p className="text-xl max-w-3xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children || (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600">Content for this page is coming soon.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PageTemplate;
