import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Pin, Board, Notification, Conversation, Theme, AppSettings, Comment } from '../types';

// ============================================
// PINOVA PRO — Global State Store
// ============================================

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;

  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;

  // Settings
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;

  // Pins
  pins: Pin[];
  addPin: (pin: Pin) => void;
  removePin: (id: string) => void;
  updatePin: (id: string, updates: Partial<Pin>) => void;
  savePin: (pinId: string) => void;
  unsavePin: (pinId: string) => void;
  reactToPin: (pinId: string) => void;

  // Boards
  boards: Board[];
  addBoard: (board: Board) => void;
  removeBoard: (id: string) => void;
  updateBoard: (id: string, updates: Partial<Board>) => void;
  addPinToBoard: (boardId: string, pinId: string) => void;

  // Notifications
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadCount: () => number;

  // Conversations
  conversations: Conversation[];
  addConversation: (conversation: Conversation) => void;

  // Comments
  comments: Comment[];
  addComment: (comment: Comment) => void;
  removeComment: (id: string) => void;

  // Search
  searchHistory: string[];
  addSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;

  // Following
  following: string[];
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
  isFollowing: (userId: string) => boolean;

  // UI State
  isAuthModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  isCreateModalOpen: boolean;
  setCreateModalOpen: (open: boolean) => void;
  selectedPin: Pin | null;
  setSelectedPin: (pin: Pin | null) => void;
  activeBoard: string | null;
  setActiveBoard: (boardId: string | null) => void;
}

const defaultUser: User = {
  id: 'user-1',
  username: 'demo_user',
  displayName: 'Demo User',
  email: 'demo@pinova.pro',
  avatar: 'https://picsum.photos/seed/avatar1/150/150',
  coverImage: 'https://picsum.photos/seed/cover1/1200/400',
  bio: 'Visual storyteller & creative explorer ✨',
  website: 'https://pinova.pro',
  role: 'admin',
  isVerified: true,
  isPrivate: false,
  createdAt: '2024-01-15T00:00:00Z',
  followersCount: 1247,
  followingCount: 89,
  pinsCount: 342,
  boardsCount: 12,
};

const defaultSettings: AppSettings = {
  language: 'en',
  theme: { mode: 'light', accentColor: '#e60023' },
  notifications: { email: true, push: true, follows: true, comments: true, reactions: true, messages: true },
  privacy: { profileVisibility: 'public', showEmail: false, showBoards: true, allowMessages: true },
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (updates) => set((state) => ({ user: state.user ? { ...state.user, ...updates } : null })),

      // Theme
      theme: { mode: 'light', accentColor: '#e60023' },
      setTheme: (theme) => set({ theme }),

      // Settings
      settings: defaultSettings,
      updateSettings: (updates) => set((state) => ({ settings: { ...state.settings, ...updates } })),

      // Pins
      pins: [],
      addPin: (pin) => set((state) => ({ pins: [pin, ...state.pins] })),
      removePin: (id) => set((state) => ({ pins: state.pins.filter(p => p.id !== id) })),
      updatePin: (id, updates) => set((state) => ({
        pins: state.pins.map(p => p.id === id ? { ...p, ...updates } : p)
      })),
      savePin: (pinId) => set((state) => ({
        pins: state.pins.map(p => p.id === pinId ? { ...p, isSaved: true, savesCount: p.savesCount + 1 } : p)
      })),
      unsavePin: (pinId) => set((state) => ({
        pins: state.pins.map(p => p.id === pinId ? { ...p, isSaved: false, savesCount: Math.max(0, p.savesCount - 1) } : p)
      })),
      reactToPin: (pinId) => set((state) => ({
        pins: state.pins.map(p => p.id === pinId ? {
          ...p,
          isReacted: !p.isReacted,
          reactionsCount: p.isReacted ? Math.max(0, p.reactionsCount - 1) : p.reactionsCount + 1
        } : p)
      })),

      // Boards
      boards: [
        { id: 'board-1', name: 'Inspiration', description: 'Daily inspiration collection', coverImage: 'https://picsum.photos/seed/board1/400/300', isPrivate: false, pinCount: 24, userId: 'user-1', createdAt: '2024-01-20T00:00:00Z' },
        { id: 'board-2', name: 'Travel', description: 'Places I want to visit', coverImage: 'https://picsum.photos/seed/board2/400/300', isPrivate: false, pinCount: 18, userId: 'user-1', createdAt: '2024-02-01T00:00:00Z' },
        { id: 'board-3', name: 'Design', description: 'UI/UX design references', coverImage: 'https://picsum.photos/seed/board3/400/300', isPrivate: false, pinCount: 31, userId: 'user-1', createdAt: '2024-02-15T00:00:00Z' },
        { id: 'board-4', name: 'Photography', description: 'Amazing photography', coverImage: 'https://picsum.photos/seed/board4/400/300', isPrivate: true, pinCount: 15, userId: 'user-1', createdAt: '2024-03-01T00:00:00Z' },
      ],
      addBoard: (board) => set((state) => ({ boards: [board, ...state.boards] })),
      removeBoard: (id) => set((state) => ({ boards: state.boards.filter(b => b.id !== id) })),
      updateBoard: (id, updates) => set((state) => ({
        boards: state.boards.map(b => b.id === id ? { ...b, ...updates } : b)
      })),
      addPinToBoard: (boardId, pinId) => set((state) => ({
        boards: state.boards.map(b => b.id === boardId ? { ...b, pinCount: b.pinCount + 1 } : b)
      })),

      // Notifications
      notifications: [
        { id: 'n1', type: 'follow', message: 'started following you', fromUser: { id: 'u2', username: 'sarah_design', displayName: 'Sarah Design', email: '', avatar: 'https://picsum.photos/seed/user2/150/150', coverImage: '', bio: '', website: '', role: 'user', isVerified: true, isPrivate: false, createdAt: '', followersCount: 500, followingCount: 120, pinsCount: 89, boardsCount: 5 }, isRead: false, createdAt: '2024-03-15T10:00:00Z' },
        { id: 'n2', type: 'reaction', message: 'loved your pin "Mountain Sunset"', fromUser: { id: 'u3', username: 'alex_photo', displayName: 'Alex Photography', email: '', avatar: 'https://picsum.photos/seed/user3/150/150', coverImage: '', bio: '', website: '', role: 'user', isVerified: false, isPrivate: false, createdAt: '', followersCount: 230, followingCount: 45, pinsCount: 156, boardsCount: 8 }, pinId: 'pin-1', isRead: false, createdAt: '2024-03-14T15:30:00Z' },
        { id: 'n3', type: 'comment', message: 'commented: "This is amazing!"', fromUser: { id: 'u4', username: 'mike_creates', displayName: 'Mike Creates', email: '', avatar: 'https://picsum.photos/seed/user4/150/150', coverImage: '', bio: '', website: '', role: 'user', isVerified: true, isPrivate: false, createdAt: '', followersCount: 1200, followingCount: 200, pinsCount: 445, boardsCount: 15 }, pinId: 'pin-2', isRead: true, createdAt: '2024-03-13T09:00:00Z' },
      ],
      addNotification: (notification) => set((state) => ({ notifications: [notification, ...state.notifications] })),
      markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => n.id === id ? { ...n, isRead: true } : n)
      })),
      markAllNotificationsRead: () => set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, isRead: true }))
      })),
      unreadCount: () => get().notifications.filter(n => !n.isRead).length,

      // Conversations
      conversations: [
        { id: 'conv-1', participants: [{ id: 'u2', username: 'sarah_design', displayName: 'Sarah Design', email: '', avatar: 'https://picsum.photos/seed/user2/150/150', coverImage: '', bio: '', website: '', role: 'user', isVerified: true, isPrivate: false, createdAt: '', followersCount: 500, followingCount: 120, pinsCount: 89, boardsCount: 5 }], lastMessage: { id: 'm1', conversationId: 'conv-1', senderId: 'u2', text: 'Love your latest collection!', isRead: false, createdAt: '2024-03-15T12:00:00Z' }, unreadCount: 2, updatedAt: '2024-03-15T12:00:00Z' },
      ],
      addConversation: (conversation) => set((state) => ({ conversations: [conversation, ...state.conversations] })),

      // Comments
      comments: [],
      addComment: (comment) => set((state) => ({ comments: [comment, ...state.comments] })),
      removeComment: (id) => set((state) => ({ comments: state.comments.filter(c => c.id !== id) })),

      // Search
      searchHistory: [],
      addSearchHistory: (query) => set((state) => ({
        searchHistory: [query, ...state.searchHistory.filter(q => q !== query)].slice(0, 20)
      })),
      clearSearchHistory: () => set({ searchHistory: [] }),

      // Following
      following: ['u2', 'u3'],
      followUser: (userId) => set((state) => ({ following: [...state.following, userId] })),
      unfollowUser: (userId) => set((state) => ({ following: state.following.filter(id => id !== userId) })),
      isFollowing: (userId) => get().following.includes(userId),

      // UI State
      isAuthModalOpen: false,
      setAuthModalOpen: (open) => set({ isAuthModalOpen: open }),
      isCreateModalOpen: false,
      setCreateModalOpen: (open) => set({ isCreateModalOpen: open }),
      selectedPin: null,
      setSelectedPin: (pin) => set({ selectedPin: pin }),
      activeBoard: null,
      setActiveBoard: (boardId) => set({ activeBoard: boardId }),
    }),
    {
      name: 'pinova-pro-store',
      partialize: (state) => ({
        theme: state.theme,
        settings: state.settings,
        searchHistory: state.searchHistory,
        following: state.following,
        boards: state.boards,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
