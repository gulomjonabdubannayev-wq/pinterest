import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Search, Plus, ArrowLeft } from 'lucide-react';
import { useStore } from '../store';
import { formatRelativeTime } from '../utils';

export default function MessagesPage() {
  const store = useStore();
  const { theme, conversations, isAuthenticated, user } = store;
  const isDark = theme.mode === 'dark';
  const [selectedConv, setSelectedConv] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Record<string, Array<{ id: string; text: string; senderId: string; time: string }>>>({});

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="text-6xl mb-4">💬</div>
        <h1 className="text-2xl font-bold mb-2">Messages</h1>
        <p className="text-gray-500 text-center max-w-md mb-4">Sign in to send and receive private messages.</p>
        <button
          onClick={() => store.setAuthModalOpen(true)}
          className="px-6 py-3 rounded-full font-bold text-white text-sm"
          style={{ backgroundColor: theme.accentColor }}
        >
          Sign in
        </button>
      </div>
    );
  }

  const currentConv = conversations.find(c => c.id === selectedConv);
  const convMessages = selectedConv ? (messages[selectedConv] || []) : [];

  const handleSend = () => {
    if (!messageText.trim() || !selectedConv) return;
    const newMsg = { id: Date.now().toString(), text: messageText, senderId: user!.id, time: new Date().toISOString() };
    setMessages(prev => ({
      ...prev,
      [selectedConv]: [...(prev[selectedConv] || []), newMsg]
    }));
    setMessageText('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>

      <div className={`flex rounded-2xl overflow-hidden border h-[70vh] ${isDark ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'}`}>
        {/* Conversation List */}
        <div className={`w-80 border-r flex flex-col ${isDark ? 'border-gray-800' : 'border-gray-200'} ${selectedConv ? 'hidden md:flex' : 'flex'}`}>
          <div className={`p-3 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className={`flex items-center rounded-full px-3 py-2 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <Search className="w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search messages..." className={`flex-1 bg-transparent border-none outline-none ml-2 text-sm ${isDark ? 'text-white' : ''}`} />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
              <div className="p-6 text-center text-gray-500 text-sm">
                <p>No conversations yet</p>
                <p className="text-xs mt-1">Start a conversation from a user's profile</p>
              </div>
            ) : (
              conversations.map(conv => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConv(conv.id)}
                  className={`w-full flex items-center gap-3 p-3 text-left transition-colors ${
                    selectedConv === conv.id
                      ? isDark ? 'bg-gray-800' : 'bg-gray-100'
                      : isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="relative">
                    <img src={conv.participants[0]?.avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
                    {conv.unreadCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-bold text-white flex items-center justify-center" style={{ backgroundColor: theme.accentColor }}>
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{conv.participants[0]?.displayName}</p>
                    <p className="text-xs text-gray-500 truncate">{conv.lastMessage?.text || 'No messages yet'}</p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Message Area */}
        <div className="flex-1 flex flex-col">
          {selectedConv && currentConv ? (
            <>
              {/* Header */}
              <div className={`flex items-center gap-3 p-4 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                <button onClick={() => setSelectedConv(null)} className="md:hidden p-1">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <img src={currentConv.participants[0]?.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-sm">{currentConv.participants[0]?.displayName}</p>
                  <p className="text-xs text-green-500">Online</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {convMessages.length === 0 && (
                  <div className="text-center text-gray-500 text-sm py-12">
                    <p>No messages yet</p>
                    <p className="text-xs mt-1">Say hello! 👋</p>
                  </div>
                )}
                {convMessages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
                      msg.senderId === user?.id
                        ? 'text-white'
                        : isDark ? 'bg-gray-800' : 'bg-gray-100'
                    }`} style={msg.senderId === user?.id ? { backgroundColor: theme.accentColor } : {}}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className={`p-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                <div className={`flex items-center rounded-full px-4 py-2 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..."
                    className={`flex-1 bg-transparent border-none outline-none text-sm ${isDark ? 'text-white' : ''}`}
                  />
                  <button onClick={handleSend} disabled={!messageText.trim()} className="ml-2 disabled:opacity-30">
                    <Send className="w-5 h-5" style={{ color: theme.accentColor }} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
              <div className="text-5xl mb-3">💬</div>
              <p className="font-medium">Select a conversation</p>
              <p className="text-sm">Choose from your existing conversations or start a new one</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
