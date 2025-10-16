"use client"
import React, { useState } from 'react'

const Footer = () => (
    <footer className="bg-slate-800 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">SafeVault</h3>
            <p className="text-slate-300 text-sm">
              Secure your digital life with our trusted authentication platform.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="/features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="/pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="/security" className="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="/privacy" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">Terms</a></li>
              <li><a href="/cookies" className="hover:text-white transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-6 text-center text-sm text-slate-400">
          <p>&copy; 2024 SafeVault. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

export default Footer;