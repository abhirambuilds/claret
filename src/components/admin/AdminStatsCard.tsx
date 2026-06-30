import { TrendingUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

export default function AdminStatsCard({ title, value, icon, color, bgColor }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/60 p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs sm:text-sm font-bold text-[#6E6E73] uppercase tracking-wider mb-2">{title}</p>
          <p className="text-3xl font-extrabold text-[#0A2540] font-display tracking-tight">{value}</p>
        </div>
        <div className={`w-11 h-11 rounded-xl ${bgColor} flex items-center justify-center flex-shrink-0 border border-gray-100/30`}>
          {icon}
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-4 pt-3.5 border-t border-gray-100/80">
        <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
        <span className="text-[11px] text-[#6E6E73] font-semibold">Updated just now</span>
      </div>
    </div>
  );
}
