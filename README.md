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
- Database: PostgreSQL on port 5432
- Redis: port 6379

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

### ✅ Completed
- [x] Project setup with client/server separation
- [x] Docker + PostgreSQL + Redis configuration
- [x] Database schema with Prisma
- [x] Base UI components (Navbar, Hero, Categories, RecipeCard)
- [x] SaporNet-inspired responsive design
- [x] Planned authentication system

### 🔄 In Development
- [ ] React Router for navigation
- [ ] REST API for recipes
- [ ] Complete authentication system
- [ ] Recipe image upload
- [ ] Like/favorites system

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
