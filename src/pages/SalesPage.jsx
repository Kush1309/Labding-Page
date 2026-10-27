import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SalesHero from '../components/sales/SalesHero'
import SalesDemoSection from '../components/sales/SalesDemoSection'
import SalesMeetingSection from '../components/sales/SalesMeetingSection'
import SalesPricingSection from '../components/sales/SalesPricingSection'
import SalesQuoteSection from '../components/sales/SalesQuoteSection'
import '../styles/SalesPage.css'

function SalesPage() {
  const [selectedPlan, setSelectedPlan] = useState('Standard')
  const [activeSection, setActiveSection] = useState('erp-demo')
  const location = useLocation()

  // SEO: Update page title and description
  useEffect(() => {
    document.title = 'Sales & Demo | School ERP - Smarter School Management Platform'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore School ERP software demo, book a personalized school consultation, compare transparent pricing plans, and request a customized quote for your institution.'
      )
    }

    // Scroll to top on fresh load unless hash is specified
    if (!location.hash) {
      window.scrollTo(0, 0)
    }
  }, [location.pathname])

  // Handle hash scrolling if navigating directly to a section (e.g. /sales#book-meeting)
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '')
      setTimeout(() => {
        scrollToSection(targetId)
      }, 150)
    }
  }, [location.hash])

  // Track active section on scroll for subnav highlighting
  useEffect(() => {
    const sectionIds = ['erp-demo', 'book-meeting', 'pricing-plans', 'request-quote']
    const handleScroll = () => {
      const navEl = document.querySelector('.navbar')
      const subnavEl = document.querySelector('.sales-subnav')
      const totalHeader = (navEl ? navEl.getBoundingClientRect().height : 80) + (subnavEl ? subnavEl.getBoundingClientRect().height : 54)
      const scrollPos = window.scrollY + totalHeader + 40

      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navEl = document.querySelector('.navbar')
      const subnavEl = document.querySelector('.sales-subnav')
      const navH = navEl ? navEl.getBoundingClientRect().height : 80
      const subnavH = subnavEl ? subnavEl.getBoundingClientRect().height : 54
      const navOffset = navH + subnavH + 16

      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      setActiveSection(sectionId)
    }
  }

  // When user clicks "Discuss This Plan" from Pricing Section
  const handleSelectPlanAndScroll = (planName) => {
    setSelectedPlan(planName)
    scrollToSection('request-quote')
  }

  return (
    <div className="sales-page">
      {/* Existing Website Navbar */}
      <Navbar />

      {/* Sales In-Page Sticky Sub-Navigation */}
      <nav className="sales-subnav" aria-label="Sales page section navigation">
        <div className="container sales-subnav-container">
          <span className="sales-subnav-label">Sales Directory</span>
          <ul className="sales-subnav-links">
            <li>
              <button
                onClick={() => scrollToSection('erp-demo')}
                className={`sales-subnav-btn ${activeSection === 'erp-demo' ? 'active' : ''}`}
              >
                <span className="sales-subnav-num">1</span>
                School ERP Demo
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('book-meeting')}
                className={`sales-subnav-btn ${activeSection === 'book-meeting' ? 'active' : ''}`}
              >
                <span className="sales-subnav-num">2</span>
                Book a Meeting
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('pricing-plans')}
                className={`sales-subnav-btn ${activeSection === 'pricing-plans' ? 'active' : ''}`}
              >
                <span className="sales-subnav-num">3</span>
                Pricing & Plans
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('request-quote')}
                className={`sales-subnav-btn ${activeSection === 'request-quote' ? 'active' : ''}`}
              >
                <span className="sales-subnav-num">4</span>
                Request a Quote
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <SalesHero onScrollToSection={scrollToSection} />

      {/* 1. School ERP Demo Section (with Video) */}
      <SalesDemoSection onScrollToSection={scrollToSection} />

      {/* 2. Book a Meeting Section */}
      <SalesMeetingSection />

      {/* 3. Pricing & Plans Section */}
      <SalesPricingSection onSelectPlan={handleSelectPlanAndScroll} />

      {/* 4. Request a Quote Section */}
      <SalesQuoteSection
        selectedPlan={selectedPlan}
        onSelectPlan={setSelectedPlan}
      />

      {/* Existing Website Footer */}
      <Footer />
    </div>
  )
}

export default SalesPage
