/**
 * SAMAGRA — Centralized Brand & Identity Configuration
 * 
 * Edit this file to update global brand details, logos, metadata,
 * and founder/team profile image paths across the entire application.
 */

export const BRAND_CONFIG = {
  // Core Brand Identity
  name: 'SAMAGRA',
  fullName: 'SAMAGRA Education Platform',
  tagline: 'Intelligent Education Management Platform',
  shortTagline: 'Unified School ERP Platform',
  positioning: 'An intelligent, unified education management platform for schools, administrators, teachers, students, and parents.',
  category: 'School ERP',

  // Color Tokens (consistent with design system)
  colors: {
    primaryRed: '#D90000',
    primaryRedHover: '#B80000',
    darkBlack: '#111111',
    bodyText: '#292929',
    mutedText: '#666666',
    whiteBg: '#FFFFFF',
    lightBorder: '#DEDEDE',
    primaryBg: '#F1F1F1',
  },

  // Logo Configuration (Using your official brand logo image)
  logo: {
    mode: 'image',
    horizontalPath: '/images/samagra-logo-horizontal.png',
    horizontalWhitePath: '/images/samagra-logo-horizontal-white.png',
    fullPath: '/images/samagra-logo.png',
    symbolPath: '/images/samagra-symbol.png',
    alt: 'SAMAGRA - The Complete School Platform',
  },

  // Metadata / SEO Defaults
  seo: {
    siteTitle: 'SAMAGRA - Intelligent School ERP & Education Management Platform',
    salesTitle: 'Sales & Demo | SAMAGRA - Intelligent Education Management Platform',
    servicesTitle: 'Our Services | SAMAGRA - Comprehensive Digital School Management',
    registerTitle: 'Register Your School | SAMAGRA Education Platform',
    defaultDescription: 'Transform school operations with SAMAGRA — an intelligent, unified School ERP platform connecting administrators, teachers, students, and parents.',
    salesDescription: 'Explore SAMAGRA School ERP software demo, book a personalized school consultation, compare transparent pricing plans, and request a customized quote for your institution.',
    servicesDescription: 'Discover SAMAGRA digital services: student information, attendance tracking, examination management, fee collection, mobile apps, and analytics.',
  },

  // Personal / Founder Photo Integration Configuration
  // When you have your personal photo, simply place it in "public/images/team/kushagra.jpg"
  // or update the path below:
  profile: {
    kushagraPhotoPath: '/images/team/kushagra.jpg',
    fallbackInitials: 'KS',
    kushagraAlt: 'Kushagra Saxena - Senior Developer & Founder',
  },

  // Footer & Legal
  footer: {
    copyrightHolder: 'SAMAGRA',
    copyrightSubtext: 'Intelligent Education Management Platform',
  }
}

export default BRAND_CONFIG
