# Onboarding Tech — GoGroup

Plataforma de onboarding interativo para o time de tecnologia do GoGroup. Apresenta o ecossistema de marcas, stack técnica, organograma e ferramentas do dia a dia — com suporte a dois contextos de squad: **Gobeaute** e **Gocase**.

## Funcionalidades

- **Seletor de contexto por squad** — alterna entre Gobeaute e Gocase nas seções de Stack, Organograma e Ferramentas
- **Diagramas editáveis** — React Flow com persistência local (arrastar, zoom, editar nós, restaurar layout)
- **Modo de edição** — edita textos, ferramentas e valores diretamente na interface
- **SSO Google** — autenticação via NextAuth com restrição por domínio `@gocase.com.br`
- **Portfolio de marcas** — Gocase, 7 marcas Gobeaute e 3 marcas Jump com cards detalhados
- **Logos via logo.dev** — fallback automático para iniciais quando a logo não carrega

## Stack

- [Next.js 15](https://nextjs.org) (App Router)
- [React Flow (@xyflow/react)](https://reactflow.dev)
- [NextAuth.js](https://next-auth.js.org) — Google OAuth
- TypeScript

## Desenvolvimento

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Estrutura

```
app/                  # Rotas Next.js (page, layout, login, api/auth)
components/
  sections/           # Hero, Valores, Universos, Marcas, Organograma, Stack, Ferramentas, Equipe
  Navbar.tsx
  BrandSelector.tsx   # Seletor Gobeaute / Gocase (usado por Stack, Organograma, Ferramentas)
context/
  BrandContext.tsx    # Estado global do squad selecionado
  EditModeContext.tsx # Estado global do modo de edição
hooks/
  usePersistedFlow.ts # Persistência de diagramas React Flow no localStorage
  useEditableData.ts  # Persistência de dados editáveis no localStorage
```

## Deploy

Hospedado na Vercel. Variáveis de ambiente necessárias:

```
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_URL=
```
