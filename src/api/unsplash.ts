// ============================================
// PINOVA PRO — Image API Client (Unsplash + Fallback)
// ============================================

import type { Pin, SearchFilters, User } from '../types';

const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY || '';
const PICSUM_BASE = 'https://picsum.photos';

// Generate a deterministic pseudo-random number from a seed
function seededRandom(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// Generate fallback pins using Picsum (no API key required)
function generateFallbackPins(query: string, page: number, perPage: number): Pin[] {
  const pins: Pin[] = [];
  const heights = [300, 350, 400, 450, 500, 550, 600, 320, 380, 420, 480, 360];
  const topics = ['nature', 'architecture', 'food', 'travel', 'art', 'technology', 'fashion', 'animals', 'sports', 'music'];

  for (let i = 0; i < perPage; i++) {
    const index = (page - 1) * perPage + i;
    const seed = `${query}-${index}-${page}`;
    const height = heights[index % heights.length];
    const topic = topics[index % topics.length];

    pins.push({
      id: `pin-fallback-${index}-${Date.now()}`,
      title: `${query.charAt(0).toUpperCase() + query.slice(1)} inspiration #${index + 1}`,
      description: `Beautiful ${topic} photography related to "${query}". Discover more amazing content on Pinova Pro.`,
      imageUrl: `${PICSUM_BASE}/seed/${seed}/600/${height}`,
      imageWidth: 600,
      imageHeight: height,
      thumbnailUrl: `${PICSUM_BASE}/seed/${seed}/300/${Math.round(height / 2)}`,
      alt: `${topic} photography - ${query}`,
      tags: [query, topic, 'inspiration', 'photography'],
      type: 'image',
      authorId: `author-${index % 10}`,
      author: generateFakeAuthor(index),
      savesCount: seededRandom(seed) % 500 + 10,
      commentsCount: seededRandom(seed + 'c') % 50,
      reactionsCount: seededRandom(seed + 'r') % 200 + 5,
      isSaved: false,
      isReacted: false,
      isFromSearch: true,
      provider: 'picsum',
      createdAt: new Date(Date.now() - index * 3600000).toISOString(),
    });
  }
  return pins;
}

function generateFakeAuthor(index: number): User {
  const names = ['Alex Chen', 'Sarah Miller', 'James Wilson', 'Emma Davis', 'Michael Brown', 'Olivia Taylor', 'David Anderson', 'Sophia Martinez', 'Daniel Thomas', 'Isabella Jackson'];
  const usernames = ['alex_creates', 'sarah_design', 'james_photo', 'emma_art', 'michael_travel', 'olivia_style', 'david_explore', 'sophia_creates', 'daniel_snap', 'isabella_art'];
  const nameIndex = index % names.length;

  return {
    id: `author-${nameIndex}`,
    username: usernames[nameIndex],
    displayName: names[nameIndex],
    email: '',
    avatar: `${PICSUM_BASE}/seed/author${nameIndex}/150/150`,
    coverImage: '',
    bio: 'Creative photographer & visual storyteller',
    website: '',
    role: 'user',
    isVerified: index % 3 === 0,
    isPrivate: false,
    createdAt: '2023-06-01T00:00:00Z',
    followersCount: seededRandom(`f${nameIndex}`) % 5000 + 100,
    followingCount: seededRandom(`fg${nameIndex}`) % 500 + 20,
    pinsCount: seededRandom(`p${nameIndex}`) % 300 + 50,
    boardsCount: seededRandom(`b${nameIndex}`) % 20 + 3,
  };
}

// Generate curated home feed pins
export function generateHomeFeedPins(page: number, perPage: number = 20): Pin[] {
  const categories = ['nature', 'architecture', 'food', 'travel', 'art', 'technology', 'fashion', 'animals', 'interior', 'photography', 'design', 'illustration'];
  const pins: Pin[] = [];

  for (let i = 0; i < perPage; i++) {
    const index = (page - 1) * perPage + i;
    const category = categories[index % categories.length];
    const seed = `home-${category}-${index}`;
    const heights = [300, 380, 420, 350, 500, 450, 320, 480, 360, 400, 520, 340];
    const height = heights[index % heights.length];

    pins.push({
      id: `pin-home-${index}`,
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} inspiration`,
      description: `Explore beautiful ${category} content curated for you on Pinova Pro.`,
      imageUrl: `${PICSUM_BASE}/seed/${seed}/600/${height}`,
      imageWidth: 600,
      imageHeight: height,
      thumbnailUrl: `${PICSUM_BASE}/seed/${seed}/300/${Math.round(height / 2)}`,
      alt: `${category} photography`,
      tags: [category, 'inspiration', 'pinova'],
      type: 'image',
      authorId: `author-${index % 10}`,
      author: generateFakeAuthor(index),
      savesCount: seededRandom(seed) % 1000 + 50,
      commentsCount: seededRandom(seed + 'c') % 80,
      reactionsCount: seededRandom(seed + 'r') % 500 + 20,
      isSaved: false,
      isReacted: false,
      isFromSearch: false,
      provider: 'picsum',
      createdAt: new Date(Date.now() - index * 1800000).toISOString(),
    });
  }
  return pins;
}

// Search images - uses Unsplash API if key available, otherwise fallback
export async function searchImages(
  query: string,
  page: number = 1,
  perPage: number = 20,
  filters: SearchFilters = {}
): Promise<{ pins: Pin[]; totalResults: number; totalPages: number }> {
  if (UNSPLASH_API_KEY) {
    try {
      const params = new URLSearchParams({
        query,
        page: page.toString(),
        per_page: perPage.toString(),
      });
      if (filters.orientation) params.set('orientation', filters.orientation);
      if (filters.orderBy) params.set('order_by', filters.orderBy === 'latest' ? 'latest' : 'relevant');
      if (filters.color) params.set('color', filters.color);

      const response = await fetch(`https://api.unsplash.com/search/photos?${params}`, {
        headers: { 'Authorization': `Client-ID ${UNSPLASH_API_KEY}` }
      });

      if (!response.ok) {
        if (response.status === 401) throw new Error('Invalid API key');
        if (response.status === 403) throw new Error('Rate limit exceeded');
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const pins: Pin[] = data.results.map((result: any, index: number) => ({
        id: `unsplash-${result.id}`,
        title: result.alt_description || result.description || 'Untitled',
        description: result.description || result.alt_description || '',
        imageUrl: result.urls.regular,
        imageWidth: result.width,
        imageHeight: result.height,
        thumbnailUrl: result.urls.small,
        alt: result.alt_description || 'Photo from Unsplash',
        tags: result.tags?.map((t: any) => t.title) || [],
        sourceUrl: result.links.html,
        type: 'image' as const,
        authorId: result.user.id,
        author: {
          id: result.user.id,
          username: result.user.username,
          displayName: result.user.name,
          email: '',
          avatar: result.user.profile_image.medium,
          coverImage: '',
          bio: result.user.bio || '',
          website: result.user.links?.html || '',
          role: 'user' as const,
          isVerified: false,
          isPrivate: false,
          createdAt: '',
          followersCount: result.user.followers_count || 0,
          followingCount: 0,
          pinsCount: result.user.total_photos || 0,
          boardsCount: 0,
        },
        savesCount: result.likes || 0,
        commentsCount: 0,
        reactionsCount: result.likes || 0,
        isSaved: false,
        isReacted: false,
        isFromSearch: true,
        provider: 'unsplash',
        providerId: result.id,
        createdAt: result.created_at,
      }));

      return {
        pins,
        totalResults: data.total,
        totalPages: data.total_pages,
      };
    } catch (error) {
      console.warn('Unsplash API error, using fallback:', error);
    }
  }

  // Fallback to Picsum
  const pins = generateFallbackPins(query, page, perPage);
  return {
    pins,
    totalResults: 500, // Simulated total for demo
    totalPages: 25,
  };
}

// Get trending topics
export function getTrendingTopics(): string[] {
  return [
    'Nature Photography', 'Minimalist Design', 'Home Decor', 'Street Food',
    'Travel Destinations', 'Digital Art', 'Fashion Trends', 'Architecture',
    'Sunset Photography', 'Interior Design', 'Wildlife', 'Urban Exploration',
    'Abstract Art', 'Vintage Style', 'Mountain Views', 'Ocean Waves'
  ];
}

// Get suggested searches
export function getSuggestions(query: string): string[] {
  const all = [
    'nature', 'architecture', 'food photography', 'travel', 'minimalist',
    'abstract art', 'vintage', 'modern design', 'street photography',
    'portrait', 'landscape', 'macro photography', 'urban', 'wildlife',
    'fashion', 'interior design', 'sunset', 'ocean', 'mountains', 'flowers'
  ];
  if (!query) return all.slice(0, 8);
  return all.filter(s => s.toLowerCase().includes(query.toLowerCase())).slice(0, 8);
}
