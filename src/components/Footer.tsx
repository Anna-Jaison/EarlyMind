

export default function Footer() {
  return (
    <footer className="p-4 bg-gray-900 sm:p-6 border-t border-white/10">
      <div className="mx-auto max-w-screen-xl">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="#" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white font-[Outfit]">EarlyMind</span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-400 uppercase">Resources</h2>
              <ul className="text-gray-300 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline hover:text-white transition-colors">React</a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline hover:text-white transition-colors">Tailwind CSS</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-400 uppercase">Follow us</h2>
              <ul className="text-gray-300 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline hover:text-white transition-colors">Github</a>
                </li>
                <li>
                  <a href="#" className="hover:underline hover:text-white transition-colors">Twitter</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-400 sm:text-center">© 2026 <a href="#" className="hover:underline hover:text-white transition-colors">EarlyMind™</a>. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
