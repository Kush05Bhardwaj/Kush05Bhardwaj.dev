# Admin Panel Documentation

## 🎉 Admin Panel Successfully Created!

Your portfolio now has a complete admin panel with authentication and content management capabilities.

## 📍 Access the Admin Panel

### URL
```
http://localhost:3000/admin/login
```

### Default Credentials
```
Email: admin@portfolio.com
Password: admin123
```

**⚠️ Important:** Change these credentials in production!

---

## 🗂️ Admin Panel Features

### 1. Authentication System ✅
- **Login Page**: `/admin/login`
- **JWT-based authentication** with 7-day token expiry
- **Protected routes** - all admin pages require authentication
- **Automatic redirect** if not logged in

### 2. Dashboard 📊
- **URL**: `/admin/dashboard`
- **Features**:
  - Overview statistics (Skills, Experience, Projects, Testimonials, Contacts count)
  - Quick access to all management sections
  - Visual stat cards with icons

### 3. Skills Management 🎯
- **URL**: `/admin/skills`
- **Features**:
  - View all skills in a table
  - Add new skills
  - Edit existing skills
  - Delete skills
  - Visual progress bars showing skill levels
  - Category organization

### 4. Experience Management 💼
- **URL**: `/admin/experience`
- **Features**:
  - View all work experience entries
  - Delete experience entries
  - Card-based layout with full details
  - (Edit/Add forms can be added later)

### 5. Projects Management 🚀
- **URL**: `/admin/projects`
- **Features**:
  - View all projects in grid layout
  - Delete projects
  - See technologies used
  - View live/GitHub links
  - (Edit/Add forms can be added later)

### 6. Testimonials Management 💬
- **URL**: `/admin/testimonials`
- **Features**:
  - View all testimonials
  - Delete testimonials
  - Star ratings display
  - (Edit/Add forms can be added later)

### 7. Contact Submissions 📧
- **URL**: `/admin/contacts`
- **Features**:
  - View all contact form submissions
  - Expandable cards to read full messages
  - Date/time stamps
  - Direct email links
  - **No authentication needed for reading** (protected by auth middleware)

---

## 🛡️ Security Features

### JWT Authentication
- Token stored in localStorage
- Expires after 7 days
- Must be included in API requests via `Authorization: Bearer <token>` header

### Protected API Endpoints
All admin operations require authentication:
- `POST /api/skills` - Create skill
- `PUT /api/skills/[id]` - Update skill
- `DELETE /api/skills/[id]` - Delete skill
- Similar protection for experience, projects, testimonials
- `GET /api/contact` - View submissions (admin only)

### Logout Functionality
- Clears token from localStorage
- Redirects to login page

---

## 🎨 Admin Panel Structure

```
frontend/
├── app/
│   ├── admin/
│   │   ├── layout.tsx          # Admin layout with sidebar
│   │   ├── login/
│   │   │   └── page.tsx        # Login page
│   │   ├── dashboard/
│   │   │   └── page.tsx        # Dashboard with stats
│   │   ├── skills/
│   │   │   └── page.tsx        # Skills management
│   │   ├── experience/
│   │   │   └── page.tsx        # Experience management
│   │   ├── projects/
│   │   │   └── page.tsx        # Projects management
│   │   ├── testimonials/
│   │   │   └── page.tsx        # Testimonials management
│   │   └── contacts/
│   │       └── page.tsx        # Contact submissions
│   └── api/
│       ├── auth/
│       │   └── login/
│       │       └── route.ts    # Login API
│       └── skills/
│           └── [id]/
│               └── route.ts    # Update/Delete skill API
└── lib/
    └── auth.ts                 # Auth middleware & JWT verification
```

---

## 📝 How to Use

### 1. Login
1. Go to `http://localhost:3000/admin/login`
2. Enter credentials (admin@portfolio.com / admin123)
3. Click "Login"
4. You'll be redirected to the dashboard

### 2. Managing Skills
1. Navigate to "Skills" in the sidebar
2. Click "+ Add Skill" button
3. Fill in:
   - Skill Name (e.g., "React.js")
   - Level (0-100, e.g., 90)
   - Category (Frontend, Backend, etc.)
4. Click "Create"
5. To edit: Click the edit icon on any skill
6. To delete: Click the delete icon

### 3. Viewing Contact Submissions
1. Navigate to "Contacts" in the sidebar
2. Click on any card to expand and read the full message
3. Click the email address to reply directly

### 4. Logout
- Click the "Logout" button at the bottom of the sidebar
- You'll be redirected to the login page

---

## 🔧 Configuration

