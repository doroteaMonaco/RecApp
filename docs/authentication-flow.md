# 🔐 RecApp - Flusso Completo di Autenticazione

## Panoramica

RecApp implementa un sistema di autenticazione completo con supporto per:
- **Registrazione/Login locali** con email e password
- **Autenticazione OAuth** con Google e GitHub
- **JWT (JSON Web Tokens)** per sessioni stateless
- **Refresh tokens** per sicurezza avanzata
- **Middleware di protezione** per route API

## 🏗️ Architettura del Sistema

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │     Server      │    │   Database      │
│   (React)       │    │   (Express)     │    │ (PostgreSQL)    │
│                 │    │                 │    │                 │
│ • Login Form    │◄──►│ • Routes        │◄──►│ • Users         │
│ • OAuth Buttons │    │ • Controllers   │    │ • Accounts      │
│ • JWT Storage   │    │ • Middleware    │    │ • Sessions      │
│ • Protected UI  │    │ • Passport      │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Componenti Principali

- **Frontend**: React con gestione JWT nel localStorage
- **Backend**: Express.js con middleware di autenticazione
- **Database**: PostgreSQL con Prisma ORM
- **OAuth**: Passport.js per Google/GitHub
- **Sicurezza**: bcrypt per password, JWT per tokens

---

## 🔄 Flussi di Autenticazione

### 1. 📝 Registrazione Utente Locale

**Endpoint**: `POST /auth/register`
**Body**: `{ "email": "user@example.com", "password": "password123", "name": "John Doe" }`

#### Pipeline Completa:

```
1. Frontend → POST /auth/register
2. express.json() → Parsea JSON body
3. authRoutes.js → Route handler
4. authController.register() → Controller
   ├── Valida input (email, password, name)
   ├── findUserByEmail() → Controlla duplicati
   ├── createUser() → Salva nuovo utente
   └── jwt.sign() → Genera JWT token
5. Response ← { token, user: {id, email, name} }
```

#### Codice Controller:
```javascript
async register(req, res) {
  const { email, password, name } = req.body;

  // 1. Validazione input
  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Campi obbligatori mancanti' });
  }

  // 2. Controllo utente esistente
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: 'Email già registrata' });
  }

  // 3. Creazione utente con password hashata
  const newUser = await createUser({ email, password, name });

  // 4. Generazione JWT
  const token = jwt.sign(
    { userId: newUser.id, email: newUser.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  // 5. Response
  return res.status(201).json({
    message: 'Registrazione completata',
    token,
    user: { id: newUser.id, email: newUser.email, name: newUser.name }
  });
}
```

---

### 2. 🔐 Login Utente Locale

**Endpoint**: `POST /auth/login`
**Body**: `{ "email": "user@example.com", "password": "password123" }`

#### Pipeline Completa:

```
1. Frontend → POST /auth/login
2. express.json() → Parsea JSON body
3. authRoutes.js → Route handler
4. authController.login() → Controller
   ├── findUserByEmail() → Trova utente
   ├── bcrypt.compare() → Verifica password
   ├── jwt.sign() → Genera JWT token
   └── Response ← { token, user }
```

#### Codice Controller:
```javascript
async login(req, res) {
  const { email, password } = req.body;

  // 1. Validazione input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email e password richieste' });
  }

  // 2. Ricerca utente
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(400).json({ message: 'Credenziali non valide' });
  }

  // 3. Verifica password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Credenziali non valide' });
  }

  // 4. Generazione JWT
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  // 5. Response
  return res.status(200).json({
    message: 'Login effettuato',
    token,
    user: { id: user.id, email: user.email, name: user.name }
  });
}
```

---

### 3. 🌐 Autenticazione OAuth (Google/GitHub)

**Flusso OAuth 2.0 Completo:**

