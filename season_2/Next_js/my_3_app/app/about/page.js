// "use client"
// import React from 'react'
import Image from "next/image"

const AboutPage = () => {
  return (
    <div className="min-h-screen px-4 py-20 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">About Us</h1>
        <p className="text-lg mb-4">
          Welcome to <strong>MyBrand</strong> — your trusted partner in web design, development, and digital solutions.
          We're passionate about building high-quality web experiences that scale and convert.
        </p>
        <p className="text-lg mb-4">
          Founded in 2023, our team of creative technologists has worked with clients across industries to deliver impactful digital products.
        </p>
        <p className="text-lg">
          Whether you're a startup or an enterprise, we bring tailored strategies, clean code, and elegant designs to your business.
        </p>

        {/* Image wrapped inside layout container */}
        <div className="mt-10">
          <img
            src="https://images.unsplash.com/photo-1526779259212-939e64788e3c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1174"
            alt="Team working together"
            className="w-full h-auto rounded-lg shadow-md object-cover"
          />
        </div>

        <div className="container size-80 my-4 w-full rounded-lg bg-pink-200 flex items-center justify-center" >
          <Image
            className="object-contain transition-transform duration-300 ease-in-out hover:scale-105"
            width={400}
            height={400}
            src="http://www.menucool.com/slider/prod/image-slider-3.jpg"
            alt=""
          />
        </div>



      </div>
    </div>
  )
}

export default AboutPage
