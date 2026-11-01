import React, { useState, useEffect, useRef, useCallback } from 'react'
import '../styles/Benefits.css'

// ─────────────────────────────────────────────────────────────────────────────
// Benefits data
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

const AUTOPLAY_DELAY = 3500

// ─────────────────────────────────────────────────────────────────────────────
// Custom hook — true when viewport < breakpoint
// ─────────────────────────────────────────────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < breakpoint
  )
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    setIsMobile(mq.matches)
    return () => mq.removeEventListener('change', handler)
  }, [breakpoint])
  return isMobile
}

// ─────────────────────────────────────────────────────────────────────────────
// Desktop accordion carousel (unchanged from original behaviour)
// ─────────────────────────────────────────────────────────────────────────────
function DesktopAccordion({ active, setActive }) {
  const [isHovered, setIsHovered] = useState(false)
  const timerRef = useRef(null)

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % BENEFITS.length)
  }, [setActive])

  useEffect(() => {
    if (isHovered) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    timerRef.current = setInterval(advance, AUTOPLAY_DELAY)
    return () => clearInterval(timerRef.current)
  }, [isHovered, advance])

  return (
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
            onMouseEnter={() => index !== active && setActive(index)}
            onClick={() => index !== active && setActive(index)}
            aria-expanded={isActive}
            aria-label={`${benefit.num} — ${benefit.title}`}
          >
            <img
              src={benefit.image}
              alt={benefit.imageAlt}
              className="ben-card__img"
              style={{ objectPosition: benefit.objectPosition }}
              loading="lazy"
              draggable="false"
            />
            <div className="ben-card__overlay" aria-hidden="true" />
            {!isActive && (
              <div className="ben-card__narrow-label" aria-hidden="true">
                <span className="ben-card__narrow-num">{benefit.num}</span>
              </div>
            )}
            <div className={`ben-card__content ${isActive ? 'ben-card__content--show' : ''}`}>
              <span className="ben-card__num">{benefit.num}</span>
              <h3 className="ben-card__title">{benefit.title}</h3>
              <p className="ben-card__desc">{benefit.description}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Mobile swipeable carousel
// ─────────────────────────────────────────────────────────────────────────────
function MobileCarousel({ active, setActive }) {
  const timerRef      = useRef(null)
  const viewportRef   = useRef(null)
  const touchStartX   = useRef(null)
  const touchStartY   = useRef(null)
  const isDragging    = useRef(false)
  const userInteracted = useRef(false)

  const goTo = useCallback(
    (index) => {
      const clamped = Math.max(0, Math.min(BENEFITS.length - 1, index))
      setActive(clamped)
    },
    [setActive]
  )

  // Autoplay — paused after user interacts
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    timerRef.current = setInterval(() => {
      if (!userInteracted.current) {
        setActive((prev) => (prev + 1) % BENEFITS.length)
      }
    }, AUTOPLAY_DELAY)
    return () => clearInterval(timerRef.current)
  }, [setActive])

  // Scroll active card into centre of viewport
  useEffect(() => {
    const vp = viewportRef.current
    if (!vp) return
    const card = vp.children[active]
    if (!card) return
    const vpW    = vp.offsetWidth
    const left   = card.offsetLeft
    const width  = card.offsetWidth
    vp.scrollTo({ left: left - (vpW - width) / 2, behavior: 'smooth' })
  }, [active])

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    isDragging.current  = false
  }
  const onTouchMove = (e) => {
    if (touchStartX.current === null) return
    const dx = e.touches[0].clientX - touchStartX.current
    const dy = e.touches[0].clientY - touchStartY.current
    if (Math.abs(dx) > Math.abs(dy)) isDragging.current = true
  }
  const onTouchEnd = (e) => {
    if (!isDragging.current || touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 40) {
      userInteracted.current = true
      goTo(dx < 0 ? active + 1 : active - 1)
    }
    touchStartX.current = null
    isDragging.current  = false
  }

  return (
    <div className="ben-mobile-wrapper">
      {/* Scrollable viewport */}
      <div
        className="ben-mobile-viewport"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Track — NOT a ref so scrollTo targets the viewport */}
        <div className="ben-mobile-track" ref={viewportRef}>
          {BENEFITS.map((benefit, index) => {
            const isActive = index === active
            return (
              <div
                key={benefit.id}
                className={`ben-mobile-card${isActive ? ' ben-mobile-card--active' : ''}`}
                onClick={() => {
                  userInteracted.current = true
                  goTo(index)
                }}
                role="button"
                tabIndex={0}
                aria-label={`${benefit.num} — ${benefit.title}`}
                onKeyDown={(e) => e.key === 'Enter' && goTo(index)}
              >
                {/* Full-bleed image */}
                <img
                  src={benefit.image}
                  alt={benefit.imageAlt}
                  className="ben-mobile-img"
                  style={{ objectPosition: benefit.objectPosition }}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  draggable={false}
                />
                {/* Gradient scrim */}
                <div className="ben-mobile-overlay" />
                {/* Content */}
                <div className={`ben-mobile-content${isActive ? ' ben-mobile-content--show' : ''}`}>
                  <span className="ben-mobile-num">{benefit.num}</span>
                  <h3 className="ben-mobile-title">{benefit.title}</h3>
                  <p className="ben-mobile-desc">{benefit.description}</p>
                </div>
                {/* Number badge on inactive */}
                {!isActive && (
                  <div className="ben-mobile-narrow" aria-hidden="true">
                    <span className="ben-mobile-narrow-num">{benefit.num}</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="ben-mobile-dots" role="tablist" aria-label="Benefit indicators">
        {BENEFITS.map((benefit, index) => (
          <button
            key={benefit.id}
            role="tab"
            aria-selected={index === active}
            aria-label={`Go to: ${benefit.title}`}
            className={`ben-mobile-dot${index === active ? ' ben-mobile-dot--active' : ''}`}
            onClick={() => {
              userInteracted.current = true
              goTo(index)
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
function Benefits() {
  const [active, setActive] = useState(0)
  const isMobile = useIsMobile(768)

  return (
    <section id="benefits" className="benefits-section" aria-labelledby="benefits-heading">

      {/* Heading */}
      <div className="benefits-header">
        <span className="benefits-label" aria-hidden="true">WHY CHOOSE SAMAGRA</span>
        <h2 id="benefits-heading" className="benefits-title">
          Smarter Schools.{' '}
          <span className="benefits-title-accent">Simpler Management.</span>
        </h2>
        <p className="benefits-subtitle">
          Discover how SAMAGRA simplifies daily operations, empowers teachers,
          engages parents, and helps schools grow.
        </p>
        <div className="benefits-underline" aria-hidden="true" />
      </div>

      {/* Render ONE layout based on screen width */}
      {isMobile
        ? <MobileCarousel active={active} setActive={setActive} />
        : <DesktopAccordion active={active} setActive={setActive} />
      }

      {/* Dots — shared, always visible */}
      {!isMobile && (
        <div className="benefits-dots" role="tablist" aria-label="Benefit indicators">
          {BENEFITS.map((benefit, index) => (
            <button
              key={benefit.id}
              role="tab"
              aria-selected={index === active}
              aria-label={`Go to: ${benefit.title}`}
              className={`benefits-dot ${index === active ? 'benefits-dot--active' : ''}`}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      )}

    </section>
  )
}

export default Benefits