```
1. User clicca "Login con Google"
2. Frontend → GET /auth/google
3. Passport → Redirect a Google con client_id
4. Google OAuth Server → User autorizza app
5. Google → Redirect a /auth/google/callback?code=AUTH_CODE
6. Passport Strategy → Scambia code per access_token
7. Google API → Restituisce profilo utente
8. Database → Cerca/Crea utente + Account OAuth
9. JWT → Genera token per sessione
10. Redirect → frontend.com/auth/callback?token=JWT_TOKEN
```

#### Configurazione Passport:

```javascript
// config/passport.js
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // 1. Estrai email dal profilo
    const email = profile.emails[0].value;

    // 2. Cerca utente esistente
    let user = await findUserByEmail(email);

    // 3. Se non esiste, crealo
    if (!user) {
      user = await createUser({
        email,
        password: null, // OAuth users non hanno password locale
        name: profile.displayName,
        avatar: profile.photos[0].value
      });
    }

    // 4. Collega account OAuth
    let account = await findAccountByProvider('google', profile.id);
    if (!account) {
      await linkOAuthAccount(user.id, 'google', profile.id, accessToken, refreshToken);
    }

    // 5. Passa utente a Passport
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));
```

#### Controller OAuth Callback:

```javascript
async oauthCallback(req, res) {
  try {
    const user = req.user; // Impostato da Passport

    if (!user) {
      return res.status(401).json({ message: 'Autenticazione fallita' });
    }

    // Genera JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Redirect al frontend con token
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/auth/callback?token=${token}`);

  } catch (error) {
    console.error('OAuth callback error:', error);
    return res.status(500).json({ message: 'Autenticazione fallita' });
  }
}
```

---

### 4. 🛡️ Accesso a Route Protette

**Middleware di Autenticazione:**

```javascript
// middleware/authMiddleware.js
const authenticateToken = (req, res, next) => {
  // 1. Estrai token dall'header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token di accesso richiesto' });
  }

  // 2. Verifica JWT
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token non valido o scaduto' });
    }

    // 3. Aggiungi user alla request
    req.user = decoded;
    next(); // Procedi al controller
  });
};
```

#### Utilizzo nelle Route:

```javascript
// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Route pubbliche
router.post('/register', authController.register);
router.post('/login', authController.login);

// Route protette
router.get('/profile', authenticateToken, authController.getProfile);
router.post('/logout', authenticateToken, authController.logout);

module.exports = router;
```

#### Pipeline Route Protetta:

```
1. Frontend → GET /auth/profile (con Authorization: Bearer TOKEN)
2. authenticateToken middleware → Intercetta richiesta
   ├── Estrae token dall'header
   ├── jwt.verify() → Valida token
   ├── req.user = decoded → Aggiunge user alla request
   └── next() → Passa al controller
3. authController.getProfile() → Controller
   ├── Usa req.user.userId per query database
   └── Restituisce dati profilo
