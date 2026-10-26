import React, { useEffect, useRef } from 'react'
import '../styles/HeroSection.css'

function HeroSection() {
  const videoRef = useRef(null)

  useEffect(() => {
    // Handle autoplay gracefully with promise
    if (videoRef.current) {
      const playPromise = videoRef.current.play()
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Autoplay started successfully
          })
          .catch((error) => {
            // Autoplay was prevented by browser
            console.log('Video autoplay prevented:', error)
          })
      }
    }
  }, [])

  return (
    <section id="home" className="hero-section">
      {/* Background Video */}
      <video 
        ref={videoRef}
        className="hero-background-video"
        autoPlay
        loop
        muted
        playsInline
        poster=""
      >
        <source src="/school-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="hero-overlay"></div>

      {/* Content Over Video */}
      <div className="hero-content-wrapper">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="highlight">Smarter</span> Schools, 
              <span className="highlight"> Simpler</span> Management, 
              <span className="highlight"> Brighter</span> Futures.
            </h1>
            <p className="hero-description">
              Transform everyday school operations with an intelligent School ERP system that 
              connects school administrators, teachers, students and parents through one seamless 
              digital platform.
            </p>
            <div className="hero-buttons">
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="btn-primary btn-hero"
              >
                Contact Us
              </button>
              <button 
                onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="btn-secondary btn-hero"
              >
                Explore Features
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
