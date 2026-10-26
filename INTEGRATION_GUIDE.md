# Backend Integration Guide

This guide explains how to integrate the School ERP website with your backend API.

## Current Status

✅ **Frontend Complete** - All UI components are built and working
⏳ **Backend Integration** - Ready for API connection (currently using demo mode)

---

## 1. Contact Form Integration

### Location
- **File:** `src/components/ContactSection.jsx`
- **Line:** ~35-50 (handleSubmit function)

### Current Code (Demo)
```javascript
const handleSubmit = async (e) => {
  e.preventDefault()
  setIsSubmitting(true)
  setFormStatus({ type: '', message: '' })

  // Frontend-only demo (Replace with actual API call)
  setTimeout(() => {
    setFormStatus({
      type: 'success',
      message: 'Thank you! Your request has been submitted.'
    })
    setIsSubmitting(false)
    // Reset form
    setFormData({ /* ... */ })
  }, 1500)
}
```

### Integration Steps

#### Step 1: Create environment variable
Create `.env` file in project root:
```env
VITE_API_URL=https://your-api-domain.com/api
```

#### Step 2: Replace with actual API call
```javascript
const handleSubmit = async (e) => {
  e.preventDefault()
  setIsSubmitting(true)
  setFormStatus({ type: '', message: '' })

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })

    const data = await response.json()

    if (response.ok) {
      setFormStatus({
        type: 'success',
        message: data.message || 'Thank you! Our team will contact you shortly.'
      })
      // Reset form
      setFormData({
        fullName: '',
        schoolName: '',
        email: '',
        phone: '',
        interestedIn: 'sales',
        message: ''
      })
    } else {
      setFormStatus({
        type: 'error',
        message: data.error || 'Something went wrong. Please try again.'
      })
    }
  } catch (error) {
    setFormStatus({
      type: 'error',
      message: 'Network error. Please check your connection and try again.'
    })
  } finally {
    setIsSubmitting(false)
  }
}
```

### Expected API Endpoint

**Endpoint:** `POST /api/contact`

**Request Body:**
```json
{
  "fullName": "John Doe",
  "schoolName": "Example School",
  "email": "john@example.com",
  "phone": "+91 1234567890",
  "interestedIn": "sales",
  "message": "I want to learn more about School ERP"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Thank you! Our team will contact you shortly."
}
```

**Error Response (4xx/5xx):**
```json
{
  "success": false,
  "error": "Invalid email address"
}
```

---

## 2. Registration Form Integration

### Location
- **File:** `src/pages/RegistrationPage.jsx`
- **Line:** ~40-65 (handleSubmit function)

### Current Code (Demo)
```javascript
const handleSubmit = async (e) => {
  e.preventDefault()
  setIsSubmitting(true)
  setFormStatus({ type: '', message: '' })

  // Simulate form submission (Replace with actual API call)
  setTimeout(() => {
    setFormStatus({
      type: 'success',
      message: 'Registration request submitted successfully!'
    })
    setIsSubmitting(false)
    setFormData({ /* reset */ })
  }, 1500)
}
```

### Integration Steps

Replace the setTimeout with:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault()
  setIsSubmitting(true)
  setFormStatus({ type: '', message: '' })

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })

    const data = await response.json()

    if (response.ok) {
      setFormStatus({
        type: 'success',
        message: data.message || 'Registration submitted! Our team will contact you soon.'
      })
      // Reset form
      setFormData({
        schoolName: '',
        principalName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        boardAffiliation: '',
        studentCount: '',
        plan: 'basic'
      })
      
      // Optional: Redirect to thank you page after 3 seconds
      setTimeout(() => {
        navigate('/')
      }, 3000)
    } else {
      setFormStatus({
        type: 'error',
        message: data.error || 'Registration failed. Please try again.'
      })
    }
  } catch (error) {
    setFormStatus({
      type: 'error',
      message: 'Network error. Please check your connection and try again.'
    })
  } finally {
    setIsSubmitting(false)
  }
}
```

### Expected API Endpoint

**Endpoint:** `POST /api/register`

**Request Body:**
```json
{
  "schoolName": "Example High School",
  "principalName": "Dr. Jane Smith",
  "email": "principal@example.com",
  "phone": "+91 9876543210",
  "address": "123 Main Street",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400001",
  "boardAffiliation": "CBSE",
  "studentCount": "500-1000",
  "plan": "professional"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Registration submitted successfully!",
  "registrationId": "REG123456"
}
```

**Error Response (4xx/5xx):**
```json
{
  "success": false,
  "error": "Email already registered"
}
```

---

## 3. Environment Variables Setup

### Create .env file
```env
# API Configuration
VITE_API_URL=https://your-api-domain.com/api

# Optional: Google Analytics
VITE_GA_ID=G-XXXXXXXXXX

# Optional: Other services
VITE_RECAPTCHA_SITE_KEY=your_site_key
```

### Access in code
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

### Important Notes
- ⚠️ Never commit `.env` to version control
- ✅ Add `.env` to `.gitignore` (already done)
- ✅ Use `VITE_` prefix for variables (Vite requirement)
- ✅ Create `.env.example` for documentation

---

## 4. Adding Real Content

### School Data
**File:** `src/components/TopSchools.jsx`

Replace the schools array:
```javascript
// Current (demo)
const schools = [
  { id: 1, name: 'Delhi Public School', location: 'New Delhi', imageAlt: '...' },
  // ...
]

