# Portfolio Full-Stack Application

> **✨ Now Running as Unified Next.js App!** The backend has been migrated to Next.js API routes. See [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) for details.

A modern, full-stack portfolio application built entirely with **Next.js 14** - featuring API routes, MongoDB integration, email functionality, and a beautiful UI.

## 🚀 Features

### Full-Stack Next.js Application
- ⚡ **Next.js 14** with App Router
- 🎨 Modern React with TypeScript
- 💅 Tailwind CSS with custom design system
- 📱 Fully responsive design
- 🎭 Smooth animations and transitions
- 🌙 Glassmorphic UI with dark theme

### Backend (Next.js API Routes)
- 🔌 RESTful API design
- 🗄️ MongoDB database integration
- 📧 Email system with Nodemailer
- ✅ Input validation with Joi
- 🛡️ Rate limiting and security
- 🔐 JWT authentication ready

### Content Sections
- 👤 Hero with typing animation
- 💼 Work experience timeline
- 🚀 Featured projects showcase
- 💬 Client testimonials
- ⚡ Tech stack with proficiency levels
- 📬 Contact form with email notifications

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (already configured)
- npm package manager
- Gmail account with app password (for email functionality)

## 🛠️ Installation & Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Environment Setup

Create `frontend/.env.local` with your credentials:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Email (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
SMTP_FROM_NAME=Your Name
SMTP_FROM_EMAIL=your_email@gmail.com
CONTACT_EMAIL=your_email@gmail.com

# Optional
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
NODE_ENV=development
```

### 3. Database Setup

Your MongoDB database is already populated with data! ✅

### 4. Start the Application

**Quick Start** (from root directory):
```bash
npm run dev
```

Or manually:
```bash
cd frontend
npm run dev
```

Or use the batch file (Windows):
```bash
start-dev.bat
```

## 🔗 Access Points

- **Portfolio Website**: http://localhost:3000
- **API Health Check**: http://localhost:3000/api/health
- **Skills API**: http://localhost:3000/api/skills
- **Projects API**: http://localhost:3000/api/projects
- **Contact API**: http://localhost:3000/api/contact

## 🧪 Testing

Test all API endpoints:
```bash
npm run test:api
```
Or:
```bash
.\test-api.ps1
```

## 📁 Project Structure

```
Kush05Bhardwaj.dev/
├── frontend/                    # Next.js Full-Stack Application
│   ├── app/
│   │   ├── api/                # ⭐ Backend API Routes
│   │   │   ├── health/         # Health check
│   │   │   ├── skills/         # Skills CRUD
│   │   │   ├── experience/     # Experience CRUD
│   │   │   ├── projects/       # Projects CRUD
│   │   │   ├── testimonials/   # Testimonials CRUD
│   │   │   └── contact/        # Contact form + Email
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Homepage
│   ├── components/             # React components
│   │   ├── hero.tsx           # Hero section
│   │   ├── tech-stack.tsx     # Skills section
│   │   ├── best-works.tsx     # Projects showcase
│   │   ├── contact.tsx        # Contact form
│   │   └── ui/                # shadcn/ui components
│   ├── models/                 # ⭐ Mongoose Models
│   │   ├── Skill.ts
│   │   ├── Experience.ts
│   │   ├── Project.ts
│   │   ├── Testimonial.ts
│   │   └── Contact.ts
│   ├── lib/                    # Utilities
│   │   ├── mongodb.ts         # ⭐ DB connection
│   │   ├── email.ts           # ⭐ Email utilities
│   │   └── api/               # API client
│   ├── public/                 # Static assets
│   ├── package.json            # All dependencies
│   └── .env.local              # Environment variables
├── MIGRATION_GUIDE.md          # Migration documentation
├── MIGRATION_COMPLETE.md       # Migration summary
├── QUICK_START.md              # Quick start guide
├── test-api.ps1                # API testing script
├── start-dev.bat               # Quick start (Windows)
├── package.json                # Root scripts
└── README.md                   # This file
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui (Radix UI)
- **Icons**: Lucide React
- **Animations**: Framer Motion concepts

### Backend (Next.js API Routes)
- **Runtime**: Node.js
- **Database**: MongoDB with Mongoose
- **Email**: Nodemailer (Gmail SMTP)
- **Validation**: Joi
- **Security**: Rate limiting, input validation

### Deployment
- **Platform**: Vercel (recommended)
- **Database**: MongoDB Atlas
- **Email**: Gmail SMTP

---

Built with ❤️ by **Kush Bhardwaj**

- ✨ Modern, responsive design
- 🎨 Glassmorphic UI with dark theme
- 🚀 Server-side rendering (SSR)
- 📧 Email notifications & auto-reply
- 🔒 Secure with rate limiting
- 📱 Mobile-first approach 


