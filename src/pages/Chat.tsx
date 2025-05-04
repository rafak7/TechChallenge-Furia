import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCheck, Send, ArrowLeft, User, Users, Star, Clock, Shield, ArrowUp, Info } from "lucide-react";
import NoiseBackground from '@/components/NoiseBackground';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

// Interface para os dados do Supabase
interface CuriosidadeFuria {
  id: string; // UUID
  categoria: string;
  texto: string;
  fonte?: string;
  created_at?: string;
}

// Configuração do Supabase - Lendo do .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// Configuração da OpenAI - Lendo do .env
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || "";

// Dados iniciais para o Supabase, caso a tabela esteja vazia
const dadosIniciais = [
  {
    categoria: "fundacao",
    texto: "A FURIA Esports foi fundada em 2017 pelos empresários Jaime Pádua e André Akkari."
  },
  {
    categoria: "csgo",
    texto: "O time de CS:GO da FURIA é composto por arT (capitão), KSCERATO, yuurih, drop e saffee."
  },
  {
    categoria: "geral",
    texto: "A FURIA tem equipes em vários jogos como CS:GO, Valorant, Free Fire, Rainbow Six e outros títulos de esports."
  },
  {
    categoria: "conquistas",
    texto: "A FURIA alcançou o 3º lugar no ranking mundial de CS:GO da HLTV em 2020."
  },
  {
    categoria: "geral",
    texto: "As cores oficiais da FURIA são preto e dourado, representando elegância e vitória."
  }
];

