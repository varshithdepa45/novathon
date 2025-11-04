# SolarConnect - Solar Energy Solutions Platform

## 🚀 Quick Access Links

### � On Your Computer

**[Click here to open SolarConnect](http://localhost:5173)**

### 📱 On Other Devices

1. Get the server running (instructions below)
2. Use this address but replace `YOUR-IP` with your computer's IP:
   ```
   http://YOUR-IP:5173
   ```

## 🔧 Setup Instructions (Required First Time)

> 1. Navigate to frontend folder: `cd frontend`
> 2. Start server with host flag: `npm run dev -- --host`
> 3. Find your IP address:
>    - On Mac/Linux: Run `ifconfig | grep "inet " | grep -v 127.0.0.1`
>    - On Windows: Run `ipconfig` and look for "IPv4 Address"
> 4. Share the URL `http://{your-ip-address}:5173` with others on your network

## Project Overview

SolarConnect is a full-stack web application that connects users with solar energy solutions. The platform offers two primary business models:

1. Direct solar panel purchase with pay-per-watt pricing
2. Terrace space rental for solar installations

## Tech Stack

### Frontend

- **Framework**: React.js with Vite
- **Styling**: Custom CSS
- **Icons**: Font Awesome
- **Form Handling**: Native JavaScript
- **Local Development Port**: 5173 or 5174

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Firebase Firestore
- **Authentication**: Firebase Admin SDK
- **Email Service**: Nodemailer with Gmail SMTP
- **Security**:
  - Helmet for HTTP headers
  - CORS protection
  - Environment variables for sensitive data
- **Local Development Port**: 3000

## Features

- Responsive design for all devices
- Interactive quote request form
- Real-time form submission to Firebase
- Automated email notifications
- Compression for better performance
- Development logging with Morgan
- Secure headers with Helmet

## Local Development Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account with Firestore database
- Gmail account for email notifications

### Environment Variables

Create a `.env` file in the backend directory with:

```
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_CLIENT_ID=your_client_id
FIREBASE_CERT_URL=your_cert_url
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/varshithdepa45/novathon.git
cd sr
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

### Running the Application

1. Start the backend server:

```bash
cd backend
npm start
```

The backend will run on http://localhost:3000

2. Start the frontend development server:

```bash
cd frontend
npm run dev
```

The frontend will run on http://localhost:5173 or http://localhost:5174

## API Endpoints

### GET /api/assessments

- Retrieves all submitted assessment forms
- Sorted by submission date in descending order

### POST /api/submit-assessment

- Submits a new assessment form
- Stores data in Firebase
- Sends email notifications to team

## Contact Information

- Phone:
  - +91-9059845457
  - +91-7842807389
- Email:
  - solarconnect45@gmail.com
  - solarconnect18@gmail.com

## Key Features

1. 20% reduction in electricity bills
2. Flexible payment options
3. Professional site assessment
4. 24/7 power supply solutions
5. Expert installation and maintenance
6. Environmental sustainability focus

## Production Deployment

The application is configured to serve the frontend build from the backend in production:

1. Build the frontend:

```bash
cd frontend
npm run build
```

2. Start the production server:

```bash
cd ../backend
npm start
```

## Security Considerations

- All Firebase credentials are stored in environment variables
- CORS is configured for specific origins
- Secure email configuration with Gmail SMTP
- Request rate limiting and security headers
- No sensitive data exposure in frontend code

## Maintenance

Regular updates required for:

- Node.js dependencies
- Firebase SDK versions
- Security patches
- SSL certificates (if applicable)
- Email service credentials
