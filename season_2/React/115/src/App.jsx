// src/App.jsx
import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'

// Layout component that includes Navbar, Footer, and page outlet
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-6">
        <div className="mb-4 text-gray-600">Lorem ipsum dolor sit amet.</div>
        <Outlet /> {/* This renders the current page (Home, About, etc.) */}
      </div>
      <Footer />
    </div>
  )
}

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />, // This layout wraps all child routes
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/about',
          element: <About />,
        },
        {
          path: '/login',
          element: <Login />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default App
