# School ERP Website

A premium, modern and responsive School ERP landing page built with React and Vite.

## Features

✨ **Modern Design System**
- Professional color theme inspired by UpBrainiacs
- Clean typography with Inter font
- Consistent spacing and layouts

🎯 **Complete Sections**
- Hero section with video placeholder
- Top Schools showcase
- Benefits of School ERP
- School Days gallery
- Top Performers
- Our Team
- Contact/Lead generation form
- Registration CTA
- Professional footer

📱 **Fully Responsive**
- Mobile-first design approach
- Works on all devices and screen sizes
- Accessible navigation with keyboard support

🚀 **Performance Optimized**
- Built with Vite for fast development
- Minimal dependencies
- Smooth animations with reduced motion support

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Color Theme

- Primary Background: `#F1F1F1`
- White Background: `#FFFFFF`
- Primary Red: `#D90000`
- Dark Black: `#111111`
- Body Text: `#292929`
- Muted Text: `#666666`
- Light Border: `#DEDEDE`

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── HeroSection.jsx
│   │   ├── TopSchools.jsx
│   │   ├── Benefits.jsx
│   │   ├── SchoolDays.jsx
│   │   ├── TopPerformers.jsx
│   │   ├── OurTeam.jsx
│   │   ├── ContactSection.jsx
│   │   ├── RegistrationCTA.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   └── RegistrationPage.jsx
│   ├── styles/
│   │   └── [Component-specific CSS files]
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Form Email Notifications

The contact/demo request, school registration, quote request, and meeting forms
submit to the Vercel serverless endpoint at `/api/form-submission`. It sends one
notification email to `kushagrasaxena0913@gmail.com` after SMTP accepts the
message. Submissions are not stored in a database.

Configure these environment variables in the Vercel project settings:

- `GMAIL_USER`: Gmail account used to send notifications
- `GMAIL_APP_PASSWORD`: Gmail App Password for that account (never use the
  account's normal password)
- `ADMIN_NOTIFICATION_EMAIL`: notification recipient; defaults to
  `kushagrasaxena0913@gmail.com`

Set these variables for each deployment environment and redeploy. Keep them
server-side; do not prefix them with `VITE_` or add real credentials to the
repository. Gmail SMTP access and an App Password must be enabled for the sender
account.

## Customization

### Adding Real School Data
Replace the sample data in `TopSchools.jsx` with actual school information.

### Adding Real Images
Replace placeholder gradients with actual images in:
- Hero section video area
- School Days gallery
- School logos
- Team member photos
- Student performer photos

### Updating Team Information
Edit the team array in `OurTeam.jsx` to add roles, LinkedIn links, and actual profile images.

### Adding Video
Replace the video placeholder in `HeroSection.jsx` with a real video element when you have the asset available.

## Accessibility

- Keyboard navigation support
- Focus visible states
- ARIA labels on interactive elements
- Semantic HTML structure
- Respects prefers-reduced-motion

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

All rights reserved © 2026 School ERP

## Contact

For questions or support, use the contact form on the website.
