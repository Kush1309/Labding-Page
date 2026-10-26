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

## Backend Integration

The contact form and registration form currently use frontend-only demo submissions. To integrate with a real backend:

1. Replace the `setTimeout` simulation in `ContactSection.jsx` with actual API calls
2. Replace the `setTimeout` simulation in `RegistrationPage.jsx` with actual API calls
3. Add your API endpoints and handle form submissions properly
4. Never expose API keys or secrets in frontend code

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
