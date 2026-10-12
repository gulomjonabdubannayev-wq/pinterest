import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Bookmark, Share2, Download, ExternalLink, MoreHorizontal, Send, Flag } from 'lucide-react';
import { useStore } from '../store';
import { formatNumber, formatRelativeTime } from '../utils';
import type { Pin, Comment } from '../types';
import { generateId } from '../utils';

export default function PinDetail() {
  const store = useStore();
  const { selectedPin, setSelectedPin, theme, isAuthenticated, user, comments, addComment } = store;
  const isDark = theme.mode === 'dark';
  const [commentText, setCommentText] = useState('');
  const [saved, setSaved] = useState(selectedPin?.isSaved || false);
  const [reacted, setReacted] = useState(selectedPin?.isReacted || false);
  const [showReport, setShowReport] = useState(false);

  if (!selectedPin) return null;
  const pin = selectedPin;

  const pinComments = comments.filter(c => c.pinId === pin.id);

  const handleSave = () => {
    if (!isAuthenticated) { store.setAuthModalOpen(true); return; }
    setSaved(!saved);
    if (saved) store.unsavePin(pin.id);
    else store.savePin(pin.id);
  };

  const handleReact = () => {
    if (!isAuthenticated) { store.setAuthModalOpen(true); return; }
    setReacted(!reacted);
    store.reactToPin(pin.id);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !isAuthenticated || !user) return;
    const newComment: Comment = {
      id: generateId(),
      text: commentText,
      pinId: pin.id,
      authorId: user.id,
      author: user,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    addComment(newComment);
    setCommentText('');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: pin.title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pin.imageUrl;
    link.download = `${pin.title}.jpg`;
    link.target = '_blank';
    link.click();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
        onClick={() => setSelectedPin(null)}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className={`w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl ${isDark ? 'bg-gray-900' : 'bg-white'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="lg:w-3/5 relative bg-gray-100 dark:bg-gray-800 rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none overflow-hidden">
              <img
                src={pin.imageUrl}
                alt={pin.alt || pin.title}
                className="w-full h-auto max-h-[60vh] lg:max-h-[90vh] object-contain"
              />
              {pin.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center cursor-pointer hover:bg-black/70">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                  </div>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="lg:w-2/5 p-6 flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  <button onClick={handleShare} className={`p-2 rounded-full ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button onClick={handleDownload} className={`p-2 rounded-full ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                    <Download className="w-5 h-5" />
                  </button>
                  <button onClick={() => setShowReport(!showReport)} className={`p-2 rounded-full ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                    <Flag className="w-5 h-5" />
                  </button>
                </div>
                <button onClick={() => setSelectedPin(null)} className={`p-2 rounded-full ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Report panel */}
              {showReport && (
                <div className={`mb-4 p-4 rounded-xl border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                  <p className="text-sm font-medium mb-2">Report this pin</p>
                  <div className="space-y-2">
                    {['Spam or misleading', 'Hateful or abusive', 'Violence or harmful', 'Copyright violation', 'Other'].map(reason => (
                      <button key={reason} className={`block w-full text-left text-sm px-3 py-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                        {reason}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Title & Description */}
              <h1 className="text-2xl font-bold mb-2">{pin.title}</h1>
              {pin.description && <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{pin.description}</p>}

              {/* Tags */}
              {pin.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {pin.tags.slice(0, 5).map(tag => (
                    <span key={tag} className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Author */}
              <div className={`flex items-center gap-3 p-3 rounded-xl mb-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <img src={pin.author.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="font-semibold text-sm">{pin.author.displayName}</p>
                  <p className="text-xs text-gray-500">{formatNumber(pin.author.followersCount)} followers</p>
                </div>
                <button
                  className="px-4 py-1.5 rounded-full font-semibold text-sm"
                  style={{ backgroundColor: theme.accentColor, color: 'white' }}
                >
                  Follow
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" /> {formatNumber(pin.reactionsCount)}
                </span>
                <span>{formatNumber(pin.savesCount)} saves</span>
                <span>{pinComments.length} comments</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={handleReact}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-sm border transition-colors ${
                    reacted ? 'border-red-300 bg-red-50 text-red-600 dark:bg-red-900/20 dark:border-red-800' : isDark ? 'border-gray-700' : 'border-gray-200'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${reacted ? 'fill-current' : ''}`} />
                  {reacted ? 'Loved' : 'Love'}
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-3 rounded-full font-bold text-sm text-white"
                  style={{ backgroundColor: saved ? '#333' : theme.accentColor }}
                >
                  {saved ? 'Saved' : 'Save'}
                </button>
              </div>

              {/* Source link */}
              {pin.sourceUrl && (
                <a
                  href={pin.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-sm mb-4 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
                >
                  <ExternalLink className="w-4 h-4" />
                  View source
                </a>
              )}

              {/* Attribution */}
              {pin.isFromSearch && pin.provider && (
                <p className="text-xs text-gray-400 mb-4">
                  Image via {pin.provider === 'unsplash' ? 'Unsplash' : 'Picsum Photos'}
                  {pin.provider === 'unsplash' && ` • ${pin.author.displayName}`}
                </p>
              )}

              {/* Comments */}
              <div className="flex-1 border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="font-bold text-sm mb-3">Comments</h3>
                <div className="space-y-3 max-h-48 overflow-y-auto mb-4">
                  {pinComments.length === 0 && (
                    <p className="text-sm text-gray-500">No comments yet. Be the first!</p>
                  )}
                  {pinComments.map(comment => (
                    <div key={comment.id} className="flex gap-2">
                      <img src={comment.author.avatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0" />
                      <div>
                        <p className="text-sm">
                          <span className="font-semibold">{comment.author.displayName}</span>{' '}
                          {comment.text}
                        </p>
                        <p className="text-xs text-gray-500">{formatRelativeTime(comment.createdAt)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Comment input */}
                {isAuthenticated ? (
                  <form onSubmit={handleComment} className="flex gap-2">
                    <img src={user?.avatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0" />
                    <div className={`flex-1 flex items-center rounded-full px-3 py-2 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Add a comment..."
                        className={`flex-1 bg-transparent border-none outline-none text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}
                      />
                      <button type="submit" disabled={!commentText.trim()} className="ml-2 disabled:opacity-30">
                        <Send className="w-4 h-4" style={{ color: theme.accentColor }} />
                      </button>
                    </div>
                  </form>
                ) : (
                  <button onClick={() => store.setAuthModalOpen(true)} className="text-sm font-medium" style={{ color: theme.accentColor }}>
                    Log in to comment
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
