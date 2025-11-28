import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';
import { Button } from './Button';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password') {
        onLogin();
        setError('');
        setUsername('');
        setPassword('');
        onClose();
    } else {
        setError('Invalid credentials');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-stone-100 bg-stone-50">
          <h2 className="text-xl font-serif font-bold text-stone-900">Admin Login</h2>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && <div className="text-red-600 text-sm bg-red-50 p-2 rounded">{error}</div>}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-stone-300 px-4 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Password</label>
              <div className="relative">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-stone-300 px-4 py-2 pl-10 focus:ring-2 focus:ring-primary-500 outline-none"
                />
                <Lock className="absolute left-3 top-2.5 text-stone-400" size={16} />
              </div>
            </div>
            <div className="pt-2">
                <Button type="submit" variant="primary" className="w-full">Sign In</Button>
            </div>
        </form>
      </div>
    </div>
  );
};