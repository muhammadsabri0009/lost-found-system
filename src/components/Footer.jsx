import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="mt-16 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-white">
              Lost & Found System
            </h2>

            <p className="text-slate-300 mt-4 leading-relaxed max-w-md">
              A university-based platform that helps students report lost
              items, post found belongings, search campus listings, and recover
              items in a simple and organized way.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <span className="bg-blue-600/20 text-blue-300 border border-blue-500/30 px-4 py-2 rounded-full text-sm font-medium">
                Report Items
              </span>

              <span className="bg-green-600/20 text-green-300 border border-green-500/30 px-4 py-2 rounded-full text-sm font-medium">
                Search Listings
              </span>

              <span className="bg-purple-600/20 text-purple-300 border border-purple-500/30 px-4 py-2 rounded-full text-sm font-medium">
                Recover Belongings
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">
              Quick Links
            </h3>

            <div className="mt-4 space-y-3 text-slate-300">
              <Link to="/" className="block hover:text-white transition">
                Home
              </Link>

              <Link to="/browse" className="block hover:text-white transition">
                Browse Items
              </Link>

              <Link to="/about" className="block hover:text-white transition">
                About
              </Link>

              
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">
              Developed By
            </h3>

            <div className="mt-4 bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <p className="text-white font-semibold text-lg">
                Muhammad Sabri
              </p>

              <p className="text-slate-400 text-sm mt-2">
                Designed and developed for a better campus Lost & Found
                experience.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Lost & Found System. All rights reserved.
          </p>

          <p className="text-slate-400 text-sm text-center md:text-right">
            Report responsibly • Search carefully • Return honestly
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer