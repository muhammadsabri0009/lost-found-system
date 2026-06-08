import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Home() {
  const { currentUser, userData } = useAuth()

  const SearchIcon = () => (
    <svg
      className="w-7 h-7 text-blue-700"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35m1.1-5.4a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
      />
    </svg>
  )

  const DetailsIcon = () => (
    <svg
      className="w-7 h-7 text-green-700"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  )

  const RecoveryIcon = () => (
    <svg
      className="w-7 h-7 text-red-700"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m5 2a8 8 0 11-16 0 8 8 0 0116 0z"
      />
    </svg>
  )

  const ReportIcon = () => (
    <svg
      className="w-6 h-6 text-blue-700"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4v16m8-8H4"
      />
    </svg>
  )

  const ContactIcon = () => (
    <svg
      className="w-6 h-6 text-blue-700"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.82L3 20l1.3-3.9A7.35 7.35 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  )

  return (
    <div className="min-h-[80vh]">
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-8 md:p-12 items-center">
            <div>
              <p className="text-blue-100 text-sm font-semibold uppercase tracking-wide">
                University Lost & Found Service
              </p>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight mt-3">
                Find Lost Items and Return Found Belongings
              </h1>

              <p className="mt-5 text-blue-100 text-lg leading-relaxed">
                A simple platform for students to report lost items, post found
                belongings, search campus listings, and contact the right person
                for quick recovery.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  to="/browse"
                  className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition text-center shadow-sm"
                >
                  Browse Items
                </Link>

                {!currentUser && (
                  <Link
                    to="/signup"
                    className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition text-center"
                  >
                    Create Account
                  </Link>
                )}

                {currentUser && userData?.role === "student" && (
                  <Link
                    to="/dashboard"
                    className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition text-center"
                  >
                    Student Dashboard
                  </Link>
                )}

                {currentUser && userData?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition text-center"
                  >
                    Admin Dashboard
                  </Link>
                )}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-3xl p-6 md:p-8 border border-white/20">
              <h2 className="text-2xl font-bold">How It Works</h2>

              <div className="mt-6 space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                  <p className="font-semibold">1. Report an Item</p>
                  <p className="text-blue-100 text-sm mt-1">
                    Add item details, image, date, location, and contact
                    information.
                  </p>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                  <p className="font-semibold">2. Search Listings</p>
                  <p className="text-blue-100 text-sm mt-1">
                    Browse lost and found posts using filters like category,
                    type, status, and location.
                  </p>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                  <p className="font-semibold">3. Contact and Recover</p>
                  <p className="text-blue-100 text-sm mt-1">
                    Use the provided contact information to return or recover
                    the item responsibly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-blue-700 font-semibold uppercase tracking-wide text-sm">
              Main Advantages
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
              A Faster Way to Recover Campus Belongings
            </h2>

            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              The system keeps lost and found information organized, searchable,
              and easy for students to access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="bg-white p-6 rounded-3xl shadow-md border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                <SearchIcon />
              </div>

              <h3 className="text-xl font-bold text-gray-800 mt-5">
                Easy Search
              </h3>

              <p className="text-gray-600 mt-2 leading-relaxed">
                Students can quickly search items by name, location, date,
                category, and lost or found status.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-md border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
                <DetailsIcon />
              </div>

              <h3 className="text-xl font-bold text-gray-800 mt-5">
                Clear Item Details
              </h3>

              <p className="text-gray-600 mt-2 leading-relaxed">
                Images, descriptions, locations, and dates help users identify
                items more accurately.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-md border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">
                <RecoveryIcon />
              </div>

              <h3 className="text-xl font-bold text-gray-800 mt-5">
                Responsible Recovery
              </h3>

              <p className="text-gray-600 mt-2 leading-relaxed">
                Contact information allows students to communicate and recover
                belongings in a simple and organized way.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-md border border-slate-100 p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 text-center">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-3">
                <ReportIcon />
              </div>
              <h3 className="text-2xl font-bold text-blue-700">Report</h3>
              <p className="text-gray-500 text-sm mt-1">
                Submit lost or found item details easily
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-3">
                <SearchIcon />
              </div>
              <h3 className="text-2xl font-bold text-blue-700">Search</h3>
              <p className="text-gray-500 text-sm mt-1">
                Find matching items using filters
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-3">
                <ContactIcon />
              </div>
              <h3 className="text-2xl font-bold text-blue-700">Contact</h3>
              <p className="text-gray-500 text-sm mt-1">
                Reach the owner or finder responsibly
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-3">
                <RecoveryIcon />
              </div>
              <h3 className="text-2xl font-bold text-blue-700">Resolve</h3>
              <p className="text-gray-500 text-sm mt-1">
                Mark items recovered after completion
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home