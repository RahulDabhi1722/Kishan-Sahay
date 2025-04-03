import React from 'react'
import Hero from '../components/Common/Hero/Hero'
import Footer from '../components/Common/Footer/Footer'
import AboutSection from '../components/Common/AboutSection/About'
import CustomerNavbar from './CustomerNavbar'
import Services from './CusServices/Services'

const CustomerDashboard = () => {
  return (
    <div>
      <CustomerNavbar/>
      <Hero/>
      <Services/>
      <AboutSection/>
      <Footer/>
    </div>
  )
}

export default CustomerDashboard
