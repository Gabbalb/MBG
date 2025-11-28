import React from 'react';
import { X, User, Tag } from 'lucide-react';
import { Book } from '../types';
import { Button } from './Button';

interface BookDetailsModalProps {
  book: Book | null;
  onClose: () => void;
}

export const BookDetailsModal: React.FC<BookDetailsModalProps> = ({ book, onClose }) => {
  if (!book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button (Mobile) */}
        <button 
            onClick={onClose} 
            className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full md:hidden text-stone-500"
        >
            <X size={20} />
        </button>

        {/* Left: Image */}
        <div className="w-full md:w-2/5 bg-stone-100 relative">
            <img 
                src={book.coverUrl} 
                alt={book.title} 
                className="w-full h-64 md:h-full object-cover"
            />
        </div>

        {/* Right: Content */}
        <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col overflow-y-auto bg-white">
            <div className="flex justify-between items-start mb-2">
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    <Tag size={12} className="mr-1" />
                    {book.genre}
                </div>
                <button onClick={onClose} className="hidden md:block text-stone-400 hover:text-stone-600 transition-colors">
                    <X size={24} />
                </button>
            </div>

            <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mb-2 leading-tight">
                {book.title}
            </h2>
            
            <div className="flex items-center text-stone-500 mb-6 font-medium">
                <User size={16} className="mr-2" />
                {book.author}
            </div>

            <div className="prose prose-stone max-w-none mb-8 text-stone-600 leading-relaxed flex-grow">
                <p className="whitespace-pre-line">{book.description}</p>
            </div>

            <div className="border-t border-stone-100 pt-6 mt-auto flex items-center justify-between">
                <div>
                    <p className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Price</p>
                    <p className="text-2xl font-bold text-stone-900">${book.price.toFixed(2)}</p>
                </div>
                <Button onClick={onClose} variant="primary">
                    Close
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
};