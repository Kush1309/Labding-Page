import React from 'react'

function SalesPricingSection({ onSelectPlan }) {
  const plans = [
    {
      id: 'Basic',
      name: 'Basic Plan',
      target: 'For schools looking for essential digital school management.',
      featured: false,
      features: [
        'Student Records Management',
        'Attendance Management',
        'Basic Academic Records',
        'School Announcements'
      ]
    },
    {
      id: 'Standard',
      name: 'Standard Plan',
      target: 'For schools that need more comprehensive digital management.',
      featured: true,
      badge: 'Most Popular',
      features: [
        'Everything in Basic',
        'Homework & Assignment Management',
        'Examination & Report Cards',
        'Fee Management',
        'Parent Communication'
      ]
    },
    {
      id: 'Premium',
      name: 'Premium Plan',
      target: 'For schools seeking a more comprehensive ERP solution.',
      featured: false,
      features: [
        'Everything in Standard',
        'Advanced Reports & Analytics',
        'Additional Management Modules',
        'Enhanced Administrative Tools',
        'Implementation & Training Options'
      ]
    }
  ]

  return (
    <section id="pricing-plans" className="sales-pricing-section" aria-labelledby="pricing-heading">
      <div className="container">
        {/* Section Header */}
        <div className="sales-section-header">
          <div className="sales-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            Transparent Scalability
          </div>
          <h2 id="pricing-heading" className="sales-section-title">
            Choose the Right Solution for Your <span className="highlight">School</span>
          </h2>
          <p className="sales-section-desc">
            Explore the solution that best matches your school's requirements.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="pricing-grid">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`pricing-card ${plan.featured ? 'featured' : ''}`}
            >
              {plan.badge && <span className="featured-pill">{plan.badge}</span>}

              <div>
                <h3 className="pricing-plan-name">{plan.name}</h3>
                <p className="pricing-plan-target">{plan.target}</p>

                <div className="pricing-price-box">
                  <div className="pricing-price-label">Institutional Pricing</div>
                  <div className="pricing-price-tag">Contact for Pricing</div>
                </div>

                <div className="pricing-features-title">Included Features</div>
                <ul className="pricing-features-list">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="pricing-feature-item">
                      <span className="feature-check-icon">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onSelectPlan(plan.id)}
                className={plan.featured ? 'btn-sales-primary' : 'btn-sales-secondary'}
                style={{ width: '100%', justifyContent: 'center' }}
                id={`btn-discuss-plan-${plan.id.toLowerCase()}`}
              >
                Discuss This Plan
              </button>
            </div>
          ))}
        </div>

        {/* Note regarding customized deployment */}
        <div className="pricing-disclaimer">
          <p>
            * Note: Feature listings represent proposed module tiers and can be tailored to match your specific school board affiliation (CBSE, ICSE, IB, State Board), student strength, and operational workflow. Final scope will be confirmed during consultation.
          </p>
        </div>
      </div>
    </section>
  )
}

export default SalesPricingSection
