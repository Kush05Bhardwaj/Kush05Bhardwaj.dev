# Portfolio Full-Stack Application

> **Note**: The frontend is currently running in **static mode** and is disconnected from the backend. See [frontend/STATIC_MODE.md](frontend/STATIC_MODE.md) for details.

A modern, full-stack portfolio application with separate frontend (Next.js) and backend (Express.js) with admin panel for content management.

## 🚀 Features

### Frontend (Next.js)
- Modern React with TypeScript
- Tailwind CSS for styling
- Responsive design
- Dynamic content loading from API
- Server-side rendering

### Backend (Express.js)
- RESTful API design
- MongoDB database integration
- JWT authentication
- File upload functionality
- Input validation and security
- Admin role management

### Admin Panel
- Secure admin authentication
- Dashboard with analytics
- Content management for:
  - Personal information
  - Projects
  - Work experience
  - Skills
  - Testimonials
- File upload management
- Real-time updates

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (already configured)
- npm package manager

## 🛠️ Installation & Setup

### 1. Install All Dependencies

```bash
# Install root dependencies (concurrently)
npm install

# Install both frontend and backend dependencies
npm run install:all
```

### 2. Environment Setup

Environment files are already configured:

#### Backend Environment (backend/.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=30d
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5000000
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=admin123
```

#### Frontend Environment (frontend/.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Database Setup

Database is already seeded with your data! ✅

### 4. Start the Application

#### Option 1: Run Both Frontend and Backend Together (Recommended)
```bash
npm run dev
```

#### Option 2: Run Separately
```bash
# Terminal 1 - Backend
npm run backend:dev

# Terminal 2 - Frontend  
npm run frontend:dev
```

## 🔗 Access Points

- **Frontend Portfolio**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **Backend API**: http://localhost:5000/api
- **API Health Check**: http://localhost:5000/api/health

## 👤 Admin Credentials

- **Email**: admin@portfolio.com
- **Password**: admin123

⚠️ **Important**: Change these credentials in production!

## 📁 Project Structure

```
Kush05BhardwajDev/
├── frontend/               # Next.js Frontend
│   ├── app/               # Next.js app directory
│   │   ├── admin/         # Admin panel pages
│   │   │   ├── login/     # Admin login
│   │   │   ├── projects/  # Projects management
│   │   │   ├── portfolio/ # Portfolio management
│   │   │   └── page.tsx   # Admin dashboard
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Homepage
│   ├── components/        # React components
│   │   ├── admin-layout.tsx # Admin panel layout
│   │   └── ui/            # UI components
│   ├── lib/               # Utilities and API client
│   │   └── api/           # API service layer
│   ├── public/            # Static assets
│   ├── package.json       # Frontend dependencies
│   └── .env.local         # Frontend environment
├── backend/               # Express.js Backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── utils/            # Utility functions
│   ├── scripts/          # Database scripts
│   ├── uploads/          # File uploads
│   ├── server.js         # Server entry point
│   ├── package.json      # Backend dependencies
│   └── .env              # Backend environment
├── package.json          # Root package.json with scripts
└── README.md             # This file
```

Built with ❤️ by Kush Bhardwaj

- Modern responsive design
- Smooth user experience with interactive UI
- Projects showcase with links
- Skills, testimonials, and contact sections
- Fully deployed using Vercel

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, Next.js
- **Deployment:** Vercel
- **Icons & UI Components:** Lucide Icons, shadcn/ui 


