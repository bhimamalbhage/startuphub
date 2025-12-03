import React from 'react';
import { CompanyCard } from './CompanyCard';
import { Startup } from '../types';

interface CompaniesListProps {
  companies: Startup[];
}

export const CompaniesList: React.FC<CompaniesListProps> = ({ companies }) => {
  return (
    <div className="space-y-4">
      {companies.map((startup) => (
        startup.website_url && <CompanyCard key={startup.id} startup={startup} />
      ))}
    </div>
  );
};