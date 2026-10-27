import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import BRAND_CONFIG from '../config/brandConfig'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ServicesHero from '../components/services/ServicesHero'
import ServicesCatalog from '../components/services/ServicesCatalog'
import ServicesBenefits from '../components/services/ServicesBenefits'
import ServicesWorkflow from '../components/services/ServicesWorkflow'
import ServicesSupport from '../components/services/ServicesSupport'
import ServicesCTA from '../components/services/ServicesCTA'
import '../styles/ServicesPage.css'

function ServicesPage() {
  const location = useLocation()

  // SEO Page Metadata
  useEffect(() => {
    document.title = BRAND_CONFIG.seo.servicesTitle
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        BRAND_CONFIG.seo.servicesDescription
      )
    }

    if (!location.hash) {
      window.scrollTo(0, 0)
    } else {
      const targetId = location.hash.replace('#', '')
      setTimeout(() => {
        const el = document.getElementById(targetId)
        if (el) {
          const navEl = document.querySelector('.navbar')
          const navH = navEl ? navEl.getBoundingClientRect().height : 80
          const offsetPosition = el.getBoundingClientRect().top + window.pageYOffset - (navH + 20)
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
        }
      }, 150)
    }
  }, [location.pathname, location.hash])

  const scrollToServices = () => {
    const element = document.getElementById('services-catalog')
    if (element) {
      const navEl = document.querySelector('.navbar')
      const navH = navEl ? navEl.getBoundingClientRect().height : 80
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - (navH + 20)
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="services-page">
      {/* Existing Website Navbar */}
      <Navbar />

      {/* 1. Services Hero Section */}
      <ServicesHero onScrollToServices={scrollToServices} />

      {/* 2. Main Services Section (10 Categories) */}
      <ServicesCatalog />

      {/* 3. Benefits of Using Our Services */}
      <ServicesBenefits />

      {/* 4. How Our Services Work (3 Steps) */}
      <ServicesWorkflow />

      {/* 5. Implementation, Training & Support */}
      <ServicesSupport />

      {/* 6. Final Call to Action */}
      <ServicesCTA />

      {/* Existing Website Footer */}
      <Footer />
    </div>
  )
}

export default ServicesPage
