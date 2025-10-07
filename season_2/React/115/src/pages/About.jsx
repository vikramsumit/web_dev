// src/pages/About.jsx
import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}
      <main className="flex-grow container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <p className="text-lg leading-relaxed">
          We are passionate about delivering high-quality software solutions.
          Our team is focused on innovation, reliability, and growth. Thank you for visiting our page.
        </p>
      </main>
      {/* <Footer /> */}
    </div>
  )
}

export default About
