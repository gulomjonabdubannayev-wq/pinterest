import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, Image, Flag, Settings, TrendingUp, Activity, Shield, AlertTriangle, Eye, Ban, Check, X, Search } from 'lucide-react';
import { useStore } from '../store';
import { formatNumber } from '../utils';

export default function AdminPage() {
  const store = useStore();
  const { theme, user, isAuthenticated } = store;
  const isDark = theme.mode === 'dark';
  const [activeTab, setActiveTab] = useState('overview');

  // Check admin access
  if (!isAuthenticated || (user?.role !== 'admin' && user?.role !== 'owner')) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <Shield className="w-16 h-16 text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-gray-500 text-center max-w-md">You need admin privileges to access this page. Contact an administrator if you believe this is an error.</p>
      </div>
    );
  }

  // Mock admin data
  const stats = {
    totalUsers: 24567,
    totalPins: 156789,
    totalBoards: 45230,
    totalComments: 89432,
    totalReports: 234,
    activeUsersToday: 3421,
    newUsersThisWeek: 1247,
    searchQueriesToday: 12890,
    uploadsToday: 456,
  };

  const recentUsers = [
    { id: '1', username: 'sarah_design', displayName: 'Sarah Design', email: 'sarah@example.com', role: 'user', status: 'active', joined: '2024-03-15' },
    { id: '2', username: 'alex_photo', displayName: 'Alex Photography', email: 'alex@example.com', role: 'user', status: 'active', joined: '2024-03-14' },
    { id: '3', username: 'mike_creates', displayName: 'Mike Creates', email: 'mike@example.com', role: 'moderator', status: 'active', joined: '2024-03-13' },
    { id: '4', username: 'emma_art', displayName: 'Emma Art', email: 'emma@example.com', role: 'user', status: 'suspended', joined: '2024-03-12' },
    { id: '5', username: 'david_explore', displayName: 'David Explore', email: 'david@example.com', role: 'user', status: 'active', joined: '2024-03-11' },
  ];

  const reports = [
    { id: '1', type: 'pin', reason: 'Spam', target: 'Pin #4521', reporter: 'user_123', status: 'pending', date: '2024-03-15' },
    { id: '2', type: 'comment', reason: 'Harassment', target: 'Comment #892', reporter: 'user_456', status: 'pending', date: '2024-03-15' },
    { id: '3', type: 'user', reason: 'Fake account', target: '@spammer_bot', reporter: 'user_789', status: 'reviewed', date: '2024-03-14' },
    { id: '4', type: 'pin', reason: 'Copyright', target: 'Pin #3892', reporter: 'user_234', status: 'pending', date: '2024-03-14' },
    { id: '5', type: 'message', reason: 'Abuse', target: 'Message #1204', reporter: 'user_567', status: 'resolved', date: '2024-03-13' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'content', label: 'Content', icon: Image },
    { id: 'reports', label: 'Reports', icon: Flag },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const chartData = [
    { day: 'Mon', users: 320, pins: 450 },
    { day: 'Tue', users: 280, pins: 380 },
    { day: 'Wed', users: 410, pins: 520 },
    { day: 'Thu', users: 380, pins: 490 },
    { day: 'Fri', users: 520, pins: 610 },
    { day: 'Sat', users: 610, pins: 720 },
    { day: 'Sun', users: 480, pins: 580 },
  ];

  const maxVal = Math.max(...chartData.map(d => Math.max(d.users, d.pins)));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="w-8 h-8" style={{ color: theme.accentColor }} />
            Admin Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage your platform</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'}`}>
          <Activity className="w-3 h-3 inline mr-1" /> System Healthy
        </div>
      </div>

      {/* Tabs */}
      <div className={`flex gap-1 mb-8 overflow-x-auto pb-2 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Users', value: stats.totalUsers, icon: Users, color: '#3B82F6' },
              { label: 'Total Pins', value: stats.totalPins, icon: Image, color: '#10B981' },
              { label: 'Active Today', value: stats.activeUsersToday, icon: Activity, color: '#F59E0B' },
              { label: 'Open Reports', value: stats.totalReports, icon: Flag, color: '#EF4444' },
            ].map(stat => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-2xl p-5 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}20` }}>
                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                </div>
                <p className="text-2xl font-bold">{formatNumber(stat.value)}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          <div className={`rounded-2xl p-6 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <h2 className="text-lg font-bold mb-4">Weekly Activity</h2>
            <div className="flex items-end gap-3 h-48">
              {chartData.map((d, i) => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex gap-1 items-end h-40">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.users / maxVal) * 100}%` }}
                      transition={{ delay: i * 0.1 }}
                      className="flex-1 rounded-t-md"
                      style={{ backgroundColor: theme.accentColor, opacity: 0.7 }}
                    />
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.pins / maxVal) * 100}%` }}
                      transition={{ delay: i * 0.1 + 0.05 }}
                      className="flex-1 rounded-t-md bg-blue-400 opacity-70"
                    />
                  </div>
                  <span className="text-xs text-gray-500">{d.day}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-4 justify-center">
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: theme.accentColor, opacity: 0.7 }} /> Users
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <div className="w-3 h-3 rounded bg-blue-400 opacity-70" /> Pins
              </span>
            </div>
          </div>

          {/* Recent Activity */}
          <div className={`rounded-2xl p-6 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {[
                { action: 'New user registered', user: 'sarah_design', time: '2 min ago', type: 'user' },
                { action: 'Report submitted', user: 'mike_creates', time: '15 min ago', type: 'report' },
                { action: 'Pin uploaded', user: 'alex_photo', time: '32 min ago', type: 'pin' },
                { action: 'User suspended', user: 'admin', time: '1 hr ago', type: 'admin' },
                { action: 'Board created', user: 'emma_art', time: '2 hr ago', type: 'board' },
              ].map((activity, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'report' ? 'bg-red-100 text-red-600' :
                    activity.type === 'admin' ? 'bg-purple-100 text-purple-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {activity.type === 'report' ? <AlertTriangle className="w-4 h-4" /> :
                     activity.type === 'admin' ? <Shield className="w-4 h-4" /> :
                     <Activity className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm"><span className="font-medium">{activity.user}</span> — {activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className={`rounded-2xl overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h2 className="font-bold">User Management</h2>
            <div className={`flex items-center rounded-full px-3 py-1.5 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
              <Search className="w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search users..." className={`bg-transparent border-none outline-none ml-2 text-sm w-40 ${isDark ? 'text-white' : ''}`} />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={isDark ? 'bg-gray-900' : 'bg-white'}>
                  <th className="text-left px-4 py-3 font-medium">User</th>
                  <th className="text-left px-4 py-3 font-medium">Role</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-left px-4 py-3 font-medium">Joined</th>
                  <th className="text-left px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map(u => (
                  <tr key={u.id} className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <img src={`https://picsum.photos/seed/${u.username}/40/40`} alt="" className="w-8 h-8 rounded-full" />
                        <div>
                          <p className="font-medium">{u.displayName}</p>
                          <p className="text-xs text-gray-500">@{u.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        u.role === 'admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                        u.role === 'moderator' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                        'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                      }`}>{u.role}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        u.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>{u.status}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{u.joined}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        {u.status === 'active' ? (
                          <button className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600" title="Suspend">
                            <Ban className="w-4 h-4" />
                          </button>
                        ) : (
                          <button className="p-1.5 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/20 text-green-600" title="Restore">
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className={`rounded-2xl overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-bold">Content Reports</h2>
            <p className="text-sm text-gray-500 mt-1">{reports.filter(r => r.status === 'pending').length} pending reports</p>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {reports.map(report => (
              <div key={report.id} className="p-4 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  report.status === 'pending' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30' :
                  report.status === 'reviewed' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' :
                  'bg-green-100 text-green-600 dark:bg-green-900/30'
                }`}>
                  <Flag className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{report.reason} — {report.target}</p>
                  <p className="text-xs text-gray-500">Reported by {report.reporter} • {report.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    report.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    report.status === 'reviewed' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  }`}>{report.status}</span>
                  {report.status === 'pending' && (
                    <div className="flex gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/20 text-green-600" title="Approve">
                        <Check className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600" title="Dismiss">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content Tab */}
      {activeTab === 'content' && (
        <div className={`rounded-2xl p-6 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <h2 className="text-lg font-bold mb-4">Content Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Pins', value: stats.totalPins },
              { label: 'Total Boards', value: stats.totalBoards },
              { label: 'Comments', value: stats.totalComments },
              { label: 'Uploads Today', value: stats.uploadsToday },
            ].map(s => (
              <div key={s.label} className={`p-4 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                <p className="text-xl font-bold">{formatNumber(s.value)}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className={`rounded-2xl p-6 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <h2 className="text-lg font-bold mb-4">Platform Analytics</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Search Queries Today', value: stats.searchQueriesToday },
              { label: 'New Users This Week', value: stats.newUsersThisWeek },
              { label: 'Active Users Today', value: stats.activeUsersToday },
            ].map(s => (
              <div key={s.label} className={`p-4 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                <p className="text-xl font-bold">{formatNumber(s.value)}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
          <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
            <h3 className="font-medium text-sm mb-3">Audit Log (Last 5 actions)</h3>
            <div className="space-y-2">
              {[
                { action: 'User suspended: @spammer_bot', admin: 'admin', time: '1h ago' },
                { action: 'Report #5 resolved', admin: 'mod_mike', time: '2h ago' },
                { action: 'Feature flag updated: new_search=true', admin: 'admin', time: '3h ago' },
                { action: 'User role changed: @mike_creates → moderator', admin: 'owner', time: '5h ago' },
                { action: 'Content policy updated', admin: 'admin', time: '1d ago' },
              ].map((log, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <Activity className="w-3 h-3 text-gray-400" />
                  <span className="flex-1">{log.action}</span>
                  <span className="text-xs text-gray-500">{log.admin} • {log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className={`rounded-2xl p-6 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <h2 className="text-lg font-bold mb-4">Platform Settings</h2>
          <div className="space-y-4">
            {[
              { label: 'Maintenance Mode', desc: 'Temporarily disable the platform for maintenance', enabled: false },
              { label: 'User Registration', desc: 'Allow new users to create accounts', enabled: true },
              { label: 'Image Uploads', desc: 'Allow users to upload images', enabled: true },
              { label: 'Comments', desc: 'Allow comments on pins', enabled: true },
              { label: 'Direct Messages', desc: 'Allow private messaging between users', enabled: true },
            ].map(setting => (
              <div key={setting.label} className={`flex items-center justify-between p-4 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                <div>
                  <p className="font-medium text-sm">{setting.label}</p>
                  <p className="text-xs text-gray-500">{setting.desc}</p>
                </div>
                <button
                  className={`w-12 h-6 rounded-full transition-colors relative ${setting.enabled ? '' : isDark ? 'bg-gray-700' : 'bg-gray-300'}`}
                  style={setting.enabled ? { backgroundColor: theme.accentColor } : {}}
                >
                  <div className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-transform ${setting.enabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
