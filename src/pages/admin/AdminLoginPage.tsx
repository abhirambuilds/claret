import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import logoImg from '../../assets/logo.jpeg';

export default function AdminLoginPage() {
  const { login, isAdminLoggedIn } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (isAdminLoggedIn) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay
    await new Promise(r => setTimeout(r, 500));

    const success = login(email, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid email or password. ');
    }
    setIsLoading(false);
  };

  return (
    <div className="py-12 sm:py-20 bg-[#F5F5F7] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Premium background gradient bubble */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md animate-scale-in">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <img
            src={logoImg}
            className="w-16 h-16 object-cover rounded-2xl mx-auto mb-4 shadow-md border border-gray-200"
            alt="Claret Publications Logo"
          />
          <h1 className="text-2xl font-extrabold text-[#0A2540] font-display tracking-tight">
            Admin Portal
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Sign in to manage your publications
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-200/60 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 bg-red-50 text-red-700 rounded-xl text-sm animate-fade-in border border-red-100">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#007AFF] transition-all duration-200 bg-[#F5F5F7]/30"
                  required
                  id="admin-email"
                />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#007AFF] transition-all duration-200 bg-[#F5F5F7]/30"

                  required
                  id="admin-password"
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#007AFF] hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-xl hover:scale-[1.01] transition-all duration-200 text-sm disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              id="admin-login-btn"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
