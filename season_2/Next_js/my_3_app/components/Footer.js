// "use client"
import React from 'react'
import Link from 'next/link'
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-indigo-600 dark:text-white">MyBrand</h2>
            <p className="mt-4 text-sm">
              Empowering your digital presence with modern solutions.
            </p>
            {/* Social icons */}
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="hover:text-indigo-600"><FaFacebookF /></Link>
              <Link href="#" className="hover:text-indigo-600"><FaTwitter /></Link>
              <Link href="#" className="hover:text-indigo-600"><FaInstagram /></Link>
              <Link href="#" className="hover:text-indigo-600"><FaLinkedinIn /></Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-indigo-600">About Us</Link></li>
              <li><Link href="#" className="hover:text-indigo-600">Careers</Link></li>
              <li><Link href="#" className="hover:text-indigo-600">Press</Link></li>
              <li><Link href="#" className="hover:text-indigo-600">Blog</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-indigo-600">Web Design</Link></li>
              <li><Link href="#" className="hover:text-indigo-600">Development</Link></li>
              <li><Link href="#" className="hover:text-indigo-600">Marketing</Link></li>
              <li><Link href="#" className="hover:text-indigo-600">SEO</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: <Link href="mailto:support@mybrand.com" className="hover:text-indigo-600">support@mybrand.com</Link></li>
              <li>Phone: <Link href="tel:+1234567890" className="hover:text-indigo-600">+91 000 000 000 </Link></li>
              <li>Address: <span className="block">silicon vally, Bengaluru, IN</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-gray-300 dark:border-gray-600 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} MyBrand. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <Link href="#" className="hover:text-indigo-600">Privacy Policy</Link>
            <Link href="#" className="hover:text-indigo-600">Terms of Service</Link>
            <Link href="#" className="hover:text-indigo-600">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
