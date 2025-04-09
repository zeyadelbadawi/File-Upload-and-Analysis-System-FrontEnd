# File Upload and Analysis System – Frontend

This is the frontend of the **File Upload and Analysis System**, built with **Next.js** and **React**. It enables users to register, authenticate, upload files, view processing status, and gain insights from extracted data.

## Features

- **Authentication & Authorization**
  - Login, registration, and user profile management
  - Role-based UI rendering (admin vs. regular user)

- **File Upload**
  - Drag-and-drop upload with real-time progress
  - File validation on the client side

- **Display & Analysis**
  - Live status of file processing
  - Display extracted data, including text, tables, or previews
  - Dashboard with charts/tables (file type distribution, etc.)

- **Real-Time Updates**
  - Notifications for file processing completion or errors

- **Tech Stack**
  - **Framework:** Next.js
  - **State Management:** React Context API
  - **Data Fetching:** React Query or SWR
  - **Styling:** Tailwind CSS
  - **Charting:** Recharts / Chart.js (for dashboard insights)

## Getting Started


### Prerequisites

- Node.js >= 18
- npm or yarn

### Installation
$ npm install
# or
$ yarn install

### Running the App 
$ npm run dev 
# or
$ yarn dev

### Build for Production
$ npm run build

### Project Structure
/pages          # Next.js routes
/components     # Reusable components
/context        # Global state management
/api            # API calls to backend
/utils          # Utility functions
/styles         # Global styles & Tailwind config

### License
- This project is licensed under the MIT License.
