import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Settings, LogOut, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useSiteSettings } from '../../hooks/useSanity';
import logoImg from '../../assets/logo.jpeg';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const { logout } = useApp();
  const { settings } = useSiteSettings();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/admin/books', icon: BookOpen, label: 'Books', end: false },
    { to: '/admin/settings', icon: Settings, label: 'Settings', end: true },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white">
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100/80">
        <div className="flex items-center gap-3">
          <img 
            src={logoImg} 
            className="w-10 h-10 object-cover rounded-xl border border-gray-200 shadow-sm" 
            alt="Claret Publications Logo" 
          />
          <div>
            <span className="text-sm font-extrabold text-[#0A2540] font-display tracking-tight block">
              {settings.publicationName || 'Claret'}
            </span>
            <p className="text-[9px] text-[#6E6E73] font-bold uppercase tracking-wider">
              Admin Portal
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1.5">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-[#007AFF] text-white shadow-lg shadow-blue-500/15'
                  : 'text-[#6E6E73] hover:bg-gray-50 hover:text-[#1D1D1F]'
              }`
            }
          >
            <item.icon className="w-4.5 h-4.5 stroke-[2]" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-4 pb-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-red-600 rounded-xl hover:bg-red-50 transition-all duration-200"
          id="admin-logout"
        >
          <LogOut className="w-4.5 h-4.5 stroke-[2]" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 bg-white border-r border-gray-100 flex-shrink-0 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-[#0A2540]/30 backdrop-blur-sm" onClick={onClose} />
          <aside className="absolute left-0 top-0 w-72 h-full bg-white shadow-2xl animate-slide-in-right">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
