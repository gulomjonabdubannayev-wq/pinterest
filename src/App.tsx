import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useStore } from './store';
import Layout from './components/Layout';
import AuthModal from './components/AuthModal';
import PinDetail from './components/PinDetail';
import CreatePinModal from './components/CreatePinModal';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import AdminPage from './pages/AdminPage';
import MessagesPage from './pages/MessagesPage';

function App() {
  const { theme, settings } = useStore();
  const isDark = theme.mode === 'dark';

  // Apply theme to document
  useEffect(() => {
    document.documentElement.style.setProperty('color-scheme', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  // Apply RTL if needed
  useEffect(() => {
    const rtlLangs = ['ar', 'he', 'fa', 'ur', 'ps', 'ku', 'sd', 'dv'];
    const isRtl = rtlLangs.includes(settings.language);
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = settings.language;
  }, [settings.language]);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/board/:id" element={<ProfilePage />} />
        </Routes>
      </Layout>

      {/* Global Modals */}
      <AuthModal />
      <PinDetail />
      <CreatePinModal />
    </BrowserRouter>
  );
}

export default App;
