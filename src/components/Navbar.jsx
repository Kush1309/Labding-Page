import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import BrandLogo from './common/BrandLogo'
import '../styles/Navbar.css'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  const handleSectionClick = (sectionId) => {
    setIsMobileMenuOpen(false)
    setIsContactDropdownOpen(false)
    if (location.pathname === '/') {
      scrollToSection(sectionId)
    } else {
      navigate(`/#${sectionId}`)
    }
  }

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <BrandLogo
          variant="full"
          size="md"
          theme="dark"
          asLink={true}
          onClick={() => {
            setIsMobileMenuOpen(false)
            setIsContactDropdownOpen(false)
          }}
          className="navbar-brand-logo"
        />

        {/* Desktop Navigation */}
        <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <button 
            onClick={() => handleSectionClick('home')}
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => handleSectionClick('about')}
            className="nav-link"
          >
            About
          </button>
          <button 
            onClick={() => handleSectionClick('schools')}
            className="nav-link"
          >
            Our Schools
          </button>
          <Link 
            to="/sales"
            onClick={() => {
              setIsMobileMenuOpen(false)
              setIsContactDropdownOpen(false)
            }}
            className={`nav-link ${location.pathname === '/sales' ? 'active' : ''}`}
          >
            Sales
          </Link>
          <Link 
            to="/services"
            onClick={() => {
              setIsMobileMenuOpen(false)
              setIsContactDropdownOpen(false)
            }}
            className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`}
          >
            Services
          </Link>
          
          {/* Contact Dropdown */}
          <div 
            className="nav-dropdown"
            onMouseEnter={() => setIsContactDropdownOpen(true)}
            onMouseLeave={() => setIsContactDropdownOpen(false)}
          >
            <button 
              className="nav-link dropdown-toggle"
              onClick={() => setIsContactDropdownOpen(!isContactDropdownOpen)}
            >
              Contact
              <span className="dropdown-arrow">▼</span>
            </button>
            {isContactDropdownOpen && (
              <div className="dropdown-menu">
                <Link 
                  to="/sales"
                  onClick={() => {
                    setIsContactDropdownOpen(false)
                    setIsMobileMenuOpen(false)
                  }}
                  className="dropdown-item"
                >
                  <span className="dropdown-icon">📧</span>
                  Sales
                </Link>
                <Link 
                  to="/services"
                  onClick={() => {
                    setIsContactDropdownOpen(false)
                    setIsMobileMenuOpen(false)
                  }}
                  className="dropdown-item"
                >
                  <span className="dropdown-icon">💼</span>
                  Services
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <Link to="/register" className="btn-primary navbar-cta">
          Register Now
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
