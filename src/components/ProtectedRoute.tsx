import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    // Ainda carregando
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-furia-gold"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    toast.error("Acesso restrito", {
      description: "Você precisa estar logado para acessar esta página."
    });
    return <Navigate to="/fan" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 