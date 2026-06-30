import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import EmptyState from '../../components/shared/EmptyState';
import { useAllBooks } from '../../hooks/useSanity';
import { client } from '../../lib/sanity';

export default function AdminBooksPage() {
  const { books, loading, refresh } = useAllBooks();
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredBooks = searchQuery.trim()
    ? books.filter(b =>
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.classType.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : books;

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      await client.delete(id);
      await refresh();
    } catch (error) {
      console.error('Failed to delete book:', error);
      alert('Failed to delete book. Check console for details.');
    } finally {
      setIsDeleting(false);
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="animate-fade-in-up">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A2540] font-display tracking-tight">
            Books
          </h1>
          <p className="text-[#6E6E73] text-sm font-medium mt-1">
            Manage your publication catalog
          </p>
        </div>
        <Link
          to="/admin/books/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-[#007AFF] hover:bg-blue-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/15 hover:shadow-xl transition-all duration-200"
          id="admin-add-book"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Book</span>
        </Link>
      </div>

      {/* Search */}
      <div className="relative w-full sm:w-80 mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search books..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200/80 rounded-xl text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#007AFF] transition-all"
          id="admin-search-books"
        />
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
      </div>

      {/* Books table */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-8 text-center text-[#6E6E73] animate-pulse">
          Loading books from database...
        </div>
      ) : filteredBooks.length > 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm shadow-gray-200/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#F5F5F7]/60 border-b border-gray-200/60">
                <tr>
                  <th className="text-left px-6 py-4 font-bold text-[#6E6E73] text-xs uppercase tracking-wider">Title</th>
                  <th className="text-left px-6 py-4 font-bold text-[#6E6E73] text-xs uppercase tracking-wider hidden md:table-cell">Class</th>
                  <th className="text-left px-6 py-4 font-bold text-[#6E6E73] text-xs uppercase tracking-wider">Price</th>
                  <th className="text-left px-6 py-4 font-bold text-[#6E6E73] text-xs uppercase tracking-wider hidden sm:table-cell">Status</th>
                  <th className="text-right px-6 py-4 font-bold text-[#6E6E73] text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredBooks.map(book => (
                  <tr key={book.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-[#1D1D1F] truncate max-w-[180px] sm:max-w-[300px]">{book.title}</p>
                        <p className="text-xs text-[#6E6E73] font-medium mt-0.5 md:hidden">{book.classType}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
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
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/books/edit/${book.id}`}
                          className="p-2 text-gray-400 hover:text-[#007AFF] rounded-lg hover:bg-blue-50/50 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>

                        {deleteConfirmId === book.id ? (
                          <div className="flex items-center gap-1.5 animate-scale-in">
                            <button
                              disabled={isDeleting}
                              onClick={() => handleDelete(book.id)}
                              className="px-2.5 py-1 text-xs font-bold bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                              {isDeleting ? '...' : 'Confirm'}
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className="px-2.5 py-1 text-xs font-bold bg-gray-100 text-[#6E6E73] rounded-lg hover:bg-gray-200 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmId(book.id)}
                            className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50/50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState
          title="No books found"
          message={searchQuery ? `No books matching "${searchQuery}"` : 'Start by adding your first book.'}
        />
      )}
    </div>
  );
}
