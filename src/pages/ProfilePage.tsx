import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Share2, Grid3X3, Bookmark, Settings, ChevronDown } from 'lucide-react';
import { useStore } from '../store';
import { formatNumber } from '../utils';
import MasonryGrid from '../components/MasonryGrid';
import { generateHomeFeedPins } from '../api/unsplash';
import type { Pin } from '../types';

export default function ProfilePage() {
  const store = useStore();
  const { user, isAuthenticated, theme, boards, following } = store;
  const isDark = theme.mode === 'dark';
  const [activeTab, setActiveTab] = useState<'created' | 'saved' | 'boards'>('created');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ displayName: '', bio: '', website: '' });

  const currentUser = user || {
    id: 'guest',
    username: 'guest_user',
    displayName: 'Guest User',
    email: '',
    avatar: 'https://picsum.photos/seed/guest/150/150',
    coverImage: 'https://picsum.photos/seed/guestcover/1200/400',
    bio: 'Sign in to customize your profile',
    website: '',
    role: 'user' as const,
    isVerified: false,
    isPrivate: false,
    createdAt: '',
    followersCount: 0,
    followingCount: 0,
    pinsCount: 0,
    boardsCount: 0,
  };

  // Generate sample pins for display
  const [createdPins] = useState<Pin[]>(() => generateHomeFeedPins(1, 12).map(p => ({ ...p, authorId: currentUser.id, author: currentUser })));
  const [savedPins] = useState<Pin[]>(() => generateHomeFeedPins(2, 8).map(p => ({ ...p, isSaved: true })));

  const handleStartEdit = () => {
    setEditData({ displayName: currentUser.displayName, bio: currentUser.bio, website: currentUser.website });
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (user) {
      store.updateUser(editData);
    }
    setIsEditing(false);
  };

  return (
    <div className="pb-12">
      {/* Cover Image */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img src={currentUser.coverImage} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Profile Info */}
      <div className="max-w-3xl mx-auto px-4 -mt-16 relative">
        {/* Avatar */}
        <div className="flex items-end gap-4 mb-4">
          <img
            src={currentUser.avatar}
            alt=""
            className={`w-32 h-32 rounded-full object-cover border-4 ${isDark ? 'border-gray-900' : 'border-white'}`}
          />
          <div className="pb-2 flex gap-2">
            {isAuthenticated && (
              <button
                onClick={handleStartEdit}
                className={`px-5 py-2.5 rounded-full font-semibold text-sm ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                <Edit3 className="w-4 h-4 inline mr-1" /> Edit profile
              </button>
            )}
            <button className={`p-2.5 rounded-full ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Name & Stats */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{currentUser.displayName}</h1>
          <p className="text-gray-500 text-sm mt-1">@{currentUser.username}</p>
          {currentUser.bio && <p className="mt-2 text-sm max-w-lg">{currentUser.bio}</p>}
          {currentUser.website && (
            <a href={currentUser.website} target="_blank" rel="noopener noreferrer" className="text-sm font-medium mt-1 inline-block" style={{ color: theme.accentColor }}>
              {currentUser.website.replace(/^https?:\/\//, '')}
            </a>
          )}
          <div className="flex gap-4 mt-3 text-sm">
            <span><strong>{formatNumber(currentUser.followersCount)}</strong> <span className="text-gray-500">followers</span></span>
            <span><strong>{formatNumber(currentUser.followingCount || following.length)}</strong> <span className="text-gray-500">following</span></span>
          </div>
        </div>

        {/* Tabs */}
        <div className={`flex border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          {[
            { id: 'created' as const, label: 'Created', icon: Grid3X3 },
            { id: 'saved' as const, label: 'Saved', icon: Bookmark },
            { id: 'boards' as const, label: 'Boards', icon: Grid3X3 },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 font-semibold text-sm border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-current'
                  : 'border-transparent text-gray-500'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        {activeTab === 'created' && (
          <MasonryGrid pins={createdPins} hasMore={false} />
        )}
        {activeTab === 'saved' && (
          isAuthenticated ? (
            savedPins.length > 0 ? (
              <MasonryGrid pins={savedPins} hasMore={false} />
            ) : (
              <div className="text-center py-16 text-gray-500">
                <Bookmark className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-medium">No saved pins yet</p>
                <p className="text-sm">Start saving pins you love!</p>
              </div>
            )
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-4">Log in to see your saved pins</p>
              <button
                onClick={() => store.setAuthModalOpen(true)}
                className="px-6 py-3 rounded-full font-bold text-white text-sm"
                style={{ backgroundColor: theme.accentColor }}
              >
                Log in
              </button>
            </div>
          )
        )}
        {activeTab === 'boards' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Create new board */}
            {isAuthenticated && (
              <button
                onClick={() => {
                  const name = prompt('Board name:');
                  if (name) {
                    store.addBoard({
                      id: `board-${Date.now()}`,
                      name,
                      description: '',
                      coverImage: `https://picsum.photos/seed/${name}/400/300`,
                      isPrivate: false,
                      pinCount: 0,
                      userId: user!.id,
                      createdAt: new Date().toISOString(),
                    });
                  }
                }}
                className={`aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 ${isDark ? 'border-gray-700 hover:border-gray-600' : 'border-gray-300 hover:border-gray-400'}`}
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xl">+</div>
                <span className="text-sm font-medium">New board</span>
              </button>
            )}
            {boards.map(board => (
              <motion.div
                key={board.id}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer group"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img src={board.coverImage} alt={board.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-white font-bold text-sm truncate">{board.name}</h3>
                    <p className="text-white/80 text-xs">{board.pinCount} pins</p>
                  </div>
                  {board.isPrivate && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 flex items-center justify-center">
                      <Settings className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60" onClick={() => setIsEditing(false)}>
          <div className={`w-full max-w-md rounded-3xl p-6 ${isDark ? 'bg-gray-900' : 'bg-white'}`} onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Edit profile</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Display name</label>
                <input
                  type="text"
                  value={editData.displayName}
                  onChange={e => setEditData({ ...editData, displayName: e.target.value })}
                  className={`w-full rounded-xl border px-4 py-3 text-sm ${isDark ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-200'}`}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Bio</label>
                <textarea
                  value={editData.bio}
                  onChange={e => setEditData({ ...editData, bio: e.target.value })}
                  rows={3}
                  className={`w-full rounded-xl border px-4 py-3 text-sm resize-none ${isDark ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-200'}`}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Website</label>
                <input
                  type="url"
                  value={editData.website}
                  onChange={e => setEditData({ ...editData, website: e.target.value })}
                  className={`w-full rounded-xl border px-4 py-3 text-sm ${isDark ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-200'}`}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setIsEditing(false)} className={`flex-1 py-3 rounded-full font-semibold text-sm ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  Cancel
                </button>
                <button onClick={handleSaveEdit} className="flex-1 py-3 rounded-full font-bold text-white text-sm" style={{ backgroundColor: theme.accentColor }}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
