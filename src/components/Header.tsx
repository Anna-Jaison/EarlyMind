

export default function Header() {
  return (
    <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/10 bg-white/5 backdrop-blur-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white font-[Outfit]">EarlyMind</span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer transition-transform hover:scale-105">Get started</button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 text-white">
            <li>
              <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-500 md:p-0" aria-current="page">Home</a>
            </li>
            <li>
              <a href="#features" className="block py-2 px-3 text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:p-0 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent transition-colors">Features</a>
            </li>
            <li>
              <a href="#about" className="block py-2 px-3 text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:p-0 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent transition-colors">About</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