### Environment Variables (.env.local)
```bash
# JWT Secret (change in production!)
JWT_SECRET=your_jwt_secret_key_here_change_in_production

# Admin Credentials
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=admin123

# Optional: Pre-hashed password for better security
# ADMIN_PASSWORD_HASH=<bcrypt_hash>
```

### Changing Admin Credentials

#### Method 1: Environment Variables (Simple)
```bash
ADMIN_EMAIL=youremail@example.com
ADMIN_PASSWORD=your_secure_password
```

#### Method 2: Hashed Password (More Secure)
1. Generate a bcrypt hash:
```javascript
const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('your_secure_password', 10);
console.log(hash);
```

2. Add to `.env.local`:
```bash
ADMIN_EMAIL=youremail@example.com
ADMIN_PASSWORD_HASH=<the_generated_hash>
```

---

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/login` - Login and get JWT token
  ```json
  {
    "email": "admin@portfolio.com",
    "password": "admin123"
  }
  ```
  **Response:**
  ```json
  {
    "success": true,
    "token": "<jwt_token>",
    "user": { "email": "admin@portfolio.com", "role": "admin" }
  }
  ```

### Skills
- `GET /api/skills` - Get all skills (public)
- `POST /api/skills` - Create skill (requires auth)
- `PUT /api/skills/[id]` - Update skill (requires auth)
- `DELETE /api/skills/[id]` - Delete skill (requires auth)

### Similar endpoints exist for:
- `/api/experience`
- `/api/projects`
- `/api/testimonials`
- `/api/contact` (GET requires auth)

---

## 🎯 Next Steps (Optional Enhancements)

### 1. Add Complete CRUD Forms
Currently, only Skills has a full create/edit form. You can add similar forms for:
- Experience (title, company, period, description, responsibilities)
- Projects (title, description, technologies, images, links)
- Testimonials (name, position, company, message, rating, image)

### 2. Image Upload
Add image upload functionality for:
- Projects (screenshots)
- Testimonials (client photos)
- Profile picture

### 3. Rich Text Editor
Add a rich text editor (like TipTap or Quill) for:
- Project descriptions
- Experience responsibilities
- Testimonial messages

### 4. Analytics
- Track portfolio views
- Contact form submission analytics
- Most viewed projects

### 5. Email from Dashboard
- Reply to contacts directly from the admin panel
- Email templates management

---

## 🔒 Security Best Practices

### For Production:

1. **Change JWT Secret**
   ```bash
   JWT_SECRET=<use_a_long_random_string_here>
   ```

2. **Use Hashed Passwords**
   ```bash
   ADMIN_PASSWORD_HASH=<bcrypt_hash>
   ```
   Remove `ADMIN_PASSWORD` from .env

3. **HTTPS Only**
   - Deploy with HTTPS (Vercel does this automatically)
   - Set secure cookies

4. **Rate Limiting**
   - Add rate limiting to login endpoint
   - Prevent brute force attacks

5. **Environment Variables**
   - Never commit `.env.local` to GitHub
   - Set environment variables in Vercel dashboard

---

## 🐛 Troubleshooting

### "Invalid credentials" error
- Check that `ADMIN_EMAIL` and `ADMIN_PASSWORD` match in `.env.local`
- Restart the dev server after changing .env

### "No token provided" error
- Make sure you're logged in
- Token might have expired (7 days) - login again
- Check browser localStorage for 'adminToken'

### Can't access admin pages
- Admin routes are protected
- Make sure you're logged in at `/admin/login`
- Check browser console for errors

### API errors (500)
- Check MongoDB connection
- Check server terminal for detailed errors
- Verify `.env.local` has all required variables

---

## 📱 Mobile Responsive

The admin panel is currently optimized for **desktop use**. For production, consider:
- Responsive sidebar (collapsible on mobile)
- Mobile-friendly tables (card view on small screens)
- Touch-friendly buttons and forms

---

## ✅ Completed Features

✅ JWT authentication system
✅ Login page with form validation
✅ Protected admin routes
✅ Dashboard with statistics
✅ Skills CRUD (full implementation)
✅ Experience viewer with delete
✅ Projects viewer with delete
✅ Testimonials viewer with delete
✅ Contact submissions viewer
✅ Sidebar navigation
✅ Logout functionality
✅ API authentication middleware
✅ Beautiful UI matching portfolio theme

---

## 🎊 Summary

Your portfolio now has a **fully functional admin panel**! You can:
- ✅ Login securely
- ✅ View dashboard statistics
- ✅ Manage all your skills (add, edit, delete)
- ✅ View and delete experience, projects, testimonials
- ✅ Read contact form submissions
- ✅ Logout when done

The foundation is solid, and you can enhance it further by adding complete CRUD forms for other sections, image uploads, and more advanced features as needed.

**Start using it now at:** http://localhost:3000/admin/login 🚀
