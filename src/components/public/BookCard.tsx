import { Link } from 'react-router-dom';
import { Check, Atom, FlaskConical, BookOpen, Calculator, Pi, ArrowRight } from 'lucide-react';
import { Book } from '../../types';
import BookCoverPlaceholder from './BookCoverPlaceholder';
import { urlFor } from '../../lib/imageUrl';

const getUncroppedImageUrl = (image: any, width: number) => {
  if (!image) return '';
  if (typeof image === 'string') return image;
  return urlFor(image.asset || image).width(width).url();
};

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const lowerTitle = book.title.toLowerCase();
  
  // Subject detection for themed elements
  let subject = 'default';
  let IconComponent = BookOpen;
  let themeColor = 'bg-[#007AFF] text-white hover:bg-blue-600 shadow-blue-500/20';
  let badgeColor = 'bg-blue-50 text-blue-700 border border-blue-100';
  let checkColor = 'text-blue-500';

  if (lowerTitle.includes('math')) {
    subject = 'math';
    IconComponent = Pi;
    themeColor = 'bg-[#007AFF] text-white hover:bg-blue-600 shadow-blue-500/20';
    badgeColor = 'bg-blue-50 text-blue-700 border border-blue-100';
    checkColor = 'text-blue-500';
  } else if (lowerTitle.includes('physic')) {
    subject = 'physics';
    IconComponent = Atom;
    themeColor = 'bg-[#10B981] text-white hover:bg-emerald-600 shadow-emerald-500/20';
    badgeColor = 'bg-emerald-50 text-emerald-700 border border-emerald-100';
    checkColor = 'text-emerald-500';
  } else if (lowerTitle.includes('chemist')) {
    subject = 'chemistry';
    IconComponent = FlaskConical;
    themeColor = 'bg-[#8B5CF6] text-white hover:bg-purple-600 shadow-purple-500/20';
    badgeColor = 'bg-purple-50 text-purple-700 border border-purple-100';
    checkColor = 'text-purple-500';
  } else if (lowerTitle.includes('english')) {
    subject = 'english';
    IconComponent = BookOpen;
    themeColor = 'bg-[#34495E] text-white hover:bg-[#1E293B] shadow-slate-500/20';
    badgeColor = 'bg-slate-100 text-slate-700 border border-slate-200';
    checkColor = 'text-slate-600';
  } else if (lowerTitle.includes('account') || lowerTitle.includes('commerce')) {
    subject = 'accounts';
    IconComponent = Calculator;
    themeColor = 'bg-[#F2994A] text-white hover:bg-orange-600 shadow-orange-500/20';
    badgeColor = 'bg-orange-50 text-orange-700 border border-orange-100';
    checkColor = 'text-orange-500';
  }

  // Predefined checklists for high-quality guidebooks
  const features = [
    'Written legibly and clearly',
    'Vivid description with diagrams',
    'Easy to understand language',
    'Eminent school & college authors',
    'Consolidated Volume I & II'
  ];

  return (
    <div
      className="group bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-2xl hover:border-gray-200 transition-all duration-300 flex flex-col h-full overflow-hidden relative"
      id={`book-card-${book.id}`}
    >
      {/* Subject Header & Icon */}
      {/* Subject Header & Icon (Floating) */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md backdrop-blur-md bg-white/90 ${checkColor}`}>
          <IconComponent className="w-5 h-5" />
        </div>
        <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-md backdrop-blur-md bg-white/90 ${
          book.classType === 'Class 10' ? 'text-blue-600' : 'text-indigo-600'
        }`}>
          {book.classType}
        </span>
      </div>

      {/* Book Cover Container */}
      <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-white flex-shrink-0">
        <Link to={`/book/${book.id}`} className="w-full h-full block">
          {book.coverImage ? (
            <img
              src={typeof book.coverImage === 'string' ? book.coverImage : getUncroppedImageUrl(book.coverImage, 600)}
              alt={book.title}
              className="w-full h-full object-contain bg-white group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50 group-hover:scale-105 transition-transform duration-500">
              <BookCoverPlaceholder title={book.title} classType={book.classType} isLarge={true} />
            </div>
          )}
        </Link>

        {/* Availability Badge */}
        {!book.availability && (
          <div className="absolute top-16 right-4 z-20">
            <span className="px-3 py-1 text-[10px] font-bold rounded-full bg-red-500 text-white shadow-md">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Title & Info */}
      <div className="px-6 pt-4 flex-1 flex flex-col">
        <Link to={`/book/${book.id}`} className="block">
          <h3 className="text-base font-bold text-[#1D1D1F] line-clamp-1 group-hover:text-blue-600 transition-colors duration-200 mb-0.5">
            {book.title.replace(/—.*|Guide.*/i, '').trim()}
          </h3>
          <p className="text-[11px] text-gray-400 font-medium tracking-tight mb-3">
            {book.classType} Guide Book
          </p>
        </Link>

        <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed flex-shrink-0">
          {book.shortDescription || 'A comprehensive guide book crafted by expert teachers to help students excel in examinations.'}
        </p>

        {/* Features list mimicking the reference image */}
        <ul className="space-y-2 mb-6 flex-1">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-[#6E6E73]">
              <Check className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${checkColor}`} />
              <span className="leading-tight">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="h-px bg-gray-100 my-4" />

        {/* Footer actions */}
        <div className="pb-6 flex items-center justify-between gap-4 mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none">Price</span>
            <span className="text-xl font-bold text-[#1D1D1F] mt-1">₹{book.price}</span>
          </div>
          <Link
            to={`/book/${book.id}`}
            className={`flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl font-semibold text-xs transition-all duration-200 shadow-md ${
              book.availability
                ? themeColor
                : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
            }`}
          >
            Buy Now
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

