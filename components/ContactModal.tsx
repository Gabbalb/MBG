import React, { useState } from 'react';
import { X, Send, Mail } from 'lucide-react';
import { Button } from './Button';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:owner@lumina.lib?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-stone-100 bg-stone-50">
          <h2 className="text-xl font-serif font-bold text-stone-900">Contact Us</h2>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
           <div className="bg-blue-50 text-blue-700 p-3 rounded-lg text-sm flex gap-2">
                <Mail size={16} className="shrink-0 mt-0.5" />
                <p>This will open your default email client to send a message to the library owner.</p>
           </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Subject</label>
              <input
                required
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Inquiry about..."
                className="w-full rounded-lg border border-stone-300 px-4 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Message</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help you?"
                className="w-full rounded-lg border border-stone-300 px-4 py-2 focus:ring-2 focus:ring-primary-500 outline-none resize-none"
              />
            </div>
            <div className="pt-2">
                <Button type="submit" variant="primary" className="w-full">
                    <Send size={16} className="mr-2" />
                    Send Email
                </Button>
            </div>
        </form>
      </div>
    </div>
  );
};