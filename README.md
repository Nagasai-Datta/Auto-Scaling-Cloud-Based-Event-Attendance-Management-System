# Event Attendance Management System - Frontend

## Project Overview

This is the frontend component of an **Auto-Scaling Cloud-Based Event Attendance Management System**, designed as a final-year engineering academic project demonstrating cloud-native architecture, auto-scaling, and role-based access control.

### Purpose

The frontend serves as the user interface for managing attendance across large-scale events (concerts, seminars, exhibitions, academic sessions) with support for:

- **Attendees**: View personal attendance records
- **Organizers**: Create events and manage attendance for multiple attendees

---

## Academic Context

**Evaluation Level**: Final Year Engineering (30-mark project)  
**Core Demonstration**: Cloud scalability, load balancing, and serverless integration

This frontend is designed to be deployed on **AWS EC2 instances** behind an **Application Load Balancer (ALB)** with **Auto Scaling** to handle:

- Sudden traffic spikes during event start times
- Thousands of concurrent users
- Dynamic resource scaling based on demand

---

## Architecture Position

```
User Browser
    ↓
Application Load Balancer (ALB)
    ↓
EC2 Auto Scaling Group (1-4 instances)
    ↓
Frontend (HTML/CSS/JS or React)
    ↓
Backend API (EC2 - Auth Layer)
    ↓
AWS Lambda (Serverless Functions)
    ↓
Amazon Aurora (MySQL/PostgreSQL)
```

---

## Technology Stack

### Core Technologies

- **HTML5**: Semantic structure
- **CSS3**: Responsive styling with Flexbox/Grid
- **JavaScript (ES6+)**: Client-side logic and API interaction
- **Optional**: React.js for component-based architecture

### Cloud Integration

- **AWS EC2**: Hosting platform
- **Application Load Balancer**: Traffic distribution
- **Auto Scaling Group**: Dynamic capacity management
- **CloudWatch**: Monitoring and alerts

---

## Project Structure

```
frontend/
├── index.html              # Landing page
├── login.html              # Login page
├── attendee-dashboard.html # Attendee view
├── organizer-dashboard.html# Organizer view
├── css/
│   ├── style.css          # Global styles
│   ├── login.css          # Login-specific styles
│   └── dashboard.css      # Dashboard styles
├── js/
│   ├── auth.js            # Authentication logic
│   ├── api.js             # API communication layer
│   ├── attendee.js        # Attendee dashboard logic
│   └── organizer.js       # Organizer dashboard logic
├── assets/
│   ├── images/            # Icons, logos
│   └── fonts/             # Custom fonts
└── README.md              # This file
```

---

## Key Features

### For Attendees

- Secure login with JWT token authentication
- View personal attendance status for registered events
- Read-only access to attendance data
- Responsive UI for mobile and desktop

### For Organizers

- Secure login with elevated privileges
- Create and manage events
- View and update attendance records for multiple attendees
- Event-wise attendance reports
- Bulk attendance operations

---

## Security Features

1. **Role-Based Access Control (RBAC)**

   - Attendees cannot view other attendees' data
   - Organizers can only modify events they created

2. **Token-Based Authentication**

   - JWT tokens stored in `localStorage` or `sessionStorage`
   - Token validation on every API request
   - Automatic redirect to login on token expiry

3. **Secure API Communication**

   - HTTPS only (enforced via ALB)
   - CORS headers configured
   - Input validation on client-side

4. **XSS Prevention**
   - Content Security Policy (CSP) headers
   - Input sanitization before rendering

---

## Local Development Setup

### Prerequisites

- Modern web browser (Chrome, Firefox, Edge)
- Text editor (VS Code, Sublime Text)
- Optional: Node.js (for local server)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Option A: Using Python SimpleHTTPServer**

   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000
   ```

3. **Option B: Using Node.js http-server**

   ```bash
   npm install -g http-server
   http-server -p 8000
   ```

4. **Option C: Direct File Access**

   - Simply open `index.html` in your browser
   - Note: API calls may require CORS configuration

5. **Access the application**
   ```
   http://localhost:8000
   ```

---

## 🔧 Configuration

### API Endpoint Configuration

Edit `js/api.js` to point to your backend API:

```javascript
// Development
const API_BASE_URL = "http://localhost:3000/api";

