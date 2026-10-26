import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Footer.css'

function Footer() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Brand Column */}
          <div className="footer-column">
            <div className="footer-brand">
              <span className="brand-school">School</span>
              <span className="brand-erp">ERP</span>
            </div>
            <p className="footer-description">
              Transforming school management with intelligent, connected digital solutions 
              for administrators, teachers, students and parents.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <button onClick={() => scrollToSection('home')} className="footer-link">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="footer-link">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('schools')} className="footer-link">
                  Our Schools
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('benefits')} className="footer-link">
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
                <button onClick={() => scrollToSection('contact')} className="footer-link">
                  Sales
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="footer-link">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="footer-link">
                  Request a Demo
                </button>
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
            <p className="footer-contact-note">
              Get in touch with us through the contact form to discuss your school's needs.
            </p>
            <button 
              onClick={() => scrollToSection('contact')}
              className="btn-primary btn-footer"
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} School ERP. All rights reserved.
          </p>
          <div className="footer-legal">
            <span className="footer-legal-note">Privacy Policy | Terms & Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
