import React, { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-br from-amber-50 to-stone-100 px-8 py-4 shadow-lg border-b border-stone-200 font-serif">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <div className="flex-shrink-0">
          <h2 className="text-2xl font-semibold text-amber-800 tracking-wide drop-shadow-sm">
            Classic Elegance
          </h2>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8">
          {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-stone-700 hover:text-amber-700 px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 hover:bg-amber-50 relative group"
            >
              {item}
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-4/5 group-hover:left-1/10"></span>
            </a>
          ))}
        </div>

        {/* Desktop Call to Action Button */}
        <div className="hidden md:block">
          <button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl">
            Get Started
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-amber-800 hover:text-amber-700 focus:outline-none transition-transform duration-300"
          >
            {isMobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
        <div className="space-y-2 pb-4">
          {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block text-stone-700 hover:text-amber-700 px-3 py-2 rounded-md text-base font-medium hover:bg-amber-50 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-4 py-3 rounded-full font-medium transition-all duration-300 mt-2">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;