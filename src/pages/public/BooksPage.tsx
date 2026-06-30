import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, BookOpen } from 'lucide-react';
import BookCard from '../../components/public/BookCard';
import { useAllBooks } from '../../hooks/useSanity';

export default function BooksPage() {
  const { books, loading } = useAllBooks();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const activeBooks = books.filter(b => b.availability);
  
  const displayBooks = searchQuery 
    ? activeBooks.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (book.shortDescription || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.authors?.some(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : activeBooks;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ search: searchQuery.trim() });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header section with gradient */}
      <div className="bg-gradient-to-b from-[#0A2540] to-[#123154] text-white py-16 sm:py-24 relative overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-32 -right-32 w-[350px] h-[350px] bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-400 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 font-display tracking-tight">
            Our Publications
          </h1>
          <p className="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto mb-8 font-medium">
            Explore our complete catalog of high-quality educational guide books designed by subject experts to help you excel.
          </p>
          
          <form onSubmit={handleSearch} className="max-w-xl mx-auto relative px-2 sm:px-0">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, subject, or author..."
                className="w-full pl-12 pr-28 py-4 sm:py-4.5 rounded-2xl text-gray-900 bg-white border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#007AFF] shadow-xl text-sm sm:text-base transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#007AFF] hover:bg-blue-600 text-white px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md shadow-blue-500/10"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Book Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8 flex items-center justify-between border-b border-gray-100 pb-4">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#1D1D1F]">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'All Publications'}
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">
            {loading ? 'Loading...' : `${displayBooks.length} result${displayBooks.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
              <div key={n} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col aspect-[3/4] animate-pulse">
                <div className="w-full h-2/3 bg-gray-200"></div>
                <div className="flex-1 p-5 flex flex-col gap-2">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="mt-auto h-6 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : displayBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
            {displayBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 mt-6">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#1D1D1F] mb-2">No publications found</h3>
            <p className="text-gray-400 text-sm max-w-xs mx-auto mb-8">
              We couldn't find any books matching your search. Please check the spelling or try a different subject.
            </p>
            {searchQuery && (
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSearchParams({});
                }}
                className="px-6 py-3 bg-[#007AFF] text-white rounded-xl font-bold text-sm hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/10"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
