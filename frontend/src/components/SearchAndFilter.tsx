import React, { useState } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface FilterState {
  locations: string[];
  stages: string[];
  companySizes: string[];
}

interface AvailableFilters {
  locations: string[];
  stages: string[];
  companySizes: string[];
}

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  availableFilters: AvailableFilters;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  onSearchChange,
  filters,
  onFilterChange,
  availableFilters
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const activeFilterCount = [
    filters.locations.length,
    filters.stages.length,
    filters.companySizes.length
  ].reduce((a, b) => a + b, 0);

  const clearAllFilters = () => {
    onFilterChange({
      locations: [],
      stages: [],
      companySizes: []
    });
  };

  const toggleFilter = (category: keyof FilterState, value: string) => {
    const current = filters[category];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    
    onFilterChange({
      ...filters,
      [category]: updated
    });
  };

  return (
    <div className="mb-6 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search companies by name, description, industry..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Filter Toggle Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <Filter className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFilterCount}
            </Badge>
          )}
        </button>

        {activeFilterCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-slate-600 hover:text-slate-900 underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <Card className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Location Filter */}
            <div>
              <h3 className="font-semibold mb-3 text-slate-900">Location</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {availableFilters.locations.length > 0 ? (
                  availableFilters.locations.map(location => (
                    <label key={location} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.locations.includes(location)}
                        onChange={() => toggleFilter('locations', location)}
                        className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                      />
                      <span className="text-sm text-slate-700">{location}</span>
                    </label>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">No locations available</p>
                )}
              </div>
            </div>

            {/* Stage Filter */}
            <div>
              <h3 className="font-semibold mb-3 text-slate-900">Funding Stage</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {availableFilters.stages.length > 0 ? (
                  availableFilters.stages.map(stage => (
                    <label key={stage} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.stages.includes(stage)}
                        onChange={() => toggleFilter('stages', stage)}
                        className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                      />
                      <span className="text-sm text-slate-700">{stage}</span>
                    </label>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">No stages available</p>
                )}
              </div>
            </div>

            {/* Company Size Filter */}
            <div>
              <h3 className="font-semibold mb-3 text-slate-900">Team Size</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {availableFilters.companySizes.length > 0 ? (
                  availableFilters.companySizes.map(size => (
                    <label key={size} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.companySizes.includes(size)}
                        onChange={() => toggleFilter('companySizes', size)}
                        className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                      />
                      <span className="text-sm text-slate-700">{size}</span>
                    </label>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">No company sizes available</p>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};