import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Search, Plus, Bell, MessageCircle, User, Settings, Shield,
  LogOut, Moon, Sun, Menu, X, ChevronDown, Globe, Pin
} from 'lucide-react';
import { useStore } from '../store';
import { t } from '../i18n';
import { formatNumber } from '../utils';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const { user, isAuthenticated, theme, setTheme, notifications, settings } = store;
  const unreadCount = store.unreadCount();
  const isDark = theme.mode === 'dark';

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const navItems = [
    { icon: Home, label: t('nav.home', settings.language), path: '/', active: location.pathname === '/' },
    { icon: Search, label: t('nav.search', settings.language), path: '/search', active: location.pathname.startsWith('/search') },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Top Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-4 gap-2 border-b backdrop-blur-md ${isDark ? 'bg-gray-900/95 border-gray-800' : 'bg-white/95 border-gray-200'}`}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: theme.accentColor }}>
            <Pin className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg hidden sm:block" style={{ color: theme.accentColor }}>Pinova</span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-1 ml-4">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors ${
                item.active
                  ? isDark ? 'bg-white text-black' : 'bg-black text-white'
                  : isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Search Bar (Desktop) */}
        <div className="flex-1 max-w-3xl mx-4 hidden sm:block">
          <div className={`flex items-center rounded-full px-4 py-2 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder={t('search.placeholder', settings.language)}
              className={`flex-1 bg-transparent border-none outline-none ml-2 text-sm ${isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-500'}`}
              onFocus={() => navigate('/search')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const value = (e.target as HTMLInputElement).value;
                  if (value.trim()) navigate(`/search?q=${encodeURIComponent(value.trim())}`);
                }
              }}
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1 ml-auto">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme({ ...theme, mode: isDark ? 'light' : 'dark' })}
            className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {isAuthenticated ? (
            <>
              {/* Create Button */}
              <button
                onClick={() => store.setCreateModalOpen(true)}
                className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                aria-label={t('nav.create', settings.language)}
              >
                <Plus className="w-5 h-5" />
              </button>

              {/* Notifications */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  className={`p-2 rounded-full transition-colors relative ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                  aria-label={t('nav.notifications', settings.language)}
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-bold text-white flex items-center justify-center" style={{ backgroundColor: theme.accentColor }}>
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>
                <AnimatePresence>
                  {notifOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`absolute right-0 top-12 w-80 max-h-96 overflow-y-auto rounded-2xl shadow-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                    >
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="font-bold">{t('nav.notifications', settings.language)}</h3>
                        <button onClick={() => store.markAllNotificationsRead()} className="text-xs font-semibold" style={{ color: theme.accentColor }}>
                          Mark all read
                        </button>
                      </div>
                      {notifications.slice(0, 10).map(notif => (
                        <div
                          key={notif.id}
                          className={`p-3 border-b flex gap-3 items-start ${!notif.isRead ? (isDark ? 'bg-gray-750' : 'bg-blue-50/50') : ''} ${isDark ? 'border-gray-700' : 'border-gray-100'}`}
                          onClick={() => store.markNotificationRead(notif.id)}
                        >
                          <img src={notif.fromUser.avatar} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm">
                              <span className="font-semibold">{notif.fromUser.displayName}</span>{' '}
                              {notif.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">{formatRelative(notif.createdAt)}</p>
                          </div>
                          {!notif.isRead && <div className="w-2 h-2 rounded-full shrink-0 mt-2" style={{ backgroundColor: theme.accentColor }} />}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Messages */}
              <Link
                to="/messages"
                className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                aria-label={t('nav.messages', settings.language)}
              >
                <MessageCircle className="w-5 h-5" />
              </Link>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-1 p-1 rounded-full"
                >
                  <img src={user?.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                </button>
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`absolute right-0 top-12 w-64 rounded-2xl shadow-xl border overflow-hidden ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                    >
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <p className="font-bold">{user?.displayName}</p>
                        <p className="text-sm text-gray-500">@{user?.username}</p>
                      </div>
                      <div className="py-2">
                        {[
                          { icon: User, label: t('nav.profile', settings.language), path: '/profile' },
                          { icon: Settings, label: t('nav.settings', settings.language), path: '/settings' },
                          ...(user?.role === 'admin' || user?.role === 'owner' ? [{ icon: Shield, label: t('nav.admin', settings.language), path: '/admin' }] : []),
                        ].map(item => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-2 text-sm ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                            onClick={() => setProfileOpen(false)}
                          >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                          </Link>
                        ))}
                        <button
                          onClick={() => { store.logout(); setProfileOpen(false); navigate('/'); }}
                          className={`flex items-center gap-3 px-4 py-2 text-sm w-full text-left ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                        >
                          <LogOut className="w-4 h-4" />
                          {t('nav.logout', settings.language)}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <button
              onClick={() => store.setAuthModalOpen(true)}
              className="px-4 py-2 rounded-full font-semibold text-sm text-white"
              style={{ backgroundColor: theme.accentColor }}
            >
              {t('nav.login', settings.language)}
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-full ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className={`fixed inset-y-0 right-0 w-72 z-50 pt-16 px-4 ${isDark ? 'bg-gray-900' : 'bg-white'} shadow-xl md:hidden`}
          >
            <div className="py-4 space-y-1">
              {/* Mobile Search */}
              <div className={`flex items-center rounded-full px-4 py-2 mb-4 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('search.placeholder', settings.language)}
                  className={`flex-1 bg-transparent border-none outline-none ml-2 text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const value = (e.target as HTMLInputElement).value;
                      if (value.trim()) { navigate(`/search?q=${encodeURIComponent(value.trim())}`); setMobileMenuOpen(false); }
                    }
                  }}
                />
              </div>

              {[
                { icon: Home, label: t('nav.home', settings.language), path: '/' },
                { icon: Search, label: t('nav.search', settings.language), path: '/search' },
                { icon: User, label: t('nav.profile', settings.language), path: '/profile' },
                { icon: Settings, label: t('nav.settings', settings.language), path: '/settings' },
                ...(user?.role === 'admin' || user?.role === 'owner' ? [{ icon: Shield, label: t('nav.admin', settings.language), path: '/admin' }] : []),
              ].map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-16 min-h-screen">
        {children}
      </main>
    </div>
  );
}

function formatRelative(date: string): string {
  const now = Date.now();
  const then = new Date(date).getTime();
  const diff = now - then;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(date).toLocaleDateString();
}
