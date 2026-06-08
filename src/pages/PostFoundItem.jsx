import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { uploadImageToCloudinary } from "../services/uploadService"
import { createItem } from "../services/itemService"

function PostFoundItem() {
  const { currentUser, userData } = useAuth()

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")
  const [contactInfo, setContactInfo] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

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

  function handleImageChange(e) {
    const file = e.target.files[0]
    setError("")
    setImageFile(null)
    setImagePreview("")

    if (!file) return

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"]
    const maxSize = 2 * 1024 * 1024

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload only PNG or JPG image.")
      e.target.value = ""
      return
    }

    if (file.size > maxSize) {
      setError("Image size must be less than 2MB.")
      e.target.value = ""
      return
    }

    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      let imageUrl = ""

      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile)
      }

      await createItem({
        title,
        type: "found",
        category,
        description,
        location,
        date,
        contactInfo,
        imageUrl,
        postedBy: currentUser.uid,
        postedByName: userData?.name || "Unknown User",
        postedByEmail: currentUser.email,
      })

      setSuccess("Found item posted successfully.")

      setTitle("")
      setCategory("")
      setDescription("")
      setLocation("")
      setDate("")
      setContactInfo("")
      setImageFile(null)
      setImagePreview("")

      e.target.reset()
    } catch (err) {
      console.log(err)
      setError("Something went wrong while posting the found item.")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-[80vh] px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-3xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            Post Found Item
          </h1>
          <p className="text-green-100 mt-3 max-w-2xl">
            Report an item you found on campus. Your post can help another
            student recover their important belongings.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2 p-8">
            {error && (
              <div className="mb-5 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-5 bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Item Name
                  </label>
                  <input
                    type="text"
                    required
                    minLength="3"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Example: Wallet, ID Card, Keys"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Category
                  </label>
                  <select
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Description
                </label>
                <textarea
                  required
                  minLength="10"
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the found item clearly..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">
                  Mention color, brand, visible details, or where it was found.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Found Location
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Example: Library, Cafeteria, Block A"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Found Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Contact Information
                </label>
                <input
                  type="text"
                  required
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="Phone number or email"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This will help the owner contact you.
                </p>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleImageChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Only PNG/JPG allowed. Maximum size: 2MB.
                </p>
              </div>

              {imagePreview && (
                <div className="border border-slate-200 rounded-2xl p-4">
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    Image Preview
                  </p>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-h-72 object-cover rounded-xl"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-all duration-200 disabled:bg-green-300 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              >
                {loading ? "Posting Found Item..." : "Post Found Item"}
              </button>
            </form>
          </div>

          <div className="bg-green-50 border-l border-green-100 p-8">
            <h2 className="text-xl font-bold text-green-700">
              Tips for Helpful Found Posts
            </h2>

            <div className="mt-5 space-y-4 text-sm text-gray-700">
              <div className="bg-white p-4 rounded-xl border border-green-100">
                <p className="font-semibold">Describe carefully</p>
                <p className="text-gray-500 mt-1">
                  Add color, brand, and visible details of the item.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-green-100">
                <p className="font-semibold">Mention exact place</p>
                <p className="text-gray-500 mt-1">
                  Tell where you found it, such as lab, library, or cafeteria.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-green-100">
                <p className="font-semibold">Upload a clear image</p>
                <p className="text-gray-500 mt-1">
                  A clear image helps owners recognize their belongings.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-green-100">
                <p className="font-semibold">Use correct contact info</p>
                <p className="text-gray-500 mt-1">
                  So the owner can reach you quickly and safely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostFoundItem