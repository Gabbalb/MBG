import React, { useState, useEffect, useRef } from 'react';
import { INITIAL_BOOKS } from './constants';
import { Book, BookFormData, Subscriber } from './types';
import { BookCard } from './components/BookCard';
import { AdminModal } from './components/AdminModal';
import { LoginModal } from './components/LoginModal';
import { ContactModal } from './components/ContactModal';
import { MailingListModal } from './components/MailingListModal';
import { Button } from './components/Button';
import { Library, Search, Plus, Menu, X, Facebook, Twitter, Instagram, Upload, Filter, LogOut, User, Mail, Send, ChevronRight } from 'lucide-react';

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMailingListOpen, setIsMailingListOpen] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  
  const csvInputRef = useRef<HTMLInputElement>(null);

  // Load books & subscribers
  useEffect(() => {
    const savedBooks = localStorage.getItem('lumina_library_books');
    const savedSubs = localStorage.getItem('lumina_library_subs');
    
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    } else {
      setBooks(INITIAL_BOOKS);
    }

    if (savedSubs) {
        setSubscribers(JSON.parse(savedSubs));
    }
  }, []);

  // Persist Data
  useEffect(() => {
    if (books.length > 0) localStorage.setItem('lumina_library_books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('lumina_library_subs', JSON.stringify(subscribers));
  }, [subscribers]);

  const handleAddBook = (formData: BookFormData) => {
    const newBook: Book = {
      id: Date.now().toString(),
      ...formData,
      price: parseFloat(formData.price),
    };
    setBooks(prev => [newBook, ...prev]);
  };

  const handleRemoveBook = (id: string) => {
    if (window.confirm("Are you sure you want to remove this book from the collection?")) {
        setBooks(prev => prev.filter(b => b.id !== id));
    }
  };

  // CSV Import Logic
  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const text = event.target?.result as string;
        // Simple CSV parser (Assumes format: Title,Author,Price,Genre,Description)
        const lines = text.split('\n');
        const newBooks: Book[] = [];
        
        // Skip header if present (simple check)
        const startIndex = lines[0].toLowerCase().includes('title') ? 1 : 0;

        for (let i = startIndex; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            // Handle quotes or simple comma split
            const parts = line.split(',');
            if (parts.length >= 4) {
                newBooks.push({
                    id: Date.now().toString() + i,
                    title: parts[0].trim(),
                    author: parts[1].trim(),
                    price: parseFloat(parts[2].trim()) || 0,
                    genre: parts[3].trim(),
                    description: parts.slice(4).join(',').trim() || "Imported via CSV",
                    coverUrl: `https://picsum.photos/seed/${Math.random()}/400/600` // Random cover for CSV imports
                });
            }
        }

        if (newBooks.length > 0) {
            setBooks(prev => [...newBooks, ...prev]);
            alert(`Successfully imported ${newBooks.length} books.`);
        } else {
            alert("No valid books found in CSV.");
        }
    };
    reader.readAsText(file);
    // Reset input
    if (csvInputRef.current) csvInputRef.current.value = '';
  };

  // Filter Logic
  const allGenres = ['All', ...Array.from(new Set(books.map(b => b.genre)))];

  const filteredBooks = books.filter(book => {
    const matchesSearch = 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  // Mailing List Logic
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    if (subscribers.some(s => s.email === newsletterEmail)) {
        alert("You are already subscribed!");
        return;
    }
    const newSub: Subscriber = {
        id: Date.now().toString(),
        email: newsletterEmail,
        joinedAt: new Date().toISOString()
    };
    setSubscribers(prev => [...prev, newSub]);
    setNewsletterEmail('');
    alert("Thanks for subscribing!");
  };

  const handleRemoveSubscriber = (id: string) => {
      setSubscribers(prev => prev.filter(s => s.id !== id));
  };

  const handleLogout = () => {
      setIsAdmin(false);
      setIsMobileMenuOpen(false);
  };

  // Group books by genre for the carousel view
  const booksByGenre = React.useMemo(() => {
    const groups: { [key: string]: Book[] } = {};
    books.forEach(book => {
        if (!groups[book.genre]) {
            groups[book.genre] = [];
        }
        groups[book.genre].push(book);
    });
    return groups;
  }, [books]);

  const showCarousels = searchQuery === '' && selectedGenre === 'All';

  return (
    <div className="min-h-screen flex flex-col font-sans text-stone-800">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-primary-600 p-2 rounded-lg text-white">
                <Library size={24} />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-stone-900">Lumina</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-stone-600 hover:text-primary-600 font-medium text-sm transition-colors">Home</a>
              <a href="#collection" className="text-stone-600 hover:text-primary-600 font-medium text-sm transition-colors">Collection</a>
              <button onClick={() => setIsContactOpen(true)} className="text-stone-600 hover:text-primary-600 font-medium text-sm transition-colors">Contact</button>
              
              <div className="w-px h-6 bg-stone-200 mx-2"></div>
              
              {!isAdmin ? (
                   <button 
                   onClick={() => setIsLoginOpen(true)}
                   className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-stone-900 text-white hover:bg-stone-700 transition-all"
                 >
                   <User size={14} />
                   Admin Login
                 </button>
              ) : (
                <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-primary-700 bg-primary-50 px-2 py-1 rounded">Admin Mode</span>
                    <button 
                        onClick={handleLogout}
                        className="text-stone-500 hover:text-red-600 transition-colors"
                        title="Logout"
                    >
                        <LogOut size={18} />
                    </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-stone-600">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-stone-100 p-4 space-y-4 shadow-lg">
                <a href="#" className="block text-stone-600 font-medium">Home</a>
                <a href="#collection" className="block text-stone-600 font-medium">Collection</a>
                <button onClick={() => setIsContactOpen(true)} className="block text-stone-600 font-medium w-full text-left">Contact</button>
                <div className="border-t border-stone-100 pt-4">
                    {!isAdmin ? (
                        <button 
                        onClick={() => { setIsLoginOpen(true); setIsMobileMenuOpen(false); }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-stone-900 text-white font-medium"
                        >
                        <User size={16} /> Admin Login
                        </button>
                    ) : (
                        <button 
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 font-medium"
                        >
                        <LogOut size={16} /> Logout
                        </button>
                    )}
                </div>
            </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative bg-stone-900 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2690&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-in slide-in-from-bottom-5 fade-in duration-700">
                Discover Worlds <br/> <span className="text-primary-300">Within Pages</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto mb-10 font-light leading-relaxed animate-in slide-in-from-bottom-5 fade-in duration-700 delay-100">
                Curated collections for the modern intellect. Dive into our handpicked selection of timeless classics and contemporary masterpieces.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in slide-in-from-bottom-5 fade-in duration-700 delay-200">
                <Button variant="primary" size="lg" className="rounded-full px-8" onClick={() => document.getElementById('collection')?.scrollIntoView({behavior: 'smooth'})}>
                    Browse Collection
                </Button>
                {isAdmin && (
                    <Button variant="secondary" size="lg" className="rounded-full px-8 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm" onClick={() => setIsModalOpen(true)}>
                        <Plus className="mr-2" size={20} /> Add New Book
                    </Button>
                )}
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="collection" className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        
        {/* Admin Toolbar */}
        {isAdmin && (
             <div className="mb-8 p-4 bg-stone-50 border border-stone-200 rounded-xl flex flex-wrap items-center gap-4 animate-in fade-in slide-in-from-top-2">
                <span className="text-sm font-bold text-stone-500 uppercase tracking-wide mr-auto">Admin Tools</span>
                
                <input 
                    type="file" 
                    accept=".csv" 
                    ref={csvInputRef} 
                    className="hidden" 
                    onChange={handleCSVUpload} 
                />
                
                <Button onClick={() => csvInputRef.current?.click()} variant="secondary" size="sm" className="bg-white">
                    <Upload size={14} className="mr-2" /> Import CSV
                </Button>

                <Button onClick={() => setIsMailingListOpen(true)} variant="secondary" size="sm" className="bg-white">
                    <Mail size={14} className="mr-2" /> Mailing List
                </Button>

                <Button onClick={() => setIsModalOpen(true)} size="sm">
                    <Plus size={14} className="mr-2" /> Add Book
                </Button>
             </div>
        )}

        {/* Filter & Search Toolbar */}
        <div className="flex flex-col gap-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="font-serif text-3xl font-bold text-stone-900 mb-1">Curated Collection</h2>
                    <p className="text-stone-500 text-sm">Showing {books.length} titles</p>
                </div>

                <div className="relative w-full md:w-80">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-stone-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search books..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2.5 border border-stone-200 rounded-lg leading-5 bg-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-shadow shadow-sm"
                    />
                </div>
            </div>
            
            {/* Category Pills - Visible mainly for explicit filtering, but affects layout */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                <Filter size={16} className="text-stone-400 mr-2 flex-shrink-0" />
                {allGenres.map(genre => (
                    <button
                        key={genre}
                        onClick={() => setSelectedGenre(genre)}
                        className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                            selectedGenre === genre 
                            ? 'bg-stone-900 text-white' 
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                    >
                        {genre}
                    </button>
                ))}
            </div>
        </div>

        {/* Content Area */}
        {showCarousels ? (
            /* Carousel View (Default) */
            <div className="space-y-12 animate-in fade-in duration-500">
                {Object.entries(booksByGenre).map(([genre, genreBooks]) => (
                    <div key={genre} className="space-y-4">
                        <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                             <h3 className="font-serif text-2xl font-bold text-stone-800">{genre}</h3>
                             <button onClick={() => setSelectedGenre(genre)} className="text-sm font-medium text-primary-600 hover:text-primary-800 flex items-center gap-1">
                                View All <ChevronRight size={14} />
                             </button>
                        </div>
                        
                        <div className="relative group/carousel">
                            <div className="flex overflow-x-auto gap-4 pb-4 px-1 snap-x no-scrollbar">
                                {genreBooks.map((book) => (
                                    <div key={book.id} className="snap-start shrink-0 w-[160px] md:w-[200px]">
                                        <BookCard 
                                            book={book} 
                                            isAdmin={isAdmin} 
                                            onRemove={handleRemoveBook} 
                                        />
                                    </div>
                                ))}
                            </div>
                            {/* Visual hint for scrolling on desktop */}
                            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none md:group-hover/carousel:hidden" />
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            /* Grid View (Search Results or Specific Category) */
            <div className="animate-in fade-in duration-500">
                {filteredBooks.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                    {filteredBooks.map((book) => (
                        <div key={book.id} className="w-full">
                            <BookCard 
                                book={book} 
                                isAdmin={isAdmin} 
                                onRemove={handleRemoveBook} 
                            />
                        </div>
                    ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                        <div className="bg-stone-100 p-4 rounded-full inline-block mb-4">
                            <Search className="h-8 w-8 text-stone-400" />
                        </div>
                        <h3 className="text-lg font-medium text-stone-900">No books found</h3>
                        <p className="text-stone-500 mt-1">Try adjusting your filters.</p>
                    </div>
                )}
            </div>
        )}

      </main>

      {/* Footer */}
      <footer id="about" className="bg-stone-900 text-stone-300 py-16 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="bg-primary-500 p-1.5 rounded text-white">
                             <Library size={20} />
                        </div>
                        <span className="font-serif text-2xl font-bold text-white">Lumina</span>
                    </div>
                    <p className="text-stone-400 max-w-sm leading-relaxed mb-6">
                        Lumina Library is more than just a collection of books; it's a gateway to new worlds, ideas, and perspectives.
                    </p>
                    
                    {/* Newsletter Form */}
                    <form onSubmit={handleSubscribe} className="max-w-sm">
                        <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-2">Subscribe to our newsletter</h4>
                        <div className="flex gap-2">
                            <input 
                                type="email" 
                                required
                                value={newsletterEmail}
                                onChange={(e) => setNewsletterEmail(e.target.value)}
                                placeholder="Enter your email" 
                                className="bg-stone-800 border-none rounded-lg px-4 py-2 text-white placeholder-stone-500 focus:ring-2 focus:ring-primary-500 outline-none w-full"
                            />
                            <Button type="submit" variant="primary">
                                <Send size={16} />
                            </Button>
                        </div>
                    </form>
                </div>
                
                <div>
                    <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Explore</h3>
                    <ul className="space-y-3">
                        <li><a href="#" className="hover:text-white transition-colors">Bestsellers</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Staff Picks</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Genres</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Connect</h3>
                    <div className="flex gap-4 mb-6">
                        <a href="#" className="p-2 bg-stone-800 rounded-full hover:bg-primary-600 transition-colors"><Twitter size={18} /></a>
                        <a href="#" className="p-2 bg-stone-800 rounded-full hover:bg-primary-600 transition-colors"><Facebook size={18} /></a>
                        <a href="#" className="p-2 bg-stone-800 rounded-full hover:bg-primary-600 transition-colors"><Instagram size={18} /></a>
                    </div>
                    <Button variant="secondary" onClick={() => setIsContactOpen(true)} className="w-full bg-stone-800 text-white border-stone-700 hover:bg-stone-700 hover:text-white">
                        Contact Owner
                    </Button>
                </div>
            </div>
            <div className="mt-16 pt-8 border-t border-stone-800 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center text-stone-500">
                <p>&copy; {new Date().getFullYear()} Lumina Library. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white">Privacy Policy</a>
                    <a href="#" className="hover:text-white">Terms of Service</a>
                </div>
            </div>
        </div>
      </footer>

      {/* Modals */}
      <AdminModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddBook={handleAddBook}
      />
      
      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={() => setIsAdmin(true)}
      />

      <ContactModal 
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <MailingListModal 
        isOpen={isMailingListOpen}
        onClose={() => setIsMailingListOpen(false)}
        subscribers={subscribers}
        onRemove={handleRemoveSubscriber}
      />

    </div>
  );
}

export default App;