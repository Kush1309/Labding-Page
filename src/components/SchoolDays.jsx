import React, { useState, useRef, useCallback, useEffect } from 'react'
import '../styles/SchoolDays.css'

// ─────────────────────────────────────────────────────────────────────────────
// School Days Gallery Data
// Each item has: id, title, category, description, image, imageAlt, size
// ─────────────────────────────────────────────────────────────────────────────
const activities = [
  {
    id: 1,
    title: 'Classroom Learning',
    category: 'Academics',
    description: 'Dynamic smart-classrooms fostering active questions, curiosity, and deep conceptual clarity.',
    image: '/images/school-days/classroom-learning.jpg',
    imageAlt: 'Vibrant modern classroom with students actively participating and smiling teacher guiding them',
    size: 'large',
  },
  {
    id: 2,
    title: 'Student Activities',
    category: 'STEM & Discovery',
    description: 'Hands-on laboratory experiments and collaborative projects.',
    image: '/images/school-days/student-activities.jpg',
    imageAlt: 'High school students wearing lab coats conducting a colorful science experiment',
    size: 'small',
  },
  {
    id: 3,
    title: 'Teacher Interaction',
    category: 'Mentorship',
    description: 'Dedicated one-on-one attention encouraging every learner to shine.',
    image: '/images/school-days/teacher-interaction.jpg',
    imageAlt: 'Caring teacher encouraging a young student at her desk',
    size: 'small',
  },
  {
    id: 4,
    title: 'School Events',
    category: 'Celebration',
    description: 'Annual cultural showcases, performances, and student triumphs.',
    image: '/images/school-days/school-events.jpg',
    imageAlt: 'School annual day award ceremony with students celebrating on stage with trophy',
    size: 'small',
  },
  {
    id: 5,
    title: 'Sports Activities',
    category: 'Athletics & Spirit',
    description: 'Energizing field games that instill team camaraderie and fitness.',
    image: '/images/school-days/sports-activities.jpg',
    imageAlt: 'Students joyfully playing football on a lush green outdoor field',
    size: 'small',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Mobile Carousel
// ─────────────────────────────────────────────────────────────────────────────
function MobileCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const trackRef = useRef(null)
  const touchStartX = useRef(null)
  const touchStartY = useRef(null)
  const isDragging = useRef(false)

  const goTo = useCallback((index) => {
    const clamped = Math.max(0, Math.min(activities.length - 1, index))
    setActiveIndex(clamped)
  }, [])

  // Scroll the track so the active card is centred
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[activeIndex]
    if (!card) return
    const trackWidth = track.parentElement.offsetWidth
    const cardLeft = card.offsetLeft
    const cardWidth = card.offsetWidth
    const scrollTarget = cardLeft - (trackWidth - cardWidth) / 2
    track.parentElement.scrollTo({ left: scrollTarget, behavior: 'smooth' })
  }, [activeIndex])

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    isDragging.current = false
  }

  const onTouchMove = (e) => {
    if (touchStartX.current === null) return
    const dx = e.touches[0].clientX - touchStartX.current
    const dy = e.touches[0].clientY - touchStartY.current
    if (Math.abs(dx) > Math.abs(dy)) {
      isDragging.current = true
    }
  }

  const onTouchEnd = (e) => {
    if (!isDragging.current || touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 40) {
      goTo(dx < 0 ? activeIndex + 1 : activeIndex - 1)
    }
    touchStartX.current = null
    touchStartY.current = null
    isDragging.current = false
  }

  return (
    <div className="mobile-carousel-wrapper">
      <div
        className="mobile-carousel-viewport"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="mobile-carousel-track" ref={trackRef}>
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className={`mobile-carousel-card${index === activeIndex ? ' active' : ''}`}
              onClick={() => goTo(index)}
              role="button"
              aria-label={`View ${activity.title}`}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && goTo(index)}
            >
              <div className="gallery-image-wrapper">
                <img
                  src={activity.image}
                  alt={activity.imageAlt}
                  className="gallery-img"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  draggable={false}
                />
                <div className="gallery-gradient-scrim" />
                <div className="gallery-content">
                  <span className="gallery-badge">{activity.category}</span>
                  <h3 className="gallery-title">{activity.title}</h3>
                  {index === activeIndex && (
                    <p className="gallery-desc">{activity.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="mobile-carousel-dots" role="tablist" aria-label="Gallery slides">
        {activities.map((activity, index) => (
          <button
            key={activity.id}
            className={`carousel-dot${index === activeIndex ? ' active' : ''}`}
            onClick={() => goTo(index)}
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Go to ${activity.title}`}
          />
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────
function SchoolDays() {
  return (
    <section id="about" className="school-days-section">
      <div className="container">
        <div className="section-header text-center">
          <h2>Our <span className="highlight">School Days</span></h2>
          <p className="section-description">
            Every school day is an opportunity to learn, explore, grow, and achieve lifelong memories.
          </p>
        </div>

        {/* Desktop / Tablet grid */}
        <div className="gallery-grid">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className={`gallery-item ${activity.size}`}
            >
              <div className="gallery-image-wrapper">
                <img
                  src={activity.image}
                  alt={activity.imageAlt}
                  className="gallery-img"
                  loading={activity.size === 'large' ? 'eager' : 'lazy'}
                />
                <div className="gallery-gradient-scrim" />
                <div className="gallery-content">
                  <span className="gallery-badge">{activity.category}</span>
                  <h3 className="gallery-title">{activity.title}</h3>
                  <p className="gallery-desc">{activity.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile carousel (hidden on desktop via CSS) */}
        <MobileCarousel />
      </div>
    </section>
  )
}

export default SchoolDays
