import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Public pages
import HomePage from './pages/public/HomePage';
import BooksPage from './pages/public/BooksPage';
import AuthorPage from './pages/public/AuthorPage';
import BookDetailPage from './pages/public/BookDetailPage';

// Admin pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminBooksPage from './pages/admin/AdminBooksPage';
import AdminNewBookPage from './pages/admin/AdminNewBookPage';
import AdminEditBookPage from './pages/admin/AdminEditBookPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/author" element={<AuthorPage />} />
            <Route path="/book/:id" element={<BookDetailPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
          </Route>

          {/* Protected admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="books" element={<AdminBooksPage />} />
            <Route path="books/new" element={<AdminNewBookPage />} />
            <Route path="books/edit/:id" element={<AdminEditBookPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
