# 🗺️ TravelTrack

> **Create, share, and explore travel itineraries with ease**

A full-stack web application that lets users create detailed travel itineraries, visualize them on interactive maps, generate shareable links, and export PDF guides.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Running Locally](#-running-locally)
- [Database Schema](#-database-schema)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### Core Features (V1)

- **User Authentication**
  - Secure signup/login with JWT tokens
  - Persistent sessions
  - Protected routes

- **Itinerary Management**
  - Create, read, update, delete travel itineraries
  - Organize multiple destination legs with dates
  - Save and manage all your trips in one place

- **Interactive Map Visualization**
  - Display itinerary on a live map with markers
  - Route visualization between destinations
  - Location search and autocomplete
  - Zoom and pan functionality

- **PDF Export**
  - Generate printable PDF guides
  - Includes all itinerary details and descriptions
  - One-click download

- **Shareable Links**
  - Create public, read-only links to share itineraries
  - Share with friends/family without requiring login
  - Secure token-based access

- **Dashboard**
  - View all your itineraries at a glance
  - Quick search and filter
  - Fast actions (edit, duplicate, delete, share)

- **Detailed Itinerary Steps**
  - Add titles, descriptions, and duration to each leg
  - Organize your trip day-by-day or by activity

---

## 🛠️ Tech Stack

### Backend
```
Node.js 18+ / Express.js
PostgreSQL + Prisma ORM
JWT Authentication
Nodemailer (optional)
pdfkit for PDF generation
```

### Frontend
```
React 18+ with Vite
Tailwind CSS for styling
React Router v6 for navigation
TanStack Query for data fetching
React Hook Form for form management
Leaflet + React Leaflet for maps
Zustand for state management (minimal)
```

### DevOps & Infrastructure
```
Docker + docker-compose (development)
Vercel (Frontend + Serverless Backend)
PostgreSQL Cloud (Neon, Supabase, or Render)
GitHub Actions (CI/CD)
```

---

## 📁 Project Structure

```
traveltrack/
│
├── backend/                          # Node.js Express API
│   ├── src/
│   │   ├── routes/                  # API endpoints
│   │   │   ├── auth.routes.js
│   │   │   ├── itineraries.routes.js
│   │   │   └── public.routes.js
│   │   │
│   │   ├── controllers/             # Request handlers
│   │   │   ├── authController.js
│   │   │   ├── itineraryController.js
│   │   │   └── pdfController.js
│   │   │
│   │   ├── services/                # Business logic
│   │   │   ├── authService.js
│   │   │   ├── itineraryService.js
│   │   │   └── pdfService.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorHandler.js
│   │   │   └── validator.js
│   │   │
│   │   ├── models/                  # Prisma schemas
│   │   ├── config/                  # DB & env config
│   │   ├── utils/                   # Helpers, constants
│   │   └── server.js                # Entry point
│   │
│   ├── prisma/
│   │   ├── schema.prisma            # Database schema
│   │   └── migrations/              # DB migrations
│   │
│   ├── tests/                       # Unit tests
│   ├── .env.example
│   ├── package.json
│   └── Dockerfile
│
├── frontend/                         # React + Vite SPA
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── Auth/
│   │   │   ├── Itinerary/
│   │   │   ├── Map/
│   │   │   ├── Dashboard/
│   │   │   └── Common/
│   │   │
│   │   ├── pages/                   # Page components
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── ItineraryEditorPage.jsx
│   │   │   └── PublicSharePage.jsx
│   │   │
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useItinerary.js
│   │   │   └── useMap.js
│   │   │
│   │   ├── services/                # API calls
│   │   │   ├── authService.js
│   │   │   ├── itineraryService.js
│   │   │   └── mapService.js
│   │   │
│   │   ├── store/                   # Global state (Zustand)
│   │   │   └── authStore.js
│   │   │
│   │   ├── styles/                  # Global CSS
│   │   │   ├── globals.css
│   │   │   └── tailwind.config.js
│   │   │
│   │   ├── utils/                   # Helpers
│   │   │   ├── api.js              # Axios instance
│   │   │   └── constants.js
│   │   │
│   │   ├── App.jsx                  # Root component
│   │   └── main.jsx                 # Entry point
│   │
│   ├── public/                      # Static assets
│   ├── .env.example
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml               # Local dev environment
├── .gitignore
├── README.md                        # This file
└── CONTRIBUTING.md                  # Contribution guidelines
```

---

## 📦 Prerequisites

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **npm** v8+ or **yarn** v3+
- **Docker** & **Docker Compose** (for local DB) - [Install](https://www.docker.com/)
- **PostgreSQL** (if running without Docker)
- **Git** for version control

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/traveltrack.git
cd traveltrack
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start PostgreSQL with Docker
docker-compose up -d

# Run database migrations
npx prisma migrate deploy

# Seed database (optional)
npx prisma db seed

# Start development server
npm run dev
```

Backend will run on `http://localhost:5000` by default.

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173` by default.

---

## 🔐 Environment Variables

### Backend (`.env`)

```env
# Server
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/traveltrack

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRY=7d

# CORS
CORS_ORIGIN=http://localhost:5173

# PDF Generation
PDF_FONT_PATH=./fonts/Arial.ttf
```

### Frontend (`.env`)

```env
VITE_API_URL=http://localhost:5000/api
VITE_MAP_TOKEN=your_mapbox_or_leaflet_api_key
```

---

## 🏃 Running Locally

### Option 1: With Docker (Recommended)

```bash
# From root directory
docker-compose up

# Access:
# - Frontend: http://localhost:5173
# - Backend: http://localhost:5000
# - PostgreSQL: localhost:5432
```

### Option 2: Manual (without Docker)

**Terminal 1 - Database:**
```bash
# Make sure PostgreSQL is running locally
# Or use a cloud DB (Neon, Supabase, etc.)
```

**Terminal 2 - Backend:**
```bash
cd backend
npm install
npx prisma migrate deploy
npm run dev
```

**Terminal 3 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## 💾 Database Schema

### Core Tables

```
┌─────────────┐
│   User      │
├─────────────┤
│ id (PK)     │
│ email       │
│ password    │
│ firstName   │
│ lastName    │
│ createdAt   │
└─────────────┘
       │
       │ 1:N
       ▼
┌──────────────────┐
│  Itinerary       │
├──────────────────┤
│ id (PK)          │
│ userId (FK)      │
│ title            │
│ description      │
│ startDate        │
│ endDate          │
│ shareToken       │
│ createdAt        │
└──────────────────┘
       │
       │ 1:N
       ▼
┌──────────────────┐
│   Leg            │
├──────────────────┤
│ id (PK)          │
│ itineraryId(FK)  │
│ title            │
│ description      │
│ latitude         │
│ longitude        │
│ duration (mins)  │
│ order            │
│ createdAt        │
└──────────────────┘
```

See `prisma/schema.prisma` for full schema details.

---

## 📡 API Documentation

### Authentication Endpoints

#### Sign Up
```http
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "firstName": "John",
  "lastName": "Doe"
}

Response: 201 Created
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id", "email", "firstName", "lastName" }
}
```

#### Log In
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id", "email", "firstName", "lastName" }
}
```

### Itinerary Endpoints

#### Get All User Itineraries
```http
GET /api/itineraries
Authorization: Bearer {token}

Response: 200 OK
[
  {
    "id": "uuid",
    "title": "European Adventure",
    "startDate": "2024-06-01",
    "endDate": "2024-06-15",
    "legs": [...],
    "shareToken": "abc123..."
  }
]
```

#### Create Itinerary
```http
POST /api/itineraries
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Paris Trip",
  "description": "Summer 2024",
  "startDate": "2024-06-01",
  "endDate": "2024-06-10"
}

Response: 201 Created
{ "id": "uuid", "title": "Paris Trip", ... }
```

#### Add Leg to Itinerary
```http
POST /api/itineraries/:id/legs
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Visit Eiffel Tower",
  "description": "Iconic landmark",
  "latitude": 48.8584,
  "longitude": 2.2945,
  "duration": 120,
  "order": 1
}

Response: 201 Created
{ "id": "uuid", "title": "Visit Eiffel Tower", ... }
```

#### Export to PDF
```http
GET /api/itineraries/:id/export-pdf
Authorization: Bearer {token}

Response: 200 OK (PDF file)
```

#### Get Public Itinerary
```http
GET /api/public/itineraries/:shareToken

Response: 200 OK
{
  "id": "uuid",
  "title": "Paris Trip",
  "legs": [...],
  "user": { "firstName", "lastName" }
}
```

For complete API spec, see `backend/API.md` or use Postman collection.

---

## 🚢 Deployment

### Frontend Deployment (Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# From frontend directory
cd frontend
vercel

# Follow prompts to connect GitHub and deploy
```

**Vercel Config** (`frontend/vercel.json`):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

### Backend Deployment (Vercel Serverless)

Option A: Deploy as Vercel Functions

```bash
# Create vercel.json in backend root
{
  "buildCommand": "npm install",
  "env": {
    "DATABASE_URL": "@database_url",
    "JWT_SECRET": "@jwt_secret"
  }
}
```

Option B: Deploy to Railway/Render

1. Push code to GitHub
2. Connect repo to Railway or Render
3. Set environment variables
4. Deploy

### Database Setup (Production)

Use **Neon**, **Supabase**, or **Render PostgreSQL**:

```bash
# Set DATABASE_URL in your hosting provider
DATABASE_URL=postgresql://user:pass@prod-db-host:5432/traveltrack
```

Run migrations in production:
```bash
npx prisma migrate deploy
```

---

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

Example test:
```javascript
// authService.test.js
describe('AuthService', () => {
  test('should create user and return token', async () => {
    const user = await authService.signup({
      email: 'test@example.com',
      password: 'password123'
    });
    expect(user.token).toBeDefined();
  });
});
```

### Frontend Tests (E2E)

```bash
cd frontend

# Run Cypress E2E tests
npm run test:e2e

# Or Playwright
npm run test:playwright
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### 1. Fork & Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Code Standards

- **Backend**: Follow ESLint config in `.eslintrc.js`
- **Frontend**: Use Prettier for formatting
- Use meaningful commit messages: `feat: add map search`, `fix: PDF export bug`

### 3. Commit & Push

```bash
git commit -m "feat: add location search feature"
git push origin feature/your-feature-name
```

### 4. Pull Request

Create a PR with:
- Clear description of changes
- Screenshots (if UI changes)
- Related issue number (if applicable)

### Code Review Checklist

- [ ] Code follows project style guide
- [ ] All tests pass
- [ ] No console errors/warnings
- [ ] Database migrations included
- [ ] .env variables documented

---

## 📚 Additional Resources

- **API Docs**: See `backend/API.md`
- **Architecture Guide**: See `ARCHITECTURE.md`
- **Database Guide**: See `SCHEMA.md`
- **Deployment Guide**: See `DEPLOYMENT.md`

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🆘 Support & Feedback

- 📧 Email: support@traveltrack.local
- 💬 Discussions: Use GitHub Discussions for Q&A
- 🐛 Report bugs: Open an issue with the `[BUG]` label

---

## 🙏 Acknowledgments

- **Leaflet** - Open-source mapping library
- **Tailwind CSS** - Utility-first CSS framework
- **Prisma** - Modern database ORM
- **React Router** - Client-side routing

---

**Made with ❤️ by TyrYoxan**

Last updated: April 2024 | Status: Active Development
