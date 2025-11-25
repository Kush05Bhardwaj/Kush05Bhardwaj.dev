# Quick Start Guide

## 🚀 Start Development Server

### Option 1: Using Script (Windows)
```bash
start-dev.bat
```

### Option 2: Using npm from root
```bash
npm run dev
```

### Option 3: Manual
```bash
cd frontend
npm run dev
```

Visit: **http://localhost:3000**

---

## 📝 Other Commands

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Test API Endpoints
```bash
npm run test:api
```

### Lint Code
```bash
npm test
```

---

## 🔧 Environment Setup

Make sure you have `frontend/.env.local` configured with:
- MongoDB URI
- SMTP credentials
- JWT secret

See `MIGRATION_GUIDE.md` for detailed environment variable setup.

---

## 📚 Documentation

- **Main README**: `README.md`
- **Migration Guide**: `MIGRATION_GUIDE.md`
- **Migration Summary**: `MIGRATION_COMPLETE.md`
