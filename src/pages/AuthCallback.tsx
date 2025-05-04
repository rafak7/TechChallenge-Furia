import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Função para processar o retorno da autenticação
    const handleAuthCallback = async () => {
      try {
        // Obtém a sessão atual
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        if (data?.session) {
          // Se temos uma sessão, o login foi bem-sucedido
          toast.success("Login realizado com sucesso!", {
            description: "Bem-vindo! Seja um Furioso!",
          });
          
          // Redireciona para a página de fãs
          navigate('/fan');
        } else {
          // Se não temos sessão, algo deu errado
          toast.error("Falha na autenticação", {
            description: "Não foi possível completar o login. Tente novamente."
          });
          navigate('/fan');
        }
      } catch (error) {
        console.error('Erro ao processar callback de autenticação:', error);
        toast.error("Erro no processo de login", {
          description: "Ocorreu um problema durante a autenticação. Tente novamente mais tarde."
        });
        navigate('/fan');
      }
    };

    // Executa a função de callback
    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-furia-black">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-furia-gold mb-4">Processando autenticação...</h2>
        <p className="text-furia-white">Por favor, aguarde enquanto finalizamos seu login.</p>
      </div>
    </div>
  );
};

export default AuthCallback; 