"use client"
import React, { useState } from 'react'
import Script from 'next/script'

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
        // Add API call or form handler here
    }

    return (
        <div className="min-h-screen px-4 py-20 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">Contact Us</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block mb-1 font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleChange}
                            value={formData.name}
                            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={handleChange}
                            value={formData.email}
                            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block mb-1 font-medium">Message</label>
                        <textarea
                            name="message"
                            id="message"
                            rows="5"
                            onChange={handleChange}
                            value={formData.message}
                            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
                    >
                        Send Message
                    </button>
                </form>
            </div>
            <Script>
                {` alert('Welcome! Contact form script loaded'); `}
            </Script>
        </div>
    )
}

export default ContactPage


// works without use client
// export const metadata = {
//   title: "chatbook- AI Chat App",
//   description: "An AI-powered chat application for seamless communication",
// };
