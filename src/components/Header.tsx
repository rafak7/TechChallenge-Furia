import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { MessageSquare, Lock, LogOut, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from 'sonner';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<{ email: string; nome_completo?: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar o estado de autenticação ao carregar o componente
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
      
      if (data.session) {
        // Obter informações do usuário
        setUserInfo({
          email: data.session.user.email || '',
          nome_completo: data.session.user.user_metadata?.nome_completo
        });
      }
      
      setLoading(false);
    };

    checkAuth();

    // Ouvir mudanças no estado de autenticação
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      
      if (session) {
        setUserInfo({
          email: session.user.email || '',
          nome_completo: session.user.user_metadata?.nome_completo
        });
      } else {
        setUserInfo(null);
      }
    });

    return () => {
      // Limpar o listener quando o componente for desmontado
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Você foi desconectado com sucesso");
      navigate('/');
    } catch (error) {
      console.error('Erro ao deslogar:', error);
      toast.error("Erro ao deslogar", {
        description: "Tente novamente em alguns instantes."
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-sm z-50 border-b border-furia-gold/30 relative">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <div className="w-16 h-16 flex items-center justify-center bg-black border-2 border-furia-gold rounded-full overflow-hidden group-hover:border-furia-hover transition-colors">
            <img
              src="/images/logo_furia.png"
              alt="Logo FURIA"
              className="w-12 h-12 object-contain"
            />
          </div>
          <h1 className="ml-3 text-xl md:text-2xl font-rajdhani font-bold">
            <span className="text-furia-white group-hover:text-furia-hover transition-colors">FURIA</span>
          </h1>
        </Link>
        
        <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
          <ul className="flex space-x-10 font-rajdhani text-lg">
            <li><Link to="/" className="hover:text-furia-hover transition-colors font-medium">SOBRE</Link></li>
            <li><Link to="/teams" className="hover:text-furia-hover transition-colors font-medium">TIMES</Link></li>
            <li><Link to="/fan" className="hover:text-furia-hover transition-colors font-medium">SEJA UM FÃ</Link></li>
          </ul>
        </nav>
        
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link to="/chat">
                <Button className="bg-furia-gold text-black font-rajdhani uppercase tracking-wider px-6 py-5 font-bold transition-all duration-300 hover:bg-furia-hover hover:scale-105 shadow-md hover:shadow-furia-gold/50 animate-glow flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Entrar no Chat
                </Button>
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="border-furia-gold/50 ml-2 rounded-full bg-black hover:bg-gray-900">
                    <User className="h-5 w-5 text-furia-gold" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border-furia-gold/50 bg-black text-white">
                  <DropdownMenuLabel className="text-furia-gold">
                    {userInfo?.nome_completo || userInfo?.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-furia-gold/30" />
                  <DropdownMenuItem 
                    className="cursor-pointer hover:bg-furia-gold/10 focus:bg-furia-gold/10"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Deslogar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/fan">
                    <Button className="bg-gray-700 text-gray-300 font-rajdhani uppercase tracking-wider px-6 py-5 font-bold transition-all duration-300 hover:bg-gray-600 flex items-center gap-2 opacity-80">
                      <Lock className="h-5 w-5" />
                      Entrar no Chat
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="bg-black border border-furia-gold/50 text-white p-3 max-w-xs">
                  <p>Você precisa estar logado para acessar o chat. Clique para fazer login.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
      
      {/* Divisor dourado */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-furia-gold to-transparent"></div>
    </header>
  );
};

export default Header;
