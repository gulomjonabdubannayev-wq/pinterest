// ============================================
// PINOVA PRO — Complete Type Definitions
// ============================================

export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatar: string;
  coverImage: string;
  bio: string;
  website: string;
  role: 'user' | 'moderator' | 'admin' | 'owner';
  isVerified: boolean;
  isPrivate: boolean;
  createdAt: string;
  followersCount: number;
  followingCount: number;
  pinsCount: number;
  boardsCount: number;
}

export interface Pin {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  thumbnailUrl: string;
  alt: string;
  tags: string[];
  sourceUrl?: string;
  type: 'image' | 'video' | 'audio';
  videoUrl?: string;
  audioUrl?: string;
  authorId: string;
  author: User;
  boardId?: string;
  savesCount: number;
  commentsCount: number;
  reactionsCount: number;
  isSaved: boolean;
  isReacted: boolean;
  isFromSearch: boolean;
  provider?: string;
  providerId?: string;
  createdAt: string;
}

export interface Board {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  isPrivate: boolean;
  pinCount: number;
  userId: string;
  createdAt: string;
  pins?: Pin[];
}

export interface Comment {
  id: string;
  text: string;
  pinId: string;
  authorId: string;
  author: User;
  parentId?: string;
  replies?: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface Reaction {
  id: string;
  pinId: string;
  userId: string;
  type: 'heart' | 'fire' | 'star' | 'idea';
  createdAt: string;
}

export interface Notification {
  id: string;
  type: 'follow' | 'comment' | 'reaction' | 'save' | 'mention' | 'message';
  message: string;
  fromUser: User;
  pinId?: string;
  isRead: boolean;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  imageUrl?: string;
  isRead: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: string;
}

export interface SearchResult {
  pins: Pin[];
  totalResults: number;
  totalPages: number;
  currentPage: number;
  query: string;
}

export interface SearchFilters {
  orientation?: 'landscape' | 'portrait' | 'squarish';
  color?: string;
  orderBy?: 'relevant' | 'latest';
  category?: string;
}

export interface Report {
  id: string;
  type: 'pin' | 'comment' | 'user' | 'message';
  targetId: string;
  reporterId: string;
  reason: string;
  details: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  createdAt: string;
}

export interface AdminStats {
  totalUsers: number;
  totalPins: number;
  totalBoards: number;
  totalComments: number;
  totalReports: number;
  activeUsersToday: number;
  newUsersThisWeek: number;
  searchQueriesToday: number;
  uploadsToday: number;
}

export interface AuditLog {
  id: string;
  action: string;
  userId: string;
  targetId?: string;
  details: string;
  createdAt: string;
}

export interface Theme {
  mode: 'light' | 'dark';
  accentColor: string;
}

export interface AppSettings {
  language: string;
  theme: Theme;
  notifications: {
    email: boolean;
    push: boolean;
    follows: boolean;
    comments: boolean;
    reactions: boolean;
    messages: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private';
    showEmail: boolean;
    showBoards: boolean;
    allowMessages: boolean;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

export type Orientation = 'landscape' | 'portrait' | 'squarish';
export type PinType = 'image' | 'video' | 'audio';
export type ReportStatus = 'pending' | 'reviewed' | 'resolved' | 'dismissed';
export type UserRole = 'user' | 'moderator' | 'admin' | 'owner';
