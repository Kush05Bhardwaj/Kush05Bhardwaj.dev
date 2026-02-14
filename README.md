# Kushagra Bhardwaj - Portfolio Website

A modern, minimalist portfolio website built with **Next.js 14** featuring a sleek black/white/grey design, smooth animations, and dynamic content management.

## 🎨 Design Features

### Visual Design
- ⚫ **Pure Black Background** - Minimalist, professional aesthetic
- ⚪ **White & Grey Palette** - Clean, elegant color scheme
- ✨ **Floating Particles** - Subtle animated background elements
- 🎭 **Smooth Animations** - Scroll reveals and transitions
- 📱 **Fully Responsive** - Works seamlessly on all devices

### Interactive Elements
- 🎯 **Auto-Scrolling Project Carousel** - Continuous horizontal showcase
- 💬 **Interactive Terminal** - Chat-like "About Me" section
- 📊 **GitHub Activity Graph** - Live contribution statistics
- � **Back-to-Top Button** - Smooth scroll navigation
- ⌨️ **Typing Animation** - Dynamic hero section

## 🚀 Tech Stack

### Frontend
- ⚡ **Next.js 14** - React framework with App Router
- 🎨 **Tailwind CSS** - Utility-first styling
- � **TypeScript** - Type-safe development
- � **Framer Motion** - Animation library
- 🎨 **Shadcn/ui** - Component library

### Backend (Next.js API Routes)
- 🗄️ **MongoDB** - Database for dynamic content
- � **Nodemailer** - Email functionality
- 🔐 **JWT Authentication** - Secure admin access
- ✅ **Joi Validation** - Input validation

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- npm or yarn package manager
- Gmail account with app password (for contact form)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Kush05Bhardwaj/Kush05Bhardwaj.dev.git
cd Kush05Bhardwaj.dev
```

### 2. Install Dependencies

```bash
cd src
npm install
```

### 3. Environment Setup

Create `src/.env.local` with your credentials:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Email Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
SMTP_FROM_NAME=Your Name
SMTP_FROM_EMAIL=your_email@gmail.com
CONTACT_EMAIL=your_email@gmail.com

# Authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d

# Environment
NODE_ENV=development
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication
│   │   ├── contact/      # Contact form
│   │   ├── projects/     # Projects CRUD
│   │   ├── skills/       # Skills management
│   │   └── testimonials/ # Testimonials
│   ├── admin/            # Admin dashboard
│   └── page.tsx          # Main page
├── components/           # React components
│   ├── ui/              # Shadcn UI components
│   ├── hero.tsx         # Hero section
│   ├── about.tsx        # Terminal-style about
│   ├── tech-stack.tsx   # Skills showcase
│   ├── best-works.tsx   # Project carousel
│   ├── github-contributions.tsx
│   └── ...
├── lib/                 # Utilities
│   ├── mongodb.ts       # Database connection
│   ├── email.ts         # Email service
│   └── auth.ts          # Authentication
├── models/              # MongoDB schemas
└── public/              # Static assets
```

## 🎯 Key Features Breakdown

### 1. Hero Section
- Animated typing effect with grey gradient
- Professional introduction
- CTA buttons for contact and CV download

### 2. About Me (Terminal)
- Interactive chat-style interface
- Command-based navigation
- Predefined responses for common questions

### 3. Tech Stack
- Horizontal scrolling display
- 10+ technologies with icons
- Hover effects and animations

### 4. GitHub Activity
- Live contribution graph
- Fetches data from GitHub
- Displays coding consistency

### 5. Projects Carousel
- Auto-scrolling showcase
- Pause on hover
- Manual navigation arrows
- Centered layout with partial side views

### 6. Work Experience & Education
- Timeline layout
- Company/institution details
- Achievements and responsibilities

### 7. Testimonials
- Clean, borderless design
- Client feedback display
- Professional presentation

### 8. Contact Form
- Email integration
- Form validation
- Success/error notifications

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint
```

## 🎨 Customization

### Update Colors
The entire color scheme is black/white/grey. To modify:
- Edit Tailwind config: `tailwind.config.ts`
- Update component styles in respective files

### Add Projects
1. Go to admin panel: `/admin/projects`
2. Add new project with details
3. Upload project image
4. Automatically appears in carousel

### Modify Content
- **Hero Text**: Edit `src/components/hero.tsx`
- **About Responses**: Edit `src/components/about.tsx`
- **Tech Stack**: Edit `src/components/tech-stack.tsx`
- **GitHub Username**: Edit `src/components/github-contributions.tsx`

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables
Add all `.env.local` variables to your hosting platform's environment settings.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Kush Bhardwaj**
- GitHub: [@Kush05Bhardwaj](https://github.com/Kush05Bhardwaj)
- Portfolio: [Your Live URL]

## 🙏 Acknowledgments

- Built with Next.js 14
- UI components from Shadcn/ui
- Icons from Lucide React
- Animations inspired by modern web design trends

---

⭐ **Star this repo if you find it helpful!**

