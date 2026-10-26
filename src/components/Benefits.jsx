import React, { useState, useEffect, useRef, useCallback } from 'react'
import '../styles/Benefits.css'

// ─────────────────────────────────────────────────────────────────────────────
// Benefits data — each card has a number, title, short description, and image.
// Replace image paths with real assets when available.
// ─────────────────────────────────────────────────────────────────────────────
const BENEFITS = [
  {
    id: 1,
    num: '01',
    title: 'Smarter School Management',
    description:
      'Centralise admissions, staff records, timetables and daily operations on one intuitive digital platform.',
    image: '/images/benefits/benefit-1.jpg',
    imageAlt: 'School administrator managing digital dashboard on laptop',
    objectPosition: 'center center',
  },
  {
    id: 2,
    num: '02',
    title: 'Time-Saving Automation',
    description:
      'Automate attendance, report generation and routine tasks so educators can focus on teaching.',
    image: '/images/benefits/benefit-2.jpg',
    imageAlt: 'Teacher marking digital attendance on tablet in classroom',
    objectPosition: 'center top',
  },
  {
    id: 3,
    num: '03',
    title: 'Data-Driven Decisions',
    description:
      'Access real-time performance charts, attendance statistics and academic insights at a glance.',
    image: '/images/benefits/benefit-3.jpg',
    imageAlt: 'School principal analyzing academic performance charts on monitor',
    objectPosition: 'center center',
  },
  {
    id: 4,
    num: '04',
    title: 'Student Performance Tracking',
    description:
      'Monitor individual progress, flag at-risk students early, and share instant report cards with parents.',
    image: '/images/benefits/benefit-4.jpg',
    imageAlt: 'Teacher reviewing student report card and grades on laptop',
    objectPosition: 'center center',
  },
  {
    id: 5,
    num: '05',
    title: 'Better Communication',
    description:
      'Keep parents, teachers and administrators connected through instant notifications and shared updates.',
    image: '/images/benefits/benefit-5.jpg',
    imageAlt: 'Teacher and parent discussing student progress in school corridor',
    objectPosition: 'center center',
  },
  {
    id: 6,
    num: '06',
    title: 'Optimised Fee Management',
    description:
      'Track payments, send reminders and manage fee records digitally — reducing errors and saving time.',
    image: '/images/benefits/benefit-6.jpg',
    imageAlt: 'Administrator managing fee records on digital dashboard',
    objectPosition: 'right center',
  },
  {
    id: 7,
    num: '07',
    title: 'Easy Attendance Management',
    description:
      'Mark, track and export attendance records effortlessly — for classes, exams and school events.',
    image: '/images/benefits/benefit-7.jpg',
    imageAlt: 'Teacher taking digital attendance in a modern classroom',
    objectPosition: 'left top',
  },
  {
    id: 8,
    num: '08',
    title: 'Anytime, Anywhere Access',
    description:
      'Parents and teachers stay informed on the go with a mobile-friendly app available 24 × 7.',
    image: '/images/benefits/benefit-8.jpg',
    imageAlt: 'Parent checking child school app on smartphone at home',
    objectPosition: 'left center',
  },
]

const AUTOPLAY_DELAY = 3500   // ms between auto-advances

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
function Benefits() {
  const [active, setActive]       = useState(0)   // index of expanded card
  const [isHovered, setIsHovered] = useState(false)
  const timerRef                  = useRef(null)
  const totalCards                = BENEFITS.length

  // ── Autoplay ────────────────────────────────────────────────────────────
  const advance = useCallback(() => {
    setActive(prev => (prev + 1) % totalCards)
  }, [totalCards])

  useEffect(() => {
    if (isHovered) return   // pause while user is hovering any card

    // Respect reduced-motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    timerRef.current = setInterval(advance, AUTOPLAY_DELAY)
    return () => clearInterval(timerRef.current)
  }, [isHovered, advance])

  // ── Activate a card (hover OR dot click) ────────────────────────────────
  const handleCardActivate = (index) => {
    if (index === active) return
    setActive(index)
  }

  return (
    <section id="benefits" className="benefits-section" aria-labelledby="benefits-heading">

      {/* ── Heading ──────────────────────────────────────────────────────── */}
      <div className="benefits-header">
        <span className="benefits-label" aria-hidden="true">BENEFITS OF SCHOOL ERP</span>
        <h2 id="benefits-heading" className="benefits-title">
          Smarter Schools.{' '}
          <span className="benefits-title-accent">Simpler Management.</span>
        </h2>
        <p className="benefits-subtitle">
          Discover how our School ERP simplifies daily operations, empowers teachers,
          engages parents, and helps schools grow.
        </p>
        <div className="benefits-underline" aria-hidden="true" />
      </div>

      {/* ── Accordion carousel ───────────────────────────────────────────── */}
      <div
        className="benefits-carousel"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="region"
        aria-label="Benefits carousel — hover a card to expand"
      >
        {BENEFITS.map((benefit, index) => {
          const isActive = index === active
          return (
            <button
              key={benefit.id}
              id={`benefit-card-${benefit.id}`}
              className={`ben-card ${isActive ? 'ben-card--active' : 'ben-card--inactive'}`}
              /* Hover activates the card on desktop */
              onMouseEnter={() => handleCardActivate(index)}
              /* Click works as fallback (keyboard / touch) */
              onClick={() => handleCardActivate(index)}
              aria-expanded={isActive}
              aria-label={`${benefit.num} — ${benefit.title}`}
            >
              {/* Campus photo */}
              <img
                src={benefit.image}
                alt={benefit.imageAlt}
                className="ben-card__img"
                style={{ objectPosition: benefit.objectPosition }}
                loading="lazy"
                draggable="false"
              />

              {/* Gradient overlay — only on the image itself for readability */}
              <div className="ben-card__overlay" aria-hidden="true" />

              {/* Narrow vertical number shown on inactive cards */}
              {!isActive && (
                <div className="ben-card__narrow-label" aria-hidden="true">
                  <span className="ben-card__narrow-num">{benefit.num}</span>
                </div>
              )}

              {/* Expanded content — fades in when active */}
              <div className={`ben-card__content ${isActive ? 'ben-card__content--show' : ''}`}>
                <span className="ben-card__num">{benefit.num}</span>
                <h3 className="ben-card__title">{benefit.title}</h3>
                <p className="ben-card__desc">{benefit.description}</p>
              </div>
            </button>
          )
        })}
      </div>

      {/* ── Dot progress indicators ──────────────────────────────────────── */}
      <div className="benefits-dots" role="tablist" aria-label="Benefit indicators">
        {BENEFITS.map((benefit, index) => (
          <button
            key={benefit.id}
            role="tab"
            aria-selected={index === active}
            aria-label={`Go to: ${benefit.title}`}
            className={`benefits-dot ${index === active ? 'benefits-dot--active' : ''}`}
            onClick={() => handleCardActivate(index)}
          />
        ))}
      </div>

    </section>
  )
}

export default Benefits
