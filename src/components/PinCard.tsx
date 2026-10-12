import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Bookmark, Share2, MoreHorizontal, Download, ExternalLink } from 'lucide-react';
import type { Pin } from '../types';
import { useStore } from '../store';
import { formatNumber } from '../utils';

interface PinCardProps {
  pin: Pin;
  onPinClick?: (pin: Pin) => void;
}

export default function PinCard({ pin, onPinClick }: PinCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [saved, setSaved] = useState(pin.isSaved);
  const store = useStore();
  const { theme, isAuthenticated } = store;
  const imgRef = useRef<HTMLImageElement>(null);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      store.setAuthModalOpen(true);
      return;
    }
    setSaved(!saved);
    if (saved) store.unsavePin(pin.id);
    else store.savePin(pin.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({ title: pin.title, url: window.location.href }).catch(() => {});
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = pin.imageUrl;
    link.download = `${pin.title}.jpg`;
    link.target = '_blank';
    link.click();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative cursor-pointer mb-4 break-inside-avoid"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        store.setSelectedPin(pin);
        onPinClick?.(pin);
      }}
    >
      {/* Image Container */}
      <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
        {/* Placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl"
            style={{ aspectRatio: `${pin.imageWidth}/${pin.imageHeight}` }}
          />
        )}

        {/* Image */}
        <img
          ref={imgRef}
          src={pin.imageUrl}
          alt={pin.alt || pin.title}
          loading="lazy"
          className={`w-full rounded-2xl transition-transform duration-300 ${isHovered ? 'scale-105' : 'scale-100'} ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ aspectRatio: `${pin.imageWidth}/${pin.imageHeight}` }}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-200 rounded-2xl flex flex-col justify-between p-3 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          {/* Top Actions */}
          <div className="flex justify-end gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-full font-bold text-sm text-white transition-colors"
              style={{ backgroundColor: saved ? '#333' : theme.accentColor }}
            >
              {saved ? 'Saved' : 'Save'}
            </button>
          </div>

          {/* Bottom Actions */}
          <div className="flex justify-between items-end">
            <div className="flex gap-1">
              {pin.sourceUrl && (
                <button
                  onClick={(e) => { e.stopPropagation(); window.open(pin.sourceUrl, '_blank'); }}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white backdrop-blur-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={handleDownload}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white backdrop-blur-sm"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={handleShare}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white backdrop-blur-sm"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Save to board dropdown */}
            <button
              onClick={(e) => { e.stopPropagation(); }}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white backdrop-blur-sm"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video/Audio indicator */}
        {pin.type === 'video' && (
          <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-0.5" />
          </div>
        )}
        {pin.type === 'audio' && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-black/50 text-white text-xs flex items-center gap-1">
            <span>🎵</span> Audio
          </div>
        )}
      </div>

      {/* Pin Info */}
      <div className="mt-2 px-1">
        <h3 className="font-semibold text-sm line-clamp-2">{pin.title}</h3>
        <div className="flex items-center gap-2 mt-1.5">
          <img src={pin.author.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
          <span className="text-xs text-gray-500 dark:text-gray-400 truncate">{pin.author.displayName}</span>
          {pin.author.isVerified && <span className="text-xs">✓</span>}
        </div>
        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-0.5">
            <Heart className="w-3 h-3" /> {formatNumber(pin.reactionsCount)}
          </span>
          <span>{formatNumber(pin.savesCount)} saves</span>
        </div>
      </div>
    </motion.div>
  );
}
