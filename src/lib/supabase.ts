import { createClient } from '@supabase/supabase-js';

// Inicialização do cliente Supabase usando variáveis de ambiente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Verificar se as variáveis de ambiente estão definidas
if (!supabaseUrl || !supabaseKey) {
  console.error(
    'As variáveis de ambiente do Supabase não estão configuradas corretamente. ' +
    'Verifique se o arquivo .env está configurado adequadamente.'
  );
}

// Criar e exportar cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseKey); 