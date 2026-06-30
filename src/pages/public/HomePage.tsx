import { Link, useSearchParams } from 'react-router-dom';
import { 
  ArrowRight, BookOpen, Search, Trophy, ShieldCheck, 
  Sparkles, Feather, Compass, GraduationCap, BookMarked, ListChecks
} from 'lucide-react';
import { useState, useEffect } from 'react';
import BookCard from '../../components/public/BookCard';
import BookCoverPlaceholder from '../../components/public/BookCoverPlaceholder';
import { useSiteSettings, useAllBooks } from '../../hooks/useSanity';
import { mockBooks } from '../../data/mockData';

export default function HomePage() {
  const { settings } = useSiteSettings();
  const { books: allBooks, loading: allBooksLoading } = useAllBooks();

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  // Clean up sanity database entries that look fake (like test values)
  const displayBooks = allBooks.filter(book => 
    book.title && 
    book.title !== 'hdaho' && 
    !book.title.toLowerCase().includes('test') &&
    book.availability
  );

  // Sourced exclusively from database entries
  const finalBooks = displayBooks;

  // Filter books by search query if present
  const searchedBooks = searchQuery ? finalBooks.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (book.shortDescription || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.authors?.some(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()))
  ) : [];

  // Search Results Layout
  if (searchQuery) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F] mb-2 font-display">
              Search Results for "{searchQuery}"
            </h1>
            <p className="text-[#6E6E73] font-semibold">
              {allBooksLoading ? 'Searching...' : `${searchedBooks.length} book${searchedBooks.length !== 1 ? 's' : ''} found`}
            </p>
          </div>
          
          {allBooksLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
              {[1, 2].map(n => (
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
          ) : searchedBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center stagger-children">
              {searchedBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-xl mx-auto">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#1D1D1F] mb-2">No books found</h3>
              <p className="text-sm text-[#6E6E73] mb-8">We couldn't find any books matching your search query. Try searching for "Physics".</p>
              <Link to="/" className="inline-flex items-center justify-center px-6 py-3 bg-[#007AFF] text-white font-bold rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/10 text-sm">
                ← Back to Home
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#F5F5F7] py-16 sm:py-24 lg:py-28" id="hero">
        {/* Soft background shape details */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[700px] border border-blue-500/5 rounded-full pointer-events-none" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Copy & Highlights */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-6 animate-fade-in shadow-sm">
                <Sparkles className="w-4 h-4 text-[#007AFF]" />
                <span className="text-[#007AFF] text-[10px] font-extrabold uppercase tracking-wider">Premium Study Guide Series</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#1D1D1F] mb-6 tracking-tight leading-tight animate-fade-in-up font-display">
                The Right Guide.<br />
                <span className="gradient-text-blue">
                  The Bright Future.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-[#6E6E73] mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                Complete study guides for Class XI (Intermediate State Board) students.
                Prepared by eminent school and college authors to help you master concepts easily and score higher.
              </p>

              {/* Three key highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-xl mx-auto lg:mx-0 text-left animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                <div className="flex items-center gap-3 p-3.5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                    <BookOpen className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1D1D1F]">Concept Based</h4>
                    <p className="text-[10px] text-[#6E6E73]">Easy to Understand</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3.5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center flex-shrink-0 text-yellow-600">
                    <Trophy className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1D1D1F]">Exam Focused</h4>
                    <p className="text-[10px] text-[#6E6E73]">Solved Examples</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3.5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0 text-emerald-600">
                    <ShieldCheck className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1D1D1F]">Class XI Physics</h4>
                    <p className="text-[10px] text-[#6E6E73]">Consolidated Vol I & II</p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <a
                  href="#catalog"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#007AFF] hover:bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all duration-200 text-sm"
                  id="hero-explore-btn"
                >
                  Explore Book Details
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Column: 3D Pedestal and Volume I & II Stack */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
              <div className="relative w-full max-w-[400px] h-[340px] flex items-center justify-center">
                {/* Pedestal platform */}
                <div className="absolute bottom-4 w-[260px] h-[35px] sm:w-[320px] sm:h-[42px] rounded-[50%] book-pedestal z-0" />
                
                {/* 3D Stack showcasing Vol I & Vol II */}
                <div className="relative flex items-end justify-center z-10 pb-8 select-none">
                  {/* Volume I copy */}
                  <div className="transform -rotate-12 translate-y-2 translate-x-4 hover:rotate-0 hover:-translate-y-6 hover:z-30 transition-all duration-300 cursor-pointer">
                    <BookCoverPlaceholder title="Physics is Easy — Volume I" classType="Class XI" />
                  </div>
                  {/* Volume II copy */}
                  <div className="transform rotate-12 translate-y-2 -translate-x-4 hover:rotate-0 hover:-translate-y-6 hover:z-30 transition-all duration-300 -ml-16 cursor-pointer">
                    <BookCoverPlaceholder title="Physics is Easy — Volume II" classType="Class XI" />
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-[#6E6E73] font-bold tracking-wider uppercase mt-1 select-none">
                Consolidated Volume I & II Inside
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Book Highlights Strip (6 Points Grid) */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sm:p-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[11px] font-extrabold text-[#007AFF] uppercase tracking-widest block mb-2">Key Quality Points</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F] font-display">Why Choose "Physics is Easy"?</h2>
            <div className="w-12 h-[3px] bg-[#007AFF] mx-auto mt-2 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Legibly and Clearly */}
            <div className="group flex items-start gap-4 p-5 bg-white border border-gray-100 hover:border-blue-100 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-blue-50/60 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-[#007AFF] group-hover:text-white transition-all duration-300">
                <Feather className="w-5.5 h-5.5 stroke-[1.8]" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#1D1D1F] group-hover:text-[#007AFF] transition-colors duration-200">Written legibly and clearly</h3>
                <p className="text-xs text-[#6E6E73] mt-1.5 leading-relaxed">Structured presentation with highly readable handwriting styles and step-by-step logic.</p>
              </div>
            </div>
            
            {/* Vivid Description */}
            <div className="group flex items-start gap-4 p-5 bg-white border border-gray-100 hover:border-emerald-100 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-emerald-50/60 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-[#10B981] group-hover:text-white transition-all duration-300">
                <Compass className="w-5.5 h-5.5 stroke-[1.8]" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#1D1D1F] group-hover:text-[#10B981] transition-colors duration-200">Vivid description with diagrams</h3>
                <p className="text-xs text-[#6E6E73] mt-1.5 leading-relaxed">Detailed physical concepts supported by accurate, high-quality illustrations and schemas.</p>
              </div>
            </div>

            {/* Easy to Understand */}
            <div className="group flex items-start gap-4 p-5 bg-white border border-gray-100 hover:border-purple-100 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-purple-50/60 text-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-[#8B5CF6] group-hover:text-white transition-all duration-300">
                <BookOpen className="w-5.5 h-5.5 stroke-[1.8]" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#1D1D1F] group-hover:text-[#8B5CF6] transition-colors duration-200">Easy to understand</h3>
                <p className="text-xs text-[#6E6E73] mt-1.5 leading-relaxed">Complex derivations simplified with simple examples to build a strong foundation for exams.</p>
              </div>
            </div>

            {/* Eminent Authors */}
            <div className="group flex items-start gap-4 p-5 bg-white border border-gray-100 hover:border-orange-100 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-orange-50/60 text-orange-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                <GraduationCap className="w-5.5 h-5.5 stroke-[1.8]" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#1D1D1F] group-hover:text-orange-500 transition-colors duration-200">Well written by eminent authors</h3>
                <p className="text-xs text-[#6E6E73] mt-1.5 leading-relaxed">Authored by school PG assistants and college professors with decades of curriculum expertise.</p>
              </div>
            </div>

            {/* No Separate Volume */}
            <div className="group flex items-start gap-4 p-5 bg-white border border-gray-100 hover:border-indigo-100 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-indigo-50/60 text-indigo-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <BookMarked className="w-5.5 h-5.5 stroke-[1.8]" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#1D1D1F] group-hover:text-indigo-600 transition-colors duration-200">No need to carry separate textbooks</h3>
                <p className="text-xs text-[#6E6E73] mt-1.5 leading-relaxed">Consolidates both Volume I and Volume II textbooks into one comprehensive, easy-to-carry guide.</p>
              </div>
            </div>

            {/* Key Points */}
            <div className="group flex items-start gap-4 p-5 bg-white border border-gray-100 hover:border-red-100 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-red-50/60 text-red-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                <ListChecks className="w-5.5 h-5.5 stroke-[1.8]" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#1D1D1F] group-hover:text-red-500 transition-colors duration-200">Key points about chapters</h3>
                <p className="text-xs text-[#6E6E73] mt-1.5 leading-relaxed">Quick summaries, critical definitions, and crucial formulae highlighted for fast revision.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Board Compliance Info Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="bg-[#0A2540] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl shadow-blue-950/25 border border-white/5">
          {/* Subtle background circles */}
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -top-10 w-72 h-72 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
              Syllabus Alignment
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white mt-5 mb-4 leading-tight">
              Aligned with Board of Intermediate Education Syllabus
            </h2>
            <p className="text-sm text-blue-100/80 leading-relaxed mb-6">
              Our Physics guidebook is prepared strictly in accordance with the latest curriculum prescribed by the Board of Intermediate Education. Every chapter, solved problem, and diagram is vetted by senior faculty members to guarantee students study exactly what is required for their examinations.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-blue-200">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 bg-[#007AFF] rounded-full" />
                <span>Chapter-wise summaries for fast revision</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 bg-[#007AFF] rounded-full" />
                <span>Consolidated Vol I & II — No need to carry two books</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in-up" id="catalog" style={{ animationDelay: '0.15s' }}>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-2.5 h-1.5 bg-[#007AFF] rounded-full animate-pulse" />
              <span className="text-[11px] font-extrabold text-[#007AFF] uppercase tracking-widest">Available Publications</span>
            </div>
            <h2 className="text-3xl font-extrabold text-[#1D1D1F] font-display">
              Our Physics Guide Books
            </h2>
            <div className="w-12 h-[3px] bg-[#007AFF] mt-1.5 rounded-full" />
          </div>
        </div>

        {/* Display Books - center if only 1 book exists */}
        <div className={`flex ${finalBooks.length === 1 ? 'justify-center' : 'flex-wrap'} gap-6`}>
          {allBooksLoading ? (
            <div className="w-full max-w-md bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col aspect-[3/4] animate-pulse">
              <div className="w-full h-2/3 bg-gray-200"></div>
              <div className="flex-1 p-5 flex flex-col gap-2">
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="mt-auto h-6 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ) : finalBooks.length > 0 ? (
            <div className={`grid grid-cols-1 ${finalBooks.length === 1 ? 'max-w-md w-full mx-auto' : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'} gap-6 w-full stagger-children`}>
              {finalBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="w-full text-center py-16 bg-white rounded-3xl border border-gray-200/60 p-8 shadow-sm max-w-lg mx-auto animate-scale-in">
              <BookOpen className="w-12 h-12 text-[#6E6E73]/30 mx-auto mb-4" />
              <h3 className="text-base font-extrabold text-[#1D1D1F] mb-1">Catalog Updating</h3>
              <p className="text-xs text-[#6E6E73] font-medium leading-relaxed">We are currently updating our publication listings. Please check back shortly.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
