import { BookOpen, Atom, FlaskConical, Calculator, Pi } from 'lucide-react';

interface BookCoverPlaceholderProps {
  title: string;
  classType: string;
  isLarge?: boolean;
}

export default function BookCoverPlaceholder({ title, classType, isLarge = false }: BookCoverPlaceholderProps) {
  const lowerTitle = title.toLowerCase();
  let subject = 'default';
  
  if (lowerTitle.includes('math')) subject = 'math';
  else if (lowerTitle.includes('physic')) subject = 'physics';
  else if (lowerTitle.includes('chemist')) subject = 'chemistry';
  else if (lowerTitle.includes('english')) subject = 'english';
  else if (lowerTitle.includes('account') || lowerTitle.includes('commerce')) subject = 'accounts';

  let CoverIcon = BookOpen;
  if (subject === 'math') CoverIcon = Pi;
  else if (subject === 'physics') CoverIcon = Atom;
  else if (subject === 'chemistry') CoverIcon = FlaskConical;
  else if (subject === 'accounts') CoverIcon = Calculator;

  const gradientThemes: Record<string, { cover: string; spine: string; iconBg: string }> = {
    math: {
      cover: 'from-blue-600 via-blue-700 to-indigo-900',
      spine: 'math-spine',
      iconBg: 'bg-white/10'
    },
    physics: {
      cover: 'from-[#82BFFD] via-[#73B6FC] to-[#2F80ED]',
      spine: 'math-spine',
      iconBg: 'bg-white/10'
    },
    chemistry: {
      cover: 'from-violet-600 via-purple-700 to-fuchsia-950',
      spine: 'chemistry-spine',
      iconBg: 'bg-white/10'
    },
    english: {
      cover: 'from-slate-600 via-slate-700 to-zinc-900',
      spine: 'english-spine',
      iconBg: 'bg-white/10'
    },
    accounts: {
      cover: 'from-amber-600 via-orange-700 to-amber-950',
      spine: 'accounts-spine',
      iconBg: 'bg-white/10'
    },
    default: {
      cover: classType === 'Class 10' 
        ? 'from-blue-600 via-blue-700 to-indigo-900' 
        : 'from-emerald-600 via-emerald-700 to-teal-900',
      spine: classType === 'Class 10' ? 'math-spine' : 'physics-spine',
      iconBg: 'bg-white/10'
    }
  };

  const theme = gradientThemes[subject];

  return (
    <div className={`flex items-center justify-center w-full h-full p-4 select-none ${isLarge ? 'py-8' : ''}`}>
      <div className="book-3d-wrap">
        <div 
          className="book-3d" 
          style={{ 
            width: isLarge ? '170px' : '130px', 
            height: isLarge ? '250px' : '190px' 
          }}
        >
          {/* Spine */}
          <div className={`book-3d-spine ${theme.spine}`} />

          {/* Front Cover */}
          <div className={`book-3d-front bg-gradient-to-br ${theme.cover} flex flex-col justify-between p-4 text-white shadow-xl`}>
            {/* Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute top-2 left-2 w-16 h-16 border border-white rounded-lg rotate-12" />
              <div className="absolute bottom-6 right-2 w-12 h-12 border border-white rounded-full" />
            </div>

            {/* Top Badge */}
            <div className="relative z-10">
              <span className="text-[8px] tracking-wider uppercase font-semibold text-white/70 bg-white/10 px-2 py-0.5 rounded-full backdrop-blur-sm">
                {classType}
              </span>
            </div>

            {/* Title */}
            <div className="relative z-10 flex-1 flex flex-col justify-center my-2">
              <p className="text-[10px] sm:text-[11px] leading-tight font-extrabold font-display tracking-tight text-white line-clamp-4 text-center">
                {title.toUpperCase()}
              </p>
              <div className="w-8 h-[2px] bg-white/30 mx-auto mt-2 rounded-full" />
            </div>

            {/* Footer */}
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center p-1.5 rounded-lg bg-white/10 mb-1">
                <CoverIcon className="w-3.5 h-3.5 text-white/90" />
              </div>
              <p className="text-[7px] font-bold tracking-widest text-white/50 uppercase leading-none">
                CLARET
              </p>
            </div>
          </div>

          {/* Pages */}
          <div className="book-3d-pages" style={{ transform: `rotateY(90deg) translateZ(${isLarge ? '160px' : '120px'})` }} />
        </div>
      </div>
    </div>
  );
}

