import React, { useState, useRef } from 'react';
import { X, Sparkles, BookOpen, User, DollarSign, Image as ImageIcon, Tag, Upload } from 'lucide-react';
import { Button } from './Button';
import { BookFormData } from '../types';
import { generateBookDetails } from '../services/geminiService';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBook: (book: BookFormData) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, onAddBook }) => {
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    price: '',
    description: '',
    coverUrl: '',
    genre: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('url');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, coverUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAutoFill = async () => {
    if (!formData.title) return;
    
    setIsGenerating(true);
    try {
      const details = await generateBookDetails(formData.title, formData.author || 'Unknown Author');
      setFormData(prev => ({
        ...prev,
        description: details.description,
        genre: details.genre,
        price: details.suggestedPrice.toString(),
        // Only set random cover if currently empty
        coverUrl: prev.coverUrl || `https://picsum.photos/seed/${Math.random().toString(36).substring(7)}/400/600`
      }));
    } catch (error) {
      console.error("Failed to generate details", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = {
        ...formData,
        coverUrl: formData.coverUrl || `https://picsum.photos/seed/${Math.random()}/400/600`
    };
    onAddBook(finalData);
    setFormData({ title: '', author: '', price: '', description: '', coverUrl: '', genre: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-stone-100 bg-stone-50">
          <h2 className="text-xl font-serif font-bold text-stone-900">Add New Book</h2>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {/* Title & AI Button */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Book Title</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BookOpen className="h-4 w-4 text-stone-400" />
                </div>
                <input
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="pl-10 w-full rounded-lg border border-stone-300 px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g. The Great Gatsby"
                />
            </div>
            {formData.title.length > 3 && (
                <button
                    type="button"
                    onClick={handleAutoFill}
                    disabled={isGenerating}
                    className="mt-2 text-xs flex items-center gap-1.5 text-primary-600 font-medium hover:text-primary-700 transition-colors disabled:opacity-50"
                >
                    {isGenerating ? (
                        <span className="flex items-center gap-1">Generating...</span>
                    ) : (
                        <>
                            <Sparkles size={14} />
                            Auto-fill details with AI
                        </>
                    )}
                </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Author</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-stone-400" />
                </div>
                <input
                  name="author"
                  required
                  value={formData.author}
                  onChange={handleChange}
                  className="pl-10 w-full rounded-lg border border-stone-300 px-4 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="Author Name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Price ($)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-4 w-4 text-stone-400" />
                </div>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  className="pl-10 w-full rounded-lg border border-stone-300 px-4 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Genre</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Tag className="h-4 w-4 text-stone-400" />
                    </div>
                    <input
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    className="pl-10 w-full rounded-lg border border-stone-300 px-4 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="Fiction, Mystery..."
                    />
                </div>
             </div>
             
             {/* Cover Selection */}
             <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-stone-700">Cover</label>
                  <div className="flex gap-2 text-[10px]">
                     <button 
                       type="button"
                       onClick={() => setUploadMode('url')}
                       className={`px-1.5 py-0.5 rounded ${uploadMode === 'url' ? 'bg-stone-200 text-stone-800' : 'text-stone-400'}`}
                     >
                       URL
                     </button>
                     <button 
                        type="button"
                        onClick={() => setUploadMode('file')}
                        className={`px-1.5 py-0.5 rounded ${uploadMode === 'file' ? 'bg-stone-200 text-stone-800' : 'text-stone-400'}`}
                      >
                       Upload
                     </button>
                  </div>
                </div>

                 {uploadMode === 'url' ? (
                   <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <ImageIcon className="h-4 w-4 text-stone-400" />
                      </div>
                      <input
                      name="coverUrl"
                      value={formData.coverUrl}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-lg border border-stone-300 px-4 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
                      placeholder="https://..."
                      />
                  </div>
                 ) : (
                   <div className="relative">
                       <input 
                         type="file" 
                         ref={fileInputRef}
                         onChange={handleFileChange}
                         accept="image/*"
                         className="hidden" 
                       />
                       <Button 
                         type="button" 
                         variant="secondary" 
                         className="w-full justify-start text-stone-500 font-normal"
                         onClick={() => fileInputRef.current?.click()}
                       >
                          <Upload size={16} className="mr-2" />
                          {formData.coverUrl && formData.coverUrl.startsWith('data:') ? 'Image Selected' : 'Choose File'}
                       </Button>
                   </div>
                 )}
             </div>
          </div>
          
          {formData.coverUrl && (
             <div className="w-full h-24 rounded-lg bg-stone-100 overflow-hidden relative border border-stone-200">
                 <img src={formData.coverUrl} alt="Preview" className="w-full h-full object-cover opacity-80" />
                 <span className="absolute bottom-1 right-2 text-xs bg-white/80 px-1 rounded text-stone-600">Preview</span>
             </div>
          )}

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
            <textarea
              name="description"
              required
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 focus:ring-2 focus:ring-primary-500 outline-none resize-none"
              placeholder="Brief summary of the book..."
            />
          </div>

          <div className="flex justify-end pt-2 gap-3">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary">Add to Collection</Button>
          </div>
        </form>
      </div>
    </div>
  );
};