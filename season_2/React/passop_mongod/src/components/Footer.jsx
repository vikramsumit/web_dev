import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-amber-50 to-stone-100 border-t border-stone-200 font-serif relative overflow-hidden">
      {/* Decorative classical elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">CE</span>
              </div>
              <h3 className="text-2xl font-semibold text-amber-800">Classic Elegance</h3>
            </div>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Bringing timeless elegance to modern design. We create experiences that stand the test of time.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: 'F', name: 'Facebook' },
                { icon: 'T', name: 'Twitter' },
                { icon: 'I', name: 'Instagram' },
                { icon: 'L', name: 'LinkedIn' }
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="w-10 h-10 bg-white rounded-full shadow-sm border border-stone-200 flex items-center justify-center text-stone-500 hover:text-amber-700 hover:border-amber-300 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                  aria-label={social.name}
                >
                  <span className="font-medium">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold text-stone-800 mb-6 pb-2 border-b border-stone-200">Explore</h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-stone-600 hover:text-amber-700 transition-all duration-300 flex items-center group py-1"
                  >
                    <svg className="w-3 h-3 text-amber-500 mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold text-stone-800 mb-6 pb-2 border-b border-stone-200">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start group">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-3 group-hover:bg-amber-200 transition-colors duration-300">
                  <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <span className="text-stone-600 text-sm">123 Classical Avenue<br />Elegance City, EC 12345</span>
              </div>
              <div className="flex items-center group">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-3 group-hover:bg-amber-200 transition-colors duration-300">
                  <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-stone-600 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center group">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-3 group-hover:bg-amber-200 transition-colors duration-300">
                  <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-stone-600 text-sm">hello@classicelegance.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-stone-800 mb-6 pb-2 border-b border-stone-200">Stay Updated</h4>
            <p className="text-stone-600 text-sm mb-4">
              Subscribe to our newsletter for the latest updates and exclusive offers.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 text-sm border border-stone-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
              />
              <button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-3 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-stone-600 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Classic Elegance. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-stone-600 hover:text-amber-700 transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;