import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getItemById } from "../services/itemService"

function ItemDetails() {
  const { id } = useParams()

  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchItem() {
      try {
        const data = await getItemById(id)

        if (!data) {
          setError("Item not found.")
        } else {
          setItem(data)
        }
      } catch (err) {
        console.log(err)
        setError("Failed to load item details.")
      }

      setLoading(false)
    }

    fetchItem()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow p-10 text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600 text-lg font-medium">
            Loading item details...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow p-10 text-center max-w-md">
          <div className="text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-red-600">{error}</h1>
          <p className="text-gray-500 mt-2">
            The item may have been deleted or is no longer available.
          </p>

          <Link
            to="/browse"
            className="inline-block mt-6 bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition"
          >
            Back to Browse
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div
          className={`rounded-3xl shadow-lg p-8 mb-8 text-white ${
            item.type === "lost"
              ? "bg-gradient-to-r from-red-600 to-red-700"
              : "bg-gradient-to-r from-green-600 to-green-700"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <p className="text-white/80 text-sm font-semibold uppercase tracking-wide">
                Item Details
              </p>

              <h1 className="text-3xl md:text-4xl font-bold mt-2">
                {item.title}
              </h1>

              <p className="text-white/80 mt-3 max-w-2xl">
                Complete information about this reported{" "}
                {item.type === "lost" ? "lost" : "found"} item.
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <span className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-bold">
                {item.type === "lost" ? "Lost Item" : "Found Item"}
              </span>

              <span
                className={`px-4 py-2 rounded-full text-sm font-bold ${
                  item.status === "active"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {item.status === "active" ? "Active" : "Resolved"}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="bg-slate-200 min-h-[420px]">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 p-10">
                  <div className="text-5xl mb-3">🖼️</div>
                  <p className="font-semibold">No Image Available</p>
                </div>
              )}
            </div>

            <div className="p-8">
              <div>
                <p className="text-sm font-semibold text-blue-700">
                  {item.category}
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mt-2">
                  {item.title}
                </h2>
              </div>

              <div className="mt-6">
                <h3 className="font-bold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {item.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <p className="text-sm text-gray-500">
                    {item.type === "lost"
                      ? "Last Seen Location"
                      : "Found Location"}
                  </p>
                  <p className="font-bold text-gray-800 mt-1">
                    {item.location}
                  </p>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <p className="text-sm text-gray-500">
                    {item.type === "lost" ? "Lost Date" : "Found Date"}
                  </p>
                  <p className="font-bold text-gray-800 mt-1">
                    {item.date}
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-100 p-5 rounded-2xl">
                <h3 className="font-bold text-blue-800">
                  Contact Information
                </h3>
                <p className="text-blue-700 mt-2 font-medium">
                  {item.contactInfo}
                </p>
                <p className="text-xs text-blue-600 mt-2">
                  Use this contact information responsibly to recover or return
                  the item.
                </p>
              </div>

              <div className="mt-6 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-gray-900">Posted By</h3>
                <p className="text-gray-700 mt-2 font-medium">
                  {item.postedByName}
                </p>
                <p className="text-sm text-gray-500">
                  {item.postedByEmail}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Link
                  to="/browse"
                  className="text-center bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition shadow-sm hover:shadow-md"
                >
                  Back to Browse
                </Link>

                <Link
                  to="/"
                  className="text-center bg-slate-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-slate-200 transition"
                >
                  Home
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow p-6 mt-8 border border-slate-100">
          <h3 className="text-xl font-bold text-gray-800">
            Recovery Guidance
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl">
              <p className="font-semibold text-blue-700">Verify Carefully</p>
              <p className="text-sm text-gray-600 mt-1">
                Match item details before claiming or returning.
              </p>
            </div>

            <div className="bg-green-50 border border-green-100 p-4 rounded-2xl">
              <p className="font-semibold text-green-700">Contact Politely</p>
              <p className="text-sm text-gray-600 mt-1">
                Use the provided contact info for recovery only.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
              <p className="font-semibold text-gray-700">Mark Resolved</p>
              <p className="text-sm text-gray-600 mt-1">
                The owner can mark the post resolved after recovery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemDetails