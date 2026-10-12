import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Image, Link as LinkIcon, Type, Tag, Layout } from 'lucide-react';
import { useStore } from '../store';
import { generateId } from '../utils';
import type { Pin } from '../types';

export default function CreatePinModal() {
  const store = useStore();
  const { isCreateModalOpen, setCreateModalOpen, theme, user, addPin, boards, isAuthenticated } = store;
  const isDark = theme.mode === 'dark';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [link, setLink] = useState('');
  const [alt, setAlt] = useState('');
  const [uploading, setUploading] = useState(false);

  if (!isAuthenticated) return null;

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    if (file.size > 20 * 1024 * 1024) {
      alert('File size must be under 20MB');
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imagePreview) return;

    setUploading(true);
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newPin: Pin = {
      id: generateId(),
      title: title.trim(),
      description: description.trim(),
      imageUrl: imagePreview,
      imageWidth: 600,
      imageHeight: 800,
      thumbnailUrl: imagePreview,
      alt: alt.trim() || title.trim(),
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      sourceUrl: link.trim() || undefined,
      type: 'image',
      authorId: user!.id,
      author: user!,
      boardId: selectedBoard || undefined,
      savesCount: 0,
      commentsCount: 0,
      reactionsCount: 0,
      isSaved: false,
      isReacted: false,
      isFromSearch: false,
      createdAt: new Date().toISOString(),
    };

    addPin(newPin);
    setUploading(false);
    setCreateModalOpen(false);
    // Reset form
    setTitle(''); setDescription(''); setTags(''); setSelectedBoard('');
    setImagePreview(null); setImageFile(null); setLink(''); setAlt('');
  };

  return (
    <AnimatePresence>
      {isCreateModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setCreateModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className={`w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl ${isDark ? 'bg-gray-900' : 'bg-white'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
              <h2 className="text-lg font-bold">Create Pin</h2>
              <button onClick={() => setCreateModalOpen(false)} className={`p-2 rounded-full ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Image Upload */}
                <div className="md:w-1/2">
                  {imagePreview ? (
                    <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img src={imagePreview} alt="Preview" className="w-full h-auto max-h-96 object-contain rounded-2xl" />
                      <button
                        type="button"
                        onClick={() => { setImagePreview(null); setImageFile(null); }}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer transition-colors ${isDark ? 'border-gray-700 hover:border-gray-600' : 'border-gray-300 hover:border-gray-400'}`}
                    >
                      <Upload className="w-10 h-10 text-gray-400 mb-3" />
                      <p className="font-medium text-sm mb-1">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 20MB</p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>

                {/* Form Fields */}
                <div className="md:w-1/2 space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Title *</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Give your pin a title"
                      className={`w-full rounded-xl border px-4 py-3 text-sm ${isDark ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-200 bg-gray-50'}`}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Tell everyone what your pin is about"
                      rows={3}
                      className={`w-full rounded-xl border px-4 py-3 text-sm resize-none ${isDark ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-200 bg-gray-50'}`}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Alt text</label>
                    <input
                      type="text"
                      value={alt}
                      onChange={(e) => setAlt(e.target.value)}
                      placeholder="Describe this image for accessibility"
                      className={`w-full rounded-xl border px-4 py-3 text-sm ${isDark ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-200 bg-gray-50'}`}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Link</label>
                    <input
                      type="url"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      placeholder="Add a destination link"
                      className={`w-full rounded-xl border px-4 py-3 text-sm ${isDark ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-200 bg-gray-50'}`}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Tags</label>
                    <input
                      type="text"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="Add tags separated by commas"
                      className={`w-full rounded-xl border px-4 py-3 text-sm ${isDark ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-200 bg-gray-50'}`}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Board</label>
                    <select
                      value={selectedBoard}
                      onChange={(e) => setSelectedBoard(e.target.value)}
                      className={`w-full rounded-xl border px-4 py-3 text-sm ${isDark ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-200 bg-gray-50'}`}
                    >
                      <option value="">Select a board</option>
                      {boards.map(board => (
                        <option key={board.id} value={board.id}>{board.name}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={!title.trim() || !imagePreview || uploading}
                    className="w-full py-3 rounded-full font-bold text-white text-sm transition-opacity disabled:opacity-50"
                    style={{ backgroundColor: theme.accentColor }}
                  >
                    {uploading ? 'Publishing...' : 'Publish'}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
