# CLAUDE CODE INSTRUCTION SCRIPT

# Project: Smart Gents Saloon

# Stack:

# - Frontend: Next.js + Tailwind + Framer Motion

# - Backend: NestJS

# - Database: PostgreSQL

# - ORM: Prisma

# - Auth: JWT

# - Storage: Cloudinary

# - Deployment: Vercel + Railway

You are a senior full-stack engineer.

Your task is to build a COMPLETE production-ready premium salon website named:

"Smart Gents Saloon"

Design inspiration:
https://bonzergrooming.com/

The website should look:

- luxurious
- modern
- dark-themed
- elegant
- premium
- responsive
- smooth animated

====================================================
PHASE 1 — PROJECT INITIALIZATION
====================================================

STEP 1:
Create the following folder structure:

smart-gents-saloon/
│
├── client/
├── server/
├── docs/
└── README.md

====================================================
PHASE 2 — FRONTEND SETUP (NEXT.JS)
====================================================

STEP 2:
Initialize Next.js app inside /client

Requirements:

- Next.js latest
- TypeScript
- App Router
- ESLint
- Tailwind CSS

Command:
npx create-next-app@latest client

====================================================

STEP 3:
Install frontend dependencies

Required packages:

- tailwindcss
- framer-motion
- lucide-react
- axios
- react-hook-form
- zod
- @hookform/resolvers
- zustand
- @tanstack/react-query
- clsx
- tailwind-merge
- sonner
- next-themes
- swiper

====================================================

STEP 4:
Configure Tailwind

Requirements:

- dark luxury theme
- custom colors
- smooth transitions
- responsive breakpoints

Create color palette:

- background: #0F0F0F
- card: #1B1B1B
- gold: #C8A96B
- muted: #999999
- white: #FFFFFF

====================================================

STEP 5:
Setup global layout

Create:

- Navbar
- Footer
- Smooth scroll
- Max width container
- Responsive mobile menu

Navbar menu:

- Home
- About
- Services
- Gallery
- Team
- Pricing
- Contact
- Book Appointment

====================================================

STEP 6:
Create reusable UI components

Components:

- Button
- SectionTitle
- ServiceCard
- TeamCard
- TestimonialCard
- GalleryCard
- PricingCard
- BookingForm
- Input
- Textarea
- Modal
- Loader

Use:

- Tailwind
- Framer Motion
- Accessible UI

====================================================
PHASE 3 — HOMEPAGE DEVELOPMENT
====================================================

STEP 7:
Build Homepage

Sections:

1. Hero Section
2. About Preview
3. Featured Services
4. Why Choose Us
5. Gallery Preview
6. Pricing Preview
7. Testimonials
8. CTA Booking Section
9. Footer

====================================================

STEP 8:
Hero Section Requirements

Features:

- fullscreen background image/video
- animated heading
- animated buttons
- dark overlay
- premium typography

Heading:
"Crafting Confidence for Modern Gentlemen"

Buttons:

- Book Appointment
- Explore Services

====================================================

STEP 9:
Add animations

Use Framer Motion for:

- fade in
- stagger animation
- hover effects
- smooth page transitions
- scroll animations

====================================================
PHASE 4 — WEBSITE PAGES
====================================================

STEP 10:
Create About Page

Sections:

- salon story
- mission
- vision
- salon environment
- experience stats

====================================================

STEP 11:
Create Services Page

Categories:

- Hair Cut
- Beard Trim
- Hair Coloring
- Facial
- Hair Treatment
- Spa
- Groom Packages

Each service includes:

- image
- title
- description
- price
- duration
- booking button

====================================================

STEP 12:
Create Gallery Page

Features:

- masonry grid
- image modal
- category filtering
- smooth hover animations

====================================================

STEP 13:
Create Team Page

Display:

- barber photo
- specialty
- years experience
- social links

====================================================

STEP 14:
Create Pricing Page

Features:

- pricing table
- packages
- combo offers
- premium membership cards

====================================================

STEP 15:
Create Contact Page

Features:

- contact form
- Google Map embed
- business hours
- WhatsApp button
- social links

====================================================
PHASE 5 — BOOKING SYSTEM FRONTEND
====================================================

STEP 16:
Create Booking Page

Features:

- select service
- select barber
- date picker
- time slot selection
- customer info form
- success modal

====================================================

STEP 17:
Add form validation

Use:

- react-hook-form
- zod validation

Validation:

- required fields
- valid phone
- valid email

====================================================
PHASE 6 — BACKEND SETUP (NESTJS)
====================================================

STEP 18:
Initialize NestJS app inside /server

Command:
nest new server

Install:

- @nestjs/config
- @nestjs/jwt
- @nestjs/passport
- passport
- passport-jwt
- bcrypt
- class-validator
- class-transformer
- prisma
- @prisma/client
- cloudinary
- multer
- nodemailer

====================================================

STEP 19:
Setup PostgreSQL + Prisma

Create Prisma schema.

Models:

- User
- Service
- Appointment
- Barber
- Gallery
- Testimonial

====================================================

STEP 20:
Setup Prisma relationships

Requirements:

- Appointment belongs to Service
- Appointment belongs to Barber
- Admin user controls dashboard

====================================================

STEP 21:
Configure environment variables

Create:
.env

Variables:
DATABASE_URL=
JWT_SECRET=
CLOUDINARY_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
SMTP_HOST=
SMTP_USER=
SMTP_PASS=

====================================================
PHASE 7 — AUTHENTICATION SYSTEM
====================================================

STEP 22:
Implement JWT Authentication

Features:

- login
- access token
- refresh token
- password hashing
- protected routes

Roles:

- admin
- staff

====================================================

STEP 23:
Create Auth APIs

Endpoints:
POST /auth/login
POST /auth/refresh
GET /auth/profile

====================================================
PHASE 8 — SERVICES MODULE
====================================================

STEP 24:
Create Services Module

Endpoints:
GET /services
GET /services/:id
POST /services
PATCH /services/:id
DELETE /services/:id

====================================================
PHASE 9 — APPOINTMENT SYSTEM
====================================================

STEP 25:
Create Appointment Module

Features:

- create appointment
- available slots
- cancel booking
- update status

Statuses:

- pending
- approved
- cancelled
- completed

====================================================

STEP 26:
Create Appointment APIs

Endpoints:
POST /appointments
GET /appointments
PATCH /appointments/:id
DELETE /appointments/:id

====================================================
PHASE 10 — BARBER MODULE
====================================================

STEP 27:
Create Barber Module

Endpoints:
GET /barbers
POST /barbers
PATCH /barbers/:id
DELETE /barbers/:id

====================================================
PHASE 11 — GALLERY MODULE
====================================================

STEP 28:
Implement Cloudinary Uploads

Features:

- image upload
- delete image
- optimize images

====================================================

STEP 29:
Create Gallery APIs

Endpoints:
GET /gallery
POST /gallery
DELETE /gallery/:id

====================================================
PHASE 12 — ADMIN DASHBOARD
====================================================

STEP 30:
Create Admin Dashboard

Features:

- overview stats
- appointment management
- service management
- barber management
- gallery management
- testimonial management

====================================================

STEP 31:
Create Dashboard UI

Requirements:

- sidebar
- top navbar
- analytics cards
- responsive tables
- modal forms

====================================================
PHASE 13 — EMAIL NOTIFICATIONS
====================================================

STEP 32:
Implement Email Notifications

Send emails for:

- booking confirmation
- booking approval
- cancellation

Use Nodemailer.

====================================================
PHASE 14 — SEO OPTIMIZATION
====================================================

STEP 33:
Implement SEO

Requirements:

- metadata
- OpenGraph
- robots.txt
- sitemap.xml
- structured data

====================================================

STEP 34:
Optimize performance

Requirements:

- lazy loading
- image optimization
- code splitting
- caching

====================================================
PHASE 15 — SECURITY
====================================================

STEP 35:
Implement security best practices

Requirements:

- Helmet
- CORS
- rate limiting
- DTO validation
- SQL injection protection

====================================================
PHASE 16 — RESPONSIVENESS
====================================================

STEP 36:
Make fully responsive

Support:

- mobile
- tablet
- desktop

Ensure:

- responsive navbar
- responsive grids
- touch-friendly buttons

====================================================
PHASE 17 — TESTING
====================================================

STEP 37:
Test all features

Test:

- APIs
- forms
- authentication
- responsiveness
- booking flow

====================================================
PHASE 18 — DEPLOYMENT
====================================================

STEP 38:
Deploy frontend to Vercel

Requirements:

- production environment
- optimized build
- SEO support

====================================================

STEP 39:
Deploy backend to Railway

Requirements:

- PostgreSQL connection
- environment variables
- production mode

====================================================
PHASE 19 — FINAL POLISH
====================================================

STEP 40:
Add final premium touches

Requirements:

- elegant animations
- luxury UI
- smooth transitions
- loading states
- empty states
- toast notifications

====================================================
FINAL REQUIREMENTS
====================================================

Coding standards:

- clean architecture
- scalable folder structure
- reusable components
- TypeScript everywhere
- proper error handling
- modular backend
- production-ready code

UI requirements:

- premium salon branding
- luxury dark design
- masculine aesthetic
- smooth UX
- modern layout

Performance requirements:

- Lighthouse score above 90
- mobile optimized
- SEO optimized

IMPORTANT:

- Build step by step
- Complete one phase before next
- Use best practices
- Write maintainable code
- Add comments only when necessary
- Keep code clean and modular

# ADDITIONAL GITHUB VERSION CONTROL INSTRUCTIONS

====================================================
GITHUB WORKFLOW REQUIREMENTS
====================================================

IMPORTANT:
You MUST use Git and commit code after completing EVERY major step or feature.

====================================================

STEP 0:
Initialize Git repository at project root.

Commands:
git init

Create:
.gitignore

Ignore:

- node_modules
- .next
- dist
- .env
- coverage
- uploads
- generated files

====================================================

# GITHUB BRANCH STRATEGY

Use this branch structure:

main
develop
feature/\*

Examples:

- feature/frontend-setup
- feature/homepage
- feature/auth-system
- feature/booking-system
- feature/admin-dashboard

====================================================

# WORKFLOW RULES

1. Create a new feature branch before starting a major feature.

Example:
git checkout -b feature/homepage

2. Complete the feature.

3. Test the feature.

4. Commit the feature.

5. Merge into develop.

6. Continue with next feature branch.

====================================================

# COMMIT MESSAGE RULES

Use professional commit messages.

Format:
type(scope): short description

Examples:

- feat(frontend): setup Next.js frontend architecture
- feat(homepage): create premium hero section
- feat(auth): implement JWT authentication
- feat(booking): create appointment booking APIs
- feat(admin): build dashboard sidebar
- style(ui): improve responsive navbar
- fix(api): resolve appointment validation issue
- refactor(services): optimize service module structure

====================================================

# MANDATORY COMMITS AFTER THESE STEPS

Commit after:

- project initialization
- frontend setup
- backend setup
- Tailwind configuration
- homepage completion
- each page completion
- authentication setup
- Prisma schema creation
- each API module
- admin dashboard
- booking system
- gallery upload system
- email notifications
- responsiveness fixes
- deployment configuration

====================================================

# EXAMPLE WORKFLOW

# Create branch

git checkout -b feature/services-page

# Work on feature

# Stage files

git add .

# Commit

git commit -m "feat(services): create dynamic services page"

# Merge

git checkout develop
git merge feature/services-page

====================================================

# PUSHING TO GITHUB

After every major commit:
git push origin <branch-name>

====================================================

# REPOSITORY REQUIREMENTS

Create:

- README.md
- CONTRIBUTING.md
- LICENSE

README must include:

- project overview
- tech stack
- installation guide
- environment variables
- scripts
- deployment steps
- screenshots

====================================================

# VERSION CONTROL BEST PRACTICES

- Never commit .env files
- Never commit secrets
- Keep commits small and meaningful
- Use atomic commits
- Write descriptive commit messages
- Push frequently
- Maintain clean git history

====================================================

# FINAL DELIVERY REQUIREMENTS

Before final delivery:

- Merge all features into main
- Remove unused branches
- Ensure clean commit history
- Verify production build works
- Tag release version

Example:
git tag v1.0.0

====================================================

# IMPORTANT FINAL RULE

After completing EVERY major phase:

1. Test the feature
2. Commit changes
3. Push to GitHub
4. Then continue to next phase

DO NOT continue building large sections without committing changes.
