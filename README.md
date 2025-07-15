# Backend NextJS - Marketplace 

Link para acessar o front: https://mba-fullstack-rocketseat.netlify.app/

Sistema de gerenciamento de produtos para vendedores com autenticação e upload de imagens.

## 🚀 Como usar

### Instalação
```bash
npm install
```

### Executar
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 📋 Funcionalidades

- **Login/Autenticação** - Sistema de login com JWT
- **Lista de Produtos** - Visualizar produtos cadastrados em grid
- **Cadastro de Produtos** - Adicionar novos produtos com upload de imagem
- **Upload de Imagens** - Enviar fotos dos produtos
- **Filtros** - Buscar produtos por nome e status
- **Proteção de Rotas** - Apenas usuários logados podem acessar

## 🔧 Tecnologias

- **Frontend:** Next.js 14, TypeScript, React
- **Backend:** API REST (FastAPI/NestJS)
- **Autenticação:** JWT Token
- **Upload:** FormData para imagens

## 🔗 API Backend

- **URL:** `https://mba-fullstack-backend.onrender.com`
- **Autenticação:** JWT Bearer Token
- **Endpoints:**
  - `POST /auth/login` - Login
  - `GET /products` - Listar produtos
  - `POST /products` - Criar produto
  - `POST /products/upload` - Upload de imagem

## 🔐 Autenticação

O sistema usa JWT tokens armazenados no localStorage:
- Login: `admin@exemplo.com` / `admin123`
- Token salvo automaticamente após login
- Rotas protegidas redirecionam para login

## 📁 Estrutura

```
src/app/
├── login/              # Página de login
├── produtos/           # Lista de produtos
├── produtos/cadastro/  # Cadastro de produtos
├── auth.ts             # Utilitários de autenticação
└── components/         # Componentes (removidos)
```

## 🎯 Fluxo de Uso

1. **Login** - Acesse e faça login
2. **Lista** - Veja produtos cadastrados
3. **Cadastro** - Clique em "+ Novo produto"
4. **Upload** - Selecione imagem e preencha dados
5. **Salvar** - Produto aparece na lista

## 🐛 Problemas Conhecidos

- **CORS:** Backend pode precisar de configuração CORS para localhost
- **Imagens:** URLs podem precisar de ajuste dependendo do backend

## 📝 Scripts Disponíveis

```bash
npm run dev      # Desenvolvimento
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Verificar código
```
