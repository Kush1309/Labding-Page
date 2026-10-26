import React, { useState } from 'react'
import '../styles/OurTeam.css'

// ═══════════════════════════════════════════════════════════════════════════
// PORTFOLIO URL CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════
// Om Srivastava's verified public portfolio URL
const OM_PORTFOLIO_URL = 'https://my-portfolio-green-theta-98.vercel.app/'

// Kushagra Saxena's portfolio URL configuration
const KUSHAGRA_PORTFOLIO_PUBLIC_URL = 'https://kush-portfolio-sooty.vercel.app/'

const DEVELOPERS = [
  {
    id: 'om',
    name: 'Om Srivastava',
    badge: 'SENIOR DEVELOPER',
    image: '/images/team/om.png',
    imageAlt: 'Om Srivastava - Senior Developer',
    animationClass: 'dev-float-diagonal-om',
    intro:
      'Om Srivastava is a Senior Developer with a background in Computer Science and Engineering from Lovely Professional University. He brings professional experience from EduLeverage and freelance web development projects, focusing on building modern, responsive and user-friendly web experiences. He enjoys turning ideas into practical digital solutions through thoughtful design and clean implementation.',
    details: [
      {
        id: 'edu',
        label: 'EDUCATION',
        title: 'B.Tech',
        subtitle: 'Lovely Professional University',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        ),
      },
      {
        id: 'exp',
        label: 'EXPERIENCE',
        title: '6 Months',
        subtitle: 'EduLeverage Experience',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        ),
      },
      {
        id: 'spec',
        label: 'SPECIALIZATION',
        title: 'Freelance',
        subtitle: 'Web Development',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        ),
      },
    ],
    portfolioUrl: OM_PORTFOLIO_URL,
    isPublicUrl: true,
  },
  {
    id: 'kushagra',
    name: 'Kushagra Saxena',
    badge: 'SENIOR DEVELOPER',
    image: '/images/team/kushagra.jpg?v=2',
    imageAlt: 'Kushagra Saxena - Senior Developer',
    animationClass: 'dev-float-diagonal-kushagra',
    intro:
      'Kushagra Saxena is a Senior Developer with a background in Computer Science and Engineering at Lovely Professional University. He has professional experience at EduLeverage and has also worked on freelance web development projects. He enjoys building modern websites, developing practical digital products and creating responsive user experiences that combine functionality with attractive design.',
    details: [
      {
        id: 'edu',
        label: 'EDUCATION',
        title: 'B.Tech',
        subtitle: 'Lovely Professional University',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        ),
      },
      {
        id: 'exp',
        label: 'EXPERIENCE',
        title: '6 Months',
        subtitle: 'EduLeverage Experience',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        ),
      },
      {
        id: 'spec',
        label: 'SPECIALIZATION',
        title: 'Freelance',
        subtitle: 'Web Development',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        ),
      },
    ],
    portfolioUrl: KUSHAGRA_PORTFOLIO_PUBLIC_URL,
    isPublicUrl: Boolean(KUSHAGRA_PORTFOLIO_PUBLIC_URL),
  },
]

function OurTeam() {
  const [toastMessage, setToastMessage] = useState('')

  const handlePortfolioClick = (e, dev) => {
    if (!dev.isPublicUrl) {
      e.preventDefault()
      setToastMessage(
        `${dev.name}'s public portfolio is being updated with the latest projects. Please check back shortly!`
      )
      setTimeout(() => {
        setToastMessage('')
      }, 4500)
    }
  }

  return (
    <section id="team" className="team-section" aria-labelledby="team-heading">
      <div className="container dev-main-container">

        {/* ── Section Header ───────────────────────────────────────────── */}
        <div className="team-header text-center">
          <span className="dev-section-label">OUR TEAM</span>
          <h2 id="team-heading" className="team-title">
            Meet Our <span className="highlight">Developers</span>
          </h2>
          <p className="team-subtitle">
            Meet the people behind our technology, combining technical expertise, creative thinking and a passion for building meaningful digital experiences.
          </p>
        </div>

        {/* ── Two Developer Horizontal Rows ─────────────────────────────── */}
        <div className="dev-profiles-container">
          {DEVELOPERS.map((dev, index) => (
            <React.Fragment key={dev.id}>
              {index > 0 && <div className="dev-row-divider" aria-hidden="true" />}

              <article className="dev-profile-row" id={`dev-${dev.id}`}>

                {/* LEFT SIDE: Portrait with Pink Circle & Diagonal Float (35-40%) */}
                <div className="dev-visual-col">
                  <div className={`dev-avatar-stage ${dev.animationClass}`}>
                    {/* Pale-pink backdrop circle */}
                    <div className="dev-pink-backdrop-circle" aria-hidden="true" />
                    
                    {/* Thin red circular accent outline */}
                    <div className="dev-red-accent-circle" aria-hidden="true" />

                    {/* Subtle decorative dot pattern */}
                    <div className="dev-decorative-dots" aria-hidden="true">
                      <span></span><span></span><span></span>
                      <span></span><span></span><span></span>
                      <span></span><span></span><span></span>
                    </div>

                    {/* Modern framed portrait */}
                    <div className="dev-portrait-card">
                      <img
                        src={dev.image}
                        alt={dev.imageAlt}
                        className="dev-portrait-img"
                        loading="eager"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE: Introduction & Info Cards (60-65%) */}
                <div className="dev-details-col">
                  {/* Designation Badge */}
                  <div className="dev-badge-wrap">
                    <span className="dev-designation-badge">{dev.badge}</span>
                  </div>

                  {/* Name */}
                  <h3 className="dev-person-name">{dev.name}</h3>

                  {/* Introduction */}
                  <p className="dev-person-intro">{dev.intro}</p>

                  {/* Three Compact Detail Cards in a Row on Desktop */}
                  <div className="dev-info-cards-row">
                    {dev.details.map((item) => (
                      <div key={item.id} className="dev-compact-card">
                        <div className="dev-card-top">
                          <div className="dev-card-icon-box" aria-hidden="true">
                            {item.icon}
                          </div>
                          <span className="dev-card-tag">{item.label}</span>
                        </div>
                        <h4 className="dev-card-heading">{item.title}</h4>
                        <p className="dev-card-subtext">{item.subtitle}</p>
                      </div>
                    ))}
                  </div>

                  {/* Portfolio Button */}
                  <div className="dev-action-row">
                    <a
                      href={dev.isPublicUrl ? dev.portfolioUrl : '#'}
                      onClick={(e) => handlePortfolioClick(e, dev)}
                      target={dev.isPublicUrl ? '_blank' : '_self'}
                      rel={dev.isPublicUrl ? 'noopener noreferrer' : undefined}
                      className="dev-view-portfolio-btn"
                      aria-label={`View ${dev.name}'s portfolio`}
                    >
                      <span>View Portfolio</span>
                      <svg
                        className="dev-btn-link-icon"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>

                </div>

              </article>
            </React.Fragment>
          ))}
        </div>

        {/* ── Toast notification for protected / updating URLs ──────────── */}
        {toastMessage && (
          <div className="dev-toast-alert" role="status" aria-live="polite">
            <div className="dev-toast-body">
              <span className="dev-toast-badge-icon">ℹ️</span>
              <p className="dev-toast-msg">{toastMessage}</p>
              <button
                type="button"
                className="dev-toast-dismiss"
                onClick={() => setToastMessage('')}
                aria-label="Close notification"
              >
                ✕
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}

export default OurTeam
