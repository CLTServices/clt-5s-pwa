# CLT Auditoria 5S — PWA
**CLT Services © 2026**

Aplicação web progressiva (PWA) para realização de auditorias 5S.
Instalável em Android (e iOS) sem necessidade de loja de aplicações.
---

## Estrutura de ficheiros

```
/
├── index.html          ← App principal
├── styles.css          ← Estilos
├── manifest.json       ← PWA manifest
├── sw.js               ← Service Worker (offline)
├── js/
│   ├── data.js         ← Critérios e descritores 5S
│   ├── firebase-config.js  ← ⚠️ PREENCHER com as suas credenciais
│   └── app.js          ← Lógica da aplicação
└── icons/
    ├── icon-192.png    ← Ícone PWA (adicionar)
    └── icon-512.png    ← Ícone PWA (adicionar)
```

---

## Passo 1 — Configurar Firebase

1. Aceda a https://console.firebase.google.com
2. Clique em **"Adicionar projecto"**
3. Nome: `clt-auditoria-5s` (ou à sua escolha)
4. Desactive o Google Analytics (opcional)
5. No painel do projecto: clique em **"</>"** (Web App)
6. Registe a app; copie o objeto `firebaseConfig`
7. Abra o ficheiro `js/firebase-config.js` e substitua os valores:

```javascript
const firebaseConfig = {
  apiKey:            "AIzaSy...",
  authDomain:        "clt-auditoria-5s.firebaseapp.com",
  projectId:         "clt-auditoria-5s",
  storageBucket:     "clt-auditoria-5s.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123..."
};
```

8. No painel Firebase: **Firestore Database** → **Criar base de dados**
   - Seleccione modo **"Produção"** (ou "Teste" para começar)
   - Região: `europe-west1` (Europa)

### Regras Firestore recomendadas (modo produção simplificado):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /auditorias/{doc} {
      allow read, write: if true;
    }
  }
}
```
*(Suficiente para uso interno. Para maior segurança, adicione autenticação Firebase posteriormente.)*

---

## Passo 2 — Adicionar ícones PWA

Coloque dois ficheiros PNG na pasta `icons/`:
- `icon-192.png` — 192×192 px
- `icon-512.png` — 512×512 px

Sugestão: usar o logótipo da CLT com fundo `#0D1B2A`.

---

## Passo 3 — Fazer deploy no Cloudflare Pages

1. Crie um repositório no GitHub e carregue todos os ficheiros
2. Em **Cloudflare Pages** → **Criar projecto** → **Ligar a Git**
3. Seleccione o repositório
4. Build command: *(vazio)*
5. Build output directory: `/` (raiz)
6. Deploy → aguarde ~1 min
7. O URL será algo como `clt-5s.pages.dev`

Para domínio personalizado (ex: `5s.cltservices.net`): adicione o domínio nas definições do projecto Cloudflare Pages.

---

## Passo 4 — Instalar no Android

1. Abra o URL no **Chrome** para Android
2. Clique nos **⋮** (três pontos) → **"Adicionar ao ecrã inicial"**
3. Confirme → o ícone aparece no launcher

O utilizador não precisa de ir ao Google Play.
Partilhe o URL com a equipa e clientes — cada um instala da mesma forma.

---

## Funcionalidades

- ✅ 5 dimensões × 6 critérios = 30 critérios
- ✅ Escala 1–5 com descritor contextual por nível
- ✅ Score automático por dimensão e geral (%)
- ✅ Semáforo: 🔴 Crítico / 🟠 Insuficiente / 🟡 Em desenvolvimento / 🟢 Bom / 🔵 Excelente
- ✅ Radar chart por dimensão
- ✅ Histórico de auditorias por área
- ✅ Gráfico de evolução temporal por S
- ✅ Observações e recomendações por auditoria
- ✅ Dados na cloud (Firebase) — partilhado entre auditores
- ✅ Funciona offline (assets em cache)
- ✅ Instalável como app nativa (PWA)

---

## Suporte
mgt@cltservices.net | www.cltservices.net
