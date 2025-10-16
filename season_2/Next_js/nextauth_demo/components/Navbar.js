"use client"
import React, { useState } from 'react'

const Navbar = () => (
    <nav className="bg-white/80 backdrop-blur-md border-b border-indigo-100 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-sky-400 flex items-center justify-center">
                <span className="text-white font-bold text-sm">SV</span>
              </div>
              <span className="ml-2 text-xl font-semibold text-slate-800">SafeVault</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <a href="/" className="text-slate-600 hover:text-indigo-600 transition-colors">Home</a>
            <a href="/about" className="text-slate-600 hover:text-indigo-600 transition-colors">About</a>
            <a href="/contact" className="text-slate-600 hover:text-indigo-600 transition-colors">Contact</a>
            <a href="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </nav>
  );

export default Navbar;