"use client";

import Link from "next/link";
import React, { useState } from "react";
import { HandHeart, Menu, X, User, ChevronDown } from "lucide-react";
// import { signIn } from "next-auth/react";
import { useSession, signIn, signOut } from "next-auth/react";
// import { useSession  } from "next-auth/react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCausesDropdown, setShowCausesDropdown] = useState(false);
  // const { data: session } = useSession();
  const [showdropdown, setShowdropdown] = useState(false);

  // if (session) {
  //   return <>
  //     Signed in as {session.user.email} <br /> 
  //     <button onClick={() => signOut()}>Sign out</button>
  //   </>
  // }

  const causes = ["Medical", "Education", "Emergency", "Community"];

  return (
    <nav className="bg-gray-900 px-6 py-4 shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-teal-500 to-blue-600 p-2.5 rounded-xl shadow-md">
              <HandHeart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">UnityFund</h2>
              <p className="text-xs text-gray-300">Together We Rise</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-gray-200 hover:text-teal-300 font-medium transition-colors"
            >
              Home
            </a>

            {/* Dropdown for Causes */}
            <div
              className="relative"
              onMouseEnter={() => setShowCausesDropdown(true)}
              onMouseLeave={() => setShowCausesDropdown(false)}
            >
              <button
                className="flex items-center space-x-1 text-gray-200 hover:text-teal-300 font-medium transition-colors"
                aria-haspopup="true"
                aria-expanded={showCausesDropdown}
              >
                <span>Browse Causes</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {showCausesDropdown && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  {causes.map((cause) => (
                    <a
                      key={cause}
                      href={`#${cause.toLowerCase()}`}
                      className="block px-4 py-2 text-gray-800 hover:bg-teal-50 hover:text-teal-600 transition-colors"
                    >
                      {cause}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#how-it-works"
              className="text-gray-200 hover:text-teal-300 font-medium transition-colors"
            >
              How It Works
            </a>
            <a
              href="#success-stories"
              className="text-gray-200 hover:text-teal-300 font-medium transition-colors"
            >
              Success Stories
            </a>
          </div>

          {/* CTA Section */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/login" className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 text-gray-200 hover:text-teal-300 px-4 py-2 border border-gray-700 rounded-lg font-medium transition-all hover:border-teal-400">
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </button>
            </Link>

            <Link href="/donate">
              <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                Donate
              </button>
            </Link>

            <Link href="/start-fundraising">
              <button className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Start Fundraising
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-200 hover:text-teal-300"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-gray-800 pt-4">
            <a
              href="#home"
              className="block text-gray-200 hover:text-teal-300 hover:bg-gray-800 px-4 py-2 rounded-lg"
            >
              Home
            </a>

            <div className="px-4 py-2">
              <p className="text-sm font-semibold text-gray-400 mb-2">Browse Causes</p>
              {causes.map((cause) => (
                <a
                  key={cause}
                  href={`#${cause.toLowerCase()}`}
                  className="block text-gray-200 hover:text-teal-300 py-1 pl-4"
                >
                  {cause}
                </a>
              ))}
            </div>

            <a
              href="#how-it-works"
              className="block text-gray-200 hover:text-teal-300 hover:bg-gray-800 px-4 py-2 rounded-lg"
            >
              How It Works
            </a>
            <a
              href="#success-stories"
              className="block text-gray-200 hover:text-teal-300 hover:bg-gray-800 px-4 py-2 rounded-lg"
            >
              Success Stories
            </a>

            <div className='relative flex justify-center items-center  md:block gap-4'>
              {session && <>
                <button onClick={() => setShowdropdown(!showdropdown)} onBlur={() => {
                  setTimeout(() => {
                    setShowdropdown(false)
                  }, 100);
                }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Account<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>

                <div id="dropdown" className={`z-10 ${showdropdown ? "" : "hidden"} absolute left-[15px] top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <li>
                      <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                    </li>
                    <li>
                      <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                    </li>
                    <li>
                      <Link onClick={() => signOut()} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                    </li>
                  </ul>
                </div></>
              }

              {session && <button className='text-white w-fit bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ' onClick={() => { signOut() }}>Logout</button>}
              {!session && <Link href={"/login"}>
                <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 '>Login</button></Link>}
            </div>

          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
