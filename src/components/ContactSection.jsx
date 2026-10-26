import React, { useState } from 'react'
import '../styles/ContactSection.css'

function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    schoolName: '',
    email: '',
    phone: '',
    interestedIn: 'sales',
    message: ''
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
          _subject: `New School ERP Inquiry from ${formData.fullName} (${formData.schoolName})`,
          _template: 'table',
          _captcha: 'false',
          'Full Name': formData.fullName,
          'School Name': formData.schoolName,
          'Email Address': formData.email,
          'Phone Number': formData.phone,
          'Interested In': formData.interestedIn,
          'Message': formData.message,
          'Submission Date': new Date().toLocaleString()
        })
      })

      const data = await response.json()

      if (response.ok) {
        setFormStatus({
          type: 'success',
          message: 'Thank you! Your request has been submitted successfully and sent to kushagrasaxena0913@gmail.com. We will contact you shortly.'
        })
        setFormData({
          fullName: '',
          schoolName: '',
          email: '',
          phone: '',
          interestedIn: 'sales',
          message: ''
        })
      } else {
        throw new Error(data.message || 'Submission failed')
      }
    } catch (err) {
      setFormStatus({
        type: 'error',
        message: 'Could not send inquiry. Please try again or reach out directly at kushagrasaxena0913@gmail.com'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-content">
          <div className="contact-info">
            <h2>Let's Make Your School <span className="highlight">Smarter</span></h2>
            <p className="contact-description">
              Discover how School ERP can simplify administration, improve communication 
              and create a better school experience.
            </p>
            
            <div className="contact-features">
              <div className="contact-feature">
                <div className="feature-icon">✓</div>
                <div>
                  <h4>Quick Response</h4>
                  <p>Get in touch within 24 hours</p>
                </div>
              </div>
              <div className="contact-feature">
                <div className="feature-icon">✓</div>
                <div>
                  <h4>Free Consultation</h4>
                  <p>Expert guidance for your needs</p>
                </div>
              </div>
              <div className="contact-feature">
                <div className="feature-icon">✓</div>
                <div>
                  <h4>Custom Solutions</h4>
                  <p>Tailored to your school size</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="schoolName">School Name *</label>
                <input
                  type="text"
                  id="schoolName"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your school name"
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
                    placeholder="you@school.com"
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
                <label htmlFor="interestedIn">Interested In *</label>
                <select
                  id="interestedIn"
                  name="interestedIn"
                  value={formData.interestedIn}
                  onChange={handleChange}
                  required
                >
                  <option value="sales">Sales</option>
                  <option value="services">Services</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell us about your requirements..."
                ></textarea>
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
                {isSubmitting ? 'Submitting...' : 'Request a Demo'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
