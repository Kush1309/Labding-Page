import React, { useState } from 'react'
import BRAND_CONFIG from '../../config/brandConfig'
import '../../styles/ProfileImage.css'

/**
 * Reusable ProfileImage Component
 * 
 * Supports personal photographs with graceful fallback to a neutral, professional
 * avatar placeholder if the image has not yet been placed or encounters a loading error.
 * 
 * @param {string} src - Image URL (defaults to BRAND_CONFIG.profile.kushagraPhotoPath)
 * @param {string} alt - Alt text for accessibility
 * @param {string} initials - Neutral placeholder initials (e.g., 'KS')
 * @param {string} className - Additional CSS class
 */
export function ProfileImage({
  src = BRAND_CONFIG.profile.kushagraPhotoPath,
  alt = BRAND_CONFIG.profile.kushagraAlt,
  initials = BRAND_CONFIG.profile.fallbackInitials,
  className = '',
  loading = 'eager',
}) {
  const [hasError, setHasError] = useState(false)

  return (
    <div className={`profile-image-container ${className}`}>
      {!hasError && src ? (
        <img
          src={src}
          alt={alt}
          className="profile-image-img"
          loading={loading}
          decoding="async"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="profile-placeholder" aria-label={alt}>
          <svg
            className="placeholder-avatar-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span className="placeholder-initials">{initials}</span>
          <span className="placeholder-label">Photo Coming Soon</span>
        </div>
      )}
    </div>
  )
}

export default ProfileImage
