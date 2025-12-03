export interface Startup {
  id: number;
  name: string;
  description: string;
  location: string;
  stage: string;
  industry: string;
  work_type: string;
  company_size: string;
  logo_url: string;
  header_image_url?: string;
  website_url: string;
  jobs_url: string;
  company_url?: string;
  link?: string;
  funding_announcement?: string;
  funding_amount?: string;
  funding_round?: string;
  investors?: string[];
  scraped_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Compensation {
  compensationTierSummary?: string;
  scrapeableCompensationSalarySummary?: string;
}

export interface Job {
  id?: number;
  title: string;
  department?: string;
  team?: string;
  location?: string;
  is_remote: boolean;
  published_at?: string;
  employment_type?: string;
  job_url: string;
  apply_url?: string;
  compensation_summary?: string;
  compensation_salary_min?: number;
  compensation_salary_max?: number;
  company_name: string;
  company_jobs_url?: string;
  ats_platform?: string;
  scraped_at?: string;
  created_at?: string;
  updated_at?: string;
}