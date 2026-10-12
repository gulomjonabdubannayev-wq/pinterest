import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, X, Filter, SlidersHorizontal, Clock, TrendingUp } from 'lucide-react';
import MasonryGrid from '../components/MasonryGrid';
import { useStore } from '../store';
import { searchImages, getSuggestions, getTrendingTopics } from '../api/unsplash';
import type { Pin, SearchFilters } from '../types';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const store = useStore();
  const { theme, settings, searchHistory, addSearchHistory, clearSearchHistory } = store;
  const isDark = theme.mode === 'dark';

  const [query, setQuery] = useState(queryParam);
  const [pins, setPins] = useState<Pin[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const trendingTopics = getTrendingTopics();

  // Search on mount if query exists
  useEffect(() => {
    if (queryParam) {
      setQuery(queryParam);
      performSearch(queryParam, 1, true);
    }
  }, [queryParam]);

  const performSearch = async (searchQuery: string, pageNum: number, reset = false) => {
    if (!searchQuery.trim()) return;
    setLoading(true);

    try {
      const result = await searchImages(searchQuery, pageNum, 20, filters);
      if (reset) {
        setPins(result.pins);
      } else {
        setPins(prev => [...prev, ...result.pins]);
      }
      setTotalResults(result.totalResults);
      setHasMore(pageNum < result.totalPages);
    } catch (error) {
      console.error('Search error:', error);
    }

    setLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearchParams({ q: query.trim() });
    addSearchHistory(query.trim());
    setPage(1);
    performSearch(query.trim(), 1, true);
    setShowSuggestions(false);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    performSearch(query, nextPage);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setSuggestions(getSuggestions(value));
    setShowSuggestions(value.length > 0);
  };

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value || undefined }));
    if (query) {
      setPage(1);
      performSearch(query, 1, true);
    }
  };

  const colors = ['red', 'orange', 'yellow', 'green', 'teal', 'blue', 'purple', 'pink', 'black', 'white', 'gray'];

  return (
    <div className="pb-12">
      {/* Search Header */}
      <div className={`sticky top-16 z-30 border-b ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="max-w-3xl mx-auto px-4 py-4">
          <form onSubmit={handleSearch} className="relative">
            <div className={`flex items-center rounded-full px-5 py-3 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                onFocus={() => query && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder={settings.language === 'en' ? 'Search for ideas...' : 'Search...'}
                className={`flex-1 bg-transparent border-none outline-none ml-3 text-base ${isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-500'}`}
                autoFocus={!queryParam}
              />
              {query && (
                <button type="button" onClick={() => { setQuery(''); setPins([]); setShowSuggestions(false); }} className="p-1">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
              <button type="button" onClick={() => setShowFilters(!showFilters)} className={`ml-2 p-1.5 rounded-full ${showFilters ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && (
              <div className={`absolute top-full left-0 right-0 mt-2 rounded-2xl shadow-xl border overflow-hidden ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                {suggestions.length > 0 && (
                  <div className="p-2">
                    <p className="text-xs font-medium text-gray-500 px-3 py-1">Suggestions</p>
                    {suggestions.map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => { setQuery(s); setSearchParams({ q: s }); addSearchHistory(s); performSearch(s, 1, true); setShowSuggestions(false); }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                      >
                        <Search className="w-3 h-3 inline mr-2 text-gray-400" />
                        {s}
                      </button>
                    ))}
                  </div>
                )}
                {searchHistory.length > 0 && (
                  <div className={`p-2 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                    <div className="flex items-center justify-between px-3 py-1">
                      <p className="text-xs font-medium text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Recent
                      </p>
                      <button onClick={clearSearchHistory} className="text-xs text-gray-500 hover:underline">Clear</button>
                    </div>
                    {searchHistory.slice(0, 5).map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => { setQuery(s); setSearchParams({ q: s }); performSearch(s, 1, true); setShowSuggestions(false); }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                      >
                        <Clock className="w-3 h-3 inline mr-2 text-gray-400" />
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </form>

          {/* Filters */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-4 space-y-3 overflow-hidden"
            >
              {/* Orientation */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-medium text-gray-500">Orientation:</span>
                {['landscape', 'portrait', 'squarish'].map(o => (
                  <button
                    key={o}
                    onClick={() => handleFilterChange('orientation', filters.orientation === o ? '' : o)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      filters.orientation === o
                        ? 'text-white'
                        : isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
                    }`}
                    style={filters.orientation === o ? { backgroundColor: theme.accentColor } : {}}
                  >
                    {o}
                  </button>
                ))}
              </div>

              {/* Order */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-medium text-gray-500">Order:</span>
                {[{ value: 'relevant', label: 'Relevant' }, { value: 'latest', label: 'Latest' }].map(o => (
                  <button
                    key={o.value}
                    onClick={() => handleFilterChange('orderBy', filters.orderBy === o.value ? '' : o.value)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      filters.orderBy === o.value
                        ? 'text-white'
                        : isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
                    }`}
                    style={filters.orderBy === o.value ? { backgroundColor: theme.accentColor } : {}}
                  >
                    {o.label}
                  </button>
                ))}
              </div>

              {/* Colors */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-medium text-gray-500">Color:</span>
                {colors.map(c => (
                  <button
                    key={c}
                    onClick={() => handleFilterChange('color', filters.color === c ? '' : c)}
                    className={`w-6 h-6 rounded-full border-2 transition-transform ${filters.color === c ? 'scale-125 border-gray-900 dark:border-white' : 'border-transparent'}`}
                    style={{ backgroundColor: c === 'white' ? '#fff' : c === 'black' ? '#000' : c === 'gray' ? '#888' : c }}
                    title={c}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Results */}
      {query && pins.length > 0 && (
        <div className="px-4 pt-4">
          <p className="text-sm text-gray-500">
            {totalResults.toLocaleString()} results for "<span className="font-medium">{query}</span>"
          </p>
        </div>
      )}

      {/* Content */}
      {query ? (
        <div className="pt-4">
          <MasonryGrid
            pins={pins}
            loading={loading}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
          />
        </div>
      ) : (
        /* No query - show trending */
        <div className="px-4 pt-8">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" /> Trending now
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {trendingTopics.map((topic, i) => (
              <motion.button
                key={topic}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => { setQuery(topic); setSearchParams({ q: topic }); addSearchHistory(topic); performSearch(topic, 1, true); }}
                className={`relative rounded-2xl overflow-hidden aspect-[3/4] group ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}
              >
                <img
                  src={`https://picsum.photos/seed/${topic.replace(/\s/g, '')}/400/500`}
                  alt={topic}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <span className="text-white font-bold text-sm">{topic}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
