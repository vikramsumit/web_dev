import React from 'react'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Manager from './components/Manager'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Manager />
      {/* <div className='h-100'></div> */}
      <Footer />

    </>
  )
}

export default App
