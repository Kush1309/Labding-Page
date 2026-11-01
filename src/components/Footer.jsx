import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import BrandLogo from './common/BrandLogo'
import BRAND_CONFIG from '../config/brandConfig'
import '../styles/Footer.css'

function Footer() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLinkClick = (sectionId) => {
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId)
      if (element) {
        const offset = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
      }
    } else {
      navigate(`/#${sectionId}`)
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Brand Column */}
          <div className="footer-column">
            <div className="footer-brand">
              <BrandLogo
                variant="full"
                size="md"
                theme="light"
                showTagline={true}
                asLink={true}
              />
            </div>
            <p className="footer-description">
              {BRAND_CONFIG.positioning}
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <button onClick={() => handleLinkClick('home')} className="footer-link">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('about')} className="footer-link">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('schools')} className="footer-link">
                  Our Schools
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('benefits')} className="footer-link">
                  Benefits
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-column">
            <h4 className="footer-title">Services</h4>
            <ul className="footer-links">
              <li>
                <Link to="/sales" className="footer-link">
                  Sales
                </Link>
              </li>
              <li>
                <Link to="/services" className="footer-link">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/sales#erp-demo" className="footer-link">
                  Request a Demo
                </Link>
              </li>
              <li>
                <Link to="/register" className="footer-link">
                  Registration
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-column">
            <h4 className="footer-title">Contact</h4>
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Kanpur,Uttar+Pradesh,India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-contact-link"
                >
                  <span className="footer-contact-icon" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </span>
                  <span>Kanpur, Uttar Pradesh, India</span>
                </a>
              </li>
              <li className="footer-contact-item">
                <a href="tel:+916394109197" className="footer-contact-link">
                  <span className="footer-contact-icon" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.9 2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.4a16 16 0 0 0 5.65 5.65l1.27-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17.32z"/>
                    </svg>
                  </span>
                  <span>+91 6394109197</span>
                </a>
              </li>
              <li className="footer-contact-item">
                <a href="mailto:kushagrasaxena0913@gmail.com" className="footer-contact-link">
                  <span className="footer-contact-icon" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </span>
                  <span>kushagrasaxena0913@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} {BRAND_CONFIG.footer.copyrightHolder}. All rights reserved.
          </p>
          <div className="footer-legal">
            <span className="footer-legal-note">Privacy Policy | Terms &amp; Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
