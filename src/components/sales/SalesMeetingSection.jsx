import React, { useState } from 'react'
import { SALES_FORM_CONFIG } from '../../config/salesConfig'

function SalesMeetingSection() {
  // Get today's date formatted as YYYY-MM-DD for min date constraint
  const todayDateString = new Date().toISOString().split('T')[0]

  const [formData, setFormData] = useState({
    schoolName: '',
    contactPerson: '',
    email: '',
    phone: '',
    meetingDate: '',
    meetingTime: '10:00 AM - 11:00 AM',
    studentCount: '500 - 1,000 Students',
    additionalRequirements: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState(null) // null | { type: 'demo' | 'success' | 'error', message: '', details?: object }

  const validate = () => {
    const errs = {}

    if (!formData.schoolName.trim()) {
      errs.schoolName = 'School Name is required'
    }

    if (!formData.contactPerson.trim()) {
      errs.contactPerson = 'Contact Person Name is required'
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      errs.email = 'Official Email Address is required'
    } else if (!emailPattern.test(formData.email.trim())) {
      errs.email = 'Please enter a valid official email address'
    }

    const phoneClean = formData.phone.replace(/[\s-]/g, '')
    if (!formData.phone.trim()) {
      errs.phone = 'Phone Number is required'
    } else if (phoneClean.length < 10 || !/^\+?[0-9]{10,15}$/.test(phoneClean)) {
      errs.phone = 'Please enter a valid phone number (10–15 digits)'
    }

    if (!formData.meetingDate) {
      errs.meetingDate = 'Preferred Meeting Date is required'
    } else if (formData.meetingDate < todayDateString) {
      errs.meetingDate = 'Meeting date cannot be in the past'
    }

    if (!formData.meetingTime) {
      errs.meetingTime = 'Preferred Meeting Time is required'
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setSubmissionStatus({
        type: 'error',
        message: 'Please complete all required fields with valid information before submitting.'
      })
      return
    }

    setIsSubmitting(true)
    setSubmissionStatus(null)

    // Check whether real backend API endpoint is configured
    const isRealApiConfigured = Boolean(SALES_FORM_CONFIG.submissionApiUrl && !SALES_FORM_CONFIG.isDemoMode)

    if (!isRealApiConfigured) {
      // Safe, transparent frontend demonstration mode — does NOT falsely claim an active calendar booking
      setTimeout(() => {
        setIsSubmitting(false)
        setSubmissionStatus({
          type: 'demo',
          message: `[Frontend Demonstration] Meeting consultation request verified for ${formData.schoolName}!`,
          details: {
            person: formData.contactPerson,
            school: formData.schoolName,
            date: formData.meetingDate,
            time: formData.meetingTime,
            email: formData.email
          }
        })
        console.log('[SAMAGRA Demo Mode] Meeting Request Payload:', formData)
      }, 700)
      return
    }

    // If real API is configured, submit via fetch
    try {
      const response = await fetch(SALES_FORM_CONFIG.submissionApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Meeting Request: ${formData.schoolName} (${formData.contactPerson})`,
          'School Name': formData.schoolName,
          'Contact Person': formData.contactPerson,
          'Official Email': formData.email,
          'Phone Number': formData.phone,
          'Meeting Date': formData.meetingDate,
          'Meeting Time': formData.meetingTime,
          'Student Count': formData.studentCount,
          'Additional Requirements': formData.additionalRequirements,
          'Submitted At': new Date().toLocaleString()
        })
      })

      if (response.ok) {
        setSubmissionStatus({
          type: 'success',
          message: `Meeting consultation request submitted successfully! Confirmation sent to ${formData.email}.`
        })
        setFormData({
          schoolName: '',
          contactPerson: '',
          email: '',
          phone: '',
          meetingDate: '',
          meetingTime: '10:00 AM - 11:00 AM',
          studentCount: '500 - 1,000 Students',
          additionalRequirements: ''
        })
      } else {
        throw new Error('Server returned an error status')
      }
    } catch (err) {
      setSubmissionStatus({
        type: 'error',
        message: `Could not send meeting request. Please contact ${SALES_FORM_CONFIG.supportEmail} directly.`
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="book-meeting" className="sales-meeting-section" aria-labelledby="meeting-heading">
      <div className="container">
        {/* Section Header */}
        <div className="sales-section-header">
          <div className="sales-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Personalized Consultation
          </div>
          <h2 id="meeting-heading" className="sales-section-title">
            Let's Discuss Your School's <span className="highlight">Needs</span>
          </h2>
          <p className="sales-section-desc">
            Schedule a personalized consultation to discover how SAMAGRA can support your institution.
          </p>
        </div>

        {/* Card Layout: Left Briefing + Right Form */}
        <div className="meeting-card-container">
          {/* Sidebar */}
          <div className="meeting-sidebar">
            <div>
              <h3 className="meeting-sidebar-title">What to Expect</h3>
              <p className="meeting-sidebar-desc">
                A 30-minute interactive walkthrough designed for school principals, directors, and trustees.
              </p>
              <ul className="meeting-sidebar-perks">
                <li className="meeting-perk-item">
                  <span className="perk-check">✓</span>
                  <span>Tailored assessment of your current school administration workflow</span>
                </li>
                <li className="meeting-perk-item">
                  <span className="perk-check">✓</span>
                  <span>Live demonstration of modules: Fees, Attendance & Examination</span>
                </li>
                <li className="meeting-perk-item">
                  <span className="perk-check">✓</span>
                  <span>Data migration roadmap and staff training breakdown</span>
                </li>
                <li className="meeting-perk-item">
                  <span className="perk-check">✓</span>
                  <span>Transparent institutional licensing & setup timeline</span>
                </li>
              </ul>
            </div>

            <div className="meeting-sidebar-footer">
              🔒 Strict privacy: Your school data & contact information remain confidential.
            </div>
          </div>

          {/* Form Body */}
          <div className="meeting-form-body">
            <form onSubmit={handleSubmit} className="meeting-form" noValidate>
              <div className="form-grid-2">
                {/* School Name */}
                <div className="form-field-group">
                  <label htmlFor="meetingSchoolName" className="form-field-label">
                    School Name <span className="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="meetingSchoolName"
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleChange}
                    placeholder="e.g. St. Xavier's International School"
                    className={`form-input-text ${errors.schoolName ? 'form-input-error' : ''}`}
                    aria-invalid={Boolean(errors.schoolName)}
                  />
                  {errors.schoolName && <span className="field-error-hint">{errors.schoolName}</span>}
                </div>

                {/* Contact Person */}
                <div className="form-field-group">
                  <label htmlFor="meetingContactPerson" className="form-field-label">
                    Contact Person's Name <span className="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="meetingContactPerson"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    placeholder="Principal / Administrator Name"
                    className={`form-input-text ${errors.contactPerson ? 'form-input-error' : ''}`}
                    aria-invalid={Boolean(errors.contactPerson)}
                  />
                  {errors.contactPerson && <span className="field-error-hint">{errors.contactPerson}</span>}
                </div>
              </div>

              <div className="form-grid-2">
                {/* Official Email */}
                <div className="form-field-group">
                  <label htmlFor="meetingEmail" className="form-field-label">
                    Official Email Address <span className="required-star">*</span>
                  </label>
                  <input
                    type="email"
                    id="meetingEmail"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="principal@yourschool.edu"
                    className={`form-input-text ${errors.email ? 'form-input-error' : ''}`}
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email && <span className="field-error-hint">{errors.email}</span>}
                </div>

                {/* Phone Number */}
                <div className="form-field-group">
                  <label htmlFor="meetingPhone" className="form-field-label">
                    Phone Number <span className="required-star">*</span>
                  </label>
                  <input
                    type="tel"
                    id="meetingPhone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={`form-input-text ${errors.phone ? 'form-input-error' : ''}`}
                    aria-invalid={Boolean(errors.phone)}
                  />
                  {errors.phone && <span className="field-error-hint">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-grid-2">
                {/* Preferred Date */}
                <div className="form-field-group">
                  <label htmlFor="meetingDate" className="form-field-label">
                    Preferred Meeting Date <span className="required-star">*</span>
                  </label>
                  <input
                    type="date"
                    id="meetingDate"
                    name="meetingDate"
                    min={todayDateString}
                    value={formData.meetingDate}
                    onChange={handleChange}
                    className={`form-input-text ${errors.meetingDate ? 'form-input-error' : ''}`}
                    aria-invalid={Boolean(errors.meetingDate)}
                  />
                  {errors.meetingDate && <span className="field-error-hint">{errors.meetingDate}</span>}
                </div>

                {/* Preferred Time Slot */}
                <div className="form-field-group">
                  <label htmlFor="meetingTime" className="form-field-label">
                    Preferred Meeting Time <span className="required-star">*</span>
                  </label>
                  <select
                    id="meetingTime"
                    name="meetingTime"
                    value={formData.meetingTime}
                    onChange={handleChange}
                    className="form-input-select"
                  >
                    <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                    <option value="11:30 AM - 12:30 PM">11:30 AM - 12:30 PM</option>
                    <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                    <option value="03:30 PM - 04:30 PM">03:30 PM - 04:30 PM</option>
                    <option value="05:00 PM - 06:00 PM">05:00 PM - 06:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Number of Students */}
              <div className="form-field-group">
                <label htmlFor="meetingStudentCount" className="form-field-label">
                  Number of Students
                </label>
                <select
                  id="meetingStudentCount"
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

              {/* Additional Requirements */}
              <div className="form-field-group">
                <label htmlFor="meetingAdditionalRequirements" className="form-field-label">
                  Additional Requirements / Specific Modules Needed
                </label>
                <textarea
                  id="meetingAdditionalRequirements"
                  name="additionalRequirements"
                  rows="3"
                  value={formData.additionalRequirements}
                  onChange={handleChange}
                  placeholder="Share any specific challenges or modules you want highlighted (e.g., RFID attendance, CBSE marksheets, online fee gateway)..."
                  className="form-input-textarea"
                ></textarea>
              </div>

              {/* Submission Status Display */}
              {submissionStatus && (
                <div
                  className={`feedback-banner ${
                    submissionStatus.type === 'demo'
                      ? 'demo-notice'
                      : submissionStatus.type === 'success'
                      ? 'success'
                      : 'error'
                  }`}
                  role="status"
                >
                  <div className="feedback-banner-title">
                    {submissionStatus.type === 'demo' && '📋 Frontend Demo Mode (No backend connected)'}
                    {submissionStatus.type === 'success' && '✅ Meeting Request Transmitted'}
                    {submissionStatus.type === 'error' && '⚠️ Submission Attention Needed'}
                  </div>
                  <div>{submissionStatus.message}</div>
                  {submissionStatus.details && (
                    <div className="feedback-banner-meta">
                      Proposed Slot: <strong>{submissionStatus.details.date}</strong> at <strong>{submissionStatus.details.time}</strong> for <strong>{submissionStatus.details.school}</strong>.
                      <br />
                      ℹ️ To connect live calendar bookings or email notifications, configure <code>SALES_FORM_CONFIG</code> in <code>src/config/salesConfig.js</code>.
                    </div>
                  )}
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                className="btn-sales-primary"
                id="btn-submit-meeting"
                disabled={isSubmitting}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {isSubmitting ? 'Validating Request...' : 'Request a Meeting'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SalesMeetingSection
