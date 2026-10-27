import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SERVICES_LIST } from '../../data/servicesData'

// Crisp SVG Icons corresponding to each service category
const ServiceIcon = ({ id }) => {
  switch (id) {
    case 'student-info':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    case 'attendance':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <polyline points="9 16 11 18 15 14" />
        </svg>
      )
    case 'academics-exams':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <line x1="9" y1="7" x2="15" y2="7" />
          <line x1="9" y1="11" x2="13" y2="11" />
        </svg>
      )
    case 'homework':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      )
    case 'fee-finance':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
          <line x1="6" y1="15" x2="10" y2="15" />
        </svg>
      )
    case 'parent-student-app':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      )
    case 'teacher-staff':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )
    case 'timetable':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )
    case 'communication':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      )
    case 'reports-analytics':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    default:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      )
  }
}

function ServicesCatalog() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeModalService, setActiveModalService] = useState(null)

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'administration', label: 'Administration' },
    { id: 'academics', label: 'Academics' },
    { id: 'finance', label: 'Finance' },
    { id: 'communication', label: 'Communication & App' }
  ]

  const filteredServices = activeCategory === 'all'
    ? SERVICES_LIST
    : SERVICES_LIST.filter(s => s.category === activeCategory)

  return (
    <section id="services-catalog" className="services-catalog-section" aria-labelledby="catalog-heading">
      <div className="container">
        {/* Section Header */}
        <div className="services-section-header">
          <div className="services-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            Complete ERP Suite
          </div>
          <h2 id="catalog-heading" className="services-section-title">
            Powerful Services for <span className="highlight">Smarter School Management</span>
          </h2>
          <p className="services-section-desc">
            Manage your school's daily activities more efficiently with digital tools designed for administrators, teachers, students, and parents.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="services-filter-tabs">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`filter-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 10 Services Grid */}
        <div className="services-grid">
          {filteredServices.map(service => (
            <div key={service.id} className="service-card">
              <div>
                <div className="service-card-top">
                  <div className="service-icon-box">
                    <ServiceIcon id={service.id} />
                  </div>
                  <span className={`service-badge-pill ${service.badgeType}`}>
                    {service.badge}
                  </span>
                </div>

                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.shortDesc}</p>
              </div>

              <button
                onClick={() => setActiveModalService(service)}
                className="btn-explore-service"
                id={`btn-explore-${service.id}`}
                aria-label={`Explore details for ${service.title}`}
              >
                <span>Explore Service</span>
                <span className="arrow" aria-hidden="true">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Service Details Modal */}
      {activeModalService && (
        <div
          className="service-modal-backdrop"
          onClick={() => setActiveModalService(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-service-title"
        >
          <div
            className="service-modal-content"
            onClick={e => e.stopPropagation()}
          >
            <div className="service-modal-header">
              <div>
                <span className={`service-badge-pill ${activeModalService.badgeType}`} style={{ marginBottom: 8, display: 'inline-block' }}>
                  {activeModalService.badge}
                </span>
                <h3 id="modal-service-title" className="service-title" style={{ margin: 0 }}>
                  {activeModalService.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalService(null)}
                className="modal-close-btn"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <div className="service-modal-body">
              <p style={{ color: 'var(--muted-text)', lineHeight: 1.6, marginBottom: 16 }}>
                {activeModalService.shortDesc}
              </p>

              <h4 style={{ fontSize: '0.92rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--dark-black)', fontWeight: 700 }}>
                Supported Capabilities & Workflows:
              </h4>

              <ul className="modal-features-list">
                {activeModalService.details.map((detail, idx) => (
                  <li key={idx} className="modal-feature-item">
                    <span className="check">✓</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="service-modal-footer">
              <button
                onClick={() => setActiveModalService(null)}
                className="btn-services-secondary"
                style={{ padding: '10px 20px', fontSize: '0.9rem' }}
              >
                Close
              </button>
              <Link
                to="/sales#book-meeting"
                className="btn-services-primary"
                style={{ padding: '10px 22px', fontSize: '0.9rem' }}
              >
                Discuss This Module
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default ServicesCatalog
