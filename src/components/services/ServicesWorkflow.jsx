import React from 'react'
import { HOW_IT_WORKS_STEPS } from '../../data/servicesData'

function ServicesWorkflow() {
  return (
    <section id="services-workflow" className="services-workflow-section" aria-labelledby="workflow-heading">
      <div className="container">
        {/* Section Header */}
        <div className="services-section-header">
          <div className="services-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 14 14" />
            </svg>
            Structured Implementation
          </div>
          <h2 id="workflow-heading" className="services-section-title">
            How Our Services <span className="highlight">Work</span>
          </h2>
          <p className="services-section-desc">
            A guided, systematic approach designed to help school leadership seamlessly transition from fragmented spreadsheets to a connected digital platform.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="workflow-steps-container">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <div key={step.step} className="workflow-step-card">
              <div className="step-num-pill" aria-hidden="true">
                {step.step}
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesWorkflow
