# IEC 61850 SCL File Viewer

A full-stack application for parsing and visualizing IEC 61850 SCL (Substation Configuration Language) files. Built with .NET Core backend and React TypeScript frontend.

## Features

- **File Upload**: Drag-and-drop or browse to upload .cid, .icd, or .scd files
- **Dashboard**: Overview of device information, communication settings, and statistics
- **Tree View**: Hierarchical navigation through SCL structure (IED → Logical Devices → Logical Nodes → DataSets)
- **Data Tables**: Searchable tables for FCDAs with export to CSV functionality
- **Detail Panel**: Context-aware display of selected node attributes

## Tech Stack

### Backend

- .NET Core 9.0 Web API
- XML Serialization for SCL parsing
- Swagger/OpenAPI for API documentation

### Frontend

- React 18 with TypeScript
- Vite build tool
- Tailwind CSS for styling
- Headless UI for accessible components
- Heroicons for icons
- Axios for API communication

## Project Structure

```
dotnet-realtime-test/
├── backend/
│   └── SclParser.Api/
│       ├── Controllers/
│       │   └── SclController.cs
│       ├── Models/
│       │   └── SclModels.cs
│       ├── Services/
│       │   └── SclParserService.cs
│       └── Program.cs
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── FileUploader.tsx
│       │   ├── Dashboard.tsx
│       │   ├── TreeView.tsx
│       │   ├── DataTable.tsx
│       │   ├── DetailPanel.tsx
│       │   └── SclViewer.tsx
│       ├── services/
│       │   └── api.ts
│       ├── types/
│       │   └── scl.types.ts
│       └── App.tsx
└── SanionLU.cid (example SCL file)
```

## Getting Started

### Prerequisites

- .NET Core SDK 9.0 or later
- Node.js 18+ and npm

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend/SclParser.Api
```

2. Restore dependencies:

```bash
dotnet restore
```

3. Build the project:

```bash
dotnet build
```

4. Run the API:

```bash
dotnet run
```

The API will be available at `https://localhost:5001` (and `http://localhost:5000`)

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## API Endpoints

- `POST /api/scl/parse` - Upload and parse a CID/ICD/SCD file
- `GET /api/scl/summary` - Get overview statistics
- `GET /api/scl/devices` - List all IEDs
- `GET /api/scl/devices/{name}` - Get specific IED details
- `GET /api/scl/communication` - Get communication/network configuration
- `GET /api/scl/document` - Get the full parsed document
- `DELETE /api/scl/clear` - Clear the cached document

## Usage

1. Start both the backend and frontend servers
2. Open your browser to `http://localhost:5173`
3. Upload a SCL file (use the provided `SanionLU.cid` as a test file)
4. Explore the data through the three main views:
   - **Dashboard**: View summary statistics and device information
   - **Structure**: Browse the hierarchical tree and view detailed information
   - **Data Tables**: Search and filter FCDAs, export data to CSV

## IEC 61850 Standard

This application parses and displays data according to the IEC 61850 standard for power system automation. The SCL files contain:

- **IED (Intelligent Electronic Device)**: Physical devices in the substation
- **Logical Devices (LDevice)**: Logical groupings within IEDs
- **Logical Nodes (LN)**: Functions performed by devices
- **Data Objects**: Data provided by logical nodes
- **Data Sets**: Groups of data attributes for reporting
- **Communication**: Network configuration

## License

This project is provided as-is for educational and development purposes.

## Screenshots

### Dashboard

Overview of device information and statistics

### Tree View

Hierarchical navigation through the SCL structure

### Data Tables

Searchable and exportable FCDA listings
