import { Link } from 'react-router-dom';
import { Mail, Phone, MessageCircle, Settings } from 'lucide-react';
import { useSiteSettings } from '../../hooks/useSanity';
import logoImg from '../../assets/logo.jpeg';

export default function Footer() {
  const { settings } = useSiteSettings();

  const whatsappLink = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent('Hello! I would like to enquire about your publications.')}`;

  return (
    <footer className="bg-primary-950 text-white" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <img 
                src={logoImg} 
                className="w-10 h-10 object-cover rounded-xl border border-white/10 group-hover:scale-105 transition-transform duration-300" 
                alt={`${settings.publicationName || 'Claret'} Logo`} 
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold font-display text-white group-hover:text-blue-300 transition-colors duration-200">
                  {settings.publicationName || 'Claret'}
                </span>
                <span className="text-[9px] text-blue-200/50 uppercase tracking-wider font-semibold">
                  Educational Publications
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your trusted source for high-quality educational guide books for 11th class. Empowering academic excellence.
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-green-600/10 hover:scale-[1.02] transition-all duration-200"
              id="footer-whatsapp"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Home</Link>
              </li>
              <li>
                <Link to="/books" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Class 11th Books</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <a href={`mailto:${settings.contactEmail}`} className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  {settings.contactEmail}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <a href={`tel:+${settings.whatsappNumber}`} className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  {settings.whatsappNumber.startsWith('91') ? '+91 ' + settings.whatsappNumber.slice(2) : settings.whatsappNumber}
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/books" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  📗 Class 11th Guide Books
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} {settings.publicationName}. All rights reserved.
          </p>
          <Link
            to="/admin/login"
            className="text-gray-600 hover:text-gray-400 text-xs transition-colors duration-200 flex items-center gap-1"
            id="footer-admin-link"
          >
            <Settings className="w-3 h-3" />
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
