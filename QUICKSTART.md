# Quick Start Guide

## Running the Application

### Option 1: Development Mode (Recommended for Testing)

**Terminal 1 - Backend:**

```bash
cd backend/SclParser.Api
dotnet run
```

The backend will start at `https://localhost:5001` and `http://localhost:5000`

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

The frontend will start at `http://localhost:5173`

### Option 2: Production Build

**Build the frontend:**

```bash
cd frontend
npm run build
```

**Configure the backend to serve static files** (optional for deployment)

### Testing with the Sample File

1. Open your browser to `http://localhost:5173`
2. Upload the `SanionLU.cid` file from the project root
3. Explore the data in three views:
   - **Dashboard**: Overview and statistics
   - **Structure**: Tree navigation with detail panel
   - **Data Tables**: Searchable FCDA listings with CSV export

## API Documentation

Once the backend is running, visit:

- Swagger UI: `https://localhost:5001/swagger`
- OpenAPI JSON: `https://localhost:5001/swagger/v1/swagger.json`

## Troubleshooting

### Backend won't start

- Ensure .NET SDK 9.0 is installed: `dotnet --version`
- Check if port 5001 is already in use

### Frontend won't start

- Ensure Node.js is installed: `node --version`
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### CORS Errors

- Ensure both backend and frontend are running
- The backend is configured to allow requests from `http://localhost:5173` and `http://localhost:3000`

### File Upload Fails

- Check that the backend is running
- Ensure the file is a valid .cid, .icd, or .scd file
- Check browser console for detailed error messages

## Project Structure

```
dotnet-realtime-test/
├── backend/SclParser.Api/          # .NET Core Web API
│   ├── Controllers/                # API endpoints
│   ├── Models/                     # Data models
│   └── Services/                   # Business logic
├── frontend/                       # React TypeScript app
│   └── src/
│       ├── components/             # React components
│       ├── services/               # API client
│       └── types/                  # TypeScript types
├── SanionLU.cid                    # Sample SCL file
└── README.md                       # Full documentation
```

## Features Implemented

✅ File upload with drag-and-drop support
✅ Complete SCL XML parsing
✅ Dashboard with device statistics
✅ Hierarchical tree view navigation
✅ Detail panel with context-aware display
✅ Searchable data tables
✅ CSV export functionality
✅ Responsive design with Tailwind CSS
✅ API documentation with Swagger
✅ TypeScript type safety
✅ Error handling and loading states
