import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/RegistrationCTA.css'

function RegistrationCTA() {
  return (
    <section className="registration-cta-section">
      <div className="container">
        <div className="cta-content">
          <h2>Ready to Transform Your <span className="highlight">School?</span></h2>
          <p className="cta-description">
            Take the next step towards smarter school administration and better-connected learning.
          </p>
          <Link to="/register" className="btn-primary btn-large">
            Register Now
          </Link>
        </div>
      </div>
    </section>
  )
}

export default RegistrationCTA