4. Response ← { user: {id, email, name, ...} }
```

---

### 5. 🔄 Refresh Token System

**Endpoint**: `POST /auth/refresh`
**Body**: `{ "refreshToken": "refresh_jwt_token" }`

#### Implementazione:

```javascript
async refreshToken(req, res) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token richiesto' });
  }

  try {
    // Verifica refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Genera nuovo access token
    const newToken = jwt.sign(
      { userId: decoded.userId, email: decoded.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({ token: newToken });
  } catch (error) {
    return res.status(401).json({ message: 'Refresh token non valido' });
  }
}
```

---

### 6. 🚪 Logout

**Endpoint**: `POST /auth/logout`

```javascript
async logout(req, res) {
  // Per JWT stateless, il logout è principalmente client-side
  // Opzionale: invalida token in blacklist (Redis)

  return res.status(200).json({
    message: 'Logout effettuato con successo'
  });
}
```

**Frontend Logout:**
```javascript
// Rimuovi token dal localStorage
localStorage.removeItem('token');
localStorage.removeItem('refreshToken');

// Redirect a login page
window.location.href = '/login';
```

---

## 🔐 Sicurezza Implementata

### Password Security
- **bcrypt hashing** con salt rounds (costo 10)
- **Mai salvate in chiaro** nel database
- **Confronto sicuro** senza timing attacks

### JWT Security
- **Firma HMAC-SHA256** con secret sicuro
- **Scadenza tokens** (7 giorni per access, 30 per refresh)
- **Payload limitato** (solo userId, email)
- **HTTPS obbligatorio** in produzione

### OAuth Security
- **State parameter** per prevenire CSRF
- **PKCE** per public clients (opzionale)
- **Token storage** sicuro lato server
- **Scope limitati** (solo profilo base)

### API Security
- **CORS configurato** per dominio frontend
- **Rate limiting** per prevenire abusi
- **Input validation** su tutti gli endpoint
- **Error handling** senza leak di informazioni

---

## 📱 Integrazione Frontend

### Storage JWT
```javascript
// Salva token dopo login
const login = async (email, password) => {
  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const { token, user } = await response.json();

  // Salva nel localStorage
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));

  return { token, user };
};
```

### Interceptor per Richieste Autenticate
```javascript
// Aggiungi token automaticamente a ogni richiesta
const apiCall = async (url, options = {}) => {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers
  });

  // Gestisci 401 (token scaduto)
  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  return response;
};
```

### Gestione OAuth Callback
```javascript
// Pagina /auth/callback
const handleAuthCallback = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  if (token) {
    localStorage.setItem('token', token);
    // Decode token per ottenere user info
    const decoded = jwt_decode(token);
    localStorage.setItem('user', JSON.stringify(decoded));

    // Redirect alla home
    window.location.href = '/';
  } else {
    // Errore
    window.location.href = '/login?error=oauth_failed';
  }
};
```

---

## 🚀 Deployment e Configurazione

### Variabili Ambiente (.env)

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/recapp"

# JWT
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"
JWT_REFRESH_SECRET="your-refresh-secret-key-min-32-chars"

# OAuth Google
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:3000/auth/google/callback"

# OAuth GitHub
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
GITHUB_CALLBACK_URL="http://localhost:3000/auth/github/callback"

# Frontend
FRONTEND_URL="http://localhost:5173"

# Server
PORT=3000
NODE_ENV="development"
```

### Configurazione Server (index.js)

```javascript
const express = require('express');
const cors = require('cors');
const passport = require('./config/passport');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware globali
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use('/auth', authRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port', process.env.PORT || 3000);
});
```

---

## 🧪 Testing dell'Autenticazione

### Test Registrazione
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

### Test Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Test Route Protetta
```bash
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🔧 Troubleshooting

### Errori Comuni

**"Token expired"**
- Il JWT è scaduto (7 giorni di default)
- Implementa refresh token logic

**"Invalid signature"**
- JWT_SECRET non corrisponde
- Verifica variabile d'ambiente

**"User not found" in OAuth**
- Email non trovata nel profilo OAuth
- Alcuni provider non forniscono email pubblica

**"CORS error"**
- Frontend e backend su porte diverse
- Configura CORS correttamente

### Debug Tips

1. **Log JWT payload**: `console.log(decoded)` nel middleware
2. **Verifica token**: Usa jwt.io per decodificare manualmente
3. **Controlla database**: Verifica che utenti e account siano creati
4. **OAuth flow**: Aggiungi logging nelle strategy Passport

---

## 📚 Risorse Aggiuntive

- [JWT.io](https://jwt.io/) - Debugger e validatore JWT
- [OAuth 2.0 RFC](https://tools.ietf.org/html/rfc6749) - Specifiche ufficiali
- [Passport.js Docs](http://www.passportjs.org/docs/) - Documentazione completa
- [bcrypt vs Argon2](https://security.stackexchange.com/questions/4781/do-any-security-experts-recommend-bcrypt-for-password-storage) - Confronto algoritmi hashing

---

*Questo documento descrive il flusso completo di autenticazione implementato in RecApp. Per modifiche o aggiornamenti, riferirsi al codice sorgente nei rispettivi file.*</content>
<parameter name="filePath">c:\Users\dorot\OneDrive - Politecnico di Torino\Desktop\Progetti\RecApp\docs\authentication-flow.md