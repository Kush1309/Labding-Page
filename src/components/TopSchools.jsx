import React, { useRef } from 'react'
import '../styles/TopSchools.css'

// ─────────────────────────────────────────────────────────────────────────────
// School data — add, remove or replace schools here.
// Each object: { id, name, city, country, image, imageAlt }
// ─────────────────────────────────────────────────────────────────────────────
const schools = [
  {
    id: 1,
    name: 'Delhi Public School',
    city: 'New Delhi',
    country: 'India',
    image: '/images/schools/school-1.jpg',
    imageAlt: 'Delhi Public School campus with red brick buildings and lush green lawns',
  },
  {
    id: 2,
    name: "St. Xavier's High School",
    city: 'Mumbai',
    country: 'India',
    image: '/images/schools/school-2.jpg',
    imageAlt: "St. Xavier's High School Mumbai — colonial gothic courtyard",
  },
  {
    id: 3,
    name: 'The Doon School',
    city: 'Dehradun',
    country: 'India',
    image: '/images/schools/school-3.jpg',
    imageAlt: 'The Doon School Dehradun — heritage campus with Himalayan backdrop',
  },
  {
    id: 4,
    name: 'Bishop Cotton School',
    city: 'Bengaluru',
    country: 'India',
    image: '/images/schools/school-4.jpg',
    imageAlt: 'Bishop Cotton School Bangalore — Victorian red-brick building with clock tower',
  },
  {
    id: 5,
    name: 'Modern School',
    city: 'New Delhi',
    country: 'India',
    image: '/images/schools/school-5.jpg',
    imageAlt: 'Modern School Vasant Vihar New Delhi — white modern architecture',
  },
  {
    id: 6,
    name: 'La Martiniere College',
    city: 'Kolkata',
    country: 'India',
    image: '/images/schools/school-6.jpg',
    imageAlt: 'La Martiniere College Kolkata — baroque colonial mansion at golden hour',
  },
  {
    id: 7,
    name: 'Cathedral & John Connon',
    city: 'Mumbai',
    country: 'India',
    image: '/images/schools/school-7.jpg',
    imageAlt: 'Cathedral and John Connon School Mumbai — white gothic building',
  },
  {
    id: 8,
    name: 'Mayo College',
    city: 'Ajmer',
    country: 'India',
    image: '/images/schools/school-8.jpg',
    imageAlt: 'Mayo College Ajmer — white Indo-Saracenic marble architecture',
  },
]

// Duplicate the array to create a seamless infinite loop.
// Two copies are enough: the animation scrolls exactly one full copy-width,
// then instantly resets — creating a gapless loop.
const loopedSchools = [...schools, ...schools]

// ─────────────────────────────────────────────────────────────────────────────
// SchoolCard — individual card component
// ─────────────────────────────────────────────────────────────────────────────
function SchoolCard({ school, index }) {
  const [imgError, setImgError] = React.useState(false)

  return (
    <div
      className="school-card"
      key={`${school.id}-${index}`}
      aria-label={`${school.name}, ${school.city}, ${school.country}`}
    >
      {/* ── Image area ─────────────────────────────────── */}
      <div className="school-image-wrapper">
        {/* Fallback gradient shown while loading or on error */}
        <div className="school-image-placeholder" aria-hidden="true">
          <div className="placeholder-gradient">
            <span className="placeholder-initial">{school.name.charAt(0)}</span>
          </div>
        </div>

        {/* Real campus photo */}
        {!imgError && (
          <img
            src={school.image}
            alt={school.imageAlt}
            className="school-image"
            loading="lazy"
            width="320"
            height="200"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* ── Info area ──────────────────────────────────── */}
      <div className="school-info">
        <h3 className="school-name">{school.name}</h3>
        <p className="school-location">
          <span className="location-icon" aria-hidden="true">📍</span>
          {school.city}
          {school.country && `, ${school.country}`}
        </p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TopSchools — main section component
// ─────────────────────────────────────────────────────────────────────────────
function TopSchools() {
  const trackRef = useRef(null)

  // Pause animation on hover (desktop); touch users keep auto-scroll
  const handleMouseEnter = () => {
    if (trackRef.current) {
      trackRef.current.style.animationPlayState = 'paused'
    }
  }
  const handleMouseLeave = () => {
    if (trackRef.current) {
      trackRef.current.style.animationPlayState = 'running'
    }
  }

  return (
    <section id="schools" className="top-schools-section" aria-labelledby="schools-heading">
      <div className="ts-container">

        {/* ── Decorative label ───────────────────────── */}
        <div className="partner-label" aria-hidden="true">
          <span className="partner-line" />
          <span className="partner-text">OUR PARTNER SCHOOLS</span>
          <span className="partner-line" />
        </div>

        {/* ── Section heading ────────────────────────── */}
        <div className="section-header text-center">
          <h2 id="schools-heading">
            <span className="title-black">Top</span>{' '}
            <span className="title-red">Schools</span>
          </h2>
          <p className="section-description">
            Discover schools building brighter futures with smarter digital management.
          </p>
        </div>

        {/* ── Carousel ───────────────────────────────── */}
        <div
          className="carousel-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label="Continuously scrolling school showcase"
          role="region"
        >
          {/* Left / right fade masks */}
          <div className="carousel-fade carousel-fade--left" aria-hidden="true" />
          <div className="carousel-fade carousel-fade--right" aria-hidden="true" />

          {/* The moving track */}
          <div className="carousel-track" ref={trackRef} aria-hidden="true">
            {loopedSchools.map((school, index) => (
              <SchoolCard
                key={`${school.id}-${index}`}
                school={school}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* ── Demo disclaimer ────────────────────────── */}
        <p className="carousel-note">
          * Sample schools shown for demonstration purposes. Replace with verified school partnerships.
        </p>

      </div>
    </section>
  )
}

export default TopSchools