const Chat = () => {
  const [messages, setMessages] = useState<{ 
    text: string; 
    user: string; 
    time: string;
    isAdmin?: boolean;
    isBot?: boolean;
    userColor?: string;
  }[]>([
    { 
      text: "Olá! Eu sou o FURIABot 🤖. Estou aqui para responder suas perguntas sobre a FURIA Esports. O que você gostaria de saber?", 
      user: "FURIABot", 
      time: "Agora",
      isBot: true,
      userColor: "#ffcc00"
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  // Lista de emojis comuns para perguntas
  const emojis = ["🔥", "👏", "💪", "🏆", "👊", "⚽", "🎮", "❤️", "😍", "🇧🇷", "❓", "🤔", "📊"];
  
  // Base de conhecimento sobre a FURIA
  const knowledgeBase = {
    // Informações gerais
    geral: [
      "A FURIA Esports é uma organização brasileira de esportes eletrônicos fundada em 2017.",
      "As cores oficiais da FURIA são preto e dourado, representando elegância e vitória.",
      "A FURIA tem equipes em diversos jogos como CS:GO, Valorant, Free Fire, Rainbow Six, Fortnite e outros.",
      "A FURIA é conhecida por apostar em novos talentos brasileiros e desenvolver jogadores.",
      "A sede da FURIA está localizada em São Paulo, Brasil, com instalações de treinamento de alto nível."
    ],
    
    // CS:GO
    csgo: [
      "A equipe de CS:GO da FURIA já alcançou o top 5 do ranking mundial da HLTV.",
      "KSCERATO e yuurih são dois dos jogadores mais talentosos da equipe de CS:GO da FURIA.",
      "A FURIA foi a primeira equipe brasileira a conquistar o Major Americas RMR Championship em 2023.",
      "A FURIA utiliza um estilo de jogo agressivo e inovador que a diferencia de outras equipes.",
      "Em 2020, a FURIA alcançou a final da DreamHack Masters Spring 2020 North America."
    ],
    
    // Valorant
    valorant: [
      "A FURIA entrou na cena competitiva de Valorant em 2021.",
      "A equipe de Valorant da FURIA representa o Brasil em competições internacionais.",
      "QCK é um dos principais jogadores da linha de Valorant da FURIA.",
      "A FURIA tem investido bastante em seu time feminino de Valorant.",
      "A equipe de Valorant da FURIA já participou de diversos torneios internacionais."
    ],
    
    // História e conquistas
    conquistas: [
      "A FURIA foi campeã da ESEA Season 36: Premier Division - North America em 2021.",
      "Em 2019, a FURIA conquistou o vice-campeonato da ECS Season 7 Finals.",
      "A FURIA foi semifinalista do ESL Pro League Season 15 em 2022.",
      "A FURIA ficou em 2º lugar na BLAST Premier: Spring Finals 2020.",
      "A FURIA foi campeã da IEM Beijing-Haidian North America em 2020."
    ],
    
    // Jogadores notáveis
    jogadores: [
      "Andrei 'arT' Piovezan é o capitão da equipe de CS:GO da FURIA e conhecido por seu estilo agressivo.",
      "Kaike 'KSCERATO' Cerato é considerado um dos melhores riflers do Brasil no CS:GO.",
      "Yuri 'yuurih' Santos é um jogador versátil e consistente do time de CS:GO.",
      "André 'drop' Abreu é um dos jogadores que se destacou na equipe de CS:GO da FURIA.",
      "Rafael 'saffee' Costa é o AWPer principal da equipe de CS:GO da FURIA."
    ],
    
    // Curiosidades
    curiosidades: [
      "O nome FURIA vem da palavra 'fury' em inglês, que significa fúria, representando a intensidade da equipe.",
      "A FURIA tem mais de 1 milhão de seguidores nas redes sociais combinadas.",
      "A FURIA foi uma das primeiras organizações brasileiras a ter uma gaming house nos Estados Unidos.",
      "A equipe de CS:GO da FURIA é conhecida pelo termo 'Vamo FURIA', grito de guerra dos fãs.",
      "A FURIA tem parcerias com grandes marcas como Nike, Twitch e Red Bull."
    ],
    
    // Respostas específicas para perguntas comuns
    respostasEspecificas: {
      fundacao: "A FURIA Esports foi fundada em 2017 no Brasil pelos empresários Jaime Pádua e André Akkari.",
      jogos: "A FURIA compete em diversos jogos, incluindo CS:GO, Valorant, Free Fire, Rainbow Six Siege, Fortnite, League of Legends e outros títulos de esports.",
      significadoNome: "O nome FURIA vem da palavra inglesa 'fury', que significa 'fúria'. Ele representa a intensidade, paixão e energia que a organização traz para os esports.",
      maiorConquista: "Uma das maiores conquistas da FURIA foi alcançar o 3º lugar no ranking mundial de CS:GO da HLTV em junho de 2020, consolidando-se como uma das melhores equipes do mundo.",
      timeCSGO: "O time atual de CS:GO da FURIA é composto por arT (capitão), KSCERATO, yuurih, drop e saffee.",
      valorantFeminino: "O time feminino de Valorant da FURIA é um dos mais promissores do Brasil, competindo em torneios nacionais e internacionais e contribuindo para o desenvolvimento do cenário feminino de esports."
    }
  };
  
  // Perguntas frequentes com suas respostas específicas
  const faqMapping = [
    {
      keywords: ["fundada", "fundação", "quando", "criada", "surgiu", "início", "começo", "história"],
      response: knowledgeBase.respostasEspecificas.fundacao
    },
    {
      keywords: ["jogo", "jogos", "modalidade", "modalidades", "compete", "competem"],
      response: knowledgeBase.respostasEspecificas.jogos
    },
    {
      keywords: ["nome", "significa", "significado", "origem", "chamada", "chama"],
      response: knowledgeBase.respostasEspecificas.significadoNome
    },
    {
      keywords: ["maior", "conquista", "título", "ganhou", "vitória", "importante"],
      response: knowledgeBase.respostasEspecificas.maiorConquista
    },
    {
      keywords: ["csgo", "cs:go", "counter", "strike", "fps"],
      response: knowledgeBase.respostasEspecificas.timeCSGO
    },
    {
      keywords: ["feminino", "mulheres", "meninas", "female"],
      response: knowledgeBase.respostasEspecificas.valorantFeminino
    }
  ];
  
  // Sugestões de perguntas para o usuário
  const suggestedQuestions = [
    "Quando foi fundada a FURIA?",
    "Quais jogos a FURIA compete?",
    "Quem são os principais jogadores de CS:GO?",
    "Quais foram as maiores conquistas da FURIA?",
    "Como é o estilo de jogo da FURIA no CS:GO?",
    "Conta uma curiosidade sobre a FURIA.",
    "O que significa o nome FURIA?"
  ];

  // Auto-scroll para a última mensagem
  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  // Scroll to top
  const scrollToTop = () => {
    messagesContainerRef.current?.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Monitorar posição do scroll
  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    
    const { scrollTop } = messagesContainerRef.current;
    setShowScrollTop(scrollTop > 300);
  };

  useEffect(() => {
    const messagesContainer = messagesContainerRef.current;
    if (messagesContainer) {
      messagesContainer.addEventListener("scroll", handleScroll);
      return () => messagesContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Executar scroll inicial com comportamento instantâneo
  useEffect(() => {
    // Scroll para baixo somente uma vez na primeira renderização
    scrollToBottom("auto");
  }, []); // Array de dependências vazio para executar apenas na montagem do componente
  
  // Acompanhar novas mensagens com scroll
  useEffect(() => {
    // Scroll para baixo sempre que novas mensagens forem adicionadas
    scrollToBottom();
  }, [messages]);

  // Inicializar dados no Supabase se necessário
  useEffect(() => {
    const initializeSupabase = async () => {
      try {
        console.log("Verificando dados no Supabase...");
        // Verificar se já existem dados
        const { data, error } = await supabase
          .from('curiosidades_furia')
          .select('*')
          .limit(1);
          
        if (error) {
          console.error("Erro ao verificar dados:", error);
          return;
        }
        
        // Se não houver dados, inserir os iniciais
        if (!data || data.length === 0) {
          console.log("Nenhum dado encontrado. Inserindo dados iniciais...");
          const { error: insertError } = await supabase
            .from('curiosidades_furia')
            .insert(dadosIniciais);
            
          if (insertError) {
            console.error("Erro ao inserir dados:", insertError);
          } else {
            console.log("Dados iniciais inseridos com sucesso!");
          }
        } else {
          console.log("Dados já existem no Supabase:", data);
        }
      } catch (err) {
        console.error("Erro ao inicializar Supabase:", err);
      }
    };
    
    initializeSupabase();
  }, []);

  // DEBUG: Verificar variáveis de ambiente
  useEffect(() => {
    console.log("Carregando ambiente...");
    console.log("URL do Supabase:", supabaseUrl ? "Configurado" : "Não configurado");
    console.log("Key do Supabase:", supabaseKey ? "Configurado" : "Não configurado");
    console.log("API Key OpenAI:", OPENAI_API_KEY ? "Configurado" : "Não configurado");
  }, []);

  // Função para gerar resposta do bot com base na mensagem do usuário
  const generateBotResponse = async (userMessage: string): Promise<string> => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Verificar se a mensagem não é sobre a FURIA
    if (!isAboutFuria(lowerCaseMessage)) {
      return "Desculpe, mas só estou programado para responder perguntas relacionadas à FURIA Esports. Você poderia reformular sua pergunta sobre a FURIA?";
    }
    
    // Verificar se as credenciais estão disponíveis
    if (!supabaseUrl || !supabaseKey || !OPENAI_API_KEY) {
      console.error("Credenciais faltando:", {
        supabaseUrl: !!supabaseUrl,
        supabaseKey: !!supabaseKey,
        OPENAI_API_KEY: !!OPENAI_API_KEY
      });
      return "Estou com problemas técnicos para acessar o banco de dados. Por favor, tente novamente mais tarde.";
    }
    
    try {
      console.log("Iniciando busca no Supabase...");
      
      // Tentar buscar dados do Supabase - COM DEBUG DETALHADO
      const query = supabase.from('curiosidades_furia').select('*');
      console.log("Query preparada");
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Erro ao buscar dados do Supabase:', error);
        throw error;
      }
      
      console.log("Resposta do Supabase:", !!data, data?.length);
      
      if (data && data.length > 0) {
        // Log completo dos dados para debug
        data.forEach((item, index) => {
          console.log(`Item ${index}:`, {
            id: item.id,
            categoria: item.categoria,
            texto: item.texto?.substring(0, 30) + "...",
            temTexto: !!item.texto
          });
        });
        
        // Filtrar dados relevantes
        const keywords = lowerCaseMessage.split(' ')
          .filter(word => word.length > 3)
          .map(word => word.toLowerCase());
        
        console.log("Palavras-chave para filtragem:", keywords);
        
        // Verificar cada palavra-chave contra o texto
        const relevantData = data.filter(item => {
          if (!item.texto) return false;
          
          const itemText = item.texto.toLowerCase();
          
          // Verificar se alguma das palavras-chave está no texto
          return keywords.some(keyword => itemText.includes(keyword));
        });
        
        console.log(`Dados filtrados: ${relevantData.length} de ${data.length}`);
        
        // Usar dados relevantes ou todos os dados
        const dataToUse = relevantData.length > 0 ? relevantData : data;
        
        try {
          console.log("Enviando para OpenAI:", dataToUse.length, "registros");
          
          // Criar mensagem para OpenAI
          const systemPrompt = `Você é um assistente oficial da FURIA Esports, chamado FURIABot. 
          Responda de forma clara, entusiástica e profissional sobre a FURIA Esports.
          
          Diretrizes importantes:
          - Use linguagem simples e acessível
          - Seja informativo e preciso
          - Mostre entusiasmo pela FURIA (use 🔥 ou ⚡ ocasionalmente)
          - Estruture sua resposta em parágrafos curtos e fáceis de ler
          - Use negrito para destacar informações importantes (com formatação markdown: **texto**)
          - Quando listar nomes de jogadores ou equipes, SEMPRE use formato de lista com um item por linha:
            * Nome 1
            * Nome 2
            * Nome 3
          - Coloque os nomes em uma lista vertical quando mencionar mais de dois nomes
          - Seja amigável e conversacional`;
          
          const userPrompt = `Pergunta do usuário: "${userMessage}"
          
          Dados disponíveis sobre a FURIA:
          ${dataToUse.map((item, index) => `[${index+1}] ${item.texto}`).join('\n')}
          
          Responda de forma completa e bem estruturada, com base nas informações acima.`;
          
          const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
              model: 'gpt-3.5-turbo',
              messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
              ],
              temperature: 0.7,
              max_tokens: 150
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
              }
            }
          );
          
          // Verificar e retornar a resposta
          if (response.data && response.data.choices && response.data.choices.length > 0) {
            const responseText = response.data.choices[0].message.content;
            console.log("Resposta da OpenAI recebida:", responseText?.substring(0, 50) + "...");
            return responseText;
          } else {
            console.error("Resposta da OpenAI vazia ou inválida:", response.data);
            throw new Error("Resposta da API inválida");
          }
        } catch (apiError) {
          console.error('Erro na API OpenAI:', apiError);
          
          // Se a API OpenAI falhar, selecione um texto relevante do banco
          if (dataToUse.length > 0) {
            const randomIndex = Math.floor(Math.random() * dataToUse.length);
            console.log("Usando dado direto do banco de dados, índice:", randomIndex);
            return dataToUse[randomIndex].texto;
          }
          
          throw apiError;
        }
      } else {
        console.log("Nenhum dado encontrado no Supabase");
        // Se não tiver dados no banco, use o sistema local
        return fallbackResponse(lowerCaseMessage);
      }
    } catch (error) {
      console.error('Erro completo:', error);
      return "Desculpe, tive um problema técnico ao processar sua pergunta. Poderia tentar novamente?";
    }
  };
  
  // Função de fallback para usar o sistema local de respostas
  const fallbackResponse = (lowerCaseMessage: string): string => {
    // Verificar se corresponde a uma pergunta frequente
    for (const faq of faqMapping) {
      if (faq.keywords.some(keyword => lowerCaseMessage.includes(keyword))) {
        return faq.response;
      }
    }
    
    // Se não for uma pergunta frequente, classificar por categoria
    const category = classifyQuestion(lowerCaseMessage);
    
    // Escolher uma resposta aleatória da categoria identificada
    const responses = knowledgeBase[category as keyof typeof knowledgeBase];
    
    // Se a categoria tem um array de respostas, escolha uma aleatoriamente
    if (Array.isArray(responses)) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Caso a categoria seja um objeto (como respostasEspecificas), use uma resposta geral
    return knowledgeBase.geral[Math.floor(Math.random() * knowledgeBase.geral.length)];
  };
  
  // Verificar se a pergunta é sobre a FURIA
  const isAboutFuria = (message: string): boolean => {
    // Se a mensagem for muito curta, assumimos que é uma continuação da conversa sobre a FURIA
    if (message.length < 10) return true;
    
    // Lista de termos relacionados à FURIA
    const furiaTerms = [
      'furia', 'esports', 'esport', 'time', 'organização', 'jogador', 'equipe',
      'cs', 'csgo', 'valorant', 'jogo', 'brasileira', 'brasil', 'campeonato',
      'art', 'kscerato', 'yuurih', 'saffee', 'drop'
    ];
    
    // Verificar se qualquer termo da FURIA está na mensagem
    return furiaTerms.some(term => message.includes(term));
  };
  
  // Classificar a pergunta por categoria
  const classifyQuestion = (message: string): string => {
    const categoryKeywords = {
      csgo: ['cs', 'csgo', 'counter', 'strike', 'cs:go', 'fps', 'hltv', 'ranking'],
      valorant: ['valorant', 'riot', 'valor', 'vava'],
      conquistas: ['conquista', 'ganhou', 'campeonato', 'torneio', 'título', 'títulos', 'ganhar', 'venceu', 'vice'],
      jogadores: ['jogador', 'jogadores', 'art', 'kscerato', 'yuurih', 'drop', 'saffee', 'quem', 'melhor'],
      curiosidades: ['curiosidade', 'curioso', 'interessante', 'sabia', 'conta'],
      geral: ['furia', 'sobre', 'quem', 'organização', 'empresa', 'cores', 'sede']
    };
    
    // Pontuação para cada categoria
    const scores: Record<string, number> = {
      csgo: 0,
      valorant: 0,
      conquistas: 0,
      jogadores: 0,
      curiosidades: 0,
      geral: 0
    };
    
    // Calcular pontuação para cada categoria
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      scores[category] = keywords.filter(word => message.includes(word)).length;
    }
    
    // Encontrar a categoria com maior pontuação
    let highestCategory = 'geral';
    let highestScore = -1;
    
    for (const [category, score] of Object.entries(scores)) {
      if (score > highestScore) {
        highestScore = score;
        highestCategory = category;
      }
    }
    
    // Se nenhuma categoria tem pontuação alta, usar geral ou curiosidades aleatoriamente
    if (highestScore < 1) {
      return Math.random() > 0.5 ? 'geral' : 'curiosidades';
    }
    
    return highestCategory;
  };

  // Função handleSendMessage atualizada para formatar melhor as respostas
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Adiciona mensagem do usuário
    setMessages(prev => [...prev, { 
      text: newMessage, 
      user: "Você", 
      time,
      userColor: "#3366ff"
    }]);
    
    const userQuery = newMessage;
    setNewMessage("");
    setShowEmojis(false);
    
    // Mostrar indicador de digitação
    setIsTyping(true);
    
    try {
      console.log("===== NOVA CONSULTA =====");
      console.log("Pergunta:", userQuery);
      
      // Gerar resposta com base na mensagem do usuário
      let botResponse = await generateBotResponse(userQuery);
      
      // Formatar a resposta para melhor exibição
      botResponse = formatBotResponse(botResponse);
      
      setIsTyping(false);
      
      // Adicionar resposta ao chat
      setMessages(prev => [...prev, { 
        text: botResponse, 
        user: "FURIABot", 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isBot: true,
        userColor: "#ffcc00"
      }]);
      
      // 30% de chance de sugerir uma pergunta após a resposta
      if (Math.random() < 0.3) {
        setTimeout(() => {
          const randomQuestion = suggestedQuestions[Math.floor(Math.random() * suggestedQuestions.length)];
          
          setMessages(prev => [...prev, { 
            text: `Você também pode me perguntar: "${randomQuestion}" 😊`, 
            user: "FURIABot", 
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isBot: true,
            userColor: "#ffcc00"
          }]);
        }, 800);
      }
    } catch (error) {
      console.error("Erro ao processar mensagem:", error);
      
      setIsTyping(false);
      
      // Mensagem de erro amigável para o usuário
      setMessages(prev => [...prev, { 
        text: "Desculpe, estou tendo dificuldades para processar sua pergunta. Vamos tentar outra pergunta?", 
        user: "FURIABot", 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isBot: true,
        userColor: "#ffcc00"
      }]);
    }
  };
  
  // Função para formatar a resposta do bot
  const formatBotResponse = (text: string): string => {
    // Adiciona emojis ocasionalmente
    const shouldAddEmoji = Math.random() > 0.5;
    const emojis = ["🔥", "⚡", "🏆", "👑", "💪", "🎮"];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    // Substitui asteriscos duplos (**texto**) por classes de estilo para negrito
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Detecta e formata listas com asteriscos (mantendo os asteriscos como marcadores)
    formattedText = formattedText.replace(/\n\s*\*\s+(.*?)(?=\n|$)/g, (match) => {
      return `<div class="pl-2 py-1 flex"><span class="mr-2">•</span><span>${match.replace(/\n\s*\*\s+/, '')}</span></div>`;
    });
    
    // Detecta nomes de jogadores em sequência e formata como lista
    // Padrão: detecta sequências como "jogadores são: Nome1, Nome2, Nome3" ou "equipe: Nome1, Nome2"
    formattedText = formattedText.replace(/(jogadores|equipe|time|atletas|membros)( são| é|:)\s*([A-Za-z0-9\s',]+)(\.|\n|$)/gi, (match, prefix, connector, nameList, ending) => {
      // Verifica se há uma lista de nomes separados por vírgula
      if (nameList.includes(',')) {
        const names = nameList.split(',').map(name => name.trim()).filter(Boolean);
        
        // Se há pelo menos 2 nomes, formata como lista vertical
        if (names.length >= 2) {
          const listItems = names.map(name => `<div class="pl-2 py-1 flex"><span class="mr-2">•</span><span>${name}</span></div>`).join('');
          return `${prefix}${connector}<div class="mt-1 mb-2">${listItems}</div>${ending}`;
        }
      }
      return match;
    });
    
    // Adiciona emoji ao final se necessário
    if (shouldAddEmoji && !formattedText.includes("🔥") && !formattedText.includes("⚡")) {
      formattedText = formattedText + " " + randomEmoji;
    }
    
    // Garante quebras de parágrafos adequadas (mas só se não forem parte de uma lista)
    formattedText = formattedText.replace(/\n\n/g, '<br/><br/>').replace(/\n(?!<div)/g, '<br/>');
    
    return formattedText;
  };
  
  const handleEmojiClick = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    messageInputRef.current?.focus();
  };
  
  const handleSuggestedQuestionClick = (question: string) => {
    setNewMessage(question);
    messageInputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="bg-[#0f0f1a] py-3 px-4 border-b border-[#ffcc00]/30 sticky top-0 z-50">
        <div className="container mx-auto max-w-4xl flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 bg-[#ffcc00] rounded-full flex items-center justify-center">
              <span className="font-bold text-black">F</span>
            </div>
            <div>
              <div className="font-rajdhani font-bold text-xl flex items-center">
                <span className="text-white">FURIA</span>
                <span className="text-[#ffcc00]">BOT</span>
                <span className="ml-2 inline-flex items-center justify-center h-5 px-2 rounded-full bg-[#0099ff] text-white text-xs font-medium">
                  AI
                </span>
              </div>
              <div className="flex items-center text-xs text-gray-400">
                <Info size={12} className="mr-1" /> 
                <span>Pergunte sobre a FURIA Esports</span>
              </div>
            </div>
          </div>
          <Link to="/">
            <Button className="bg-transparent border border-[#ffcc00]/30 text-[#ffcc00] hover:bg-[#ffcc00]/10 transition-colors">
              <ArrowLeft size={16} className="mr-1" />
              Voltar
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Chat Area */}
      <div className="flex-grow flex flex-col container mx-auto max-w-4xl px-4 py-4">
        {/* Sugestões de perguntas */}
        <div className="mb-4 flex flex-wrap gap-2">
          {suggestedQuestions.slice(0, 3).map((question, index) => (
            <button
              key={index}
              onClick={() => handleSuggestedQuestionClick(question)}
              className="bg-[#1e1e30] hover:bg-[#2a2a40] text-white text-sm py-1.5 px-3 rounded-full transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
        
        {/* Messages */}
        <div 
          ref={messagesContainerRef}
          className="flex-grow bg-[#0a0a14] border border-[#1e1e30] rounded-md overflow-y-auto h-[calc(100vh-220px)]" 
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#2a2a40 #161628' }}
        >
          <div className="p-4 space-y-3">
            <AnimatePresence>
            {messages.map((msg, index) => (
                <motion.div 
                key={index} 
                className={`flex ${msg.user === "Você" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {msg.user !== "Você" && (
                    <div 
                      className="h-8 w-8 rounded-full flex-shrink-0 flex items-center justify-center mr-2 mt-0.5" 
                      style={{ backgroundColor: msg.userColor + "20", color: msg.userColor }}
                    >
                      {msg.isBot ? <span className="text-sm">🤖</span> : <User size={16} />}
                    </div>
                  )}
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.user === "Você" 
                        ? "bg-[#3366ff] text-white" 
                        : msg.isBot
                          ? "bg-[#1e1e30] border border-[#ffcc00]/20 text-white"
                          : "bg-[#1e1e30] text-white"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                      <span 
                        className="font-bold text-sm"
                        style={{ color: msg.user === "Você" ? "#fff" : msg.userColor }}
                      >
                        {msg.user}
                        {msg.isBot && (
                          <span className="ml-1 inline-flex items-center justify-center h-4 px-1 rounded-sm bg-[#ffcc00]/10 text-[#ffcc00] text-[10px] uppercase">
                            Bot
                          </span>
                        )}
                      </span>
                      <span className={`text-xs ${msg.user === "Você" ? "text-white/70" : "text-gray-400"}`}>
                        {msg.time}
                      </span>
                    </div>
                    <p className="leading-normal" 
                      dangerouslySetInnerHTML={{ 
                        __html: msg.text.includes('<') ? msg.text : msg.text.replace(/\n/g, '<br/>') 
                      }} 
                    />
                    {msg.user === "Você" && (
                      <div className="flex justify-end mt-1">
                        <span className="text-[10px] text-white/70 flex items-center">
                          <CheckCheck size={12} className="mr-0.5" /> Entregue
                        </span>
                      </div>
                    )}
                  </div>
                  {msg.user === "Você" && (
                    <div 
                      className="h-8 w-8 rounded-full flex-shrink-0 ml-2 mt-0.5 flex items-center justify-center" 
                      style={{ backgroundColor: "#3366ff" + "20", color: "#3366ff" }}
                    >
                      <User size={16} />
                    </div>
                  )}
                </motion.div>
              ))}
              {isTyping && (
                <motion.div 
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div 
                    className="h-8 w-8 rounded-full flex-shrink-0 mr-2 flex items-center justify-center"
                    style={{ backgroundColor: "#ffcc00" + "20", color: "#ffcc00" }}
                  >
                    <span className="text-sm">🤖</span>
                  </div>
                  <div className="bg-[#1e1e30] rounded-lg p-2 max-w-[80%]">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-[#ffcc00] animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 rounded-full bg-[#ffcc00] animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-2 h-2 rounded-full bg-[#ffcc00] animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
          
          {/* Emoji selector */}
          <AnimatePresence>
            {showEmojis && (
              <motion.div 
                className="absolute bottom-24 left-4 right-4 mx-auto max-w-4xl bg-[#1e1e30] border border-[#2a2a40] rounded-md p-2 shadow-lg z-20"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-wrap gap-2 justify-center">
                  {emojis.map(emoji => (
                    <button 
                      key={emoji} 
                      onClick={() => handleEmojiClick(emoji)}
                      className="w-8 h-8 flex items-center justify-center text-lg hover:bg-[#2a2a40] rounded-md transition-colors"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Botão Voltar ao Topo */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute right-8 bottom-24 z-30 h-9 w-9 rounded-full bg-[#ffcc00] flex items-center justify-center shadow-lg hover:bg-[#ff6b00] transition-all"
              onClick={scrollToTop}
            >
              <ArrowUp size={16} className="text-black" />
            </motion.button>
          )}
        </AnimatePresence>
        
        {/* Message Input */}
        <div className="mt-4">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Button 
              type="button"
              className="bg-[#1e1e30] hover:bg-[#2a2a40] text-gray-300 h-10 w-10 p-0 rounded-md"
              onClick={() => setShowEmojis(prev => !prev)}
            >
              <span className="text-lg">😀</span>
            </Button>
            <div className="relative flex-grow">
            <Input
                ref={messageInputRef}
                placeholder="Pergunte algo sobre a FURIA..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
                className="bg-[#1e1e30] border-[#2a2a40] focus:border-[#ffcc00]/50 h-10 text-white placeholder:text-gray-500"
            />
            </div>
            <Button 
              type="submit" 
              className="bg-[#ffcc00] hover:bg-[#ff6b00] text-black h-10"
            >
              Enviar
            </Button>
          </form>
        </div>
      </div>
      
      {/* Chat footer */}
      <div className="container mx-auto max-w-4xl px-4 py-3 text-center">
        <p className="text-xs text-gray-500">
          © 2025 FURIA Esports. Todos os direitos reservados. 
          <span className="inline-block mx-1">•</span>
          <a href="#" className="text-[#ffcc00]/70 hover:text-[#ffcc00] transition-colors">Termos de Uso</a>
        </p>
      </div>
    </div>
  );
};

export default Chat;
