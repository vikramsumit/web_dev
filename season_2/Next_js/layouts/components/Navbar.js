"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa'

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

    return (
        <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center text-xl font-bold text-indigo-600 dark:text-white">
                        MyBrand
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white transition">Contact</Link>
                        <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white transition">About</Link>

                        {/* Dropdown */}
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white transition focus:outline-none"
                            >
                                Services
                                <FaChevronDown className="ml-1" />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute z-50 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Web Design</Link>
                                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Development</Link>
                                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">SEO</Link>
                                </div>
                            )}
                        </div>

                        <div>
                            <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">Login</button>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMobileMenu} className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 focus:outline-none">
                            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden px-4 pt-4 pb-6 space-y-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                    <Link href="/contact" className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white">Contact</Link>
                    <Link href="/about" className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white">About</Link>

                    {/* Mobile Dropdown */}
                    <div className="space-y-2">
                        <div className="text-gray-700 dark:text-gray-300 font-medium">Services</div>
                        <div className="ml-4 space-y-1">
                            <Link href="#" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600">Web Design</Link>
                            <Link href="#" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600">Development</Link>
                            <Link href="#" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600">SEO</Link>
                        </div>
                    </div>

                    <a href="#" className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white">Contact</a>
                    <button className="w-full text-left px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Login</button>
                </div>
            )}
        </nav>
    )
}

export default Navbar
