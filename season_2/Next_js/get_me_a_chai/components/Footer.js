const HeartHopeFooter = () => (
  <footer className="bg-gray-900 border-t border-rose-200 py-8 px-4 text-center text-white font-serif">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
      <div className="mb-4 md:mb-0">
        <span className="font-bold text-white text-xl">Heart & Hope</span> <span className="ml-2 text-sm">© {new Date().getFullYear()} All rights reserved.</span>
      </div>
      <div className="space-x-6">
        <a href="#privacy" className="text-white hover:text-rose-900 underline">Privacy Policy</a>
        <a href="#contact" className="text-white hover:text-rose-900 underline">Contact</a>
        <a href="#volunteer" className="text-white hover:text-rose-900 underline">Volunteer</a>
      </div>
      <div className="mt-4 md:mt-0 text-xl text-white">Made with ❤ for Good Causes</div>
    </div>
  </footer>
);

export default HeartHopeFooter;
