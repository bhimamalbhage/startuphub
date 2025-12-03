import { Startup, Job } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = {
  // Startups
  async getStartups(filters?: {
    industry?: string;
    stage?: string;
    location?: string;
    limit?: number;
  }): Promise<{ total: number; startups: Startup[] }> {
    const params = new URLSearchParams();
    if (filters?.industry) params.append('industry', filters.industry);
    if (filters?.stage) params.append('stage', filters.stage);
    if (filters?.location) params.append('location', filters.location);
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await fetch(`${API_URL}/api/startups?${params}`);
    if (!response.ok) throw new Error('Failed to fetch startups');
    return response.json();
  },

  async getStartup(id: number): Promise<Startup> {
    const response = await fetch(`${API_URL}/api/startups/${id}`);
    if (!response.ok) throw new Error('Failed to fetch startup');
    return response.json();
  },

  async searchStartups(query: string): Promise<{ total: number; startups: Startup[] }> {
    const response = await fetch(`${API_URL}/api/startups/search/${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search startups');
    return response.json();
  },

  async getStartupStats(): Promise<any> {
    const response = await fetch(`${API_URL}/api/startups/stats/overview`);
    if (!response.ok) throw new Error('Failed to fetch startup stats');
    return response.json();
  },

  // Jobs
  async getJobs(filters?: {
    company?: string;
    location?: string;
    title?: string;
    is_remote?: boolean;
    limit?: number;
  }): Promise<{ total: number; jobs: Job[] }> {
    const params = new URLSearchParams();
    if (filters?.company) params.append('company', filters.company);
    if (filters?.location) params.append('location', filters.location);
    if (filters?.title) params.append('title', filters.title);
    if (filters?.is_remote !== undefined) params.append('is_remote', filters.is_remote.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await fetch(`${API_URL}/api/startups/jobs/`);
    if (!response.ok) throw new Error('Failed to fetch jobs');
    return response.json();
  },

  async getJobsByCompany(companyName: string): Promise<{ total_jobs: number; jobs: Job[] }> {
    const response = await fetch(`${API_URL}/api/startups/jobs/companies/${encodeURIComponent(companyName)}`);
    if (!response.ok) throw new Error('Failed to fetch jobs for company');
    return response.json();
  },

  async getJobStats(): Promise<any> {
    const response = await fetch(`${API_URL}/api/startups/jobs/stats`);
    if (!response.ok) throw new Error('Failed to fetch job stats');
    return response.json();
  }
};