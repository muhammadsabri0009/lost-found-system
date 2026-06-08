import { useEffect, useState } from "react"
import { getAllItems } from "../services/itemService"
import ItemCard from "../components/ItemCard"

function BrowseItems() {
  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [search, setSearch] = useState("")
  const [type, setType] = useState("all")
  const [category, setCategory] = useState("all")
  const [status, setStatus] = useState("all")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")

  const categories = [
    "ID Card",
    "Wallet",
    "Keys",
    "Bag",
    "Electronics",
    "Books",
    "Documents",
    "Clothing",
    "Other",
  ]

  useEffect(() => {
    async function fetchItems() {
      try {
        const data = await getAllItems()
        setItems(data)
        setFilteredItems(data)
      } catch (err) {
        console.log(err)
        setError("Failed to load items.")
      }

      setLoading(false)
    }

    fetchItems()
  }, [])

  useEffect(() => {
    let result = [...items]

    if (search.trim() !== "") {
      result = result.filter(
        (item) =>
          item.title?.toLowerCase().includes(search.toLowerCase()) ||
          item.description?.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (type !== "all") {
      result = result.filter((item) => item.type === type)
    }

    if (category !== "all") {
      result = result.filter((item) => item.category === category)
    }

    if (status !== "all") {
      result = result.filter((item) => item.status === status)
    }

    if (location.trim() !== "") {
      result = result.filter((item) =>
        item.location?.toLowerCase().includes(location.toLowerCase())
      )
    }

    if (date !== "") {
      result = result.filter((item) => item.date === date)
    }

    setFilteredItems(result)
  }, [search, type, category, status, location, date, items])

  function clearFilters() {
    setSearch("")
    setType("all")
    setCategory("all")
    setStatus("all")
    setLocation("")
    setDate("")
  }

  const totalItems = items.length
  const lostItems = items.filter((item) => item.type === "lost").length
  const foundItems = items.filter((item) => item.type === "found").length

  return (
    <div className="min-h-[80vh] px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-3xl shadow-lg p-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            Browse Lost & Found Items
          </h1>

          <p className="text-blue-100 mt-3 max-w-3xl">
            Search and filter reported lost or found items on campus. Use item
            name, location, category, date, and status to find relevant posts.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 border border-white/20 rounded-2xl p-4">
              <p className="text-blue-100 text-sm">Total Items</p>
              <h2 className="text-3xl font-bold">{totalItems}</h2>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-2xl p-4">
              <p className="text-blue-100 text-sm">Lost Items</p>
              <h2 className="text-3xl font-bold">{lostItems}</h2>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-2xl p-4">
              <p className="text-blue-100 text-sm">Found Items</p>
              <h2 className="text-3xl font-bold">{foundItems}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 mt-8 border border-slate-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Search & Filters
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Narrow down results quickly using multiple filters.
              </p>
            </div>

            <button
              onClick={clearFilters}
              className="bg-slate-100 text-gray-700 px-5 py-2 rounded-xl hover:bg-slate-200 transition font-semibold"
            >
              Clear Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Search Item
              </label>
              <input
                type="text"
                placeholder="Search by name or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              placeholder="Search by location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mt-5 bg-blue-50 border border-blue-100 rounded-2xl p-4">
            <p className="text-blue-800 text-sm font-medium">
              Showing {filteredItems.length} item(s) based on selected filters.
            </p>
          </div>
        </div>

        {loading && (
          <div className="bg-white rounded-3xl shadow p-10 text-center mt-8">
            <p className="text-gray-600 text-lg">Loading items...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-3xl p-8 text-center mt-8">
            <p className="text-red-600 font-semibold">{error}</p>
          </div>
        )}

        {!loading && filteredItems.length === 0 && (
          <div className="bg-white rounded-3xl shadow p-10 text-center mt-8 border border-slate-100">
            <div className="text-5xl">🔍</div>
            <h2 className="text-2xl font-bold text-gray-800 mt-4">
              No items found
            </h2>
            <p className="text-gray-500 mt-2">
              Try changing your search keyword or clearing filters.
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BrowseItems