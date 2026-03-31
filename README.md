# Buyer Portal

A real-estate buyer portal where users can register, browse properties, and manage a personal favourites list.

**Frontend:** https://buyer-portal-zeta.vercel.app/

**Backend API:** https://buyer-portal-x4dd.onrender.com/

**Stack:** React + TypeScript + Vite (frontend), Express + TypeScript + Prisma (backend), PostgreSQL (Supabase)

## How to Run

### 1. Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Set up environment variables

**`backend/.env`**
```env

DATABASE_URL=postgresql://user:password@aws-0-xxxx.pooler.supabase.com:6543/dbname?pgbouncer=true
PORT=3000
JWT_SECRET=your_secret
JWT_REFRESH_SECRET=your_refresh_secret
FRONTEND_URL=http://localhost:5173
```

**`frontend/.env`**
```env
VITE_BACKEND_URL=http://localhost:3000/api
```

### 3. Run database migrations and seed

```bash
cd backend
npx prisma migrate dev
npx tsx seed.ts
```

### 4. Start

```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

Open **http://localhost:5173**

## Example Flows

**Sign Up → Dashboard**
1. Go to `/register` → fill name, email, password → click **Create Account**
2. Redirected to Dashboard with "Welcome back, {name}!"

**Login → Add Favourite**
1. Go to `/login` → enter credentials → click **Sign In**
2. Click **Explore** in sidebar → click the **heart** on any property
3. Click **My Favorites** → the property appears in your list

**Remove Favourite**
- Click the filled heart on any favourited property to remove it

**Logout**
- Click the logout icon → redirected to login page
- Protected pages redirect unauthenticated users to `/login`