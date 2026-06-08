import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  getAllItems,
  markItemResolved,
  deleteItem,
} from "../services/itemService"

function AdminDashboard() {
  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [search, setSearch] = useState("")

  const ListIcon = () => (
    <svg
      className="w-6 h-6 text-blue-100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  )

  const TotalIcon = () => (
    <svg
      className="w-6 h-6 text-blue-100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 17v-6a2 2 0 012-2h8M9 17H5a2 2 0 01-2-2V7a2 2 0 012-2h4m0 12v2a2 2 0 002 2h8a2 2 0 002-2v-8a2 2 0 00-2-2h-2"
      />
    </svg>
  )

  const LostIcon = () => (
    <svg
      className="w-6 h-6 text-red-100"
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
      className="w-6 h-6 text-green-100"
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

  const ActiveIcon = () => (
    <svg
      className="w-6 h-6 text-blue-100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  )

  const ResolvedIcon = () => (
    <svg
      className="w-6 h-6 text-slate-100"
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

  const EmptyIcon = () => (
    <svg
      className="w-12 h-12 text-blue-700"
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

  async function fetchItems() {
    try {
      setLoading(true)
      const data = await getAllItems()
      setItems(data)
      setFilteredItems(data)
    } catch (err) {
      console.log(err)
      setError("Failed to load admin data.")
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchItems()
  }, [])

  useEffect(() => {
    let result = [...items]

    if (typeFilter !== "all") {
      result = result.filter((item) => item.type === typeFilter)
    }

    if (statusFilter !== "all") {
      result = result.filter((item) => item.status === statusFilter)
    }

    if (search.trim() !== "") {
      result = result.filter(
        (item) =>
          item.title?.toLowerCase().includes(search.toLowerCase()) ||
          item.description?.toLowerCase().includes(search.toLowerCase()) ||
          item.postedByName?.toLowerCase().includes(search.toLowerCase()) ||
          item.postedByEmail?.toLowerCase().includes(search.toLowerCase())
      )
    }

    setFilteredItems(result)
  }, [typeFilter, statusFilter, search, items])

  async function handleResolve(itemId) {
    const confirmResolve = window.confirm(
      "Are you sure you want to mark this item as resolved?"
    )

    if (!confirmResolve) return

    try {
      await markItemResolved(itemId)

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, status: "resolved" } : item
        )
      )

      setMessage("Item marked as resolved by admin.")
    } catch (err) {
      console.log(err)
      setError("Failed to mark item as resolved.")
    }
  }

  async function handleDelete(itemId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post as admin?"
    )

    if (!confirmDelete) return

    try {
      await deleteItem(itemId)

      setItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      )

      setMessage("Post deleted successfully by admin.")
    } catch (err) {
      console.log(err)
      setError("Failed to delete post.")
    }
  }

  function clearFilters() {
    setSearch("")
    setTypeFilter("all")
    setStatusFilter("all")
  }

  const totalItems = items.length
  const lostItems = items.filter((item) => item.type === "lost").length
  const foundItems = items.filter((item) => item.type === "found").length
  const activeItems = items.filter((item) => item.status === "active").length
  const resolvedItems = items.filter((item) => item.status === "resolved").length

  return (
    <div className="min-h-[80vh] px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-3xl shadow-lg p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-blue-100 text-sm font-semibold uppercase tracking-wide">
                Admin Control Panel
              </p>

              <h1 className="text-3xl md:text-4xl font-bold mt-2">
                Admin Dashboard
              </h1>

              <p className="text-blue-100 mt-3 max-w-2xl">
                Monitor all lost and found posts, manage inappropriate content,
                and update item recovery status.
              </p>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-2xl p-5 min-w-[220px]">
              <div className="flex items-center justify-between gap-3">
                <p className="text-blue-100 text-sm">Visible Results</p>
                <ListIcon />
              </div>

              <h2 className="text-4xl font-bold mt-1">
                {filteredItems.length}
              </h2>

              <p className="text-blue-100 text-sm mt-1">
                Based on current filters
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
            <div className="bg-white/10 border border-white/20 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <p className="text-blue-100 text-sm">Total Posts</p>
                <TotalIcon />
              </div>
              <h2 className="text-3xl font-bold mt-2">{totalItems}</h2>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <p className="text-blue-100 text-sm">Lost Items</p>
                <LostIcon />
              </div>
              <h2 className="text-3xl font-bold mt-2">{lostItems}</h2>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <p className="text-blue-100 text-sm">Found Items</p>
                <FoundIcon />
              </div>
              <h2 className="text-3xl font-bold mt-2">{foundItems}</h2>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <p className="text-blue-100 text-sm">Active</p>
                <ActiveIcon />
              </div>
              <h2 className="text-3xl font-bold mt-2">{activeItems}</h2>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <p className="text-blue-100 text-sm">Resolved</p>
                <ResolvedIcon />
              </div>
              <h2 className="text-3xl font-bold mt-2">{resolvedItems}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 mt-8 border border-slate-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Manage Student Posts
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Search by item name, description, student name, or email.
              </p>
            </div>

            <button
              onClick={clearFilters}
              className="bg-slate-100 text-gray-700 px-5 py-2 rounded-xl font-semibold hover:bg-slate-200 transition"
            >
              Clear Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                placeholder="Search item, student, email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Item Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        {message && (
          <div className="mt-6 bg-green-50 border border-green-200 text-green-700 p-4 rounded-2xl text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-sm">
            {error}
          </div>
        )}

        {loading && (
          <div className="bg-white rounded-3xl shadow p-10 text-center mt-8">
            <p className="text-gray-600 text-lg">
              Loading admin dashboard...
            </p>
          </div>
        )}

        {!loading && filteredItems.length === 0 && (
          <div className="bg-white rounded-3xl shadow p-10 text-center mt-8 border border-slate-100">
            <div className="w-20 h-20 rounded-3xl bg-blue-100 flex items-center justify-center mx-auto">
              <EmptyIcon />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-5">
              No posts found
            </h2>

            <p className="text-gray-500 mt-2">
              Try clearing filters or changing your search.
            </p>

            <button
              onClick={clearFilters}
              className="mt-5 bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition"
            >
              Clear Filters
            </button>
          </div>
        )}

        {!loading && filteredItems.length > 0 && (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden mt-8 border border-slate-100">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[900px]">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="p-4 text-sm font-bold text-gray-700">
                      Item
                    </th>
                    <th className="p-4 text-sm font-bold text-gray-700">
                      Type
                    </th>
                    <th className="p-4 text-sm font-bold text-gray-700">
                      Status
                    </th>
                    <th className="p-4 text-sm font-bold text-gray-700">
                      Location
                    </th>
                    <th className="p-4 text-sm font-bold text-gray-700">
                      Posted By
                    </th>
                    <th className="p-4 text-sm font-bold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredItems.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-slate-100 hover:bg-blue-50/40 transition"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-slate-200 rounded-2xl overflow-hidden flex-shrink-0">
                            {item.imageUrl ? (
                              <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                                No Img
                              </div>
                            )}
                          </div>

                          <div>
                            <p className="font-bold text-gray-800 line-clamp-1">
                              {item.title}
                            </p>
                            <p className="text-sm text-blue-700 font-medium">
                              {item.category}
                            </p>
                            <p className="text-xs text-gray-500 line-clamp-1 mt-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            item.type === "lost"
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {item.type === "lost" ? "Lost" : "Found"}
                        </span>
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            item.status === "active"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {item.status === "active" ? "Active" : "Resolved"}
                        </span>
                      </td>

                      <td className="p-4 text-gray-600 font-medium">
                        {item.location}
                      </td>

                      <td className="p-4">
                        <p className="text-gray-800 font-semibold">
                          {item.postedByName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.postedByEmail}
                        </p>
                      </td>

                      <td className="p-4">
                        <div className="flex flex-wrap gap-2">
                          <Link
                            to={`/items/${item.id}`}
                            className="bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-blue-800 transition"
                          >
                            View
                          </Link>

                          {item.status === "active" && (
                            <button
                              onClick={() => handleResolve(item.id)}
                              className="bg-green-600 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-green-700 transition"
                            >
                              Resolve
                            </button>
                          )}

                          <button
                            onClick={() => handleDelete(item.id)}
                            className="bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-red-700 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-slate-50 px-6 py-4 text-sm text-gray-500 border-t border-slate-100">
              Showing {filteredItems.length} of {items.length} total post(s).
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard