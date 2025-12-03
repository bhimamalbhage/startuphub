import { useEffect, useState } from "react";
import { Search, Briefcase, MapPin, Building2, Filter, ExternalLink, Loader2, AlertCircle } from "lucide-react";

interface Job {
  title: string;
  company_name: string;
  location?: string | null;
  url?: string | null;
  applyUrl?: string | null;
  employmentType?: string | null;
  ats_platform?: string | null;
  department?: string | null;
  compensation?: any; // Nested object
  isRemote?: boolean;
  team?: string | null;
}

export default function JobsList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");

  // Fetch jobs
  useEffect(() => {
    fetch("http://localhost:8000/api/jobs")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch jobs");
        return res.json();
      })
      .then((data) => {
        const jobList = Array.isArray(data.jobs) ? data.jobs : [];
        setJobs(jobList);
        setFilteredJobs(jobList);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Unknown error");
        setLoading(false);
      });
  }, []);

  // Filter jobs
  useEffect(() => {
    let filtered = [...jobs];

    if (searchQuery) {
      filtered = filtered.filter(
        (job) =>
          job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.department?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (locationFilter) {
      filtered = filtered.filter((job) =>
        job.location?.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (companyFilter) {
      filtered = filtered.filter((job) =>
        job.company_name?.toLowerCase().includes(companyFilter.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  }, [searchQuery, locationFilter, companyFilter, jobs]);

  const uniqueLocations = Array.from(
    new Set(jobs.map((j) => j.location).filter(Boolean))
  );
  const uniqueCompanies = Array.from(
    new Set(jobs.map((j) => j.company_name).filter(Boolean))
  );

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600 text-lg">Loading amazing opportunities...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-center mb-2">Oops! Something went wrong</h2>
          <p className="text-slate-600 text-center mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Startup Jobs</h1>
              <p className="text-slate-600 mt-1">
                {filteredJobs.length} opportunities at top startups
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">
                {uniqueCompanies.length} Companies
              </span>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search jobs or companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none bg-white"
              >
                <option value="">All Locations</option>
                {uniqueLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none bg-white"
              >
                <option value="">All Companies</option>
                {uniqueCompanies.map((company) => (
                  <option key={company} value={company}>
                    {company}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {(searchQuery || locationFilter || companyFilter) && (
            <div className="mt-4 flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-500" />
              <span className="text-sm text-slate-600">
                Showing {filteredJobs.length} of {jobs.length} jobs
              </span>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setLocationFilter("");
                  setCompanyFilter("");
                }}
                className="ml-auto text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-16">
            <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No jobs found</h3>
            <p className="text-slate-600">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid gap-5">
            {filteredJobs.map((job, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-semibold text-slate-900 truncate">
                        {job.title || "Untitled Job"}
                      </h2>

                      <div className="flex items-center gap-2 mb-3 mt-2">
                        <Building2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="text-slate-700 font-medium">
                          {job.company_name || "Unknown Company"}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-4">
                        {job.location && (
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            <span>{job.location}</span>
                          </div>
                        )}
                        {job.department && (
                          <div className="flex items-center gap-1.5">
                            <Briefcase className="w-4 h-4 text-slate-400" />
                            <span>{job.department}</span>
                          </div>
                        )}
                      </div>

                      {job.compensation?.compensationTierSummary && (
                        <div className="mb-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-200">
                            💰 {job.compensation.compensationTierSummary}
                          </span>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {job.employmentType && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                            {job.employmentType}
                          </span>
                        )}
                        {job.isRemote && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                            Remote
                          </span>
                        )}
                        {job.ats_platform && job.ats_platform !== "custom" && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200">
                            via {job.ats_platform}
                          </span>
                        )}
                      </div>
                    </div>

                    <a
                      href={job.applyUrl ?? job.url ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium group-hover:scale-105 transform duration-200"
                    >
                      Apply
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-slate-900">{jobs.length}</div>
              <div className="text-sm text-slate-600">Total Jobs</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{uniqueCompanies.length}</div>
              <div className="text-sm text-slate-600">Companies</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{uniqueLocations.length}</div>
              <div className="text-sm text-slate-600">Locations</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">
                {jobs.filter(j => j.isRemote).length}
              </div>
              <div className="text-sm text-slate-600">Remote Jobs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
