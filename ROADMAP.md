# ROADMAP RecApp - Forum Ricette Fit

Questa roadmap ti guida passo-passo nella creazione della web app, spiegando cosa inserire in ogni cartella e come procedere.

---
## 1. CLIENT (Frontend)

**client/src/components/**
- Componenti riutilizzabili (Navbar, Button, CardRicetta, FormLogin, ecc.)

**client/src/pages/**
- Pagine principali (Home, Forum, Login, Signup, Profilo, ecc.)

**client/src/routes/**
- Definizione delle rotte React Router (es. `AppRouter.jsx`)

**client/public/**
- File statici (index.html, immagini, favicon)

**client/package.json, vite.config.js, .env**
- Configurazione progetto, variabili ambiente

**Come procedere:**
1. Crea i componenti base (Navbar, Footer, CardRicetta)
2. Crea le pagine principali e collegale con React Router
3. Implementa la logica di autenticazione lato client (login/signup, gestione token)
4. Collega le API backend per ricette e autenticazione

---
## 2. SERVER (Backend)

**server/routes/**
- Definisci le rotte API (auth.js, recipes.js, users.js)

**server/models/**
- Modelli per il database (userModel.js, recipeModel.js)

**server/controllers/**
- Logica delle API (authController.js, recipeController.js)

**server/middleware/**
- Middleware personalizzati (authMiddleware.js per JWT, errorHandler.js)

**server/config/**
- Configurazioni (passport.js, db.js, variabili ambiente)

**server/index.js**
- Entry point: avvia Express, importa rotte e middleware

**Come procedere:**
1. Crea i modelli utente e ricetta
2. Implementa le rotte di autenticazione (signup, login, OAuth)
3. Implementa le rotte per la gestione delle ricette (CRUD)
4. Proteggi le rotte con middleware JWT
5. Collega il backend a un database (es. MongoDB, PostgreSQL)

---
## 3. DOCS

**docs/auth.md**
- Documentazione tecnica sull’autenticazione

**Come procedere:**
- Aggiorna la documentazione man mano che aggiungi funzionalità

---
## 4. .GITHUB

**.github/copilot-instructions.md**
- Checklist sviluppo e istruzioni per Copilot

---
## 5. ROOT

**README.md**
- Guida generale al progetto

**ROADMAP.md**
- Roadmap e best practice

---
## CONSIGLI DI SVILUPPO
- Procedi per step: prima backend, poi frontend, poi integrazione
- Versiona spesso con Git
- Scrivi test per le API e i componenti principali
- Mantieni la documentazione aggiornata
- Usa variabili ambiente per le chiavi segrete

---
Questa roadmap ti aiuta a mantenere ordine e chiarezza durante lo sviluppo. Segui la struttura e aggiorna i file man mano che il progetto cresce!
