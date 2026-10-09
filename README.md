# Master Export Pro — MERN Stack Platform

> Connected Export Operations Platform: From first buyer enquiry and quotation through sales order, shipment tracking, invoicing, and payment reconciliation.

---

## 🏗️ Architecture & Technology Stack

This application is built using the **MERN Stack**:

- **M — MongoDB & Mongoose**: Database modeling for export Enquiries, Sales Orders, Products, Shipments, and Invoices.
- **E — Express.js**: High-performance RESTful API gateway with CORS, data validation, and statistics endpoints.
- **R — React 19 & Vite**: Ultra-fast, responsive user interface with Lucide icons, live enquiry modal, dynamic dashboard previews, and Tailwind styling.
- **N — Node.js 24**: Runtime powering both development workflows and server processes.

---

## 📁 Clean Folder & Project Structure

```text
Master-Export-Pro-Landing-Page/
├── client/                     # React Frontend Application
│   ├── public/
│   │   └── images/             # Brand logos, icons, and illustrations
│   ├── src/
│   │   ├── components/         # Modular UI components (EnquiryModal, ErrorBoundary)
│   │   ├── services/           # API integration service (fetchHealth, submitEnquiry)
│   │   ├── App.tsx             # Main Landing Page & Dashboard View
│   │   ├── index.css           # Design tokens, typography & CSS theme
│   │   ├── main.tsx            # React application root
│   │   └── vite-env.d.ts       # Vite client typing
│   ├── index.html              # HTML5 entry with SEO tags
│   ├── vite.config.ts          # Vite configuration with /api proxy to Express
│   ├── tsconfig.json           # TypeScript configuration
│   └── package.json            # Client dependencies
│
├── server/                     # Node.js + Express Backend
│   ├── config/
│   │   └── db.js               # MongoDB connection with zero-downtime fallback
│   ├── models/
│   │   ├── Enquiry.js          # Mongoose schema for export enquiries
│   │   ├── Order.js            # Mongoose schema for sales orders
│   │   └── Product.js          # Mongoose schema for export catalog
│   ├── controllers/
│   │   ├── enquiryController.js# Business logic for enquiry registration
│   │   ├── orderController.js  # Order management & retrieval
│   │   ├── productController.js# Catalog data
│   │   └── statsController.js  # Live KPI metrics & pipeline summary
│   ├── routes/
│   │   └── apiRoutes.js        # Express API endpoints
│   ├── server.js               # Express server entry point & static asset server
│   └── package.json            # Server dependencies
│
├── run-dev.mjs                 # Cross-platform concurrent runner (Windows/Mac/Linux)
├── package.json                # Root package.json with unified scripts
└── README.md                   # Project documentation
```

---

## 🚀 Quick Start & How to Run

### 1. Install Dependencies
Run from the root directory:
```bash
npm run install:all
```

### 2. Run in Development Mode
Starts both the **Express backend** (port `5000`) and the **Vite frontend** (port `5173`):
```bash
npm run dev
```
Open your browser at:
- **Frontend App**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

### 3. Run Production Server
```bash
npm run build
npm start
```
Open [http://localhost:5000](http://localhost:5000) to view the application served directly by Node/Express.

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Healthcheck & database connection status |
| `GET` | `/api/stats` | Export dashboard KPI metrics & pipeline status |
| `GET` | `/api/enquiries` | List all export enquiries |
| `POST` | `/api/enquiries` | Submit new enquiry (saves to MongoDB) |
| `GET` | `/api/orders` | List sales orders |
| `GET` | `/api/products` | Retrieve export product catalog |

---

## ✨ Features

- **Cross-Platform**: Tested and 100% functional on Windows, Linux, and macOS without unix `sh` dependencies.
- **Connected Order Trail**: 6 clear stages from Enquiry → Quotation → Sales Order → Shipment → Invoice → Payment.
- **Interactive Live Modal**: Allows visitors to submit real export enquiries that are processed and stored in MongoDB.
- **Dual Mode Database**: Connects directly to local/cloud MongoDB with automatic high-performance fallback if MongoDB is offline.
