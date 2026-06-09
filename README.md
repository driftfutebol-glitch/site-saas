# NexusCode — Site da Software House

Site institucional (landing page) para uma software house: vende sistemas de
estacionamento, restaurante, controle de estoque, criação de sites e apps desktop.

Tema **dark futurista** com animações profissionais (Framer Motion) e um
**backend seguro** de exemplo (formulário de contato com validação, rate limiting
e proteção anti-bot).

---

## 🚀 Como rodar

```bash
npm install      # instala as dependências (só na primeira vez)
npm run dev      # sobe o site em modo desenvolvimento
```

Abra **http://localhost:3000** no navegador. A página recarrega sozinha quando você edita um arquivo.

Outros comandos:

```bash
npm run build    # gera a versão otimizada de produção
npm run start    # roda a versão de produção (depois do build)
npm run lint     # checa problemas no código
```

---

## Deploy no Vercel

O projeto já está preparado para Vercel, mas as rotas com login, contato,
admin e estacionamento precisam de um banco remoto. Use Turso/libSQL em
produção e configure estas variáveis no painel do Vercel:

```bash
AUTH_SECRET=
APP_URL=https://seu-projeto.vercel.app
DATABASE_URL=libsql://...
DATABASE_AUTH_TOKEN=
ADMIN_EMAILS=seu@email.com
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Se ativar o login com Google, cadastre também este Redirect URI no Google Cloud:

```text
https://seu-projeto.vercel.app/api/auth/google/callback
```

Build command: `npm run build`.

---

## ✏️ Onde editar o quê

| Quero mudar... | Arquivo |
|---|---|
| Nome da empresa, contatos, serviços, textos | `src/lib/site.ts` ⭐ (comece aqui) |
| Cores, animações, efeitos visuais | `src/app/globals.css` |
| Ordem/quais seções aparecem | `src/app/page.tsx` |
| Título e SEO da aba do navegador | `src/app/layout.tsx` |
| Cada seção (Hero, Serviços, etc.) | `src/components/` |
| Backend do formulário de contato | `src/app/api/contact/route.ts` |

> 💡 Quase tudo que é **texto** está centralizado em `src/lib/site.ts`.
> Trocar o nome "NexusCode" pelo seu? É só editar lá.

---

## 📁 Estrutura

```
src/
├── app/
│   ├── api/contact/route.ts   # Backend seguro do formulário (validação + rate limit)
│   ├── globals.css            # Tema, cores e animações
│   ├── layout.tsx             # Estrutura base + SEO
│   └── page.tsx               # Monta a página juntando as seções
├── components/
│   ├── ui/                    # Peças reutilizáveis (Background, Reveal, Icon, etc.)
│   ├── Navbar.tsx  Hero.tsx  Stats.tsx  Services.tsx
│   ├── Differentiators.tsx  Process.tsx  CTA.tsx
│   ├── Contact.tsx  Footer.tsx
└── lib/
    ├── site.ts                # ⭐ Conteúdo do site (edite aqui)
    ├── contact-schema.ts      # Regras de validação (navegador + servidor)
    ├── rate-limit.ts          # Limitador anti-flood
    └── motion.ts              # Configuração das animações
```

---

## 🔒 Segurança (já implementada no formulário)

- **Validação rigorosa** com Zod — o servidor revalida tudo (nunca confia no navegador).
- **Rate limiting** por IP — bloqueia flood de requisições (HTTP 429).
- **Honeypot** anti-bot — campo invisível que só robôs preenchem.
- **Limite de tamanho** do corpo da requisição.
- **Cabeçalhos de segurança** (anti-clickjacking, anti-sniffing) em `next.config.ts`.
- **Erros genéricos** ao cliente — detalhes ficam só no log do servidor.

### Próximos passos de segurança (para produção)
- Conectar o formulário a um destino real (e-mail via Resend, banco, WhatsApp).
- Adicionar uma Content-Security-Policy (CSP) — ver comentário em `next.config.ts`.
- Trocar o rate limiter em memória por Redis/Upstash se rodar em vários servidores.
- Usar variáveis de ambiente (`.env.local`) para segredos (chaves de API, etc.).

---

## 🛠️ Tecnologias

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Zod · Lucide
