import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Phone, Eye, EyeOff, Pin } from 'lucide-react';
import { useStore } from '../store';
import { validateEmail } from '../utils';

export default function AuthModal() {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot' | 'phone'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const store = useStore();
  const { isAuthModalOpen, setAuthModalOpen, theme, login } = store;
  const isDark = theme.mode === 'dark';

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (mode === 'signup' && password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    // Simulate authentication
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    login({
      id: 'user-1',
      username: email.split('@')[0],
      displayName: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email,
      avatar: 'https://picsum.photos/seed/avatar1/150/150',
      coverImage: 'https://picsum.photos/seed/cover1/1200/400',
      bio: 'Visual storyteller & creative explorer ✨',
      website: 'https://pinova.pro',
      role: 'admin',
      isVerified: true,
      isPrivate: false,
      createdAt: new Date().toISOString(),
      followersCount: 1247,
      followingCount: 89,
      pinsCount: 342,
      boardsCount: 12,
    });
    setLoading(false);
    setAuthModalOpen(false);
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    setLoading(true);
    setError('');
    // In production, this would redirect to the OAuth provider
    // For demo, we simulate a successful login
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    login({
      id: 'user-oauth',
      username: `${provider}_user`,
      displayName: `${provider === 'google' ? 'Google' : 'GitHub'} User`,
      email: `user@${provider}.com`,
      avatar: `https://picsum.photos/seed/${provider}/150/150`,
      coverImage: 'https://picsum.photos/seed/cover2/1200/400',
      bio: `Signed in with ${provider}`,
      website: '',
      role: 'user',
      isVerified: true,
      isPrivate: false,
      createdAt: new Date().toISOString(),
      followersCount: 0,
      followingCount: 0,
      pinsCount: 0,
      boardsCount: 0,
    });
    setLoading(false);
    setAuthModalOpen(false);
  };

  const handlePhoneAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!phone || phone.length < 8) {
      setError('Please enter a valid phone number');
      return;
    }
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setOtpSent(true);
    setLoading(false);
  };

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('Please enter the 6-digit code');
      return;
    }
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    login({
      id: 'user-phone',
      username: 'phone_user',
      displayName: 'Phone User',
      email: '',
      avatar: 'https://picsum.photos/seed/phone/150/150',
      coverImage: 'https://picsum.photos/seed/cover3/1200/400',
      bio: 'Verified via phone',
      website: '',
      role: 'user',
      isVerified: true,
      isPrivate: false,
      createdAt: new Date().toISOString(),
      followersCount: 0,
      followingCount: 0,
      pinsCount: 0,
      boardsCount: 0,
    });
    setLoading(false);
    setAuthModalOpen(false);
  };

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setAuthModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`w-full max-w-md rounded-3xl p-8 shadow-2xl relative ${isDark ? 'bg-gray-900' : 'bg-white'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setAuthModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Logo */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: theme.accentColor }}>
                <Pin className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">
                {mode === 'login' && 'Welcome back'}
                {mode === 'signup' && 'Create your account'}
                {mode === 'forgot' && 'Reset password'}
                {mode === 'phone' && (otpSent ? 'Enter verification code' : 'Phone verification')}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {mode === 'login' && 'Log in to save and discover ideas'}
                {mode === 'signup' && 'Join Pinova Pro today'}
                {mode === 'forgot' && 'We\'ll send you a reset link'}
                {mode === 'phone' && !otpSent && 'Enter your phone number'}
                {mode === 'phone' && otpSent && `Code sent to ${phone}`}
              </p>
            </div>

            {/* OAuth Buttons */}
            {mode !== 'forgot' && mode !== 'phone' && (
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleOAuth('google')}
                  disabled={loading}
                  className={`w-full flex items-center justify-center gap-3 py-3 rounded-full border font-medium text-sm transition-colors ${isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-50'}`}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Continue with Google
                </button>
                <button
                  onClick={() => handleOAuth('github')}
                  disabled={loading}
                  className={`w-full flex items-center justify-center gap-3 py-3 rounded-full border font-medium text-sm transition-colors ${isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-50'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  Continue with GitHub
                </button>
                <button
                  onClick={() => setMode('phone')}
                  className={`w-full flex items-center justify-center gap-3 py-3 rounded-full border font-medium text-sm transition-colors ${isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-50'}`}
                >
                  <Phone className="w-5 h-5" />
                  Continue with phone
                </button>
              </div>
            )}

            {/* Divider */}
            {mode !== 'forgot' && mode !== 'phone' && (
              <div className="flex items-center gap-4 mb-6">
                <div className={`flex-1 h-px ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
                <span className="text-xs text-gray-500 font-medium">or</span>
                <div className={`flex-1 h-px ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
              </div>
            )}

            {/* Email Form */}
            {mode !== 'phone' && (
              <form onSubmit={mode === 'forgot' ? handleEmailAuth : handleEmailAuth} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Email</label>
                  <div className={`flex items-center rounded-xl border px-4 py-3 ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                    <Mail className="w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className={`flex-1 bg-transparent border-none outline-none ml-2 text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}
                      required
                    />
                  </div>
                </div>

                {mode !== 'forgot' && (
                  <div>
                    <label className="text-sm font-medium mb-1 block">Password</label>
                    <div className={`flex items-center rounded-xl border px-4 py-3 ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                      <Lock className="w-4 h-4 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className={`flex-1 bg-transparent border-none outline-none ml-2 text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}
                        required={mode === 'signup'}
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                      </button>
                    </div>
                  </div>
                )}

                {mode === 'login' && (
                  <button type="button" onClick={() => setMode('forgot')} className="text-sm font-medium text-right w-full" style={{ color: theme.accentColor }}>
                    Forgot password?
                  </button>
                )}

                {error && (
                  <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg p-3">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-full font-bold text-white text-sm transition-opacity disabled:opacity-50"
                  style={{ backgroundColor: theme.accentColor }}
                >
                  {loading ? 'Please wait...' : (
                    mode === 'login' ? 'Log in' :
                    mode === 'signup' ? 'Create account' :
                    'Send reset link'
                  )}
                </button>
              </form>
            )}

            {/* Phone Form */}
            {mode === 'phone' && !otpSent && (
              <form onSubmit={handlePhoneAuth} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Phone number</label>
                  <div className={`flex items-center rounded-xl border px-4 py-3 ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                    <Phone className="w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className={`flex-1 bg-transparent border-none outline-none ml-2 text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}
                      required
                    />
                  </div>
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-full font-bold text-white text-sm disabled:opacity-50"
                  style={{ backgroundColor: theme.accentColor }}
                >
                  {loading ? 'Sending...' : 'Send code'}
                </button>
              </form>
            )}

            {/* OTP Form */}
            {mode === 'phone' && otpSent && (
              <form onSubmit={handleOtpVerify} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Verification code</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    className={`w-full rounded-xl border px-4 py-3 text-center text-lg font-mono tracking-widest ${isDark ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-200 bg-gray-50'}`}
                    required
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-full font-bold text-white text-sm disabled:opacity-50"
                  style={{ backgroundColor: theme.accentColor }}
                >
                  {loading ? 'Verifying...' : 'Verify'}
                </button>
                <button
                  type="button"
                  onClick={() => { setOtpSent(false); setOtp(''); }}
                  className="w-full text-sm text-gray-500 hover:underline"
                >
                  Change phone number
                </button>
              </form>
            )}

            {/* Switch mode */}
            <div className="mt-6 text-center text-sm text-gray-500">
              {mode === 'login' && (
                <span>{store.settings.language === 'en' ? "Don't have an account? " : ''}
                  <button onClick={() => setMode('signup')} className="font-bold" style={{ color: theme.accentColor }}>Sign up</button>
                </span>
              )}
              {mode === 'signup' && (
                <span>Already have an account?{' '}
                  <button onClick={() => setMode('login')} className="font-bold" style={{ color: theme.accentColor }}>Log in</button>
                </span>
              )}
              {mode === 'forgot' && (
                <button onClick={() => setMode('login')} className="font-bold" style={{ color: theme.accentColor }}>Back to login</button>
              )}
              {mode === 'phone' && (
                <button onClick={() => { setMode('login'); setOtpSent(false); }} className="font-bold" style={{ color: theme.accentColor }}>Back to login</button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
