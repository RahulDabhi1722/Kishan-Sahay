import React from 'react'
import Navbar from './NavBar/NavBar'
import Hero from '../components/Common/Hero/Hero'
import Footer from '../components/Common/Footer/Footer'
import FeaturedServices from '../components/Common/FeaturedServiceSection/FeaturedService'
import AboutSection from '../components/Common/AboutSection/About'


const FarmerDashboard = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <FeaturedServices/>
      <AboutSection/>
      <Footer/>
    </div>
  )
}

export default FarmerDashboard
