import React from 'react';
import { TrendingUp, MapPin, Users, ExternalLink, Briefcase } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Startup } from '../types';

interface CompanyCardProps {
  startup: Startup;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ startup }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-start gap-4">
          <img 
            src={startup.logo_url} 
            alt={`${startup.name} logo`}
            className="w-16 h-16 rounded-lg object-cover border border-slate-200"
          />
          <div className="flex-1">
            <CardTitle className="text-2xl mb-2">{startup.name}</CardTitle>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                <TrendingUp className="w-3 h-3 mr-1" />
                {startup.stage} 
                {/* {startup.funding_announcement} */}
              </Badge>
              <Badge variant="outline">{startup.industry}</Badge>
              <Badge variant="outline">
                <Users className="w-3 h-3 mr-1" />
                {startup.company_size}
              </Badge>
            </div>
            <CardDescription className="text-base leading-relaxed mb-3">
              {startup.description}
            </CardDescription>
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {startup.location}
              </div>
              <div className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                {startup.work_type}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <a 
            href={startup.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            Visit Website
            <ExternalLink className="w-4 h-4" />
          </a>
          {startup.jobs_url && (  
          <a 
            href={startup.jobs_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-900 text-slate-900 rounded-lg hover:bg-slate-50 transition-colors"
          >
            View Jobs
            <Briefcase className="w-4 h-4" />
          </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};