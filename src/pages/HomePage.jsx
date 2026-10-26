import React from 'react'
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
