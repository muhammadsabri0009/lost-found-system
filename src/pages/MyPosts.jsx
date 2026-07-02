import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import {
  getItemsByUser,
  updateItemStatus,
  deleteItem,
} from "../services/itemService"

function MyPosts() {
  const { currentUser } = useAuth()

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  async function fetchMyPosts() {
    try {
      setLoading(true)
      setError("")

      const data = await getItemsByUser(currentUser.uid)
      setItems(data)
    } catch (err) {
      console.log(err)
      setError("Failed to load your posts.")
    }

    setLoading(false)
  }

  useEffect(() => {
    if (currentUser) {
      fetchMyPosts()
    }
  }, [currentUser])

  async function handleStatusToggle(item) {
    const newStatus =
      item.status === "resolved" ? "active" : "resolved"

    const confirmationMessage =
      newStatus === "resolved"
        ? "Are you sure you want to mark this item as resolved?"
        : "Are you sure you want to reopen this item?"

    const confirmed = window.confirm(confirmationMessage)

    if (!confirmed) return

    try {
      setError("")
      setMessage("")

      await updateItemStatus(item.id, newStatus)

      setItems((previousItems) =>
        previousItems.map((currentItem) =>
          currentItem.id === item.id
            ? {
                ...currentItem,
                status: newStatus,
              }
            : currentItem
        )
      )

      setMessage(
        newStatus === "resolved"
          ? "Item marked as resolved successfully."
          : "Item reopened and marked as active."
      )
    } catch (err) {
      console.log(err)

      setError(
        newStatus === "resolved"
          ? "Failed to mark item as resolved."
          : "Failed to reopen the item."
      )
    }
  }

  async function handleDelete(itemId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this post?"
    )

    if (!confirmDelete) return

    try {
      setError("")
      setMessage("")

      await deleteItem(itemId)

      setItems((previousItems) =>
        previousItems.filter((item) => item.id !== itemId)
      )

      setMessage("Post deleted successfully.")
    } catch (err) {
      console.log(err)
      setError("Failed to delete post.")
    }
  }

  const totalPosts = items.length

  const activePosts = items.filter(
    (item) => item.status === "active"
  ).length

  const resolvedPosts = items.filter(
    (item) => item.status === "resolved"
  ).length

  return (
    <div className="min-h-[80vh] px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-3xl shadow-lg p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                My Posts
              </h1>

              <p className="text-blue-100 mt-3 max-w-2xl">
                View, edit, manage, resolve, reopen, or delete the lost and
                found items you have posted.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/post-lost"
                className="bg-white text-red-600 px-5 py-3 rounded-xl font-semibold hover:bg-red-50 transition"
              >
                Post Lost Item
              </Link>

              <Link
                to="/post-found"
                className="bg-white text-green-600 px-5 py-3 rounded-xl font-semibold hover:bg-green-50 transition"
              >
                Post Found Item
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 border border-white/20 rounded-2xl p-4">
              <p className="text-blue-100 text-sm">Total Posts</p>
              <h2 className="text-3xl font-bold">{totalPosts}</h2>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-2xl p-4">
              <p className="text-blue-100 text-sm">Active Posts</p>
              <h2 className="text-3xl font-bold">{activePosts}</h2>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-2xl p-4">
              <p className="text-blue-100 text-sm">Resolved Posts</p>
              <h2 className="text-3xl font-bold">{resolvedPosts}</h2>
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
              Loading your posts...
            </p>
          </div>
        )}

        {!loading && items.length === 0 && (
          <div className="bg-white rounded-3xl shadow p-10 text-center mt-8 border border-slate-100">
            <div className="text-5xl">📭</div>

            <h2 className="text-2xl font-bold text-gray-800 mt-4">
              No posts yet
            </h2>

            <p className="text-gray-500 mt-2">
              You have not posted any lost or found item yet.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
              <Link
                to="/post-lost"
                className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition"
              >
                Post Lost Item
              </Link>

              <Link
                to="/post-found"
                className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
              >
                Post Found Item
              </Link>
            </div>
          </div>
        )}

        {!loading && items.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-md overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 flex-1">
                  <div className="relative bg-slate-200 h-64 sm:h-full min-h-[260px]">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}

                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                          item.type === "lost"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {item.type === "lost" ? "Lost" : "Found"}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                          item.status === "active"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {item.status === "active"
                          ? "Active"
                          : "Resolved"}
                      </span>
                    </div>
                  </div>

                  <div className="sm:col-span-2 p-6 flex flex-col">
                    <p className="text-sm font-semibold text-blue-700">
                      {item.category}
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-2 line-clamp-1">
                      {item.title}
                    </h2>

                    <p className="text-gray-600 mt-3 line-clamp-2 text-sm leading-relaxed min-h-[44px]">
                      {item.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-sm text-gray-500">
                          Location
                        </p>

                        <p className="font-semibold text-gray-700 line-clamp-1">
                          {item.location}
                        </p>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-sm text-gray-500">
                          Date
                        </p>

                        <p className="font-semibold text-gray-700">
                          {item.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-auto pt-6">
                      <Link
                        to={`/items/${item.id}`}
                        className="bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-800 transition"
                      >
                        View Details
                      </Link>

                      <Link
                        to={`/edit-item/${item.id}`}
                        className="bg-amber-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-amber-600 transition"
                      >
                        Edit Post
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleStatusToggle(item)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold text-white transition ${
                          item.status === "resolved"
                            ? "bg-indigo-600 hover:bg-indigo-700"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {item.status === "resolved"
                          ? "Reopen Item"
                          : "Mark Resolved"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyPosts