import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import TopSchools from '../components/TopSchools'
import Benefits from '../components/Benefits'
import SchoolDays from '../components/SchoolDays'
import TopPerformers from '../components/TopPerformers'
import OurTeam from '../components/OurTeam'
import ContactSection from '../components/ContactSection'
import RegistrationCTA from '../components/RegistrationCTA'
import Footer from '../components/Footer'

function HomePage() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '')
      setTimeout(() => {
        const element = document.getElementById(targetId)
        if (element) {
          const offset = 80
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - offset
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
        }
      }, 100)
    }
  }, [location.hash])
  return (
    <div>
      <Navbar />
      <HeroSection />
      <TopSchools />
      <Benefits />
      <SchoolDays />
      <TopPerformers />
      <OurTeam />
      <ContactSection />
      <RegistrationCTA />
      <Footer />
    </div>
  )
}

export default HomePage
