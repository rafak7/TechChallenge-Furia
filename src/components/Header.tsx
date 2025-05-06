import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { MessageSquare, Lock, LogOut, Gem, Menu, X } from 'lucide-react';
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
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<{ 
    email: string; 
    nome_completo?: string; 
    time_favorito?: string;
    avatar_url?: string;
  } | null>(null);
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
          nome_completo: data.session.user.user_metadata?.nome_completo,
          time_favorito: data.session.user.user_metadata?.time_favorito,
          avatar_url: data.session.user.user_metadata?.avatar_url
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
          nome_completo: session.user.user_metadata?.nome_completo,
          time_favorito: session.user.user_metadata?.time_favorito,
          avatar_url: session.user.user_metadata?.avatar_url
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

  // Função para obter as iniciais do nome
  const getInitials = (name?: string): string => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Função para determinar a cor do avatar com base no time favorito
  const getAvatarColor = (time?: string): string => {
    if (!time) return 'bg-furia-gold';
    
    switch (time) {
      case 'cs':
        return 'bg-gradient-to-br from-furia-gold to-amber-600';
      case 'valorant':
        return 'bg-gradient-to-br from-rose-600 to-furia-gold';
      case 'king-league':
        return 'bg-gradient-to-br from-purple-600 to-furia-gold';
      default:
        return 'bg-gradient-to-br from-furia-gold to-amber-400';
    }
  };

  // Função para obter o nome do time
  const getTeamName = (teamCode?: string): string => {
    if (!teamCode) return '';
    
    const teams: Record<string, string> = {
      'cs': 'Counter-Strike',
      'valorant': 'Valorant',
      'king-league': 'King League'
    };
    
    return teams[teamCode] || '';
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
        
        {/* Navegação para desktop */}
        <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
          <ul className="flex space-x-10 font-rajdhani text-lg">
            <li><Link to="/" className="hover:text-furia-hover transition-colors font-medium">SOBRE</Link></li>
            <li><Link to="/teams" className="hover:text-furia-hover transition-colors font-medium">TIMES</Link></li>
            <li><Link to="/fan" className="hover:text-furia-hover transition-colors font-medium">SEJA UM FÃ</Link></li>
          </ul>
        </nav>
        
        <div className="flex items-center gap-3">
          {/* Menu hamburguer para mobile */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button 
                variant="outline" 
                size="icon" 
                className="border-furia-gold/50 rounded-full bg-black hover:bg-gray-900 p-2 hover:border-furia-gold hover:shadow-md hover:shadow-furia-gold/20 transition-all duration-300"
              >
                <Menu className="h-5 w-5 text-furia-gold" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-black/95 backdrop-blur-md border-r border-furia-gold/30 text-white">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-center py-6 border-b border-furia-gold/20">
                  <div className="w-12 h-12 flex items-center justify-center bg-black border-2 border-furia-gold rounded-full overflow-hidden">
                    <img
                      src="/images/logo_furia.png"
                      alt="Logo FURIA"
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <h2 className="ml-3 text-xl font-rajdhani font-bold text-furia-gold">
                    FURIA
                  </h2>
                </div>
                
                <nav className="py-6">
                  <ul className="space-y-4 font-rajdhani text-lg">
                    <li className="px-4 py-2 hover:bg-furia-gold/10 rounded-md transition-colors">
                      <Link to="/" className="block">SOBRE</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-furia-gold/10 rounded-md transition-colors">
                      <Link to="/teams" className="block">TIMES</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-furia-gold/10 rounded-md transition-colors">
                      <Link to="/fan" className="block">SEJA UM FÃ</Link>
                    </li>
                  </ul>
                </nav>
                
                {isAuthenticated ? (
                  <div className="mt-auto border-t border-furia-gold/20 pt-4 px-4">
                    <Link to="/chat" className="block mb-4">
                      <Button className="w-full bg-furia-gold text-black font-rajdhani uppercase tracking-wider py-3 font-bold transition-all duration-300 hover:bg-furia-hover shadow-md hover:shadow-furia-gold/50 flex items-center justify-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Entrar no Chat
                      </Button>
                    </Link>
                    <div className="flex items-center mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={userInfo?.avatar_url || undefined} alt={userInfo?.nome_completo || "Usuário"} />
                        <AvatarFallback className={getAvatarColor(userInfo?.time_favorito)}>
                          {getInitials(userInfo?.nome_completo)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-3">
                        <p className="font-medium text-furia-gold">{userInfo?.nome_completo || "Furioso"}</p>
                        <p className="text-xs text-gray-400 truncate max-w-[180px]">{userInfo?.email}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full border-red-900/50 text-red-400 hover:bg-red-900/30 hover:text-red-300 group"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2 group-hover:translate-x-[-2px] transition-transform duration-200" />
                      Deslogar
                    </Button>
                  </div>
                ) : (
                  <div className="mt-auto border-t border-furia-gold/20 pt-4 px-4">
                    <Link to="/fan" className="block">
                      <Button className="w-full bg-gray-700 text-gray-300 font-rajdhani uppercase tracking-wider py-3 font-bold transition-all duration-300 hover:bg-gray-600 flex items-center justify-center gap-2 opacity-80">
                        <Lock className="h-4 w-4" />
                        Entrar no Chat
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
          
          {isAuthenticated ? (
            <>
              <Link to="/chat" className="hidden sm:block">
                <Button className="bg-furia-gold text-black font-rajdhani uppercase tracking-wider px-6 py-5 font-bold transition-all duration-300 hover:bg-furia-hover hover:scale-105 shadow-md hover:shadow-furia-gold/50 animate-glow flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Entrar no Chat
                </Button>
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="border-furia-gold/50 ml-2 rounded-full bg-black hover:bg-gray-900 p-0 overflow-hidden hover:border-furia-gold hover:shadow-md hover:shadow-furia-gold/20 transition-all duration-300 scale-100 hover:scale-105">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={userInfo?.avatar_url || undefined} alt={userInfo?.nome_completo || "Usuário"} />
                      <AvatarFallback className={getAvatarColor(userInfo?.time_favorito)}>
                        {getInitials(userInfo?.nome_completo)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border-furia-gold/50 bg-black/95 backdrop-blur-md text-white w-72 p-2 shadow-lg shadow-furia-gold/10 mt-1">
                  <div className="flex items-start p-3 pb-3">
                    <Avatar className="h-12 w-12 shrink-0">
                      <AvatarImage src={userInfo?.avatar_url || undefined} alt={userInfo?.nome_completo || "Usuário"} />
                      <AvatarFallback className={getAvatarColor(userInfo?.time_favorito)}>
                        {getInitials(userInfo?.nome_completo)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-3 flex-1">
                      <DropdownMenuLabel className="text-furia-gold font-rajdhani font-bold p-0 text-base">
                        {userInfo?.nome_completo || "Furioso"}
                      </DropdownMenuLabel>
                      <p className="text-xs text-gray-400 break-words w-full">{userInfo?.email}</p>
                      {userInfo?.time_favorito && (
                        <div className="flex items-center mt-1">
                          <Gem className="h-3 w-3 text-furia-gold mr-1" />
                          <span className="text-xs text-furia-gold/80">
                            Fã de {getTeamName(userInfo.time_favorito)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <DropdownMenuSeparator className="bg-furia-gold/30 my-1" />
                  
                  <DropdownMenuItem 
                    className="cursor-pointer hover:bg-red-900/30 focus:bg-red-900/30 rounded-md px-3 py-2 font-medium text-sm text-red-400 hover:text-red-300 transition-all duration-200 group"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-3 group-hover:translate-x-[-2px] transition-transform duration-200" />
                    <span className="group-hover:font-semibold transition-all duration-200">Deslogar</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/fan" className="hidden sm:block">
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
