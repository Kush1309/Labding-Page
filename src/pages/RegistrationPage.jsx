import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BrandLogo from '../components/common/BrandLogo'
import BRAND_CONFIG from '../config/brandConfig'
import '../styles/RegistrationPage.css'

function RegistrationPage() {
  useEffect(() => {
    document.title = BRAND_CONFIG.seo.registerTitle
    window.scrollTo(0, 0)
  }, [])

  const [formData, setFormData] = useState({
    schoolName: '',
    principalName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    boardAffiliation: '',
    studentCount: '',
    plan: 'basic'
  })

  const [formStatus, setFormStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({ type: '', message: '' })

    try {
      const response = await fetch('https://formsubmit.co/ajax/kushagrasaxena0913@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New School Registration: ${formData.schoolName}`,
          _template: 'table',
          _captcha: 'false',
          'School Name': formData.schoolName,
          'Principal / Administrator': formData.principalName,
          'Email Address': formData.email,
          'Phone Number': formData.phone,
          'School Address': formData.address,
          'City': formData.city,
          'State': formData.state,
          'Pincode': formData.pincode,
          'Board Affiliation': formData.boardAffiliation,
          'Student Count': formData.studentCount,
          'Selected Plan': formData.plan,
          'Submission Date': new Date().toLocaleString()
        })
      })

      const data = await response.json()

      if (response.ok) {
        setFormStatus({
          type: 'success',
          message: 'Registration request submitted successfully! Details have been emailed to our team (kushagrasaxena0913@gmail.com).'
        })
        setFormData({
          schoolName: '',
          principalName: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          state: '',
          pincode: '',
          boardAffiliation: '',
          studentCount: '',
          plan: 'basic'
        })
      } else {
        throw new Error(data.message || 'Submission failed')
      }
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Could not submit registration. Please check your network or email directly to kushagrasaxena0913@gmail.com'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="registration-page">
      <div className="registration-header">
        <Link to="/" className="back-link">← Back to Home</Link>
        <div className="brand">
          <BrandLogo variant="full" size="md" theme="dark" asLink={false} />
        </div>
      </div>

      <div className="registration-container">
        <div className="registration-content">
          <div className="registration-info">
            <h1>Register Your <span className="highlight">School</span></h1>
            <p className="mb-3">Join hundreds of schools transforming their management with SAMAGRA.</p>
            
            <div className="info-features">
              <div className="info-feature">
                <div className="info-icon">✓</div>
                <div>
                  <h4>Easy Setup</h4>
                  <p>Get started in minutes with guided onboarding</p>
                </div>
              </div>
              <div className="info-feature">
                <div className="info-icon">✓</div>
                <div>
                  <h4>Dedicated Support</h4>
                  <p>24/7 assistance from our expert team</p>
                </div>
              </div>
              <div className="info-feature">
                <div className="info-icon">✓</div>
                <div>
                  <h4>Secure Platform</h4>
                  <p>Bank-grade security for your data</p>
                </div>
              </div>
            </div>
          </div>

          <div className="registration-form-wrapper">
            <form onSubmit={handleSubmit} className="registration-form">
              <h2 className="mb-3">School Registration</h2>

              <div className="form-group">
                <label htmlFor="schoolName">School Name *</label>
                <input
                  type="text"
                  id="schoolName"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                  required
                  placeholder="Enter school name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="principalName">Principal/Administrator Name *</label>
                <input
                  type="text"
                  id="principalName"
                  name="principalName"
                  value={formData.principalName}
                  onChange={handleChange}
                  required
                  placeholder="Enter full name"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="school@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 1234567890"
                    pattern="[+]?[0-9]{10,15}"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">School Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Street address"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="City"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    placeholder="State"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="pincode">Pincode *</label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    placeholder="123456"
                    pattern="[0-9]{6}"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="boardAffiliation">Board Affiliation *</label>
                  <select
                    id="boardAffiliation"
                    name="boardAffiliation"
                    value={formData.boardAffiliation}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select board</option>
                    <option value="CBSE">CBSE</option>
                    <option value="ICSE">ICSE</option>
                    <option value="State Board">State Board</option>
                    <option value="IB">International Baccalaureate (IB)</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="studentCount">Number of Students *</label>
                  <select
                    id="studentCount"
                    name="studentCount"
                    value={formData.studentCount}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select range</option>
                    <option value="0-100">0-100</option>
                    <option value="100-500">100-500</option>
                    <option value="500-1000">500-1000</option>
                    <option value="1000+">1000+</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="plan">Select Plan *</label>
                <select
                  id="plan"
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  required
                >
                  <option value="basic">Basic Plan - Essential features</option>
                  <option value="professional">Professional Plan - Advanced features</option>
                  <option value="enterprise">Enterprise Plan - Full suite</option>
                </select>
              </div>

              {formStatus.message && (
                <div className={`form-message ${formStatus.type}`}>
                  {formStatus.message}
                </div>
              )}

              <button 
                type="submit" 
                className="btn-primary btn-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Complete Registration'}
              </button>

              <p className="form-note">
                By registering, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistrationPage
