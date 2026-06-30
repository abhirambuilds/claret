import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AuthGuard from '../components/admin/AuthGuard';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-[#F5F5F7] font-sans">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 min-w-0">
          {/* Mobile header */}
          <header className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-200/60 px-4 py-4 flex items-center gap-3 shadow-sm shadow-gray-200/20">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-[#6E6E73] hover:text-[#007AFF] rounded-xl hover:bg-gray-50 transition-all duration-200"
              id="admin-mobile-menu"
            >
              <Menu className="w-5 h-5 stroke-[2]" />
            </button>
            <span className="text-base font-extrabold text-[#0A2540] font-display tracking-tight">
              Admin Panel
            </span>
          </header>

          <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