// Production (AWS ALB endpoint)
const API_BASE_URL = "https://your-alb-dns-name.region.elb.amazonaws.com/api";
```

### Environment-Based Configuration

Create a `config.js` file:

```javascript
const CONFIG = {
  development: {
    apiUrl: "http://localhost:3000/api",
    debug: true,
  },
  production: {
    apiUrl: "https://your-alb-endpoint/api",
    debug: false,
  },
};

// Auto-detect environment
const ENV =
  window.location.hostname === "localhost" ? "development" : "production";
export default CONFIG[ENV];
```

---

## API Integration Points

### Authentication Endpoints

```javascript
POST / api / auth / login;
POST / api / auth / logout;
GET / api / auth / verify - token;
```

### Attendee Endpoints

```javascript
GET  /api/attendee/events           // List registered events
GET  /api/attendee/attendance/:eventId  // View attendance for event
```

### Organizer Endpoints

```javascript
POST /api/organizer/events          // Create new event
GET  /api/organizer/events          // List managed events
PUT  /api/organizer/events/:eventId // Update event
GET  /api/organizer/attendance/:eventId  // View all attendees
PUT  /api/organizer/attendance/:attendanceId  // Update attendance status
```

---

## UI/UX Design Principles

1. **Responsive Design**

   - Mobile-first approach
   - Breakpoints: 320px, 768px, 1024px, 1440px

2. **Accessibility**

   - ARIA labels for screen readers
   - Keyboard navigation support
   - High contrast mode support

3. **Performance**

   - Lazy loading of images
   - Minified CSS/JS in production
   - CDN for static assets

4. **User Feedback**
   - Loading spinners during API calls
   - Toast notifications for success/error
   - Form validation with clear error messages

---

## Testing Strategy

### Manual Testing Checklist

- [ ] Login with attendee credentials
- [ ] Login with organizer credentials
- [ ] Attendee can view only their attendance
- [ ] Organizer can create events
- [ ] Organizer can update attendance
- [ ] Token expiry handling
- [ ] Cross-browser compatibility
- [ ] Mobile responsiveness

### Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Deployment

### The project is deployed on AWS S3 + CloudFront (Static Hosting)

---

## Monitoring & Debugging

### Client-Side Logging

```javascript
// Enable debug mode
localStorage.setItem("debug", "true");

// View logs in console
console.log("[AUTH]", "User logged in:", userData);
console.log("[API]", "Fetching events:", response);
```

### Performance Monitoring

- Browser DevTools Network tab
- Lighthouse audits
- AWS CloudWatch RUM (Real User Monitoring)

---

## Academic Evaluation

This frontend demonstrates:

1. **Cloud-Native Design**

   - Stateless frontend (scales horizontally)
   - Load balancer integration
   - Health check endpoints

2. **Scalability**

   - Multiple EC2 instances behind ALB
   - Auto Scaling based on traffic
   - Session management via tokens (not server sessions)

3. **Security**

   - Role-based access control
   - Secure authentication flow
   - Protection against common vulnerabilities

4. **User Experience**
   - Responsive design
   - Real-time feedback
   - Intuitive navigation

---

## Common Issues & Troubleshooting

### Issue: CORS Error

**Solution**: Ensure backend API has proper CORS headers:

```javascript
Access-Control-Allow-Origin: https://your-frontend-domain
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

### Issue: Token Expired

**Solution**: Implement automatic token refresh:

```javascript
// Check token expiry before API calls
if (isTokenExpired()) {
  await refreshToken();
}
```

### Issue: API Not Reachable

**Solution**: Verify:

1. ALB security group allows inbound traffic
2. EC2 instances are healthy in target group
3. API_BASE_URL is correctly configured

---

## Role-Based Access Demonstration

### Test Credentials (Development)

### Login Credentials:

Attendee: attendee@test.com / password123
Organizer: organizer@test.com / password123

(Or just click the demo quick-fill cards!)

**Attendee**

```
Username: john.doe@example.com
Password: Attendee@123
```

**Organizer**

```
Username: jane.smith@example.com
Password: Organizer@123
```

---

## License

This project is developed for academic purposes as part of final-year engineering evaluation.

---

## Contributors

- **Student Name**: Naga Sai Dattu

---

**Last Updated**: February 2026  
**Version**: 1.0.0
