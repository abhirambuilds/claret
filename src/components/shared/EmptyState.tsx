import { BookOpen } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title = 'No items found',
  message = 'There are no items to display at the moment.',
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 animate-fade-in">
      <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-6">
        {icon || <BookOpen className="w-10 h-10 text-gray-300" />}
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 text-center max-w-sm">{message}</p>
    </div>
  );
}
