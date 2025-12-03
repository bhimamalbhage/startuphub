import React from 'react';
import { JobCard } from './JobCard';
import { Job } from '../types';

interface JobsListProps {
  jobs: Job[];
}

export const JobsList: React.FC<JobsListProps> = ({ jobs }) => {
  return (
    <div className="space-y-4">
      {jobs.map((job, index) => (
        <JobCard key={index} job={job} />
      ))}
    </div>
  );
};