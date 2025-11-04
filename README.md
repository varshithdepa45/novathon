# SolarConnect - Solar Energy Solutions Platform

## 🌟 Welcome to SolarConnect!

### 🚀 Access the Website

#### 💻 On Your Computer

**[Click here to visit SolarConnect](http://localhost:5173)** (Local development URL)

#### 📱 On Other Devices

**[Click here to access from other devices](http://192.168.0.104:5173)** (Network access URL)

> **Note:** To access the website:
>
> 1. Make sure the development server is running (`npm run dev --host` in frontend folder)
> 2. Use http:// (not https://) in the URLs
> 3. For other devices, you must be on the same network
>
> Need help? Contact our team:
>
> - 📱 Phone: +91-9059845457 or +91-7842807389
> - 📧 Email: solarconnect45@gmail.com

Experience the future of solar energy!

## ✨ What We Offer

### 💡 Solar Solutions

- Purchase solar panels with pay-per-watt pricing
- Rent your terrace space for solar installations
- Reduce electricity bills by 20%
- Get 24/7 power supply

### 🌍 Why Choose Us

1. Zero setup cost options
2. Professional site assessment
3. Expert installation
4. Full maintenance support
5. Environmental sustainability

## 📞 Contact Us

### 📱 Phone

- +91-9059845457
- +91-7842807389

### 📧 Email

- solarconnect45@gmail.com
- solarconnect18@gmail.com

## 🎯 Key Benefits

1. **Save Money**

   - 20% reduction in electricity bills
   - Flexible payment options
   - Government subsidies available

2. **Hassle-Free Process**

   - Free site assessment
   - Professional installation
   - Regular maintenance
   - 24/7 customer support

3. **Environmental Impact**

   - Reduce carbon footprint
   - Clean, renewable energy
   - Sustainable future

4. **Flexible Options**
   - Buy solar panels
   - Rent your space
   - Customized solutions
   - Pay per usage

Visit [SolarConnect](https://solarconnect-45.firebaseapp.com) today and join the solar revolution!

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
