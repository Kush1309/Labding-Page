import React from 'react'

function SalesHero({ onScrollToSection }) {
  return (
    <section className="sales-hero" aria-labelledby="sales-hero-heading">
      <div className="container">
        <div className="sales-hero-inner fade-in-up">
          <div className="sales-badge">
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--primary-red)', display: 'inline-block' }}></span>
            School ERP Enterprise Edition
          </div>

          <h1 id="sales-hero-heading" className="sales-hero-headline">
            Transform Your School with <span className="highlight">Smarter Technology</span>
          </h1>

          <p className="sales-hero-subtitle">
            Discover how our School ERP simplifies daily school operations, connects teachers and parents, and helps school administrators manage everything from one intelligent platform.
          </p>

          <div className="sales-hero-ctas">
            <button
              onClick={() => onScrollToSection('erp-demo')}
              className="btn-sales-primary"
              id="cta-watch-demo"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch ERP Demo
            </button>

            <button
              onClick={() => onScrollToSection('book-meeting')}
              className="btn-sales-secondary"
              id="cta-book-meeting"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Book a Meeting
            </button>
          </div>

          {/* Key Value Pillars */}
          <div className="sales-hero-trust">
            <div className="trust-item">
              <div className="trust-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div>
                <h4 className="trust-title">Centralized & Secure</h4>
                <p className="trust-sub">Role-based controls & cloud backups</p>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <div>
                <h4 className="trust-title">Real-Time Sync</h4>
                <p className="trust-sub">Instant updates across web & mobile</p>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <div>
                <h4 className="trust-title">Zero Hassle Setup</h4>
                <p className="trust-sub">Guided onboarding & staff training</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SalesHero
