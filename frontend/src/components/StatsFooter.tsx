import React from 'react';
import { Startup, Job } from '../types';

interface StatsFooterProps {
  startups: Startup[];
  jobs: Job[];
}

export const StatsFooter: React.FC<StatsFooterProps> = ({ startups, jobs }) => {
  const totalFunding = startups.reduce((sum, s) => {
    const match = s.stage?.match(/\$(\d+\.?\d*)([MK])/);
    if (match) {
      const value = parseFloat(match[1]);
      const multiplier = match[2] === 'M' ? 1 : 0.001;
      return sum + (value * multiplier);
    }
    return sum;
  }, 0);

  const industries = [...new Set(startups.map(s => s.industry))].length;

  return (
    <div className="mt-8 p-4 bg-white rounded-lg border border-slate-200">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-slate-900">{startups.length}</div>
          <div className="text-sm text-slate-600">Startups Tracked</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-slate-900">{jobs.length}</div>
          <div className="text-sm text-slate-600">Open Positions</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-slate-900">
            ${totalFunding.toFixed(1)}M+
          </div>
          <div className="text-sm text-slate-600">Total Funding</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-slate-900">{industries}</div>
          <div className="text-sm text-slate-600">Industries</div>
        </div>
      </div>
    </div>
  );
};