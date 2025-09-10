# Database: PostgreSQL + Prisma

Questa guida spiega come configurare e usare PostgreSQL con Prisma nel backend di RecApp.

---
## 1. Struttura

**server/prisma/schema.prisma**
- Definisci qui i modelli (User, Recipe, ecc.)

**server/.env**
- Inserisci la stringa di connessione PostgreSQL:
  ```env
  DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
  ```

**server/models/**
- Puoi creare file JS per funzioni di accesso ai dati usando Prisma Client

---
## 2. Passaggi operativi

1. Installa PostgreSQL localmente o usa un servizio cloud
2. Aggiorna `.env` con la stringa di connessione
3. Definisci i modelli in `schema.prisma` (esempio sotto)
4. Esegui le migrazioni:
   ```bash
   npx prisma migrate dev --name init
   ```
5. Usa Prisma Client nelle API per accedere al database

---
## 3. Esempio schema.prisma
```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  provider  String
  providerId String?
  recipes   Recipe[]
  createdAt DateTime @default(now())
}

model Recipe {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  user      User?    @relation(fields: [userId], references: [id])
  userId    Int?
  createdAt DateTime @default(now())
}
```

---
## 4. Utilizzo in Express
Esempio:
```js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Creazione utente
await prisma.user.create({ data: { email, password, provider } });

// Query ricette
const recipes = await prisma.recipe.findMany();
```

---
Consulta la documentazione ufficiale Prisma per dettagli avanzati: https://www.prisma.io/docs
