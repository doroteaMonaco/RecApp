# RecApp - Fitness Recipe Forum
![RecApp Logo](recipe.png)

## 🎯 Project Objective
RecApp is a web application forum dedicated to fitness recipes, designed with a modern interface inspired by SaporNet. The application allows users to share, discover, and interact with healthy recipes suitable for a fitness lifestyle.

## 🏗️ Project Architecture

### Frontend (React + Vite)
- **Location**: `client/`
- **Framework**: React 18 with Vite
- **Routing**: React Router DOM
- **Styling**: Modern CSS with gradients and animations
- **Main Components**:
  - `Navbar`: Main navigation with logo, search, favorites
  - `Hero`: Hero section with call-to-action
  - `CategoryButtons`: Category grid (Protein-rich, Low Carb, Vegan, etc.)
  - `RecipeCard`: Individual recipe cards with rating, likes, difficulty

### Backend (Node.js + Express)
- **Location**: `server/`
- **Framework**: Node.js + Express
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis for performance
- **Authentication**: JWT + OAuth (Google/GitHub)

### Database Schema
- **Users**: User management and profiles
- **Recipes**: Recipes with ingredients, instructions, nutritional values
- **Comments**: Comment system
- **Ratings**: Recipe ratings
- **Badges**: Gamification system

## 🚀 Setup and Launch

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Docker (optional)

### Installation

#### Method 1: Local Setup
```bash
# Backend
cd server
npm install
npx prisma migrate dev --name init
npm run dev

# Frontend
cd ../client
npm install
npm run dev
```

#### Method 2: Docker
```bash
# Complete launch with Docker Compose
docker-compose up --build
```

### Access URLs
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Database: PostgreSQL su porta 5432
- Redis: porta 6379

## 🔐 Configurazione Autenticazione

### Variabili d'Ambiente
Prima di avviare il progetto, configura le variabili d'ambiente nel file `server/.env`:

```bash
# Copia il file di esempio
cp server/.env.example server/.env
```

### JWT Secret
Genera una chiave sicura per JWT:
```bash
# Su Linux/Mac
openssl rand -base64 32

# Su Windows (PowerShell)
[System.Web.Security.Membership]::GeneratePassword(32,0)
```

### Google OAuth Setup
1. Vai su [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuovo progetto o selezionane uno esistente
3. Abilita l'API "Google+ API"
4. Vai su "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Configura:
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:3000/auth/google/callback`
6. Copia Client ID e Client Secret nel `.env`

### GitHub OAuth Setup
1. Vai su [GitHub Developer Settings](https://github.com/settings/developers)
2. Clicca "New OAuth App"
3. Configura:
   - Homepage URL: `http://localhost:5173`
   - Authorization callback URL: `http://localhost:3000/auth/github/callback`
4. Copia Client ID e Client Secret nel `.env`

### File .env Completo
```env
# Database
DATABASE_URL="postgresql://postgres:nuovapassword@localhost:5432/recapp?schema=public"
REDIS_URL="redis://localhost:6379"

# Server
PORT=3000
NODE_ENV=development

# JWT Secret
JWT_SECRET="your-generated-secret-key-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub OAuth
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Frontend URL
FRONTEND_URL="http://localhost:5173"
```

## 🎨 Design and UI

### Color Palette
- **Primary**: Orange gradient (#ff6b35 → #ff4500)
- **Background**: Cream/Beige (#ffeee6, #ffe5d9)
- **Text**: Dark gray (#2d2d2d)
- **Accents**: Green for easy difficulty, red for hard

### UI Components
- **Cards**: Border radius 20px, hover animations
- **Buttons**: Gradient background, shadow effects
- **Typography**: Font weight 800 for titles, Segoe UI family
- **Responsive**: Grid layout with auto-fit, mobile-first

## 📱 Main Features

### ✅ Completate
- [x] Setup progetto con separazione client/server
- [x] Configurazione Docker + PostgreSQL + Redis
- [x] Schema database con Prisma
- [x] Componenti UI base (Navbar, Hero, Categories, RecipeCard)
- [x] Design responsive ispirato a SaporNet
- [x] **Sistema di autenticazione completo (JWT + OAuth Google/GitHub)**
- [x] **Componenti Login/Signup con UI moderna**
- [x] **Routing e gestione stato utente**

### 🔄 In Sviluppo
- [ ] React Router per navigazione
- [ ] API REST per ricette
- [ ] Upload immagini ricette
- [ ] Sistema di like/preferiti

### 📋 To Be Implemented
- [ ] Recipe detail page
- [ ] User profile
- [ ] Comment system
- [ ] Advanced search and filters
- [ ] Admin dashboard
- [ ] Notification system

## 🔧 Technologies Used

### Frontend
- React 18
- Vite 5
- React Router DOM
- CSS3 (Flexbox, Grid, Animations)

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- Redis
- JWT + Passport.js
- bcryptjs

### DevOps
- Docker & Docker Compose
- Git & GitHub

## 📂 File Structure

```
RecApp/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Pages (to be implemented)
│   │   ├── hooks/         # Custom hooks
│   │   └── utils/         # Utilities
│   ├── public/
│   └── package.json
├── server/                # Node.js backend
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── models/        # Database models
│   │   ├── middleware/    # Express middleware
│   │   └── config/        # Configurations
│   ├── prisma/           # Database schema
│   └── package.json
├── docs/                 # Documentation
├── docker-compose.yml    # Container orchestration
└── README.md
```

## 🤝 Contributors
- **Development**: GitHub Copilot AI Assistant
- **Design**: Inspired by SaporNet
- **Project**: RecApp Fitness Recipe Forum

## 📝 Technical Notes
- Database configured with user `recapp_user` and database `recapp`
- Redis used for caching and sessions
- JWT for stateless authentication
- Prisma for type-safe ORM
- Vite for fast development and optimized builds

---

Replace placeholders and customize features according to your needs!
