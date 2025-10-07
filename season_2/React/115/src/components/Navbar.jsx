// src/components/Navbar.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">MyApp</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/login" className="hover:underline">Login</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
