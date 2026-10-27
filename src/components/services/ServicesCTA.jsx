import React from 'react'
import { Link } from 'react-router-dom'

function ServicesCTA() {
  return (
    <section className="services-cta-section" aria-labelledby="cta-heading">
      <div className="container">
        <div className="services-cta-box">
          <div className="services-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Transform Your Institution
          </div>

          <h2 id="cta-heading" className="services-cta-title">
            Ready to Make School Management <span className="highlight">Simpler?</span>
          </h2>

          <p className="services-cta-desc">
            Discover how SAMAGRA can help your school organize daily operations, empower educators, and improve communication.
          </p>

          <div className="services-cta-buttons">
            <Link
              to="/sales#book-meeting"
              className="btn-services-primary"
              id="cta-bottom-book-meeting"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Book a Meeting
            </Link>

            <Link
              to="/sales#request-quote"
              className="btn-services-secondary"
              id="cta-bottom-request-quote"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesCTA
