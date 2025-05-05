import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    // Função para processar o retorno da autenticação
    const handleAuthCallback = async () => {
      try {
        console.log("Processando callback de autenticação");
        
        // Verifica se há código de erro na URL
        const urlParams = new URLSearchParams(window.location.search);
        const errorCode = urlParams.get('error');
        const errorDescription = urlParams.get('error_description');
        
        if (errorCode) {
          console.error(`Erro na autenticação OAuth: ${errorCode} - ${errorDescription}`);
          setError(`${errorCode}: ${errorDescription}`);
          toast.error("Erro na autenticação", {
            description: errorDescription || "Houve um problema ao autenticar com o provedor.",
          });
          setIsProcessing(false);
          setTimeout(() => navigate('/fan'), 3000);
          return;
        }
        
        // Obtém a sessão atual
        const { data, error } = await supabase.auth.getSession();
        console.log("Dados da sessão:", data?.session ? "Sessão ativa" : "Sem sessão");
        
        if (error) {
          console.error("Erro ao obter sessão:", error);
          throw error;
        }

        if (data?.session) {
          console.log("Usuário autenticado:", {
            id: data.session.user.id,
            email: data.session.user.email,
            provider: data.session.user.app_metadata?.provider,
            hasMetadata: !!data.session.user.user_metadata
          });
          
          // Verificando se temos metadados do usuário
          if (!data.session.user.user_metadata?.nome_completo && data.session.user.user_metadata?.full_name) {
            // Atualiza os metadados para incluir o campo nome_completo
            await supabase.auth.updateUser({
              data: {
                nome_completo: data.session.user.user_metadata.full_name,
                time_favorito: 'cs', // Valor padrão
                ...data.session.user.user_metadata
              }
            });
            console.log("Metadados atualizados com nome completo");
          }
          
          // Verifica se o usuário existe na tabela usuarios_teste
          const provider = data.session.user.app_metadata?.provider;
          if (provider === 'google') {
            const { data: userData, error: userError } = await supabase
              .from('usuarios_teste')
              .select('*')
              .eq('id', data.session.user.id)
              .single();
              
            if (userError && userError.code !== 'PGRST116') { // PGRST116 é o código para "nenhum resultado encontrado"
              console.error("Erro ao verificar usuário na tabela:", userError);
            }
            
            // Se o usuário não existe na tabela, tenta criar
            if (!userData) {
              console.log("Criando registro de usuário na tabela usuarios_teste");
              const { error: insertError } = await supabase
                .from('usuarios_teste')
                .insert([{
                  id: data.session.user.id,
                  nome_completo: data.session.user.user_metadata?.nome_completo || data.session.user.user_metadata?.full_name || data.session.user.email?.split('@')[0] || 'Usuário',
                  email: data.session.user.email || '',
                  time_favorito: data.session.user.user_metadata?.time_favorito || 'cs',
                  endereco: data.session.user.user_metadata?.endereco || '',
                  cpf: data.session.user.user_metadata?.cpf || ''
                }]);
                
              if (insertError) {
                console.error("Erro ao inserir usuário na tabela:", insertError);
                // Não bloqueia o fluxo, apenas registra o erro
              } else {
                console.log("Usuário inserido na tabela com sucesso");
              }
            }
          }
          
          // Se temos uma sessão, o login foi bem-sucedido
          toast.success("Login realizado com sucesso!", {
            description: "Bem-vindo! Seja um Furioso!",
          });
          
          // Redireciona para a página de fãs
          setIsProcessing(false);
          navigate('/fan');
        } else {
          // Se não temos sessão, algo deu errado
          console.error("Sem sessão após autenticação");
          setError("Nenhuma sessão encontrada após o login");
          toast.error("Falha na autenticação", {
            description: "Não foi possível completar o login. Tente novamente."
          });
          setIsProcessing(false);
          setTimeout(() => navigate('/fan'), 3000);
        }
      } catch (error: unknown) {
        console.error('Erro ao processar callback de autenticação:', error);
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
        setError(errorMessage);
        toast.error("Erro no processo de login", {
          description: "Ocorreu um problema durante a autenticação. Tente novamente mais tarde."
        });
        setIsProcessing(false);
        setTimeout(() => navigate('/fan'), 3000);
      }
    };

    // Executa a função de callback
    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-furia-black">
      <div className="text-center max-w-md px-4">
        <h2 className="text-2xl font-bold text-furia-gold mb-4">
          {isProcessing ? "Processando autenticação..." : error ? "Falha na autenticação" : "Autenticação concluída!"}
        </h2>
        <p className="text-furia-white mb-4">
          {isProcessing 
            ? "Por favor, aguarde enquanto finalizamos seu login." 
            : error 
              ? "Ocorreu um erro durante o processo de autenticação. Você será redirecionado em instantes." 
              : "Login realizado com sucesso! Redirecionando..."}
        </p>
        
        {error && (
          <div className="bg-red-900/30 p-4 rounded-md text-left mt-4 overflow-auto max-h-60">
            <p className="text-xs text-red-300 font-mono break-words">{error}</p>
          </div>
        )}
        
        {isProcessing && (
          <div className="mt-6 flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-furia-gold"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCallback; 