import React from 'react'
import MainNavBar from './InitialDashBoard/Navbar/MainNavBar'
import Hero from './components/Common/Hero/Hero'
import FeaturedServices from './components/Common/FeaturedServiceSection/FeaturedService'
import AboutSection from './components/Common/AboutSection/About'
import Footer from './components/Common/Footer/Footer'

const LandingPage = () => {
  return (
    <div>
      <MainNavBar/>
      <Hero/>
      <FeaturedServices/>
      <AboutSection/>
      <Footer/>
    </div>
  )
}

export default LandingPage
