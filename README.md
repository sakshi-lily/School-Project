# School Management System (MERN Stack)

Welcome to the School Management System codebase. This project is structured as a monorepo containing multiple frontend portals powered by a unified Node.js/Express backend connecting to MongoDB.

## Project Structure

```text
SCHOOL PROJECT/
├── backend/            # Express.js REST API server (Shared)
├── landing-page/       # Vite + React (Public Landing Page)
├── admin-portal/       # Vite + React (Admin Management Dashboard)
└── teacher-portal/     # Vite + React (Teacher Dashboard & Gradebook)
```

---

## Portals & Components

1. **Shared Backend (`/backend`)**
   - Handles connection to MongoDB.
   - Provides JWT-based authentication for both Admins and Teachers.
   - Exposes role-protected endpoints (`/api/auth`, `/api/admin`, `/api/teacher`).

2. **Landing Page (`/landing-page`)**
   - Public-facing homepage.
   - Fully static/informational with no login requirement.
   - Includes Hero section, Features description, Contact form, and Portal redirects.

3. **Admin Portal (`/admin-portal`)**
   - Restricted to authenticated administrative accounts.
   - Allows managing student registrations, hiring/assigning teachers, and general school settings.

4. **Teacher Portal (`/teacher-portal`)**
   - Restricted to authenticated teacher accounts.
   - Allows class scheduling, student grading, and managing attendance.

---

## Quick Start Setup

To run all services, you will need to install dependencies in each directory and run them.

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB Instance (Local or MongoDB Atlas cloud connection)

### 1. Setup Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables. Duplicate `.env.example` as `.env` and fill in the values:
   ```bash
   cp .env.example .env
   ```
4. Start the server in development mode:
   ```bash
   npm run dev
   ```
   *The server runs on http://localhost:5000 by default.*

### 2. Setup Frontend Portals (Landing Page, Admin Portal, Teacher Portal)
For each portal folder (`landing-page`, `admin-portal`, `teacher-portal`):
1. Navigate to the portal directory:
   ```bash
   cd <portal-name>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The console will provide the local port (usually http://localhost:5173, http://localhost:5174, etc.).*
