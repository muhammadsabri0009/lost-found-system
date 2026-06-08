import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10 text-center max-w-lg">
        <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto">
          <span className="text-3xl font-bold text-blue-700">404</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mt-6">
          Page Not Found
        </h1>

        <p className="text-gray-500 mt-3 leading-relaxed">
          The page you are looking for does not exist or may have been moved.
          Please go back to the home page or browse lost and found items.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-7">
          <Link
            to="/"
            className="bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition"
          >
            Go Home
          </Link>

          <Link
            to="/browse"
            className="bg-slate-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-slate-200 transition"
          >
            Browse Items
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound