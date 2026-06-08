import { Navigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Dashboard() {
  const { currentUser, userData } = useAuth()

  if (userData?.role === "admin") {
    return <Navigate to="/admin" />
  }

  const LostIcon = () => (
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
        d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
      />
    </svg>
  )

  const FoundIcon = () => (
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
        d="M9 12l2 2 4-4m5 2a8 8 0 11-16 0 8 8 0 0116 0z"
      />
    </svg>
  )

  const PostsIcon = () => (
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
        d="M9 12h6m-6 4h6M7 4h10a2 2 0 012 2v14l-4-2-4 2-4-2-4 2V6a2 2 0 012-2z"
      />
    </svg>
  )

  const ImageIcon = () => (
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
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  )

  const SearchIcon = () => (
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
        d="M21 21l-4.35-4.35m1.1-5.4a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
      />
    </svg>
  )

  const ResolveIcon = () => (
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
        d="M5 13l4 4L19 7"
      />
    </svg>
  )

  return (
    <div className="min-h-[80vh] px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-3xl shadow-lg p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-blue-100 text-sm font-semibold uppercase tracking-wide">
                Student Panel
              </p>

              <h1 className="text-3xl md:text-4xl font-bold mt-2">
                Student Dashboard
              </h1>

              <p className="text-blue-100 mt-3 max-w-2xl">
                Welcome to your Lost & Found dashboard. From here, you can
                report lost items, post found items, and manage your own posts.
              </p>
            </div>

            {currentUser && (
              <div className="bg-white/10 border border-white/20 rounded-2xl p-5 min-w-[260px]">
                <p className="text-blue-100 text-sm">Logged in as</p>
                <h2 className="text-xl font-bold mt-1">
                  {userData?.name}
                </h2>
                <p className="text-blue-100 text-sm mt-1">
                  {currentUser.email}
                </p>
                <span className="inline-block mt-3 bg-white text-blue-700 px-3 py-1 rounded-full text-xs font-bold capitalize">
                  {userData?.role}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Link
            to="/post-lost"
            className="group bg-white rounded-3xl shadow-md border border-slate-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">
              <LostIcon />
            </div>

            <h2 className="text-xl font-bold text-gray-800 mt-5">
              Post Lost Item
            </h2>

            <p className="text-gray-500 text-sm mt-2 leading-relaxed">
              Report an item you lost on campus with image, location, date, and
              contact information.
            </p>

            <p className="text-red-600 font-semibold mt-5 group-hover:underline">
              Go to Post Lost →
            </p>
          </Link>

          <Link
            to="/post-found"
            className="group bg-white rounded-3xl shadow-md border border-slate-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
              <FoundIcon />
            </div>

            <h2 className="text-xl font-bold text-gray-800 mt-5">
              Post Found Item
            </h2>

            <p className="text-gray-500 text-sm mt-2 leading-relaxed">
              Help other students by reporting found belongings with clear
              details and an image.
            </p>

            <p className="text-green-600 font-semibold mt-5 group-hover:underline">
              Go to Post Found →
            </p>
          </Link>

          <Link
            to="/my-posts"
            className="group bg-white rounded-3xl shadow-md border border-slate-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
              <PostsIcon />
            </div>

            <h2 className="text-xl font-bold text-gray-800 mt-5">
              My Posts
            </h2>

            <p className="text-gray-500 text-sm mt-2 leading-relaxed">
              View your own lost and found posts, mark them as resolved, or
              delete them when needed.
            </p>

            <p className="text-blue-600 font-semibold mt-5 group-hover:underline">
              View My Posts →
            </p>
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-800">
            How to Use the System
          </h2>

          <p className="text-gray-500 mt-2">
            Follow these simple steps to recover or return items effectively.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-3">
                <PostsIcon />
              </div>
              <p className="text-blue-700 font-bold">Step 1</p>
              <h3 className="font-semibold text-gray-800 mt-2">
                Post Item
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Add lost or found item details.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-3">
                <ImageIcon />
              </div>
              <p className="text-blue-700 font-bold">Step 2</p>
              <h3 className="font-semibold text-gray-800 mt-2">
                Upload Image
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Add a clear PNG/JPG image.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-3">
                <SearchIcon />
              </div>
              <p className="text-blue-700 font-bold">Step 3</p>
              <h3 className="font-semibold text-gray-800 mt-2">
                Search
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Browse and filter matching items.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-3">
                <ResolveIcon />
              </div>
              <p className="text-blue-700 font-bold">Step 4</p>
              <h3 className="font-semibold text-gray-800 mt-2">
                Resolve
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Mark item resolved after recovery.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 mt-8">
          <h2 className="text-xl font-bold text-blue-800">
            Helpful Reminder
          </h2>

          <p className="text-blue-700 mt-2 leading-relaxed">
            Provide honest details, upload clear images, and keep your contact
            information correct so lost items can be returned quickly and safely.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard