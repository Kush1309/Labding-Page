import React from 'react'
import { SALES_VIDEO_CONFIG } from '../../config/salesConfig'

function SalesDemoSection({ onScrollToSection }) {
  // Helper to extract YouTube video ID if provided
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null
    try {
      // Matches youtu.be/<id> or youtube.com/watch?v=<id> or youtube.com/embed/<id>
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
      const match = url.match(regExp)
      if (match && match[2].length === 11) {
        return `https://www.youtube-nocookie.com/embed/${match[2]}?rel=0&autoplay=0`
      }
    } catch (e) {
      return null
    }
    return null
  }

  const rawUrl = SALES_VIDEO_CONFIG?.videoUrl?.trim() || ''
  const isYouTube = rawUrl.includes('youtube.com') || rawUrl.includes('youtu.be')
  const youtubeEmbedUrl = isYouTube ? getYouTubeEmbedUrl(rawUrl) : null
  const hasValidVideo = Boolean(rawUrl && (youtubeEmbedUrl || !isYouTube))

  return (
    <section id="erp-demo" className="sales-demo-section" aria-labelledby="demo-heading">
      <div className="container">
        {/* Section Header */}
        <div className="sales-section-header">
          <div className="sales-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Interactive Product Tour
          </div>
          <h2 id="demo-heading" className="sales-section-title">
            See SAMAGRA in <span className="highlight">Action</span>
          </h2>
          <p className="sales-section-desc">
            Explore how our platform simplifies school administration, academic management, fee tracking, attendance, and parent communication.
          </p>
        </div>

        {/* Video Player Display Container */}
        <div className="video-player-wrapper">
          <div className="video-aspect-16-9">
            {hasValidVideo ? (
              isYouTube && youtubeEmbedUrl ? (
                <iframe
                  src={youtubeEmbedUrl}
                  title="SAMAGRA School ERP System Demo"
                  className="video-frame"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video
                  className="video-native-element"
                  controls
                  playsInline
                  preload="metadata"
                  poster={SALES_VIDEO_CONFIG.videoPoster || undefined}
                >
                  <source src={rawUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )
            ) : (
              /* Polished Placeholder when no video source configured yet */
              <div className="video-placeholder-container">
                <div className="placeholder-play-ring">
                  <div className="placeholder-play-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
                <span className="placeholder-tag">Software Walkthrough • 1080p Preview</span>
                <h3 className="placeholder-heading">Our SAMAGRA Demo Video Is Coming Soon</h3>
                <p className="placeholder-subtext">
                  We are preparing a full high-resolution walkthrough of the newest ERP modules. In the meantime, you can experience the system live through a guided session.
                </p>
                <div className="placeholder-config-note">
                  ⚙️ Admin Notice: Set your MP4 file or YouTube URL in <code>src/config/salesConfig.js</code>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Button Below Video */}
        <div className="video-cta-bottom">
          <button
            onClick={() => onScrollToSection('book-meeting')}
            className="btn-sales-primary"
            id="btn-book-personalized-demo"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Book a Personalized Demo
          </button>
        </div>

        {/* Demo Highlights (4 Cards) */}
        <div className="demo-highlights-grid">
          {/* 1. Smart Attendance */}
          <div className="highlight-card">
            <div className="highlight-icon-wrap" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <polyline points="16 11 18 13 22 9" />
              </svg>
            </div>
            <h4 className="highlight-title">Smart Attendance Management</h4>
            <p className="highlight-desc">
              Track student and staff attendance through mobile app, RFID, or biometric devices with automated real-time SMS notifications to parents.
            </p>
          </div>

          {/* 2. Academic & Examination */}
          <div className="highlight-card">
            <div className="highlight-icon-wrap" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                <line x1="9" y1="7" x2="15" y2="7" />
                <line x1="9" y1="11" x2="13" y2="11" />
              </svg>
            </div>
            <h4 className="highlight-title">Academic & Examination Management</h4>
            <p className="highlight-desc">
              Manage subject syllabi, timetable scheduling, grade calculation, and generate standardized digital report cards adhering to school board guidelines.
            </p>
          </div>

          {/* 3. Fee & Finance */}
          <div className="highlight-card">
            <div className="highlight-icon-wrap" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
                <line x1="6" y1="15" x2="10" y2="15" />
              </svg>
            </div>
            <h4 className="highlight-title">Fee & Finance Management</h4>
            <p className="highlight-desc">
              Accept secure digital fee payments, configure flexible installment structures, print official receipts, and monitor dues with automated reminders.
            </p>
          </div>

          {/* 4. Parent & Student App */}
          <div className="highlight-card">
            <div className="highlight-icon-wrap" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
            </div>
            <h4 className="highlight-title">Parent & Student Mobile App</h4>
            <p className="highlight-desc">
              Foster active parental engagement with instant homework updates, circular notifications, live school bus tracking, and direct teacher messaging.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SalesDemoSection
