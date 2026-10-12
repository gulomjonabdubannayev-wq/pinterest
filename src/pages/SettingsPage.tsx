import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Globe, Palette, Trash2, Moon, Sun, LogOut, ChevronRight } from 'lucide-react';
import { useStore } from '../store';
import { LANGUAGES, getLanguage } from '../i18n';
import { getAccentColors } from '../utils';

export default function SettingsPage() {
  const store = useStore();
  const { theme, setTheme, settings, updateSettings, user, isAuthenticated, logout } = store;
  const isDark = theme.mode === 'dark';
  const [activeSection, setActiveSection] = useState('account');
  const [showLangSearch, setShowLangSearch] = useState(false);
  const [langSearch, setLangSearch] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const sections = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'language', label: 'Language', icon: Globe },
  ];

  const filteredLangs = LANGUAGES.filter(l =>
    l.name.toLowerCase().includes(langSearch.toLowerCase()) ||
    l.nativeName.toLowerCase().includes(langSearch.toLowerCase()) ||
    l.code.toLowerCase().includes(langSearch.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <nav className="md:w-56 shrink-0">
          <div className="space-y-1">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
                    : isDark ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-50 text-gray-600'
                }`}
              >
                <section.icon className="w-4 h-4" />
                {section.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Account */}
          {activeSection === 'account' && (
            <div className="space-y-6">
              <div className={`rounded-2xl p-6 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h2 className="text-lg font-bold mb-4">Profile</h2>
                {isAuthenticated && user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <img src={user.avatar} alt="" className="w-16 h-16 rounded-full object-cover" />
                      <div>
                        <p className="font-bold">{user.displayName}</p>
                        <p className="text-sm text-gray-500">@{user.username}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Email</label>
                      <p className="text-sm text-gray-500">{user.email || 'Not set'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Role</label>
                      <p className="text-sm capitalize px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 inline-block">{user.role}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">Sign in to manage your account</p>
                    <button
                      onClick={() => store.setAuthModalOpen(true)}
                      className="px-6 py-3 rounded-full font-bold text-white text-sm"
                      style={{ backgroundColor: theme.accentColor }}
                    >
                      Sign in
                    </button>
                  </div>
                )}
              </div>

              {/* Danger Zone */}
              {isAuthenticated && (
                <div className={`rounded-2xl p-6 border ${isDark ? 'border-red-900 bg-red-900/10' : 'border-red-200 bg-red-50'}`}>
                  <h2 className="text-lg font-bold text-red-600 mb-2">Danger Zone</h2>
                  <p className="text-sm text-gray-500 mb-4">Permanently delete your account and all data.</p>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-4 py-2 rounded-full text-sm font-semibold border border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4 inline mr-1" /> Delete account
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Privacy */}
          {activeSection === 'privacy' && (
            <div className={`rounded-2xl p-6 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h2 className="text-lg font-bold mb-4">Privacy Settings</h2>
              <div className="space-y-4">
                {[
                  { key: 'profileVisibility', label: 'Private profile', desc: 'Only approved followers can see your content' },
                  { key: 'showEmail', label: 'Show email', desc: 'Display your email on your public profile' },
                  { key: 'showBoards', label: 'Show boards', desc: 'Make your boards visible to others' },
                  { key: 'allowMessages', label: 'Allow messages', desc: 'Let other users send you direct messages' },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => {
                        const current = (settings.privacy as any)[item.key];
                        updateSettings({
                          privacy: { ...settings.privacy, [item.key]: !current }
                        });
                      }}
                      className={`w-12 h-6 rounded-full transition-colors relative ${(settings.privacy as any)[item.key] ? '' : isDark ? 'bg-gray-700' : 'bg-gray-300'}`}
                      style={(settings.privacy as any)[item.key] ? { backgroundColor: theme.accentColor } : {}}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-transform ${(settings.privacy as any)[item.key] ? 'translate-x-6' : 'translate-x-0.5'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeSection === 'notifications' && (
            <div className={`rounded-2xl p-6 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h2 className="text-lg font-bold mb-4">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { key: 'email', label: 'Email notifications' },
                  { key: 'push', label: 'Push notifications' },
                  { key: 'follows', label: 'New followers' },
                  { key: 'comments', label: 'Comments on your pins' },
                  { key: 'reactions', label: 'Reactions to your pins' },
                  { key: 'messages', label: 'Direct messages' },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between">
                    <p className="font-medium text-sm">{item.label}</p>
                    <button
                      onClick={() => {
                        const current = (settings.notifications as any)[item.key];
                        updateSettings({
                          notifications: { ...settings.notifications, [item.key]: !current }
                        });
                      }}
                      className={`w-12 h-6 rounded-full transition-colors relative ${(settings.notifications as any)[item.key] ? '' : isDark ? 'bg-gray-700' : 'bg-gray-300'}`}
                      style={(settings.notifications as any)[item.key] ? { backgroundColor: theme.accentColor } : {}}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-transform ${(settings.notifications as any)[item.key] ? 'translate-x-6' : 'translate-x-0.5'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Appearance */}
          {activeSection === 'appearance' && (
            <div className="space-y-6">
              <div className={`rounded-2xl p-6 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h2 className="text-lg font-bold mb-4">Theme</h2>
                <div className="flex gap-3">
                  <button
                    onClick={() => setTheme({ ...theme, mode: 'light' })}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl border-2 transition-colors ${
                      theme.mode === 'light' ? 'border-current' : isDark ? 'border-gray-700' : 'border-gray-200'
                    }`}
                    style={theme.mode === 'light' ? { borderColor: theme.accentColor } : {}}
                  >
                    <Sun className="w-5 h-5" />
                    <span className="font-medium text-sm">Light</span>
                  </button>
                  <button
                    onClick={() => setTheme({ ...theme, mode: 'dark' })}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl border-2 transition-colors ${
                      theme.mode === 'dark' ? 'border-current' : isDark ? 'border-gray-700' : 'border-gray-200'
                    }`}
                    style={theme.mode === 'dark' ? { borderColor: theme.accentColor } : {}}
                  >
                    <Moon className="w-5 h-5" />
                    <span className="font-medium text-sm">Dark</span>
                  </button>
                </div>
              </div>

              <div className={`rounded-2xl p-6 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h2 className="text-lg font-bold mb-4">Accent Color</h2>
                <div className="flex flex-wrap gap-3">
                  {getAccentColors().map(color => (
                    <button
                      key={color.value}
                      onClick={() => setTheme({ ...theme, accentColor: color.value })}
                      className={`w-10 h-10 rounded-full transition-transform ${theme.accentColor === color.value ? 'scale-125 ring-2 ring-offset-2' : 'hover:scale-110'}`}
                      style={{ backgroundColor: color.value, outlineColor: color.value } as React.CSSProperties}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Language */}
          {activeSection === 'language' && (
            <div className={`rounded-2xl p-6 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h2 className="text-lg font-bold mb-2">Language</h2>
              <p className="text-sm text-gray-500 mb-4">
                {LANGUAGES.length} languages available. Translation completeness varies by language.
              </p>

              {/* Search */}
              <div className={`flex items-center rounded-xl px-4 py-2 mb-4 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                <Globe className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={langSearch}
                  onChange={(e) => setLangSearch(e.target.value)}
                  placeholder="Search languages..."
                  className={`flex-1 bg-transparent border-none outline-none ml-2 text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}
                />
              </div>

              {/* Language List */}
              <div className="max-h-96 overflow-y-auto space-y-1">
                {filteredLangs.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => updateSettings({ language: lang.code })}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-colors ${
                      settings.language === lang.code
                        ? isDark ? 'bg-gray-700' : 'bg-gray-200'
                        : isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{lang.nativeName}</span>
                      <span className="text-gray-500 text-xs">{lang.name}</span>
                      {lang.dir === 'rtl' && <span className="text-xs px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700">RTL</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${lang.completeness}%`, backgroundColor: theme.accentColor }} />
                      </div>
                      <span className="text-xs text-gray-500 w-8">{lang.completeness}%</span>
                      {settings.language === lang.code && <span style={{ color: theme.accentColor }}>✓</span>}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60" onClick={() => setShowDeleteConfirm(false)}>
          <div className={`w-full max-w-sm rounded-3xl p-6 ${isDark ? 'bg-gray-900' : 'bg-white'}`} onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-2">Delete account?</h2>
            <p className="text-sm text-gray-500 mb-6">This action cannot be undone. All your data will be permanently deleted.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteConfirm(false)} className={`flex-1 py-3 rounded-full font-semibold text-sm ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                Cancel
              </button>
              <button
                onClick={() => { logout(); setShowDeleteConfirm(false); }}
                className="flex-1 py-3 rounded-full font-bold text-white text-sm bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
