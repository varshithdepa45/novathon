# 🌞 SolarConnect - Solar Mediator Website

Complete website solution for solar panel mediation between customers and solar companies.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Deployment](#deployment)

## ✨ Features

### Frontend Features

- 🎨 Modern, responsive design with gradient animations
- 📱 Mobile-friendly interface
- 🖼️ Beautiful hero section with solar panel imagery
- 📊 Interactive service cards
- 📝 Comprehensive enquiry form with validation
- ✅ Real-time form validation
- 🎭 Modal popups for user interaction
- 📧 Success notifications
- 🌐 Smooth scrolling navigation

### Backend Features

- 🔐 RESTful API with Express.js
- 💾 MongoDB database for data persistence
- 📨 Automated email notifications (admin & customer)
- 📊 Statistics and analytics endpoints
- 🔄 CRUD operations for enquiries
- 📄 Pagination and filtering
- ✉️ Professional email templates

## 🛠️ Tech Stack

### Frontend

- HTML5
- CSS3 (with custom animations)
- Vanilla JavaScript
- Font Awesome icons
- Google Fonts

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- Nodemailer (email service)
- CORS
- dotenv

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Gmail account (for email notifications) or other SMTP service

### Step 1: Clone or Create Project Structure

Create the following folder structure:

```
solar-mediator/
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
└── README.md
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

This will install:

- express (^4.18.2)
- cors (^2.8.5)
- mongoose (^7.5.0)
- nodemailer (^6.9.5)
- dotenv (^16.3.1)

### Step 3: Set Up MongoDB

#### Option A: Local MongoDB

1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service:

   ```bash
   # Windows
   net start MongoDB

   # Mac/Linux
   sudo systemctl start mongod
   ```

#### Option B: MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Replace in .env file

### Step 4: Configure Email Service

#### Using Gmail:

1. Enable 2-Step Verification in Google Account
2. Generate App Password:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the generated password
3. Update .env file with your email and app password

#### Using Other Services:

- SendGrid: Get API key from https://sendgrid.com
- Mailgun: Get API key from https://www.mailgun.com
- Update server.js transporter configuration accordingly

## ⚙️ Configuration

### Edit .env file in backend folder:

```env
# Server
PORT=3000

# Database
MONGODB_URI=mongodb://localhost:27017/solar_mediator

# Email (Gmail example)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-digit-app-password

# Company Contact
COMPANY_EMAIL=info@solarconnect.com
COMPANY_PHONE=+91-9876543210
```

### Update Frontend Contact Details

In `index.html`, replace:

- Phone numbers: Search for `+91-9876543210`
- Email addresses: Search for `info@solarconnect.com`

## 🚀 Running the Application

### Start Backend Server

```bash
cd backend
npm start
```

You should see:

```
╔════════════════════════════════════════╗
║   🌞 Solar Mediator API Server        ║
║   Server running on port 3000         ║
║   http://localhost:3000               ║
╚════════════════════════════════════════╝
✅ Connected to MongoDB
```

### Start Frontend

#### Option 1: Using Live Server (VS Code)

1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

#### Option 2: Using Python

```bash
cd frontend
python -m http.server 8000
```

Open http://localhost:8000

#### Option 3: Using Node.js http-server

```bash
npm install -g http-server
cd frontend
http-server -p 8000
```

## 📚 API Documentation

### Base URL

```
http://localhost:3000/api
```

### Endpoints

#### 1. Create Enquiry

```http
POST /api/enquiries
Content-Type: application/json

{
  "fullName": "John Doe",
  "contactNo": "9876543210",
  "email": "john@example.com",
  "address": "123 Main Street",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400001",
  "monthlyConsumption": 300,
  "monthlyBill": 3000,
  "peakConsumption": 5.5,
  "minConsumption": 1.2,
  "gridKnowledge": "yes",
  "gridAvailable": "yes",
  "terraceArea": 800,
  "roofType": "flat",
  "additionalInfo": "Looking for grid-connected system"
}
```

#### 2. Get All Enquiries

```http
GET /api/enquiries?page=1&limit=10&status=new
```

#### 3. Get Single Enquiry

```http
GET /api/enquiries/:id
```

#### 4. Update Enquiry

```http
PUT /api/enquiries/:id
Content-Type: application/json

{
  "status": "contacted"
}
```

#### 5. Delete Enquiry

```http
DELETE /api/enquiries/:id
```

#### 6. Get Statistics

```http
GET /api/stats
```

Response:

```json
{
  "success": true,
  "data": {
    "totalEnquiries": 150,
    "statusBreakdown": {
      "new": 45,
      "inProgress": 80,
      "completed": 25
    },
    "averages": {
      "avgMonthlyConsumption": 285.5,
      "avgMonthlyBill": 2850,
      "totalTerraceArea": 120000
    }
  }
}
```

## 🗄️ Database Schema

### Enquiry Collection

```javascript
{
  fullName: String (required),
  contactNo: String (required, 10 digits),
  email: String (required),
  address: String (required),
  city: String (required),
  state: String (required),
  pincode: String (required, 6 digits),
  monthlyConsumption: Number (required),
  monthlyBill: Number (required),
  peakConsumption: Number (required),
  minConsumption: Number (required),
  gridKnowledge: String (enum: ['yes', 'no', 'maybe']),
  gridAvailable: String (enum: ['yes', 'no', '']),
  terraceArea: Number (required),
  roofType: String (enum: ['flat', 'sloped', 'mixed']),
  additionalInfo: String,
  status: String (enum: ['new', 'contacted', 'in-progress', 'completed', 'cancelled']),
  submittedAt: Date,
  lastUpdated: Date,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🔧 Testing

### Test Backend API

```bash
# Test server health
curl http://localhost:3000

# Test creating enquiry
curl -X POST http://localhost:3000/api/enquiries \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","contactNo":"9876543210","email":"test@example.com","address":"Test Address","city":"Mumbai","state":"Maharashtra","pincode":"400001","monthlyConsumption":300,"monthlyBill":3000,"peakConsumption":5,"minConsumption":1,"gridKnowledge":"yes","gridAvailable":"yes","terraceArea":800,"roofType":"flat"}'

# Get all enquiries
curl http://localhost:3000/api/enquiries

# Get statistics
curl http://localhost:3000/api/stats
```

## 📱 Mobile Responsiveness

The website is fully responsive and tested on:

- Desktop (1920px+)
- Laptop (1366px)
- Tablet (768px)
- Mobile (375px)

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)

1. Push frontend folder to GitHub
2. Connect to Netlify/Vercel
3. Deploy

### Backend Deployment (Heroku/Railway)

1. Create `Procfile`:

```
web: node server.js
```

2. Deploy to Heroku:

```bash
heroku create solar-mediator-api
git push heroku main
heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set EMAIL_USER=your-email
heroku config:set EMAIL_PASSWORD=your-password
```

### Environment Variables for Production

Set these in your hosting platform:

- `NODE_ENV=production`
- `MONGODB_URI`
- `EMAIL_USER`
- `EMAIL_PASSWORD`
- `ALLOWED_ORIGINS`

## 📞 Support

For issues and questions:

- **Email:** info@solarconnect.com
- **Phone:** +91-9876543210

## 📄 License

MIT License - Feel free to use this project for your business.

## 🙏 Acknowledgments

- Solar panel images from Unsplash
- Font Awesome for icons
- MongoDB for database
- Express.js for backend framework

---

**Made with ☀️ by SolarConnect Team**
