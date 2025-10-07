// src/pages/Home.jsx
import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}
      <main className="flex-grow container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-6">Welcome to MyApp</h1>
        <p className="text-lg">
          This is a simple React app using Tailwind CSS. Navigate through the menu to explore more.
        </p>
      </main>
      {/* <Footer /> */}
    </div>
  )
}

export default Home
