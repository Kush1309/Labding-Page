import React from 'react'
import { BENEFITS_LIST } from '../../data/servicesData'

const BenefitIcon = ({ index }) => {
  switch (index) {
    case 0:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      )
    case 1:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    case 2:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    case 3:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    default:
      return null
  }
}

function ServicesBenefits() {
  return (
    <section id="services-benefits" className="services-benefits-section" aria-labelledby="benefits-heading">
      <div className="container">
        {/* Section Header */}
        <div className="services-section-header">
          <div className="services-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
            Operational Impact
          </div>
          <h2 id="benefits-heading" className="services-section-title">
            Why Schools Choose <span className="highlight">Digital Management</span>
          </h2>
          <p className="services-section-desc">
            Explore the core advantages modern schools experience when centralizing their administrative processes into an integrated ERP system.
          </p>
        </div>

        {/* 4 Benefit Cards */}
        <div className="benefits-grid-4">
          {BENEFITS_LIST.map((benefit, idx) => (
            <div key={idx} className="benefit-card-box">
              <div className="benefit-icon-wrapper" aria-hidden="true">
                <BenefitIcon index={idx} />
              </div>
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-subtitle">{benefit.subtitle}</p>
              <p className="benefit-desc">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesBenefits
