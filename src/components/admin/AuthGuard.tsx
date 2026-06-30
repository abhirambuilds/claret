import { Navigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAdminLoggedIn } = useApp();

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
