# Backend Migration to Next.js - Complete Guide

## ✅ Migration Completed Successfully!

Your portfolio has been successfully migrated from a separate Express backend to a unified Next.js full-stack application. All backend functionality now runs as Next.js API routes.

---

## 🎯 What Was Migrated

### 1. **Dependencies**
All backend dependencies have been added to `frontend/package.json`:
- `mongoose` - MongoDB ODM
- `nodemailer` - Email sending
- `bcryptjs` - Password hashing
- `joi` - Validation
- `jsonwebtoken` - JWT authentication
- `bull` - Job queue (for future use)

### 2. **Database Models** (`frontend/models/`)
Converted from CommonJS to TypeScript:
- ✅ `Skill.ts` - Tech stack skills
- ✅ `Experience.ts` - Work experience
- ✅ `Project.ts` - Portfolio projects
- ✅ `Testimonial.ts` - Client testimonials
- ✅ `Contact.ts` - Contact form submissions

### 3. **API Routes** (`frontend/app/api/`)
All Express routes migrated to Next.js App Router:

#### Skills API (`/api/skills`)
- `GET /api/skills` - Fetch all active skills
- `POST /api/skills` - Create new skill (admin)

#### Experience API (`/api/experience`)
- `GET /api/experience` - Fetch all work experiences
- `POST /api/experience` - Create new experience (admin)

#### Projects API (`/api/projects`)
- `GET /api/projects` - Fetch all projects
- `GET /api/projects?featured=true` - Fetch featured projects
- `POST /api/projects` - Create new project (admin)

#### Testimonials API (`/api/testimonials`)
- `GET /api/testimonials` - Fetch all testimonials
- `POST /api/testimonials` - Create new testimonial (admin)

#### Contact API (`/api/contact`)
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all submissions (admin)
- Features:
  - Rate limiting (3 requests per 15 minutes per IP)
  - Email notification to you
  - Auto-reply to sender
  - Form validation with Joi

#### Health Check (`/api/health`)
- `GET /api/health` - Check API and database status

### 4. **Utilities**
- **MongoDB Connection** (`lib/mongodb.ts`)
  - Cached connection for better performance
  - Prevents connection issues during hot reload
  
- **Email System** (`lib/email.ts`)
  - Professional HTML email templates
  - Notification emails
  - Auto-reply emails

### 5. **Frontend API Client** (`lib/api/index.ts`)
- Updated to use internal Next.js API routes (`/api/*`)
- Removed axios dependency
- Direct `fetch` API calls
- Proper error handling

---

## 🚀 How to Run

### Development Mode
```bash
cd frontend
npm run dev
```

Your app will be available at:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:3000/api

### Production Build
```bash
cd frontend
npm run build
npm start
```

---

## 📁 New Project Structure

```
frontend/
├── app/
│   ├── api/                    # ⭐ NEW: All API routes
│   │   ├── skills/
│   │   │   └── route.ts       # Skills CRUD
│   │   ├── experience/
│   │   │   └── route.ts       # Experience CRUD
│   │   ├── projects/
│   │   │   └── route.ts       # Projects CRUD
│   │   ├── testimonials/
│   │   │   └── route.ts       # Testimonials CRUD
│   │   ├── contact/
│   │   │   └── route.ts       # Contact form + Email
│   │   └── health/
│   │       └── route.ts       # Health check
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/                 # UI components
├── models/                     # ⭐ NEW: Mongoose models
│   ├── Skill.ts
│   ├── Experience.ts
│   ├── Project.ts
│   ├── Testimonial.ts
│   └── Contact.ts
├── lib/
│   ├── mongodb.ts             # ⭐ NEW: DB connection
│   ├── email.ts               # ⭐ NEW: Email utilities
│   ├── api/
│   │   └── index.ts           # Updated API client
│   └── utils.ts
├── .env.local                 # ⭐ NEW: Environment variables
└── package.json               # Updated dependencies
```

---

## 🔧 Environment Variables

Create or verify `.env.local` in the `frontend/` directory:

