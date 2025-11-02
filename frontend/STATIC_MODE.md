# Frontend Static Mode

The frontend has been disconnected from the backend and is now running in static mode.

## Changes Made

### API Layer
- All API calls in `/lib/api/index.ts` have been replaced with mock data
- API functions now return static data instead of making HTTP requests
- Network delays are simulated using `setTimeout` to maintain realistic loading states

### Components Updated
- **Tech Stack**: Now uses static skills data instead of fetching from backend
- **Work Experience**: Uses static experience data 
- **Best Works**: Uses static project data
- **Contact Form**: Shows success message without actually submitting to backend
- **Testimonials**: Was already using static data

### Dependencies Removed
- Removed `axios` from package.json dependencies
- Removed `concurrently` from devDependencies
- Removed backend-related scripts from package.json
- Commented out `/lib/api/client.ts` (axios configuration)

### Static Data Location
All static data is now defined in:
- `/lib/api/index.ts` - Contains mock data for skills, experience, projects, and testimonials
- Individual components - Some components have their own static data arrays

## Running the Frontend

The frontend can now run independently without the backend:

```bash
cd frontend
npm run dev
```

## Benefits of Static Mode

1. **Faster Development**: No need to run backend server during frontend development
2. **Demo Ready**: Can be deployed anywhere without backend dependencies
3. **Reliable**: No network issues or API downtime
4. **Lightweight**: Smaller bundle size without axios and related dependencies

## Reverting to Dynamic Mode

To reconnect to the backend in the future:
1. Restore the API calls in `/lib/api/index.ts`
2. Uncomment `/lib/api/client.ts`
3. Re-add axios dependency: `npm install axios`
4. Update contact form to make actual API calls
5. Remove static data arrays

## Mock Data

The static data includes:
- 12 technology skills with proficiency levels
- 3 work experiences 
- 4 featured projects
- 2 testimonials

All data can be customized by editing the mock data arrays in `/lib/api/index.ts`.