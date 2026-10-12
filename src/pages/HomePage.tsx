import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Sparkles, Users } from 'lucide-react';
import MasonryGrid from '../components/MasonryGrid';
import { useStore } from '../store';
import { generateHomeFeedPins } from '../api/unsplash';
import { getTrendingTopics } from '../api/unsplash';
import type { Pin } from '../types';

export default function HomePage() {
  const store = useStore();
  const { theme, isAuthenticated } = store;
  const isDark = theme.mode === 'dark';
  const [activeTab, setActiveTab] = useState<'foryou' | 'trending' | 'following'>('foryou');
  const [pins, setPins] = useState<Pin[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const trendingTopics = getTrendingTopics();

  const loadPins = useCallback(async (pageNum: number, reset = false) => {
    setLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const newPins = generateHomeFeedPins(pageNum, 20);
    
    if (reset) {
      setPins(newPins);
    } else {
      setPins(prev => [...prev, ...newPins]);
    }
    setHasMore(pageNum < 10);
    setLoading(false);
  }, []);

  useEffect(() => {
    setPage(1);
    loadPins(1, true);
  }, [activeTab, loadPins]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadPins(nextPage);
  };

  const tabs = [
    { id: 'foryou' as const, label: 'For You', icon: Sparkles },
    { id: 'trending' as const, label: 'Trending', icon: TrendingUp },
    { id: 'following' as const, label: 'Following', icon: Users },
  ];

  return (
    <div className="pb-12">
      {/* Hero Section */}
      <div className={`px-4 py-8 text-center ${isDark ? 'bg-gradient-to-b from-gray-800 to-gray-900' : 'bg-gradient-to-b from-red-50 to-white'}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Get your daily dose of{' '}
            <span style={{ color: theme.accentColor }}>inspiration</span>
          </h1>
          <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto">
            Discover ideas for every interest. From home decor to travel, food to fashion.
          </p>
        </motion.div>

        {/* Trending Topics */}
        <div className="flex flex-wrap justify-center gap-2 mt-6 max-w-3xl mx-auto">
          {trendingTopics.slice(0, 8).map((topic, i) => (
            <motion.a
              key={topic}
              href={`/search?q=${encodeURIComponent(topic)}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-50 text-gray-700 shadow-sm'
              }`}
            >
              {topic}
            </motion.a>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className={`sticky top-16 z-30 border-b ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="flex justify-center gap-2 px-4 py-3">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-colors ${
                activeTab === tab.id
                  ? isDark ? 'bg-white text-black' : 'bg-black text-white'
                  : isDark ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Following Tab - requires auth */}
      {activeTab === 'following' && !isAuthenticated && (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="text-6xl mb-4">👥</div>
          <h2 className="text-xl font-bold mb-2">Follow people to see their pins</h2>
          <p className="text-gray-500 text-sm mb-4 text-center max-w-md">
            When you follow someone, their latest pins will appear here in your feed.
          </p>
          <button
            onClick={() => store.setAuthModalOpen(true)}
            className="px-6 py-3 rounded-full font-bold text-white text-sm"
            style={{ backgroundColor: theme.accentColor }}
          >
            Log in to get started
          </button>
        </div>
      )}

      {/* Feed */}
      {(activeTab !== 'following' || isAuthenticated) && (
        <div className="pt-6">
          <MasonryGrid
            pins={pins}
            loading={loading}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
          />
        </div>
      )}
    </div>
  );
}
