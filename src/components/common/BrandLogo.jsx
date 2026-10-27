import React from 'react'
import { Link } from 'react-router-dom'
import BRAND_CONFIG from '../../config/brandConfig'
import '../../styles/BrandLogo.css'

/**
 * Reusable SAMAGRA Brand Logo Component
 * 
 * Uses your official SAMAGRA logo with transparent background and horizontal
 * layout optimized for navigation bars, footers, and responsive headers.
 * 
 * @param {'full'|'horizontal'|'symbol'|'stacked'} variant - Logo representation
 * @param {'sm'|'md'|'lg'} size - Scale of logo
 * @param {'dark'|'light'|'white'} theme - Background mode ('dark' for light bg, 'light' for dark bg)
 * @param {boolean} asLink - Wraps in React Router Link to "/"
 * @param {string} className - Additional CSS class
 */
export function BrandLogo({
  variant = 'horizontal',
  size = 'md',
  theme = 'dark',
  asLink = true,
  className = '',
  onClick,
}) {
  // Determine appropriate image asset based on theme and variant
  let logoSrc = BRAND_CONFIG.logo.horizontalPath

  if (variant === 'symbol') {
    logoSrc = BRAND_CONFIG.logo.symbolPath
  } else if (variant === 'stacked') {
    logoSrc = BRAND_CONFIG.logo.fullPath
  } else {
    // Horizontal / Full
    if (theme === 'light' || theme === 'white') {
      logoSrc = BRAND_CONFIG.logo.horizontalWhitePath
    } else {
      logoSrc = BRAND_CONFIG.logo.horizontalPath
    }
  }

  const content = (
    <div className={`samagra-brand-logo samagra-logo-${size} samagra-theme-${theme} ${className}`}>
      <img
        src={logoSrc}
        alt={BRAND_CONFIG.logo.alt}
        className={`samagra-official-logo-img samagra-variant-${variant}`}
        loading="eager"
        decoding="async"
      />
    </div>
  )

  if (asLink) {
    return (
      <Link to="/" onClick={onClick} className="samagra-brand-link" aria-label={BRAND_CONFIG.logo.alt}>
        {content}
      </Link>
    )
  }

  return content
}

export default BrandLogo
