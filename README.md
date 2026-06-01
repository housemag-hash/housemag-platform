# House Mag Platform

A principal plataforma de conexão da música eletrônica.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**

## Desenvolvimento local

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Rotas disponíveis

| Rota | Descrição |
|------|-----------|
| `/` | Home — redireciona para `/design-review` |
| `/design-review` | Preview de todas as telas mobile |

## Design Review

Acesse `/design-review` para visualizar todas as telas mobile:

- **Modo Solo** — uma tela por vez, com navegação por tabs
- **Modo Overview** — todas as telas em grid para análise comparativa

## Deploy na Vercel

```bash
# Via CLI
npx vercel

# Ou conecte o repositório em vercel.com/new
```

## Estrutura do projeto

```
src/
├── app/
│   ├── layout.tsx          # Layout raiz com fonte DM Sans
│   ├── page.tsx            # Redirect para /design-review
│   └── design-review/
│       └── page.tsx        # Design Review — 9 telas mobile
├── components/
│   ├── logo/
│   │   └── HMLogo.tsx      # Logo H oficial (SVG vetorial)
│   ├── ui/
│   │   ├── BottomNav.tsx   # Bottom navigation fixa
│   │   ├── AppHeader.tsx   # Header sticky com logo
│   │   └── PhoneFrame.tsx  # Container frame de celular
│   └── screens/
│       ├── HomeScreen.tsx
│       ├── MagazineScreen.tsx
│       ├── ArticleScreen.tsx
│       ├── ChartsScreen.tsx
│       ├── EventsScreen.tsx
│       ├── ArtistScreen.tsx
│       ├── ClubScreen.tsx
│       ├── ProfileScreen.tsx
│       └── SubmitScreen.tsx
└── lib/
    ├── tokens.ts           # Design tokens
    └── mock-data.ts        # Dados mockados
```

## Status

- [x] MVP mobile — 9 telas
- [x] Design Review `/design-review`
- [ ] Backend / API
- [ ] Autenticação
- [ ] Desktop
- [ ] Banco de dados