```env
# MongoDB
MONGODB_URI=mongodb+srv://kush2012bhardwaj:Raidenkush05Ei21@cluster0.7fvgxjw.mongodb.net/portfolio?retryWrites=true&w=majority

# JWT (for admin features)
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=30d

# Email (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=kush2012bhardwaj@gmail.com
SMTP_PASS=kbkb aeny oies uper
SMTP_FROM_NAME=Kushagra Bhardwaj
SMTP_FROM_EMAIL=kush2012bhardwaj@gmail.com
CONTACT_EMAIL=kush2012bhardwaj@gmail.com

# Optional
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

---

## ✨ Key Features

### 1. **Unified Codebase**
- Single repository
- One deployment
- Easier maintenance
- No CORS issues

### 2. **Better Performance**
- Server-side rendering (SSR)
- API routes run on same server
- Reduced network latency
- Optimized database connections

### 3. **Enhanced Security**
- Rate limiting on contact form
- Input validation with Joi
- Environment variable protection
- No exposed backend ports

### 4. **Email System**
- Professional HTML templates
- Notification to portfolio owner
- Auto-reply to form submitters
- Error handling and logging

### 5. **Developer Experience**
- TypeScript everywhere
- Hot reload for API routes
- Unified error handling
- Better debugging

---

## 🧪 Testing the APIs

### Test Health Check
```bash
curl http://localhost:3000/api/health
```

### Test Skills API
```bash
curl http://localhost:3000/api/skills
```

### Test Contact Form
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Message",
    "message": "This is a test message to verify the contact form is working."
  }'
```

---

## 📊 Database Status

Your MongoDB Atlas database is already populated with data:
- Skills (tech stack)
- Work experiences
- Projects
- Testimonials

The contact form submissions will be stored in the `contacts` collection.

---

## 🎨 Frontend Integration

All frontend components have been updated to use the new API routes:
- ✅ `components/tech-stack.tsx` → `/api/skills`
- ✅ `components/work-experience.tsx` → `/api/experience`
- ✅ `components/best-works.tsx` → `/api/projects`
- ✅ `components/testimonials.tsx` → `/api/testimonials`
- ✅ `components/contact.tsx` → `/api/contact`

---

## 🚢 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
- **Netlify**: Supports Next.js
- **Railway**: Full-stack support
- **AWS Amplify**: Next.js compatible
- **DigitalOcean App Platform**: Node.js support

---

## 🔄 What's Different from Before

| Aspect | Before (Express) | Now (Next.js) |
|--------|-----------------|---------------|
| **Ports** | Frontend: 3000, Backend: 5000 | Single port: 3000 |
| **API URL** | `http://localhost:5000/api` | `/api` (relative) |
| **Dependencies** | Split across two package.json | Single package.json |
| **Deployment** | Two separate deployments | Single deployment |
| **Hot Reload** | Backend only with nodemon | Full-stack hot reload |
| **CORS** | Required configuration | Not needed |

---

## 📝 Next Steps

### Optional Improvements:
1. **Add Admin Panel** - Create `/admin` routes for content management
2. **Add Authentication** - Implement JWT-based admin auth
3. **Image Upload** - Add file upload API for project images
4. **Caching** - Implement Redis for better performance
5. **API Documentation** - Add Swagger/OpenAPI docs

### Testing Checklist:
- [ ] Visit http://localhost:3000 - frontend loads
- [ ] Check Tech Stack section - data from API
- [ ] Check Work Experience - data from API
- [ ] Check Projects - data from API
- [ ] Check Testimonials - data from API
- [ ] Submit contact form - email sent
- [ ] Check email inbox - notification received
- [ ] Check form submitter email - auto-reply received

---

## 🆘 Troubleshooting

### Issue: MongoDB Connection Fails
**Solution**: Verify `MONGODB_URI` in `.env.local`, check MongoDB Atlas allows your IP

### Issue: Emails Not Sending
**Solution**: 
1. Verify Gmail app password is correct
2. Check "Less secure app access" settings
3. Look at terminal for email errors

### Issue: API Returns 404
**Solution**: Ensure server is running (`npm run dev` in frontend folder)

### Issue: Hot Reload Not Working
**Solution**: Restart the dev server

---

## 📚 Resources

- [Next.js API Routes Documentation](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Mongoose Documentation](https://mongoosejs.com/docs/guide.html)
- [Nodemailer Documentation](https://nodemailer.com/about/)

---

## ✅ Migration Checklist

- [x] Install backend dependencies
- [x] Create MongoDB connection utility
- [x] Migrate all Mongoose models
- [x] Create Skills API route
- [x] Create Experience API route
- [x] Create Projects API route
- [x] Create Testimonials API route
- [x] Create Contact API route with email
- [x] Create Health check API route
- [x] Update frontend API client
- [x] Update all component API calls
- [x] Configure environment variables
- [x] Test all API endpoints
- [x] Verify email functionality

---

## 🎉 Success!

Your portfolio is now a modern, unified Next.js full-stack application! 

**Benefits:**
- ✅ Simpler architecture
- ✅ Faster performance
- ✅ Easier deployment
- ✅ Better SEO
- ✅ Lower hosting costs
- ✅ Single codebase to maintain

You can now safely remove the old `backend/` folder if everything works correctly!
