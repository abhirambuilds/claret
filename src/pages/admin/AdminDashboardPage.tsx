import { BookOpen, Book as BookIcon, CheckCircle, BarChart3 } from 'lucide-react';
import { useAllBooks } from '../../hooks/useSanity';
import AdminStatsCard from '../../components/admin/AdminStatsCard';

export default function AdminDashboardPage() {
  const { books, loading } = useAllBooks();

  const totalBooks = books.length;
  const class10Books = books.filter(b => b.classType === 'Class 10').length;
  const interBooks = books.filter(b => b.classType === 'Inter').length;
  const availableBooks = books.filter(b => b.availability).length;

  return (
    <div className="animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A2540] font-display tracking-tight">
          Dashboard
        </h1>
        <p className="text-[#6E6E73] text-sm font-medium mt-1">
          Overview of your publications
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <AdminStatsCard
          title="Total Books"
          value={totalBooks}
          icon={<BarChart3 className="w-5 h-5 text-[#0A2540]" />}
          color="text-[#0A2540]"
          bgColor="bg-gray-100/80"
        />
        <AdminStatsCard
          title="Class 10 Books"
          value={class10Books}
          icon={<BookOpen className="w-5 h-5 text-[#007AFF]" />}
          color="text-[#007AFF]"
          bgColor="bg-blue-50/60"
        />
        <AdminStatsCard
          title="Inter Books"
          value={interBooks}
          icon={<BookIcon className="w-5 h-5 text-indigo-600" />}
          color="text-indigo-600"
          bgColor="bg-indigo-50/60"
        />
        <AdminStatsCard
          title="Available Books"
          value={availableBooks}
          icon={<CheckCircle className="w-5 h-5 text-emerald-600" />}
          color="text-emerald-600"
          bgColor="bg-emerald-50/60"
        />
      </div>

      {/* Recent books */}
      <div className="mt-8 sm:mt-10">
        <h2 className="text-lg sm:text-xl font-extrabold text-[#0A2540] font-display tracking-tight mb-4">
          Recent Publications
        </h2>
        <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm shadow-gray-200/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#F5F5F7]/60 border-b border-gray-200/60">
                <tr>
                  <th className="text-left px-6 py-4 font-bold text-[#6E6E73] text-xs uppercase tracking-wider">Title</th>
                  <th className="text-left px-6 py-4 font-bold text-[#6E6E73] text-xs uppercase tracking-wider hidden sm:table-cell">Class</th>
                  <th className="text-left px-6 py-4 font-bold text-[#6E6E73] text-xs uppercase tracking-wider">Price</th>
                  <th className="text-left px-6 py-4 font-bold text-[#6E6E73] text-xs uppercase tracking-wider hidden sm:table-cell">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {books.slice(0, 5).map(book => (
                  <tr key={book.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-[#1D1D1F] truncate max-w-[200px] sm:max-w-[300px]">{book.title}</p>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${
                        book.classType === 'Class 10'
                          ? 'bg-blue-50 text-blue-600 border-blue-100/80'
                          : 'bg-emerald-50 text-emerald-600 border-emerald-100/80'
                      }`}>
                        {book.classType}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-[#0A2540]">₹{book.price}</td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${
                        book.availability
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100/60'
                          : 'bg-red-50 text-red-600 border-red-100/60'
                      }`}>
                        {book.availability ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
