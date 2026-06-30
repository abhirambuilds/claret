import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, User } from 'lucide-react';
import { useSiteSettings } from '../../hooks/useSanity';
import logoImg from '../../assets/logo.jpeg';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const { settings } = useSiteSettings();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0A2540] border-b border-[#051220]/80 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group" id="nav-logo">
            <img
              src={logoImg}
              className="w-10 h-10 sm:w-11 sm:h-11 object-cover rounded-xl shadow-lg border border-white/10 group-hover:scale-105 transition-transform duration-300"
              alt={`${settings.publicationName || 'Claret'} Logo`}
            />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold text-white font-display tracking-tight leading-tight group-hover:text-blue-200 transition-colors duration-200">
                {settings.publicationName || 'Claret'}
              </span>
              <span className="text-[9px] sm:text-[10px] text-blue-200/70 font-medium tracking-wider uppercase">
                Educational Guide Books
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/"
              className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
              id="nav-home"
            >
              Home
            </Link>
            <Link
              to="/books"
              className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
              id="nav-books"
            >
              Books
            </Link>
            <Link
              to="/author"
              className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
              id="nav-author"
            >
              Author
            </Link>

            {/* Search toggle */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200 ml-2"
              id="nav-search-toggle"
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Admin Login Button shortcut */}
            <Link
              to="/admin/login"
              className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200 mr-2 flex items-center justify-center"
              title="Admin Portal"
              id="nav-admin-login"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Buy Now CTA */}
            <Link
              to="/books"
              className="px-5 py-2.5 bg-[#007AFF] text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-600 hover:scale-[1.03] transition-all duration-200"
            >
              Buy Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 text-white/80 hover:text-white rounded-lg"
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              to="/admin/login"
              className="p-2 text-white/80 hover:text-white rounded-lg flex items-center justify-center"
              title="Admin Portal"
              id="nav-admin-login-mobile"
            >
              <User className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white/80 hover:text-white rounded-lg"
              id="nav-mobile-toggle"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {showSearch && (
          <div className="pb-4 animate-fade-in">
            <form onSubmit={handleSearch} className="relative max-w-lg mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search books by title, subject, or author..."
                className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#007AFF] transition-all duration-200"
                id="nav-search-input"
                autoFocus
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
            </form>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 animate-fade-in bg-[#0A2540]">
          <div className="px-4 py-3 space-y-1">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-sm font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
            >
              Home
            </Link>
            <Link
              to="/books"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-sm font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
            >
              Books
            </Link>
            <Link
              to="/author"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-sm font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
            >
              Author
            </Link>
            <div className="pt-2 pb-1">
              <Link
                to="/books"
                onClick={() => setIsMenuOpen(false)}
                className="block text-center w-full px-4 py-3 bg-[#007AFF] hover:bg-blue-600 text-white font-bold rounded-xl text-sm transition-all duration-200"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}