// After integration - fetch from API or use static data
useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/schools`)
    .then(res => res.json())
    .then(data => setSchools(data))
    .catch(err => console.error(err))
}, [])
```

### Team Data
**File:** `src/components/OurTeam.jsx`

Add real information:
```javascript
const team = [
  { 
    id: 1, 
    name: 'Kushagra', 
    role: 'Product Lead',
    initial: 'K',
    linkedin: 'https://linkedin.com/in/kushagra',
    image: '/images/team/kushagra.jpg' // Add real photo
  },
  // ...
]
```

### Images
1. Create `public/images/` directory
2. Add subdirectories:
   - `public/images/schools/`
   - `public/images/team/`
   - `public/images/gallery/`
3. Update image paths in components

---

## 5. Security Best Practices

### Never Expose in Frontend
❌ API keys for services (SendGrid, Twilio, etc.)
❌ Database credentials
❌ Admin tokens
❌ Private keys

### Handle on Backend
✅ Email sending
✅ Payment processing
✅ Data validation
✅ Authentication
✅ Rate limiting

### CORS Configuration
Your backend should allow requests from your frontend domain:

```javascript
// Express.js example
app.use(cors({
  origin: 'https://your-frontend-domain.com',
  credentials: true
}))
```

---

## 6. Form Validation Enhancement

Current validation is basic HTML5. For better UX:

### Install validation library (optional)
```bash
npm install yup
```

### Example with Yup
```javascript
import * as yup from 'yup'

const contactSchema = yup.object().shape({
  fullName: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().matches(/^[0-9+\s-]+$/, 'Invalid phone').required(),
  schoolName: yup.string().required('School name is required'),
})

// In component
try {
  await contactSchema.validate(formData, { abortEarly: false })
  // Proceed with submission
} catch (err) {
  // Handle validation errors
}
```

---

## 7. Analytics Integration

### Google Analytics
Add to `index.html` (before closing `</head>`):

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Track Events
```javascript
// Contact form submission
gtag('event', 'contact_form_submit', {
  'event_category': 'engagement',
  'event_label': formData.interestedIn
})

// Registration
gtag('event', 'registration_start', {
  'event_category': 'conversion',
  'event_label': formData.plan
})
```

---

## 8. Email Service Integration

### Options
1. **SendGrid** - Popular, reliable
2. **AWS SES** - Cost-effective
3. **Mailgun** - Developer-friendly
4. **Nodemailer** - Self-hosted

### Backend Example (Node.js + SendGrid)
```javascript
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

app.post('/api/contact', async (req, res) => {
  const { fullName, schoolName, email, phone, message } = req.body
  
  const msg = {
    to: 'sales@yourschoolerp.com',
    from: 'noreply@yourschoolerp.com',
    subject: `New Contact Request from ${schoolName}`,
    html: `
      <h2>New Contact Request</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>School:</strong> ${schoolName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong> ${message}</p>
    `
  }
  
  try {
    await sgMail.send(msg)
    res.json({ success: true, message: 'Thank you! We will contact you soon.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: 'Failed to send message' })
  }
})
```

---

## 9. Database Schema Suggestions

### Contact Requests Table
```sql
CREATE TABLE contact_requests (
  id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(255) NOT NULL,
  school_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  interested_in ENUM('sales', 'services') NOT NULL,
  message TEXT,
  status ENUM('new', 'contacted', 'converted') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Registrations Table
```sql
CREATE TABLE registrations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  school_name VARCHAR(255) NOT NULL,
  principal_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  pincode VARCHAR(10) NOT NULL,
  board_affiliation VARCHAR(50) NOT NULL,
  student_count VARCHAR(20) NOT NULL,
  plan ENUM('basic', 'professional', 'enterprise') NOT NULL,
  status ENUM('pending', 'approved', 'active', 'rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## 10. Testing Checklist

Before going live:

### Forms
- [ ] Test successful submission
- [ ] Test validation errors
- [ ] Test network errors
- [ ] Test duplicate submissions
- [ ] Verify email notifications
- [ ] Check data in database

### Responsive
- [ ] Test on mobile devices
- [ ] Test on tablets
- [ ] Test on different browsers
- [ ] Verify no horizontal scroll
- [ ] Check touch interactions

### Performance
- [ ] Run Lighthouse audit
- [ ] Optimize images
- [ ] Enable GZIP compression
- [ ] Add caching headers
- [ ] Test load time

### Security
- [ ] Verify HTTPS
- [ ] Check CORS settings
- [ ] Test rate limiting
- [ ] Validate input sanitization
- [ ] Review error messages (no leaks)

---

## 11. Deployment

### Build for Production
```bash
npm run build
```

This creates a `dist/` folder with optimized files.

### Deploy to Hosting
Options:
- **Vercel** - Easy, automatic deployments
- **Netlify** - Simple, CI/CD included
- **AWS S3 + CloudFront** - Scalable
- **DigitalOcean** - Full control
- **Firebase Hosting** - Google infrastructure

### Environment Variables
Add environment variables in your hosting platform's dashboard, not in `.env` file.

---

## Support

For integration questions:
1. Check the console for errors
2. Verify API endpoint URLs
3. Test API with Postman first
4. Check CORS configuration
5. Review network tab in browser DevTools

---

This guide covers everything needed to integrate the School ERP website with your backend. Take it step by step, test thoroughly, and never expose secrets in the frontend code.
