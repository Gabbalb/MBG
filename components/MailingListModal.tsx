import React from 'react';
import { X, Mail, Trash2 } from 'lucide-react';
import { Subscriber } from '../types';

interface MailingListModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscribers: Subscriber[];
  onRemove: (id: string) => void;
}

export const MailingListModal: React.FC<MailingListModalProps> = ({ isOpen, onClose, subscribers, onRemove }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[80vh]">
        <div className="flex items-center justify-between p-6 border-b border-stone-100 bg-stone-50">
          <div className="flex items-center gap-2">
            <Mail className="text-primary-600" size={24} />
            <h2 className="text-xl font-serif font-bold text-stone-900">Mailing List</h2>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-6">
            {subscribers.length === 0 ? (
                <div className="text-center text-stone-500 py-10">
                    No subscribers yet.
                </div>
            ) : (
                <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-stone-200">
                        <thead className="bg-stone-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-stone-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-stone-200">
                            {subscribers.map((sub) => (
                                <tr key={sub.id} className="hover:bg-stone-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-900">{sub.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">{new Date(sub.joinedAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button 
                                            onClick={() => onRemove(sub.id)}
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
        
        <div className="p-4 border-t border-stone-100 bg-stone-50 text-right">
             <span className="text-sm text-stone-500 mr-2">Total Subscribers: {subscribers.length}</span>
        </div>
      </div>
    </div>
  );
};