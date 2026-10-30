import React, { useState, useEffect } from 'react'
import { SALES_FORM_CONFIG } from '../../config/salesConfig'

const ALL_MODULES = [
  'Student Management',
  'Attendance',
  'Academic Management',
  'Examination & Report Cards',
  'Fee Management',
  'Parent & Student App',
  'Reports & Analytics',
  'Other Requirements'
]

function SalesQuoteSection({ selectedPlan, onSelectPlan }) {
  const [formData, setFormData] = useState({
    schoolName: '',
    contactPerson: '',
    email: '',
    phone: '',
    studentCount: '500 - 1,000 Students',
    schoolType: 'K-12 School',
    interestedPlan: selectedPlan || 'Standard',
    modules: [
      'Student Management',
      'Attendance',
      'Academic Management',
      'Examination & Report Cards',
      'Fee Management'
    ],
    additionalMessage: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [quoteStatus, setQuoteStatus] = useState(null) // null | { type: 'demo' | 'success' | 'error', message: '', details?: object }

  // Sync when user clicks a pricing card
  useEffect(() => {
    if (selectedPlan) {
      setFormData(prev => ({ ...prev, interestedPlan: selectedPlan }))
    }
  }, [selectedPlan])

  const validate = () => {
    const errs = {}
    if (!formData.schoolName.trim()) {
      errs.schoolName = 'School Name is required'
    }

    if (!formData.contactPerson.trim()) {
      errs.contactPerson = 'Contact Person is required'
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      errs.email = 'Email Address is required'
    } else if (!emailPattern.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address'
    }

    const phoneClean = formData.phone.replace(/[\s-]/g, '')
    if (!formData.phone.trim()) {
      errs.phone = 'Phone Number is required'
    } else if (phoneClean.length < 10 || !/^\+?[0-9]{10,15}$/.test(phoneClean)) {
      errs.phone = 'Please provide a valid phone number (10–15 digits)'
    }

    if (formData.modules.length === 0) {
      errs.modules = 'Please select at least one module'
    }

    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handlePlanPillClick = (planName) => {
    setFormData(prev => ({ ...prev, interestedPlan: planName }))
    if (onSelectPlan) onSelectPlan(planName)
  }

  const handleModuleToggle = (moduleName) => {
    setFormData(prev => {
      const exists = prev.modules.includes(moduleName)
      const updated = exists
        ? prev.modules.filter(m => m !== moduleName)
        : [...prev.modules, moduleName]
      return { ...prev, modules: updated }
    })
    if (errors.modules) {
      setErrors(prev => ({ ...prev, modules: undefined }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setQuoteStatus({
        type: 'error',
        message: 'Please resolve the highlighted fields before requesting your quote.'
      })
      return
    }

    setIsSubmitting(true)
    setQuoteStatus(null)

    const isRealApiConfigured = Boolean(SALES_FORM_CONFIG.submissionApiUrl && !SALES_FORM_CONFIG.isDemoMode)

    if (!isRealApiConfigured) {
      // Safe frontend demo mode — truthful feedback
      setTimeout(() => {
        setIsSubmitting(false)
        setQuoteStatus({
          type: 'demo',
          message: `[Frontend Demonstration] Quote request generated for ${formData.schoolName}!`,
          details: {
            school: formData.schoolName,
            plan: formData.interestedPlan,
            modulesCount: formData.modules.length,
            contact: formData.contactPerson,
            email: formData.email
          }
        })
        console.log('[SAMAGRA Demo Mode] Quote Request Payload:', formData)
      }, 700)
      return
    }

    // Real API submission
    try {
      const response = await fetch(SALES_FORM_CONFIG.submissionApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Quote Request: ${formData.schoolName} (${formData.interestedPlan} Plan)`,
          _replyto: formData.email,
          'School Name': formData.schoolName,
          'Contact Person': formData.contactPerson,
          'Email Address': formData.email,
          'Phone Number': formData.phone,
          'Number of Students': formData.studentCount,
          'School Type': formData.schoolType,
          'Interested Plan': formData.interestedPlan,
          'Required Modules': formData.modules.join(', '),
          'Additional Message': formData.additionalMessage,
          'Requested At': new Date().toLocaleString()
        })
      })

      if (response.ok) {
        setQuoteStatus({
          type: 'success',
          message: `Your quote request has been sent successfully! We will contact you at ${formData.email} with a proposal.`
        })
      } else {
        throw new Error('API submission failed')
      }
    } catch (err) {
      setQuoteStatus({
        type: 'error',
        message: `Could not transmit quote request. Please write directly to ${SALES_FORM_CONFIG.supportEmail}.`
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="request-quote" className="sales-quote-section" aria-labelledby="quote-heading">
      <div className="container">
        {/* Section Header */}
        <div className="sales-section-header">
          <div className="sales-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Tailored Proposal
          </div>
          <h2 id="quote-heading" className="sales-section-title">
            Get a Customized Quote for Your <span className="highlight">School</span>
          </h2>
          <p className="sales-section-desc">
            Tell us about your institution and the modules you need. Our team can help you explore a suitable School ERP solution.
          </p>
        </div>

        {/* Quote Form Container */}
        <div className="quote-card-container">
          <form onSubmit={handleSubmit} noValidate>
            {/* Interested Plan Pill Selector */}
            <div className="quote-plan-selector-group">
              <label className="form-field-label">
                Interested Plan <span className="required-star">*</span>
              </label>
              <div className="quote-plan-pills">
                {['Basic', 'Standard', 'Premium', 'Not Sure'].map((planName) => (
                  <button
                    type="button"
                    key={planName}
                    onClick={() => handlePlanPillClick(planName)}
                    className={`quote-plan-pill ${
                      formData.interestedPlan === planName ? 'selected' : ''
                    }`}
                  >
                    {planName}
                  </button>
                ))}
              </div>
            </div>

            {/* School & Contact Details */}
            <div className="form-grid-2" style={{ marginBottom: 18 }}>
              <div className="form-field-group">
                <label htmlFor="quoteSchoolName" className="form-field-label">
                  School Name <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  id="quoteSchoolName"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                  placeholder="e.g. Greenwood Public School"
                  className={`form-input-text ${errors.schoolName ? 'form-input-error' : ''}`}
                  aria-invalid={Boolean(errors.schoolName)}
                />
                {errors.schoolName && <span className="field-error-hint">{errors.schoolName}</span>}
              </div>

              <div className="form-field-group">
                <label htmlFor="quoteContactPerson" className="form-field-label">
                  Contact Person <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  id="quoteContactPerson"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  placeholder="Your Full Name & Designation"
                  className={`form-input-text ${errors.contactPerson ? 'form-input-error' : ''}`}
                  aria-invalid={Boolean(errors.contactPerson)}
                />
                {errors.contactPerson && <span className="field-error-hint">{errors.contactPerson}</span>}
              </div>
            </div>

            <div className="form-grid-2" style={{ marginBottom: 18 }}>
              <div className="form-field-group">
                <label htmlFor="quoteEmail" className="form-field-label">
                  Email Address <span className="required-star">*</span>
                </label>
                <input
                  type="email"
                  id="quoteEmail"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@school.org"
                  className={`form-input-text ${errors.email ? 'form-input-error' : ''}`}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <span className="field-error-hint">{errors.email}</span>}
              </div>

              <div className="form-field-group">
                <label htmlFor="quotePhone" className="form-field-label">
                  Phone Number <span className="required-star">*</span>
                </label>
                <input
                  type="tel"
                  id="quotePhone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 12345"
                  className={`form-input-text ${errors.phone ? 'form-input-error' : ''}`}
                  aria-invalid={Boolean(errors.phone)}
                />
                {errors.phone && <span className="field-error-hint">{errors.phone}</span>}
              </div>
            </div>

            <div className="form-grid-2" style={{ marginBottom: 22 }}>
              <div className="form-field-group">
                <label htmlFor="quoteStudentCount" className="form-field-label">
                  Number of Students <span className="required-star">*</span>
                </label>
                <select
                  id="quoteStudentCount"
                  name="studentCount"
                  value={formData.studentCount}
                  onChange={handleChange}
                  className="form-input-select"
                >
                  <option value="Under 500 Students">Under 500 Students</option>
                  <option value="500 - 1,000 Students">500 - 1,000 Students</option>
                  <option value="1,000 - 2,500 Students">1,000 - 2,500 Students</option>
                  <option value="2,500 - 5,000 Students">2,500 - 5,000 Students</option>
                  <option value="5,000+ Students">5,000+ Students</option>
                </select>
              </div>

              <div className="form-field-group">
                <label htmlFor="quoteSchoolType" className="form-field-label">
                  School Type <span className="required-star">*</span>
                </label>
                <select
                  id="quoteSchoolType"
                  name="schoolType"
                  value={formData.schoolType}
                  onChange={handleChange}
                  className="form-input-select"
                >
                  <option value="K-12 School">K-12 School</option>
                  <option value="Primary / Elementary School">Primary / Elementary School</option>
                  <option value="High / Secondary School">High / Secondary School</option>
                  <option value="Play School / Preschool">Play School / Preschool</option>
                  <option value="College / Higher Ed">College / Higher Ed</option>
                  <option value="Group of Institutions">Group of Institutions</option>
                </select>
              </div>
            </div>

            {/* Required Modules Checkboxes */}
            <div className="form-field-group" style={{ marginBottom: 24 }}>
              <label className="form-field-label">
                Required Modules <span className="required-star">*</span>
              </label>
              <div className="modules-checkbox-grid">
                {ALL_MODULES.map((module) => {
                  const isChecked = formData.modules.includes(module)
                  return (
                    <label
                      key={module}
                      className={`module-checkbox-label ${isChecked ? 'checked' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleModuleToggle(module)}
                        className="module-checkbox-input"
                      />
                      <span>{module}</span>
                    </label>
                  )
                })}
              </div>
              {errors.modules && <span className="field-error-hint">{errors.modules}</span>}
            </div>

            {/* Additional Message */}
            <div className="form-field-group" style={{ marginBottom: 28 }}>
              <label htmlFor="quoteAdditionalMessage" className="form-field-label">
                Additional Message / Custom Requirements
              </label>
              <textarea
                id="quoteAdditionalMessage"
                name="additionalMessage"
                rows="3"
                value={formData.additionalMessage}
                onChange={handleChange}
                placeholder="Mention any custom integrations required (e.g., Tally accounting sync, biometric machines, payment gateway preferences, or multi-branch management)..."
                className="form-input-textarea"
              ></textarea>
            </div>

            {/* Status Display */}
            {quoteStatus && (
              <div
                className={`feedback-banner ${
                  quoteStatus.type === 'demo'
                    ? 'demo-notice'
                    : quoteStatus.type === 'success'
                    ? 'success'
                    : 'error'
                }`}
                style={{ marginBottom: 20 }}
                role="status"
              >
                <div className="feedback-banner-title">
                  {quoteStatus.type === 'demo' && '📋 Frontend Demonstration Mode (No endpoint connected)'}
                  {quoteStatus.type === 'success' && '✅ Quote Inquiry Sent'}
                  {quoteStatus.type === 'error' && '⚠️ Attention Required'}
                </div>
                <div>{quoteStatus.message}</div>
                {quoteStatus.details && (
                  <div className="feedback-banner-meta">
                    Target Plan: <strong>{quoteStatus.details.plan}</strong> with <strong>{quoteStatus.details.modulesCount} modules</strong> for <strong>{quoteStatus.details.school}</strong>.
                    <br />
                    ℹ️ In production, connect your email handler or CRM webhook in <code>src/config/salesConfig.js</code>.
                  </div>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-sales-primary"
              id="btn-submit-quote"
              disabled={isSubmitting}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {isSubmitting ? 'Calculating Quote...' : 'Request My Quote'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default SalesQuoteSection
