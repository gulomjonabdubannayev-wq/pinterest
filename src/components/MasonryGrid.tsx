import React, { useEffect, useRef, useState } from 'react';
import PinCard from './PinCard';
import type { Pin } from '../types';
import { Loader2 } from 'lucide-react';

interface MasonryGridProps {
  pins: Pin[];
  loading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  columns?: { default: number; sm: number; md: number; lg: number; xl: number };
}

export default function MasonryGrid({ pins, loading = false, hasMore = true, onLoadMore, columns }: MasonryGridProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [visiblePins, setVisiblePins] = useState<Pin[]>([]);

  useEffect(() => {
    setVisiblePins(pins);
  }, [pins]);

  // Infinite scroll observer
  useEffect(() => {
    if (!onLoadMore || !hasMore) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          onLoadMore();
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [onLoadMore, loading, hasMore]);

  const colClasses = 'columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-4 px-4';

  if (pins.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-lg font-medium">No pins found</p>
        <p className="text-sm mt-1">Try a different search term</p>
      </div>
    );
  }

  return (
    <div>
      <div className={colClasses}>
        {visiblePins.map((pin) => (
          <PinCard key={pin.id} pin={pin} />
        ))}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      )}

      {/* Load more trigger */}
      {hasMore && !loading && (
        <div ref={loadMoreRef} className="h-10 flex items-center justify-center">
          {onLoadMore && (
            <button
              onClick={onLoadMore}
              className="px-6 py-2 rounded-full font-semibold text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Load more
            </button>
          )}
        </div>
      )}

      {/* No more items */}
      {!hasMore && pins.length > 0 && (
        <div className="text-center py-8 text-gray-400 text-sm">
          You've seen everything! ✨
        </div>
      )}
    </div>
  );
}
