// ============================================================
// CONFIGURAÇÃO FIREBASE — CLT Auditoria 5S
// ============================================================
// 1. Aceda a https://console.firebase.google.com
// 2. Crie um projecto (ex: "clt-auditoria-5s")
// 3. Adicione uma Web App ao projecto
// 4. Copie os valores do firebaseConfig para cá
// 5. Active o Firestore Database (modo production ou test)
// ============================================================

const firebaseConfig = {
  apiKey:            "PREENCHER",
  authDomain:        "PREENCHER.firebaseapp.com",
  projectId:         "PREENCHER",
  storageBucket:     "PREENCHER.appspot.com",
  messagingSenderId: "PREENCHER",
  appId:             "PREENCHER"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
