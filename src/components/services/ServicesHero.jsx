import React from 'react'
import { Link } from 'react-router-dom'

function ServicesHero({ onScrollToServices }) {
  return (
    <section id="services-hero" className="services-hero" aria-labelledby="services-hero-heading">
      <div className="container">
        <div className="services-hero-inner fade-in-up">
          <div className="services-badge">
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--primary-red)', display: 'inline-block' }}></span>
            Comprehensive School Management Suite
          </div>

          <h1 id="services-hero-heading" className="services-hero-headline">
            Everything Your School Needs, <span className="highlight">All in One Platform</span>
          </h1>

          <p className="services-hero-subtitle">
            From student admissions and attendance to examinations, fee management, and parent communication, our School ERP brings essential school operations together in one connected digital platform.
          </p>

          <div className="services-hero-ctas">
            <button
              onClick={onScrollToServices}
              className="btn-services-primary"
              id="cta-explore-services"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              Explore Our Services
            </button>

            <Link
              to="/sales#erp-demo"
              className="btn-services-secondary"
              id="cta-watch-erp-demo"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch ERP Demo
            </Link>
          </div>

          {/* Quick value indicators */}
          <div className="services-hero-pills">
            <span className="hero-pill-item">
              <span className="check">✓</span> 10 Unified Functional Modules
            </span>
            <span className="hero-pill-item">
              <span className="check">✓</span> Role-Based Secure Portals
            </span>
            <span className="hero-pill-item">
              <span className="check">✓</span> CBSE, ICSE & State Board Ready
            </span>
            <span className="hero-pill-item">
              <span className="check">✓</span> Web & Mobile Access
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesHero
