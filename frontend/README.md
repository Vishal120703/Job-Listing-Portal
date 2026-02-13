# Job Listing Frontend

A modern React frontend for the Job Listing Platform.

## Features

- 🔐 User Authentication (Login/Signup)
- 🔍 Job Search and Filtering
- 📋 Job Listing and Details
- 👤 User Profile Management
- 💼 Job Posting (for Employers)
- ✏️ Job Editing and Deletion
- 📄 Resume Upload
- 🎨 Modern and Responsive UI

## Tech Stack

- React 18
- React Router DOM
- Axios
- Vite
- CSS3

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on port 5000

### Installation

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

The frontend will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable components
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/         # React Context
│   │   └── AuthContext.jsx
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Jobs.jsx
│   │   ├── JobDetail.jsx
│   │   ├── Profile.jsx
│   │   ├── PostJob.jsx
│   │   └── EditJob.jsx
│   ├── services/        # API services
│   │   └── api.js
│   ├── App.jsx          # Main app component
│   ├── App.css          # Global styles
│   ├── index.css        # Base styles
│   └── main.jsx         # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## API Configuration

The frontend is configured to proxy API requests to `http://localhost:5000` via Vite's proxy configuration. Make sure your backend server is running on port 5000.

If your backend runs on a different port, update the `vite.config.js` file:

```javascript
proxy: {
  '/api': {
    target: 'http://localhost:YOUR_PORT',
    changeOrigin: true,
  }
}
```

## User Roles

- **Applicant**: Can browse jobs, apply to jobs, and manage profile
- **Employer**: Can post jobs, edit/delete their jobs, and manage profile

## Features Overview

### Authentication
- Sign up with username, name, email, password, and role
- Login with username and password
- Protected routes for authenticated users

### Job Management
- Browse all available jobs
- Search jobs by keyword, location, job type, and salary range
- View detailed job information
- Apply to jobs (for applicants)
- Post new jobs (for employers)
- Edit and delete jobs (for employers)

### Profile Management
- View and edit profile information
- Upload profile image
- Upload resume (PDF)
- Manage contact information, bio, skills, experience, and education

## Notes

- The frontend uses cookies for authentication (httpOnly cookies set by the backend)
- Make sure CORS is properly configured on the backend to allow requests from `http://localhost:3000`
- File uploads (profile image and resume) are handled via FormData

