import React, { useState, useEffect, useMemo } from 'react';
import { Building2, Briefcase, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import { Header } from './components/Header';
import { CompaniesList } from './components/CompaniesList';
// import { JobsList } from './components/JobsList';
// import { StatsFooter } from './components/StatsFooter';
import { SearchAndFilter, FilterState } from './components/SearchAndFilter';
import { api } from './services/api';
import { Startup, Job } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('companies');
  const [startups, setStartups] = useState<Startup[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Search and Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    locations: [],
    stages: [],
    companySizes: []
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // const [startupsData, jobsData] = await Promise.all([
      //   api.getStartups({ limit: 100 }),
      //   api.getJobs({ limit: 200 })
      // ]);

      const [startupsData] = await Promise.all([
        api.getStartups({ limit: 100 }),
      ]);

      console.log("Fetched startups:", startupsData);
      
      setStartups(startupsData.startups);
      // setJobs(jobsData.jobs);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load data. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // Extract available filter options from data
  const availableFilters = useMemo(() => {
    const locations = new Set<string>();
    const stages = new Set<string>();
    const companySizes = new Set<string>();

    startups.forEach(startup => {
      if (startup.location) locations.add(startup.location);
      if (startup.stage) {
        // Normalize stage name - extract just the stage part (e.g., "Series A" from "$15M Series A")
        const stageMatch = startup.stage.match(/(Pre-Seed|Seed|Series [A-F])/i);
        if (stageMatch) {
          stages.add(stageMatch[1]);
        }
      }
      if (startup.company_size) companySizes.add(startup.company_size);
    });

    // Sort funding stages in logical order
    const stageOrder = ['Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C', 'Series D', 'Series E', 'Series F'];
    const sortedStages = Array.from(stages).sort((a, b) => {
      const indexA = stageOrder.indexOf(a);
      const indexB = stageOrder.indexOf(b);
      if (indexA === -1 && indexB === -1) return a.localeCompare(b);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });

    return {
      locations: Array.from(locations).sort(),
      stages: sortedStages,
      companySizes: Array.from(companySizes).sort()
    };
  }, [startups]);

  // Filter and search logic
  const filteredStartups = useMemo(() => {
    return startups.filter(startup => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        startup.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        startup.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        startup.industry?.toLowerCase().includes(searchQuery.toLowerCase());

      // Location filter
      const matchesLocation = filters.locations.length === 0 || 
        (startup.location && filters.locations.includes(startup.location));

      // Stage filter - normalize the stage from the data and compare
      const matchesStage = filters.stages.length === 0 || 
        (startup.stage && filters.stages.some(selectedStage => {
          // Extract stage from data (e.g., "Series A" from "$15M Series A")
          const stageMatch = startup.stage.match(/(Pre-Seed|Seed|Series [A-F])/i);
          return stageMatch && stageMatch[1] === selectedStage;
        }));

      // Company size filter
      const matchesSize = filters.companySizes.length === 0 || 
        (startup.company_size && filters.companySizes.includes(startup.company_size));

      return matchesSearch && matchesLocation && matchesStage && matchesSize;
    });
  }, [startups, searchQuery, filters]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-slate-700 mx-auto mb-4" />
          <div className="text-xl font-semibold text-slate-700">Loading StartupHub...</div>
          <div className="text-sm text-slate-500 mt-2">Fetching startups and jobs</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription className="text-center">
            <p className="font-semibold mb-2">{error}</p>
            <button 
              onClick={loadData}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Header />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
            <TabsTrigger value="companies" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Recently Funded ({filteredStartups.length})
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Latest Jobs ({jobs.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="companies">
            {/* Search and Filter */}
            <SearchAndFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filters={filters}
              onFilterChange={setFilters}
              availableFilters={availableFilters}
            />

            {/* Results Count */}
            <div className="mb-4 text-sm text-slate-600">
              Showing {filteredStartups.length} of {startups.length} companies
            </div>

            {/* Companies List */}
            {filteredStartups.length > 0 ? (
              <CompaniesList companies={filteredStartups} />
            ) : (
              <Card className="p-12">
                <div className="text-center">
                  <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No companies found</h3>
                  <p className="text-slate-600 mb-4">Try adjusting your search or filters</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setFilters({ locations: [], stages: [], companySizes: [] });
                    }}
                    className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="jobs">
            {/* {jobs.length > 0 ? (
              <JobsList jobs={jobs} />
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-600">No jobs found</p>
              </div>
            )} */}
            Coming Soon...
          </TabsContent>
        </Tabs>

        {/* <StatsFooter startups={startups} jobs={jobs} /> */}
      </div>
    </div>
  );
}

export default App;