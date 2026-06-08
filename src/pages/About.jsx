function About() {
  return (
    <div className="min-h-[80vh] px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-3xl shadow-lg p-8">
          <p className="text-blue-100 text-sm font-semibold uppercase tracking-wide">
            About the Service
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            University Lost & Found System
          </h1>

          <p className="text-blue-100 mt-4 max-w-3xl leading-relaxed">
            The Lost & Found System helps students report lost items, post found
            belongings, search campus listings, and contact the right person for
            safe recovery. It is designed to make the item recovery process more
            organized, faster, and easier for university students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-7">
            <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">
              <span className="text-red-700 text-2xl font-bold">!</span>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-5">
              Why This System Is Needed
            </h2>

            <p className="text-gray-600 mt-3 leading-relaxed">
              Students often lose ID cards, wallets, keys, books, documents,
              chargers, bags, and other personal items on campus. Without a
              central place to report and search these items, recovery becomes
              difficult and time-consuming.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-7">
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
              <span className="text-green-700 text-2xl font-bold">✓</span>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-5">
              How It Helps Students
            </h2>

            <p className="text-gray-600 mt-3 leading-relaxed">
              The system allows students to quickly post lost or found items
              with images, descriptions, locations, dates, and contact details.
              Other students can search listings and contact the owner or finder
              responsibly.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-8 mt-8">
          <div className="text-center">
            <p className="text-blue-700 font-semibold uppercase tracking-wide text-sm">
              User Guide
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              How to Use the System
            </h2>

            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              Follow these simple steps to report, search, and recover items.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-8">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <p className="text-blue-700 font-bold">Step 1</p>
              <h3 className="font-bold text-gray-800 mt-2">
                Create Account
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Sign up or login to post and manage lost or found items.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <p className="text-blue-700 font-bold">Step 2</p>
              <h3 className="font-bold text-gray-800 mt-2">
                Report Item
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Add item name, image, description, location, date, and contact
                information.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <p className="text-blue-700 font-bold">Step 3</p>
              <h3 className="font-bold text-gray-800 mt-2">
                Search Listings
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Browse and filter items by lost/found type, category, location,
                date, and status.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <p className="text-blue-700 font-bold">Step 4</p>
              <h3 className="font-bold text-gray-800 mt-2">
                Recover Item
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Contact the owner or finder and mark the item resolved after
                recovery.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-8 mt-8">
          <div className="text-center">
            <p className="text-blue-700 font-semibold uppercase tracking-wide text-sm">
              Key Benefits
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              Simple, Organized, and Useful
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <h3 className="text-xl font-bold text-blue-700">
                Faster Recovery
              </h3>
              <p className="text-gray-600 mt-2">
                Searchable listings make it easier to find matching lost or
                found items quickly.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
              <h3 className="text-xl font-bold text-green-700">
                Better Organization
              </h3>
              <p className="text-gray-600 mt-2">
                All lost and found posts are stored in one place instead of
                scattered messages or notice boards.
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
              <h3 className="text-xl font-bold text-purple-700">
                Responsible Contact
              </h3>
              <p className="text-gray-600 mt-2">
                Contact details help students communicate directly and return
                belongings responsibly.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8 mt-8">
          <h2 className="text-2xl font-bold text-blue-800">
            Safety and Responsibility
          </h2>

          <p className="text-blue-700 mt-3 leading-relaxed">
            Users should only claim items that truly belong to them, provide
            honest details, and use contact information only for item recovery.
            Admin monitoring helps keep posts relevant and appropriate.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About