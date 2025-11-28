import React from 'react';
import { Book } from '../types';
import { Trash2 } from 'lucide-react';
import { Button } from './Button';

interface BookCardProps {
  book: Book;
  isAdmin: boolean;
  onRemove: (id: string) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, isAdmin, onRemove }) => {
  return (
    <div className="group relative bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Cover Image */}
      <div className="aspect-[2/3] w-full bg-stone-200 relative overflow-hidden">
        <img 
          src={book.coverUrl} 
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {isAdmin && (
            <button
                onClick={() => onRemove(book.id)}
                className="absolute top-2 right-2 bg-red-500/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-md"
                title="Remove book"
            >
                <Trash2 size={16} />
            </button>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col h-[200px]">
        <div className="flex-1">
            <div className="text-xs font-semibold text-primary-600 mb-2 uppercase tracking-wider">{book.genre}</div>
            <h3 className="font-serif text-xl font-bold text-stone-900 leading-tight mb-1 line-clamp-2" title={book.title}>
            {book.title}
            </h3>
            <p className="text-stone-500 text-sm mb-3">{book.author}</p>
            <p className="text-stone-600 text-sm line-clamp-3 leading-relaxed">
            {book.description}
            </p>
        </div>
        
        <div className="pt-4 mt-auto border-t border-stone-100 flex items-center justify-between">
            <span className="font-bold text-lg text-stone-900">${book.price.toFixed(2)}</span>
            <Button variant="secondary" size="sm" className="!px-3 !py-1 text-xs">
                Details
            </Button>
        </div>
      </div>
    </div>
  );
};