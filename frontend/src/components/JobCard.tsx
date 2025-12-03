import React from 'react';
import { DollarSign, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Job } from '../types';
import { formatDate } from '../utils/dateUtils';

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  // Format compensation display
  const getCompensationDisplay = () => {
    if (job.compensation_summary) {
      return job.compensation_summary;
    }
    if (job.compensation_salary_min && job.compensation_salary_max) {
      return `$${(job.compensation_salary_min / 1000).toFixed(0)}K – $${(job.compensation_salary_max / 1000).toFixed(0)}K`;
    }
    return null;
  };

  const compensation = getCompensationDisplay();

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-semibold text-slate-900">
                {job.company_name}
              </span>
              {job.department && (
                <>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-600">{job.department}</span>
                </>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {compensation && (
                <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                  <DollarSign className="w-3 h-3 mr-1" />
                  {compensation}
                </Badge>
              )}
              {job.employment_type && (
                <Badge variant="outline">{job.employment_type}</Badge>
              )}
              <Badge variant="outline">
                {job.is_remote ? '🌐 Remote' : `📍 ${job.location || 'On-site'}`}
              </Badge>
            </div>
            {job.published_at && (
              <div className="text-sm text-slate-500">
                Posted {formatDate(job.published_at)}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <a 
          href={job.job_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          Apply Now
          <ExternalLink className="w-4 h-4" />
        </a>
      </CardContent>
    </Card>
  );
};