import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, ShoppingCart, CheckCircle,
  XCircle, BookOpen, User, Award, Building, Globe, Layers, Tag,
  X, ZoomIn, ChevronLeft, ChevronRight
} from 'lucide-react';
import BookCoverPlaceholder from '../../components/public/BookCoverPlaceholder';
import WhatsAppModal from '../../components/public/WhatsAppModal';
import { useBook } from '../../hooks/useSanity';
import { urlFor } from '../../lib/imageUrl';

const getUncroppedImageUrl = (image: any, width: number) => {
  if (!image) return '';
  if (typeof image === 'string') return image;
  return urlFor(image.asset || image).width(width).url();
};

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { book, loading } = useBook(id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const allImages = book
    ? [
        ...(book.coverImage ? [book.coverImage] : []),
        ...(book.images || [])
      ]
    : [];

  // Escape & arrow keys listener to close modal and switch images
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
        setIsZoomed(false);
      } else if (isLightboxOpen && !isZoomed && allImages.length > 0) {
        if (e.key === 'ArrowLeft') {
          setActiveIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
        } else if (e.key === 'ArrowRight') {
          setActiveIndex((prev) => (prev + 1) % allImages.length);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, isZoomed, allImages.length]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 animate-pulse">
            <div className="lg:col-span-3">
              <div className="aspect-[3/4] bg-gray-200 rounded-2xl"></div>
            </div>
            <div className="lg:col-span-5 space-y-4">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-20 bg-gray-200 rounded w-full"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="lg:col-span-4 space-y-4">
              <div className="h-40 bg-gray-200 rounded-2xl"></div>
              <div className="h-20 bg-gray-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Not Found</h2>
          <Link to="/books" className="text-[#007AFF] hover:underline">Return to Books</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <Link to="/" className="hover:text-[#007AFF] transition-colors">Home</Link>
            <span className="text-gray-300 font-normal">/</span>
            <Link
              to="/books"
              className="hover:text-[#007AFF] transition-colors"
            >
              Books
            </Link>
            <span className="text-gray-300 font-normal">/</span>
            <span className="text-[#1D1D1F] truncate max-w-[200px]">{book.title.replace(/—.*|Guide.*/i, '').trim()}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link
          to="/books"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-[#007AFF] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Books
        </Link>

        {/* Main layout: 3-column on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Book cover and interactive gallery */}
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <div className="rounded-[2.5rem] shadow-xl border border-gray-100 bg-white p-8 sm:p-12 relative group cursor-zoom-in flex items-center justify-center min-h-[300px]">
                {book.coverImage ? (
                  <>
                    <img 
                      src={getUncroppedImageUrl(allImages[activeIndex] || book.coverImage, 1200)} 
                      alt={book.title} 
                      className="w-full h-auto max-h-[60vh] object-contain animate-fade-in cursor-pointer select-none drop-shadow-md rounded-sm" 
                      onClick={() => setIsLightboxOpen(true)}
                    />
                    <div 
                      onClick={() => setIsLightboxOpen(true)}
                      className="absolute bottom-6 right-6 bg-white/95 hover:bg-white text-[#0A2540] hover:text-[#007AFF] shadow-lg px-3 py-2 rounded-xl transition-all duration-300 cursor-pointer opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 border border-gray-100/50 flex items-center gap-1.5"
                    >
                      <ZoomIn className="w-4 h-4" />
                      <span className="text-[10px] font-extrabold uppercase tracking-wider">Click to Zoom</span>
                    </div>

                    {/* Left and Right navigation arrows */}
                    {allImages.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
                          }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#0A2540] hover:text-[#007AFF] hover:scale-105 shadow-md p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 border border-gray-100 flex items-center justify-center cursor-pointer"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveIndex((prev) => (prev + 1) % allImages.length);
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#0A2540] hover:text-[#007AFF] hover:scale-105 shadow-md p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 border border-gray-100 flex items-center justify-center cursor-pointer"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <BookCoverPlaceholder title={book.title} classType={book.classType} isLarge={true} />
                )}
              </div>

              {/* Thumbnails grid */}
              {allImages.length > 1 && (
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-6 animate-fade-in-up">
                  {/* Cover Thumbnail */}
                  <button
                    onClick={() => setActiveIndex(0)}
                    className={`w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-2xl overflow-hidden border-2 bg-white p-1 transition-all duration-200 ${
                      activeIndex === 0 ? 'border-[#007AFF] shadow-md scale-[1.05]' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img 
                      src={getUncroppedImageUrl(book.coverImage, 200)} 
                      className="w-full h-full object-contain rounded-xl bg-gray-50/50" 
                      alt="Book Cover Thumbnail" 
                    />
                  </button>

                  {/* Additional Images Thumbnails */}
                  {book.images && book.images.map((img: any, idx: number) => {
                    const index = idx + 1;
                    const isActive = activeIndex === index;
                    const url = getUncroppedImageUrl(img, 200);
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveIndex(index)}
                        className={`w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-2xl overflow-hidden border-2 bg-white p-1 transition-all duration-200 ${
                          isActive ? 'border-[#007AFF] shadow-md scale-[1.05]' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img src={url} className="w-full h-full object-contain rounded-xl bg-gray-50/50" alt={`Book thumbnail ${idx + 1}`} />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Center: Book info */}
          <div className="lg:col-span-5 animate-fade-in-up">
            {/* Category badge */}
            <span className={`inline-flex px-3.5 py-1.5 text-xs font-bold rounded-full mb-4 shadow-sm ${
              book.classType === 'Class 10'
                ? 'bg-blue-50 text-blue-700 border border-blue-100'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
            }`}>
              {book.classType}
            </span>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1D1D1F] mb-4 font-display leading-tight" id="book-title">
              {book.title}
            </h1>

            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              {book.shortDescription || 'This study guide is professionally designed to help students master syllabus concepts with ease.'}
            </p>

            {/* Meta info grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <InfoItem icon={<Building className="w-4 h-4 text-blue-600" />} label="Publisher" value={book.publisher || 'Claret Publications'} />
              <InfoItem icon={<Layers className="w-4 h-4 text-emerald-600" />} label="Edition" value={book.edition || '2025-26 Edition'} />
              <InfoItem icon={<Globe className="w-4 h-4 text-purple-600" />} label="Language" value={book.language || 'English'} />
              <InfoItem icon={<Tag className="w-4 h-4 text-orange-600" />} label="Category" value={book.classType} />
            </div>

            <div className="h-px bg-gray-200/60 my-8" />

            {/* Full description */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-[#1D1D1F] mb-4 font-display">About this Book</h2>
              <div className="text-sm text-gray-500 leading-relaxed whitespace-pre-line bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                {book.fullDescription}
              </div>
            </div>

            <div className="h-px bg-gray-200/60 my-8" />

            {/* Editor details */}
            {book.editor && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-[#1D1D1F] mb-4 font-display">Editor Details</h2>
                <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0 border border-blue-100">
                      <Award className="w-6 h-6 text-[#0A2540]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1D1D1F]">{book.editor.name}</p>
                      {book.editor.qualification && (
                        <p className="text-xs text-gray-400 mt-1 font-medium">{book.editor.qualification}</p>
                      )}
                      {book.editor.institution && (
                        <p className="text-xs text-gray-400 font-medium">{book.editor.institution}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Authors */}
            {book.authors && book.authors.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-[#1D1D1F] mb-4 font-display">
                  Author{book.authors.length > 1 ? 's' : ''}
                </h2>
                <div className="space-y-4">
                  {book.authors.map((author, index) => (
                    <div key={index} className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm">
                      <div className="flex items-start gap-4">
                        {author.profileImage ? (
                          <img 
                            src={typeof author.profileImage === 'string' ? author.profileImage : urlFor(author.profileImage).width(100).height(100).url()} 
                            alt={author.name}
                            className="w-12 h-12 rounded-2xl object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0 border border-blue-100">
                            <User className="w-6 h-6 text-[#0A2540]" />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-bold text-[#1D1D1F]">{author.name}</p>
                          {author.qualification && (
                            <p className="text-xs text-gray-400 mt-1 font-medium">{author.qualification}</p>
                          )}
                          {author.designation && (
                            <p className="text-xs text-gray-400 font-medium">{author.designation}</p>
                          )}
                          {author.institution && (
                            <p className="text-xs text-gray-400 font-medium">{author.institution}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Price card */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-4 animate-slide-in-right">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 sm:p-8">
                {/* Price */}
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Price</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-[#1D1D1F]">₹{book.price}</span>
                    <span className="text-xs text-gray-400 font-semibold">/ per copy</span>
                  </div>
                </div>

                {/* Availability */}
                <div className="flex items-center gap-2 mb-6 px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100">
                  {book.availability ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm font-bold text-green-700">Available In Stock</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <span className="text-sm font-bold text-red-700">Currently Out of Stock</span>
                    </>
                  )}
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    disabled={!book.availability}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-4 font-bold rounded-2xl transition-all duration-200 text-sm shadow-lg ${
                      book.availability
                        ? 'bg-[#007AFF] hover:bg-blue-600 text-white shadow-blue-500/20 hover:scale-[1.02]'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                    }`}
                    id="buy-now-btn"
                  >
                    <ShoppingCart className="w-4.5 h-4.5" />
                    Buy Now via WhatsApp
                  </button>
                </div>

                {/* Info */}
                <div className="mt-6 pt-6 border-t border-gray-100 space-y-3 text-xs text-gray-500">
                  <p className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    Secure packaging guaranteed
                  </p>
                  <p className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    Delivered directly to your address
                  </p>
                </div>
              </div>

              {/* Publisher card */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100">
                  <BookOpen className="w-6 h-6 text-[#0A2540]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-primary-900">{book.publisher || 'Claret Publications'}</p>
                  <p className="text-xs text-gray-400 font-semibold mt-0.5">{book.edition || '2025-26 Edition'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Modal */}
      <WhatsAppModal book={book} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-md select-none animate-fade-in">
          {/* Top Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/70 to-transparent">
            <div>
              <h3 className="text-white font-extrabold text-sm tracking-wide sm:text-base">
                {book.title}
              </h3>
              <p className="text-gray-400 text-xs mt-0.5 font-medium">
                {isZoomed ? 'Move cursor to pan. Click to zoom out.' : 'Click image to zoom/magnify. Use ESC or click X to close.'}
              </p>
            </div>
            <button
              onClick={() => {
                setIsLightboxOpen(false);
                setIsZoomed(false);
              }}
              className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              title="Close (Esc)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Center viewport */}
          <div className="flex-1 flex items-center justify-center p-4 min-h-0 relative">
            <div 
              className={`relative overflow-hidden max-w-4xl max-h-[70vh] w-full h-full bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 ${
                isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onMouseMove={handleMouseMove}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={getUncroppedImageUrl(allImages[activeIndex] || book.coverImage, 1800)}
                alt={book.title}
                className="max-w-full max-h-full object-contain pointer-events-none select-none"
                style={{
                  transform: isZoomed ? 'scale(2.5)' : 'scale(1)',
                  transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                  transition: isZoomed ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </div>

            {/* Lightbox Left and Right arrows */}
            {allImages.length > 1 && !isZoomed && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
                  }}
                  className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white hover:scale-110 shadow-lg p-3 sm:p-3.5 rounded-full transition-all duration-200 border border-white/10 flex items-center justify-center cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex((prev) => (prev + 1) % allImages.length);
                  }}
                  className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white hover:scale-110 shadow-lg p-3 sm:p-3.5 rounded-full transition-all duration-200 border border-white/10 flex items-center justify-center cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom thumbnails gallery inside Lightbox */}
          {allImages.length > 1 ? (
            <div className="px-6 py-4 bg-gradient-to-t from-black/70 to-transparent flex flex-col items-center gap-3">
              <div className="flex gap-2 max-w-full overflow-x-auto py-1">
                {/* Cover thumbnail */}
                <button
                  onClick={() => {
                    setActiveIndex(0);
                    setIsZoomed(false);
                  }}
                  className={`w-14 h-18 rounded-lg overflow-hidden border-2 bg-black/30 p-0.5 transition-all duration-200 flex-shrink-0 ${
                    activeIndex === 0 ? 'border-[#007AFF] scale-105 shadow-lg shadow-[#007AFF]/20' : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <img
                    src={getUncroppedImageUrl(book.coverImage, 200)}
                    className="w-full h-full object-contain rounded bg-black/10"
                    alt="Cover thumbnail"
                  />
                </button>
                {/* Additional thumbnails */}
                {book.images && book.images.map((img: any, idx: number) => {
                  const index = idx + 1;
                  const isActive = activeIndex === index;
                  const url = getUncroppedImageUrl(img, 200);
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveIndex(index);
                        setIsZoomed(false);
                      }}
                      className={`w-14 h-18 rounded-lg overflow-hidden border-2 bg-black/30 p-0.5 transition-all duration-200 flex-shrink-0 ${
                        isActive ? 'border-[#007AFF] scale-105 shadow-lg shadow-[#007AFF]/20' : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <img src={url} className="w-full h-full object-contain rounded bg-black/10" alt={`Thumbnail ${idx + 1}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="h-6" /> // spacer
          )}
        </div>
      )}
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors">
      <span className="text-gray-400 bg-gray-50 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">{icon}</span>
      <div>
        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold leading-none mb-1">{label}</p>
        <p className="text-sm font-extrabold text-[#1D1D1F]">{value}</p>
      </div>
    </div>
  );
}
