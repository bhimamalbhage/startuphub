import React from 'react';

export const Header: React.FC = () => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-slate-900 mb-2">StartupHub</h1>
      <p className="text-slate-600 text-lg">
        Track newly funded startups & early hiring opportunities
      </p>
    </div>
  );
};