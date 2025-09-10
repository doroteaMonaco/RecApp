# Autenticazione JWT, Sessioni e OAuth (Google/GitHub)

Questa guida spiega come implementare autenticazione utente in RecApp con JWT, sessioni e provider esterni (Google/GitHub) usando Node.js/Express e Passport.

## 1. Struttura dei file

Crea questi file nella cartella `server/`:

- `auth.js`: logica Passport, strategie JWT, Google, GitHub
- `userModel.js`: modello utente per il database
- `routes/auth.js`: API per signup, login, logout, OAuth
- Aggiorna `index.js` per usare le nuove rotte

## 2. Database: cosa inserire

Tabella/collezione `users`:
- `id`: identificativo unico
- `username` o `email`: credenziali
- `password`: hash (bcrypt)
- `provider`: 'local', 'google', 'github'
- `providerId`: id esterno (solo OAuth)
- `createdAt`, `updatedAt`

## 3. Implementazione

### auth.js
- Configura Passport con:
  - Strategia JWT (`passport-jwt`)
  - Google (`passport-google-oauth20`)
  - GitHub (`passport-github2`)
- Funzioni per serializzazione/deserializzazione utente

### userModel.js
- Modello utente (es. Mongoose, Sequelize, o semplice array/oggetto)
- Funzioni: crea utente, trova per email/providerId, verifica password

### routes/auth.js
- POST `/signup`: crea utente locale, hash password
- POST `/login`: verifica credenziali, genera JWT
- GET `/logout`: elimina sessione
- GET `/auth/google`: redirect OAuth Google
- GET `/auth/github`: redirect OAuth GitHub
- Callback per Google/GitHub: crea/recupera utente, genera JWT

### index.js
- Importa e usa le rotte di autenticazione
- Proteggi le API con middleware Passport/JWT

## 4. Esempio flusso signup/login locale
1. Utente invia email e password a `/signup`
2. Password viene hashata e salvata nel db
3. Utente fa login su `/login`, riceve JWT
4. JWT usato per accedere alle API protette

## 5. Esempio flusso OAuth
1. Utente clicca "Login con Google/GitHub"
2. Viene reindirizzato al provider
3. Al ritorno, Passport crea/recupera utente e genera JWT

## 6. Protezione delle rotte
- Usa middleware Passport/JWT per proteggere le rotte API
- Esempio:
  ```js
  const passport = require('passport');
  app.get('/api/recipes', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Solo utenti autenticati
  });
  ```

## 7. Note
- Conserva solo hash delle password
- Non salvare mai il JWT nel db
- Per OAuth servono le chiavi client/secret di Google/GitHub
- Aggiorna la documentazione se cambi provider o struttura utente

---
Per dettagli su ogni file, vedi esempi e commenti nel codice sorgente.
