# FURIA.GG - Plataforma Digital para Fãs da FURIA Esports

## 📋 Visão Geral

O FURIA.GG é uma plataforma web moderna dedicada aos fãs da FURIA Esports. A aplicação oferece informações sobre as equipes da FURIA em diferentes modalidades de esports, interação com outros fãs através de chat, e uma seção dedicada para fãs.

## 🚀 Tecnologias Utilizadas

### Frontend
- **React**: Biblioteca para construção de interfaces
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática
- **Vite**: Ferramenta de build rápida para projetos web
- **React Router Dom**: Roteamento para navegação entre páginas
- **Tailwind CSS**: Framework CSS para estilização
- **shadcn/ui**: Componentes de UI acessíveis e reutilizáveis
- **Radix UI**: Primitivos de UI acessíveis
- **Framer Motion**: Biblioteca para animações
- **Recharts**: Biblioteca para visualização de dados

### Backend
- **Supabase**: Plataforma para backend como serviço, oferecendo:
  - Armazenamento de dados
  - Autenticação de usuários
  - Armazenamento de arquivos
  - Funções serverless

### Gerenciamento de Estado
- **React Query**: Biblioteca para gerenciamento de estado do servidor e consultas de API

## 📦 Estrutura do Projeto

### Principais Diretórios
- `/src`: Código-fonte da aplicação
  - `/components`: Componentes reutilizáveis
  - `/hooks`: Hooks personalizados
  - `/lib`: Utilidades e configurações
  - `/pages`: Páginas da aplicação

### Componentes Principais
- `Header`: Navegação principal da aplicação
- `Footer`: Rodapé com informações adicionais
- `TeamSelector`: Seletor de equipes
- `FanSection`: Seção dedicada aos fãs
- Componentes de equipes específicas: `CSTeam`, `ValorantTeam`, `KingLeagueTeam`

## 🔑 Funcionalidades

### Autenticação
- Login de usuários via Supabase
- Proteção de rotas para áreas restritas
- Callback de autenticação

### Navegação
- Página inicial com informações gerais
- Páginas de equipes com detalhes específicos de cada modalidade
- Seção de fãs com interações exclusivas
- Chat para interação entre usuários

### Integração com Banco de Dados
- Integração com Supabase para armazenamento de dados
- Consultas em tempo real

## 🛠️ Requisitos e Configuração

### Requisitos
- Node.js (versão recomendada: 18.x ou superior)
- NPM ou Yarn

### Variáveis de Ambiente
A aplicação requer as seguintes variáveis de ambiente:
- `VITE_SUPABASE_URL`: URL da sua instância do Supabase
- `VITE_SUPABASE_ANON_KEY`: Chave anônima do Supabase

### Instalação
```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Construir para produção
npm run build
```

## 🌐 API e Integrações
- **Supabase**: Para autenticação e banco de dados
- Possíveis integrações com APIs de estatísticas de esports

## 📱 Responsividade
A aplicação é totalmente responsiva, adaptando-se a dispositivos móveis e desktop.

## 🧠 Hooks Personalizados
- `use-mobile`: Hook para detectar dispositivos móveis
- `use-toast`: Sistema de notificações toast

## 🔧 Ferramentas de Desenvolvimento
- ESLint: Para linting de código
- TypeScript: Para verificação de tipos
- Vite: Para servidor de desenvolvimento e build

## 📄 Licença
© FURIA Esports. Todos os direitos reservados.
