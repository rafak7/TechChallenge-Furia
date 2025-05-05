import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import Image from 'next/image';
import { useNavigate } from 'react-router-dom';

const FanSection = () => {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    nome_completo: '',
    email: '',
    time_favorito: '',
    senha: '',
    confirmarSenha: '',
  });
  const [documento, setDocumento] = useState<File | null>(null);
  const [loginData, setLoginData] = useState({
    email: '',
    senha: '',
  });
  const [loginLoading, setLoginLoading] = useState(false);
  const navigate = useNavigate();

  // Verificar se o usuário já está autenticado ao carregar o componente
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData?.session) {
          setUserAuthenticated(true);
        }
      } catch (error) {
        console.error('Erro ao verificar status de autenticação:', error);
      }
    };

    checkAuthStatus();

    // Adicionar listener para mudanças no estado de autenticação
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUserAuthenticated(!!session);
    });

    // Limpar o listener ao desmontar o componente
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, time_favorito: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDocumento(e.target.files[0]);
    }
  };

  const handleRecreateUser = async () => {
    if (!loginData.email || !loginData.senha) {
      toast.error("Por favor, preencha o email e senha para recriar o usuário.");
      return;
    }

    setLoginLoading(true);
    
    try {
      // 1. Primeiro, tentamos obter o usuário atual para ver se existe
      toast.info("Verificando usuário...");
      
      // 2. Tentamos fazer o logout para garantir que não estamos logados
      await supabase.auth.signOut();
      
      // 3. Tentamos remover o usuário antes de recriar (isso só funciona com permissões de admin)
      try {
        // Esta é uma função RPC que você pode criar no Supabase para deletar usuários por email
        // Esta abordagem só funciona se você tiver implementado esta função no Supabase
        await supabase.rpc('admin_delete_user', { user_email: loginData.email });
      } catch (deleteError) {
        console.log('Ignorando erro ao tentar deletar usuário:', deleteError);
        // Ignorar erros aqui, pois pode não ter permissões ou a função não existe
      }
      
      // 4. Criamos um novo usuário com o mesmo email e senha
      toast.info("Recriando usuário...");
      
      const { data, error } = await supabase.auth.signUp({
        email: loginData.email,
        password: loginData.senha,
        options: {
          // Define os metadados do usuário, se necessário
          data: {
            nome_completo: loginData.email.split('@')[0], // Usa parte do email como nome temporário
            email_verified: true // Tenta marcar como verificado (pode não funcionar dependendo das configurações)
          }
        }
      });
      
      if (error) {
        if (error.message?.includes("already registered")) {
          // Se o usuário já existe, tenta fazer login diretamente
          toast.info("Usuário já existe, tentando login direto...");
          
          const { error: loginError } = await supabase.auth.signInWithPassword({
            email: loginData.email,
            password: loginData.senha,
          });
          
          if (loginError) {
            throw loginError;
          }
          
          toast.success("Login realizado com sucesso!", {
            description: "Bem-vindo de volta!"
          });
          
          setUserAuthenticated(true);
        } else {
          throw error;
        }
      } else {
        // Sucesso na criação do usuário, tenta fazer login
        toast.success("Usuário recriado com sucesso!");
        
        // Tenta fazer login automaticamente
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email: loginData.email,
          password: loginData.senha,
        });
        
        if (loginError) {
          throw loginError;
        }
        
        toast.success("Login realizado com sucesso!", {
          description: "Bem-vindo à FURIA!"
        });
        
        setUserAuthenticated(true);
      }
      
      // Limpa o formulário
      setLoginData({
        email: '',
        senha: '',
      });
      
    } catch (error: unknown) {
      console.error('Erro ao recriar usuário:', error);
      const errMsg = error instanceof Error ? error.message : 'Erro desconhecido';
      
      toast.error("Erro ao recriar usuário", {
        description: errMsg
      });
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.email || !loginData.senha) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    setLoginLoading(true);
    
    try {
      // Verificamos primeiro se já existe uma sessão
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (sessionData?.session) {
        const currentUser = sessionData.session.user;
        
        if (currentUser.email === loginData.email) {
          toast.success("Você já está logado!", {
            description: "Bem-vindo de volta à FURIA!"
          });
          
          setLoginData({
            email: '',
            senha: '',
          });
          
          setUserAuthenticated(true);
          setLoginLoading(false);
          return;
        } else {
          // Logout se estiver logado com outro email
          await supabase.auth.signOut();
        }
      }
      
      // Tentamos login normal primeiro
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.senha,
      });

      if (error) {
        console.error('Erro ao fazer login:', error);
        
        // Se for erro de email não confirmado, damos instruções específicas
        if (error.message?.includes("Email not confirmed")) {
          toast.error("Email não confirmado", {
            description: "Você precisa verificar seu email antes de fazer login, ou recriar sua conta.",
            action: {
              label: "Recriar conta",
              onClick: handleRecreateUser
            }
          });
          
          toast.info("Instruções para o administrador", {
            description: "No painel do Supabase, vá em Authentication > Email Templates e desative 'Enable Email Confirmation'.",
            duration: 10000
          });
        } else {
          // Outros erros
          toast.error("Erro ao fazer login", {
            description: error.message || "Verifique suas credenciais e tente novamente."
          });
        }
      } else {
        // Login bem sucedido
        toast.success("Login realizado com sucesso!", {
          description: `Bem-vindo, ${data.user?.user_metadata?.nome_completo || 'Furioso'}!`
        });

        // Limpar formulário
        setLoginData({
          email: '',
          senha: '',
        });
        
        setUserAuthenticated(true);
      }
    } catch (error: unknown) {
      console.error('Erro ao fazer login:', error);
      toast.error("Erro inesperado", {
        description: "Ocorreu um erro inesperado ao tentar fazer login."
      });
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome_completo || !formData.email || !formData.time_favorito || !formData.senha) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      toast.error("As senhas não coincidem.");
      return;
    }

    if (formData.senha.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      // Registrar o usuário no Auth do Supabase - como a confirmação está desabilitada, isso deve funcionar diretamente
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.senha,
        options: {
          data: {
            nome_completo: formData.nome_completo,
            time_favorito: formData.time_favorito,
          }
        }
      });

      if (authError) {
        // Se for erro de email já registrado, podemos tentar fazer login direto
        if (authError.message?.includes("already registered")) {
          toast.info("Email já cadastrado", {
            description: "Tentando fazer login com as credenciais fornecidas..."
          });
          
          const { error: loginError } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.senha,
          });
          
          if (loginError) throw loginError;
          
          toast.success("Login realizado com sucesso!", {
            description: "Bem-vindo de volta à FURIA!"
          });
          
          // Limpar formulário
          setFormData({
            nome_completo: '',
            email: '',
            time_favorito: '',
            senha: '',
            confirmarSenha: '',
          });
          setDocumento(null);
          setLoading(false);
          setUserAuthenticated(true);
          return;
        } else {
          throw authError;
        }
      }

      // Preparar os dados para inserção na tabela personalizada
      const userData = {
        id: authData.user?.id,
        nome_completo: formData.nome_completo,
        email: formData.email,
        time_favorito: formData.time_favorito,
      };

      // Se tiver um documento, converter para base64 e incluir
      if (documento) {
        const fileBuffer = await documento.arrayBuffer();
        const base64String = btoa(
          new Uint8Array(fileBuffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        
        // @ts-expect-error - Adicionamos o documento em base64
        userData.documento = base64String;
      }

      // Inserir dados adicionais no Supabase (tabela personalizada)
      const { error: profileError } = await supabase
        .from('usuarios')
        .insert([userData]);

      if (profileError) throw profileError;

      // Sucesso na inserção e já logado
      toast.success("Cadastro realizado com sucesso!", {
        description: "Bem-vindo à FURIA! Você já está logado."
      });

      // Limpar formulário
      setFormData({
        nome_completo: '',
        email: '',
        time_favorito: '',
        senha: '',
        confirmarSenha: '',
      });
      setDocumento(null);
      setUserAuthenticated(true);

    } catch (error: unknown) {
      console.error('Erro ao cadastrar usuário:', error);
      
      const supabaseError = error as { code?: string; message?: string };
      toast.error("Erro ao cadastrar", {
        description: supabaseError.message || "Ocorreu um erro ao processar seu cadastro. Tente novamente."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleConnect = async () => {
    setGoogleLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      
      if (error) {
        if (error.message?.includes("provider is not enabled")) {
          throw new Error(
            "O provedor Google não está habilitado no Supabase. Para habilitar, siga estes passos:" +
            "\n1. Acesse o painel do Supabase > Authentication > Providers" +
            "\n2. Ative o provedor 'Google'" + 
            "\n3. Configure as credenciais OAuth do Google Cloud Platform"
          );
        } else if (error.message?.includes("redirect_uri_mismatch")) {
          throw new Error(
            "Erro de redirecionamento OAuth. Você precisa adicionar estas URLs aos redirecionamentos autorizados no Console do Google Cloud:" +
            "\n1. https://jmfppsavpczehzqseuyc.supabase.co/auth/v1/callback" +
            "\n2. " + window.location.origin + "/auth/callback"
          );
        }
        throw error;
      }
      
      // Se tudo estiver correto, o usuário será redirecionado para a página do Google para fazer login
      // O retorno acontecerá na URL configurada no Supabase (redirectTo)
      
    } catch (error: unknown) {
      console.error('Erro ao conectar com Google:', error);
      const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro durante a autenticação';
      toast.error("Erro ao conectar com Google", {
        description: errorMessage,
        duration: 6000, // Aumentar a duração do toast para mensagens longas
      });
      setGoogleLoading(false);
    }
  };

  // Componente de sucesso quando o usuário está autenticado
  const SuccessMessage = () => (
    <div className="flex flex-col items-center justify-center h-full py-8 text-center animate-fadeIn">
      <div className="relative w-40 h-40 mb-6 animate-pulse-slow">
        <img 
          src="/images/logo_furia.png" 
          alt="Logo FURIA" 
          width={160} 
          height={160}
          className="object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-furia-gold/0 via-furia-gold/30 to-furia-gold/0 rounded-full blur-xl opacity-70 animate-glow"></div>
      </div>
      
      <h3 className="text-2xl font-bold text-furia-gold font-rajdhani mb-4">
        Agora você é um Furioso!
      </h3>
      
      <p className="text-white mb-8 max-w-md">
        Parabéns! Você agora pode acessar o chat exclusivo de curiosidades e conteúdos especiais da FURIA.
      </p>
      
      <Button 
        className="bg-furia-gold hover:bg-furia-hover text-black font-rajdhani uppercase font-bold tracking-wider text-sm h-11 transition-colors duration-300 px-8"
        onClick={() => navigate('/chat')}
      >
        Acessar o Chat
      </Button>
    </div>
  );

  return (
    <section id="furia-fan" className="pt-0 pb-12 px-4 relative bg-gradient-to-b from-black to-gray-900">
      {/* Decorative elements */}
      {/* <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-furia-gold to-transparent"></div> */}
      
      {/* Animações CSS para o componente de sucesso */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulseSlow {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        @keyframes glow {
          0% { opacity: 0.5; }
          50% { opacity: 0.8; }
          100% { opacity: 0.5; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-pulse-slow {
          animation: pulseSlow 3s infinite ease-in-out;
        }
        
        .animate-glow {
          animation: glow 2s infinite ease-in-out;
        }
      `}} />
      
      <div className="container mx-auto max-w-5xl">
        <h2 className="section-title mb-16 -mt-2 text-center font-rajdhani text-3xl font-bold" data-aos="fade-up">
          Seja um <span className="text-furia-gold">Fã FURIA</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left side - Text */}
          <div className="space-y-5">
            <h3 className="text-2xl font-bold text-furia-gold font-rajdhani">Torne-se um Furioso</h3>
            <p className="text-base">
              Faça parte da torcida mais apaixonada do Brasil e tenha acesso a conteúdos exclusivos, 
              descontos em produtos oficiais e possibilidade de participar de eventos especiais.
            </p>
            
            <div className="space-y-4 mt-2">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-furia-gold mr-3">
                  <span className="font-bold text-black">1</span>
                </div>
                <p className="text-sm">Acesso a conteúdos exclusivos e bastidores</p>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-furia-gold mr-3">
                  <span className="font-bold text-black">2</span>
                </div>
                <p className="text-sm">Descontos em produtos oficiais da FURIA</p>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-furia-gold mr-3">
                  <span className="font-bold text-black">3</span>
                </div>
                <p className="text-sm">Participação exclusiva em eventos e sorteios</p>
              </div>
            </div>
          </div>
          
          {/* Right side - Form or Success Message */}
          <div className="relative mt-2 lg:mt-0">
            {/* Card Background with Gold Gradient Border */}
            <div className="bg-black border border-furia-gold/30 rounded-lg shadow-xl shadow-black/50 p-6 relative overflow-hidden min-h-[540px]">
              {/* Decorative gold corners */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-furia-gold/50 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-furia-gold/50 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-furia-gold/50 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-furia-gold/50 rounded-br-lg"></div>
              
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-furia-gold/10 to-transparent blur-sm"></div>
              
              {userAuthenticated ? (
                <SuccessMessage />
              ) : (
                <Tabs defaultValue="cadastro" className="w-full h-full relative z-10">
                  <TabsList className="w-full grid grid-cols-2 mb-8 bg-furia-darkgray rounded-md overflow-hidden p-0">
                    <TabsTrigger 
                      value="cadastro" 
                      className="py-3.5 font-rajdhani font-bold tracking-wider text-sm data-[state=active]:bg-furia-gold data-[state=active]:text-black data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-white transition-all duration-300">
                      CADASTRO
                    </TabsTrigger>
                    <TabsTrigger 
                      value="login" 
                      className="py-3.5 font-rajdhani font-bold tracking-wider text-sm data-[state=active]:bg-furia-gold data-[state=active]:text-black data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-white transition-all duration-300">
                      LOGIN
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="min-h-[540px]">
                    <TabsContent value="cadastro" className="h-full">
                      <form onSubmit={handleSubmit} className="space-y-4 h-full flex flex-col">
                        <div className="flex-1 space-y-4 overflow-y-auto pr-1 styled-scrollbar">
                          <div className="space-y-1.5">
                            <Label htmlFor="nome_completo" className="text-xs font-medium text-gray-300">Nome Completo</Label>
                            <Input 
                              id="nome_completo" 
                              value={formData.nome_completo}
                              onChange={handleChange}
                              required 
                              placeholder="Digite seu nome completo" 
                              className="bg-furia-darkgray/70 border-furia-gold/20 focus:border-furia-gold h-10 font-inter text-sm placeholder:text-gray-500" 
                            />
                          </div>
                          
                          <div className="space-y-1.5">
                            <Label htmlFor="email" className="text-xs font-medium text-gray-300">E-mail</Label>
                            <Input 
                              id="email" 
                              type="email" 
                              value={formData.email}
                              onChange={handleChange}
                              required 
                              placeholder="exemplo@email.com" 
                              className="bg-furia-darkgray/70 border-furia-gold/20 focus:border-furia-gold h-10 font-inter text-sm placeholder:text-gray-500" 
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-1.5">
                              <Label htmlFor="senha" className="text-xs font-medium text-gray-300">Senha</Label>
                              <Input 
                                id="senha" 
                                type="password" 
                                value={formData.senha}
                                onChange={handleChange}
                                required 
                                placeholder="Digite sua senha" 
                                className="bg-furia-darkgray/70 border-furia-gold/20 focus:border-furia-gold h-10 font-inter text-sm placeholder:text-gray-500" 
                              />
                            </div>

                            <div className="space-y-1.5">
                              <Label htmlFor="confirmarSenha" className="text-xs font-medium text-gray-300">Confirmar Senha</Label>
                              <Input 
                                id="confirmarSenha" 
                                type="password" 
                                value={formData.confirmarSenha}
                                onChange={handleChange}
                                required 
                                placeholder="Confirme sua senha" 
                                className="bg-furia-darkgray/70 border-furia-gold/20 focus:border-furia-gold h-10 font-inter text-sm placeholder:text-gray-500" 
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-1.5">
                            <Label htmlFor="time_favorito" className="text-xs font-medium text-gray-300">Time Favorito</Label>
                            <Select 
                              value={formData.time_favorito} 
                              onValueChange={handleSelectChange}
                            >
                              <SelectTrigger className="bg-furia-darkgray/70 border-furia-gold/20 focus:border-furia-gold h-10 font-inter text-sm">
                                <SelectValue placeholder="Selecione seu time favorito" />
                              </SelectTrigger>
                              <SelectContent className="bg-furia-darkgray border-furia-gold/20 text-white">
                                <SelectItem value="cs" className="text-white focus:text-white hover:text-white focus:bg-black/50 hover:bg-black/50">Counter-Strike</SelectItem>
                                <SelectItem value="valorant" className="text-white focus:text-white hover:text-white focus:bg-black/50 hover:bg-black/50">Valorant</SelectItem>
                                <SelectItem value="king-league" className="text-white focus:text-white hover:text-white focus:bg-black/50 hover:bg-black/50">King League</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-1.5">
                            <Label htmlFor="documento" className="text-xs font-medium text-gray-300">Documento (opcional)</Label>
                            <Input 
                              id="documento" 
                              type="file" 
                              onChange={handleFileChange}
                              className="bg-furia-darkgray/70 border-furia-gold/20 focus:border-furia-gold text-xs h-10 file:bg-furia-gold/90 file:text-black file:border-0 file:h-full file:px-3 file:mr-3 file:font-medium" 
                            />
                            <p className="text-xs text-gray-500 mt-1">Upload de documento para verificação (opcional)</p>
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <Button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-furia-gold hover:bg-furia-hover text-black font-rajdhani uppercase font-bold tracking-wider text-sm h-11 transition-colors duration-300"
                          >
                            {loading ? 'Cadastrando...' : 'Cadastrar'}
                          </Button>
                        </div>
                        
                        <div className="relative flex items-center py-2">
                          <div className="flex-grow border-t border-gray-700"></div>
                          <span className="flex-shrink mx-3 text-gray-500 text-xs">ou</span>
                          <div className="flex-grow border-t border-gray-700"></div>
                        </div>
                        
                        <Button 
                          type="button" 
                          variant="ghost"
                          disabled={googleLoading}
                          className="w-full bg-transparent border border-gray-700 hover:border-furia-gold/50 hover:shadow-[0_0_10px_rgba(212,175,55,0.2)] hover:bg-transparent hover:text-white text-white font-inter text-sm h-11 transition-all duration-300 group"
                          onClick={handleGoogleConnect}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" className="mr-2 group-hover:scale-110 transition-transform duration-300">
                            <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z" />
                            <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z" />
                            <path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z" />
                            <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z" />
                          </svg>
                          <span className="relative inline-block group-hover:text-furia-gold transition-colors duration-300">
                            {googleLoading ? 'Conectando...' : 'Conectar com Google'}
                            <span className="absolute left-0 right-0 bottom-0 h-px w-0 bg-furia-gold group-hover:w-full transition-all duration-300"></span>
                          </span>
                        </Button>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="login" className="h-full">
                      <form onSubmit={handleLogin} className="space-y-4 h-full flex flex-col">
                        <div className="flex-1 space-y-4">
                          <div className="space-y-1.5">
                            <Label htmlFor="email" className="text-xs font-medium text-gray-300">E-mail</Label>
                            <Input 
                              id="email" 
                              type="email" 
                              value={loginData.email}
                              onChange={handleLoginChange}
                              required 
                              placeholder="exemplo@email.com" 
                              className="bg-furia-darkgray/70 border-furia-gold/20 focus:border-furia-gold h-10 font-inter text-sm placeholder:text-gray-500" 
                            />
                          </div>
                          
                          <div className="space-y-1.5">
                            <Label htmlFor="senha" className="text-xs font-medium text-gray-300">Senha</Label>
                            <Input 
                              id="senha" 
                              type="password" 
                              value={loginData.senha}
                              onChange={handleLoginChange}
                              required 
                              placeholder="Digite sua senha" 
                              className="bg-furia-darkgray/70 border-furia-gold/20 focus:border-furia-gold h-10 font-inter text-sm placeholder:text-gray-500" 
                            />
                          </div>
                          
                          <div className="flex justify-end">
                            <button type="button" className="text-xs text-furia-gold hover:text-furia-hover transition-colors">
                              Esqueceu sua senha?
                            </button>
                          </div>
                          
                          <div className="mt-6 mb-6">
                            <div className="relative">
                              <div className="absolute -inset-0.5 bg-gradient-to-r from-furia-gold/0 via-furia-gold/20 to-furia-gold/0 rounded-lg blur"></div>
                              <div className="relative bg-furia-darkgray border border-furia-gold/30 p-4 rounded-lg">
                                <div className="flex items-center border-b border-furia-gold/20 pb-3 mb-3">
                                  <div className="bg-gradient-to-r from-furia-gold to-furia-hover text-black rounded-full w-7 h-7 flex items-center justify-center mr-2">
                                    <span className="font-bold text-xs">F</span>
                                  </div>
                                  <h4 className="font-rajdhani font-bold text-sm text-furia-gold">BENEFÍCIOS EXCLUSIVOS</h4>
                                </div>
                                
                                <ul className="space-y-2.5">
                                  <li className="flex items-start">
                                    <svg className="w-3.5 h-3.5 text-furia-gold mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                    <span className="text-xs text-gray-300">Acesso a conteúdos exclusivos e bastidores dos times</span>
                                  </li>
                                  <li className="flex items-start">
                                    <svg className="w-3.5 h-3.5 text-furia-gold mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                    <span className="text-xs text-gray-300">Descontos exclusivos em produtos oficiais da FURIA</span>
                                  </li>
                                  <li className="flex items-start">
                                    <svg className="w-3.5 h-3.5 text-furia-gold mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                    <span className="text-xs text-gray-300">Participação em sorteios exclusivos de produtos</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <Button 
                            type="submit" 
                            disabled={loginLoading}
                            className="w-full bg-furia-gold hover:bg-furia-hover text-black font-rajdhani uppercase font-bold tracking-wider text-sm h-11 transition-colors duration-300"
                          >
                            {loginLoading ? 'Entrando...' : 'Entrar'}
                          </Button>
                        </div>
                        
                        <div className="relative flex items-center py-2">
                          <div className="flex-grow border-t border-gray-700"></div>
                          <span className="flex-shrink mx-3 text-gray-500 text-xs">ou</span>
                          <div className="flex-grow border-t border-gray-700"></div>
                        </div>
                        
                        <Button 
                          type="button" 
                          variant="ghost"
                          disabled={googleLoading}
                          className="w-full bg-transparent border border-gray-700 hover:border-furia-gold/50 hover:shadow-[0_0_10px_rgba(212,175,55,0.2)] hover:bg-transparent hover:text-white text-white font-inter text-sm h-11 transition-all duration-300 group"
                          onClick={handleGoogleConnect}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" className="mr-2 group-hover:scale-110 transition-transform duration-300">
                            <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z" />
                            <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z" />
                            <path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z" />
                            <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z" />
                          </svg>
                          <span className="relative inline-block group-hover:text-furia-gold transition-colors duration-300">
                            {googleLoading ? 'Conectando...' : 'Conectar com Google'}
                            <span className="absolute left-0 right-0 bottom-0 h-px w-0 bg-furia-gold group-hover:w-full transition-all duration-300"></span>
                          </span>
                        </Button>
                      </form>
                    </TabsContent>
                  </div>
                </Tabs>
              )}
            </div>
            
            {/* Extra Decorative Effect */}
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-furia-gold/50 to-transparent blur-sm"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FanSection;
