# Smart Gents Saloon

A production-ready, premium barbershop & men's grooming salon web application — luxurious, dark-themed, and fully animated.

---

## Overview

Smart Gents Saloon is a full-stack web application for a modern men's saloon. It features an elegant dark UI, an online booking system, service and team management, a gallery, an admin dashboard, and email notifications.

Design inspiration: [Bonzer Grooming](https://bonzergrooming.com/)

---

## Tech Stack

| Layer       | Technology                                      |
|-------------|--------------------------------------------------|
| Frontend    | Next.js (App Router) + TypeScript + Tailwind CSS |
| Animations  | Framer Motion                                    |
| Backend     | NestJS (Node.js)                                 |
| Database    | PostgreSQL                                       |
| ORM         | Prisma                                           |
| Auth        | JWT (access + refresh tokens)                    |
| Storage     | Cloudinary                                       |
| Email       | Nodemailer                                       |
| Deployment  | Vercel (frontend) + Railway (backend)            |

---

## Project Structure

```
smart-gents-saloon/
├── client/          # Next.js frontend
├── server/          # NestJS backend
├── docs/            # Documentation & assets
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL
- Cloudinary account
- npm or pnpm

### 1. Clone the repository

```bash
git clone https://github.com/your-username/smart-gents-saloon.git
cd smart-gents-saloon
```

### 2. Setup the backend

```bash
cd server
npm install
cp .env.example .env
# Fill in your environment variables
npx prisma migrate dev
npm run start:dev
```

### 3. Setup the frontend

```bash
cd client
npm install
cp .env.example .env.local
# Fill in your environment variables
npm run dev
```

---

## Environment Variables

### Backend (`server/.env`)

```env
DATABASE_URL=postgresql://user:password@localhost:5432/smart_gents_saloon
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret
SMTP_HOST=smtp.example.com
SMTP_USER=your_email@example.com
SMTP_PASS=your_email_password
```

### Frontend (`client/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## Available Scripts

### Backend

| Command               | Description                    |
|-----------------------|--------------------------------|
| `npm run start:dev`   | Start dev server with watch    |
| `npm run build`       | Build for production           |
| `npm run start:prod`  | Start production server        |
| `npm run test`        | Run unit tests                 |

### Frontend

| Command         | Description              |
|-----------------|--------------------------|
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

---

## API Endpoints

| Module        | Endpoint                    | Method |
|---------------|-----------------------------|--------|
| Auth          | `/auth/login`               | POST   |
| Auth          | `/auth/refresh`             | POST   |
| Auth          | `/auth/profile`             | GET    |
| Services      | `/services`                 | GET    |
| Services      | `/services/:id`             | GET    |
| Services      | `/services`                 | POST   |
| Services      | `/services/:id`             | PATCH  |
| Services      | `/services/:id`             | DELETE |
| Appointments  | `/appointments`             | POST   |
| Appointments  | `/appointments`             | GET    |
| Appointments  | `/appointments/:id`         | PATCH  |
| Appointments  | `/appointments/:id`         | DELETE |
| Barbers       | `/barbers`                  | GET    |
| Barbers       | `/barbers`                  | POST   |
| Barbers       | `/barbers/:id`              | PATCH  |
| Barbers       | `/barbers/:id`              | DELETE |
| Gallery       | `/gallery`                  | GET    |
| Gallery       | `/gallery`                  | POST   |
| Gallery       | `/gallery/:id`              | DELETE |

---

## Branch Strategy

```
main        — production-ready code
develop     — integration branch
feature/*   — individual feature branches
```

**Workflow:**
1. Branch off `develop` → `feature/your-feature`
2. Complete & test the feature
3. Commit with conventional messages
4. Merge back into `develop`
5. Merge `develop` → `main` for releases

---

## Commit Convention

```
type(scope): short description
```

Examples:
- `feat(frontend): setup Next.js frontend architecture`
- `feat(auth): implement JWT authentication`
- `feat(booking): create appointment booking APIs`
- `fix(api): resolve appointment validation issue`

---

## Deployment

### Frontend — Vercel

1. Push to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Set environment variables in Vercel dashboard
4. Deploy

### Backend — Railway

1. Push to GitHub
2. Create new project on [railway.app](https://railway.app)
3. Add PostgreSQL service
4. Set environment variables
5. Deploy

---

## License

MIT © Smart Gents Saloon
