import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { isAuthenticated } from '../../services/authService';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, []);

  // Still checking auth status
  if (isAuth === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8b9a8d] to-[#a8c4a8] flex items-center justify-center animate-pulse mx-auto mb-4">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated, redirect to login
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated, render children
  return <>{children}</>;
}
