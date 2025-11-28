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
    <div className="group relative bg-white rounded-lg shadow-sm border border-stone-100 overflow-hidden transition-all duration-300 hover:shadow-md h-full flex flex-col">
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
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(book.id);
                }}
                className="absolute top-2 right-2 bg-red-500/90 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-md"
                title="Remove book"
            >
                <Trash2 size={14} />
            </button>
        )}
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-grow">
        <div className="flex-1 min-h-[80px]">
            <div className="text-[10px] font-semibold text-primary-600 mb-1 uppercase tracking-wider truncate">{book.genre}</div>
            <h3 className="font-serif text-base font-bold text-stone-900 leading-tight mb-1 line-clamp-2" title={book.title}>
            {book.title}
            </h3>
            <p className="text-stone-500 text-xs truncate mb-2">{book.author}</p>
        </div>
        
        <div className="pt-2 mt-auto border-t border-stone-100 flex items-center justify-between">
            <span className="font-bold text-sm text-stone-900">${book.price.toFixed(2)}</span>
            <Button variant="secondary" size="sm" className="!px-2 !py-0.5 !text-[10px] h-6">
                Details
            </Button>
        </div>
      </div>
    </div>
  );
};