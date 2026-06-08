import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { uploadImageToCloudinary } from "../services/uploadService"
import { createItem } from "../services/itemService"

function PostLostItem() {
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

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/heic",
      "image/heif",
    ]

    const allowedExtensions = [".png", ".jpg", ".jpeg", ".heic", ".heif"]
    const fileName = file.name.toLowerCase()
    const fileType = file.type
    const maxSize = 3 * 1024 * 1024

    const hasAllowedType = allowedTypes.includes(fileType)
    const hasAllowedExtension = allowedExtensions.some((ext) =>
      fileName.endsWith(ext)
    )

    if (!hasAllowedType && !hasAllowedExtension) {
      setError("Please upload PNG, JPG, JPEG, HEIC, or HEIF image.")
      e.target.value = ""
      return
    }

    if (file.size > maxSize) {
      setError("Image size must be less than 3MB.")
      e.target.value = ""
      return
    }

    setImageFile(file)

    const canPreview =
      fileType === "image/png" ||
      fileType === "image/jpeg" ||
      fileType === "image/jpg" ||
      fileName.endsWith(".png") ||
      fileName.endsWith(".jpg") ||
      fileName.endsWith(".jpeg")

    if (canPreview) {
      setImagePreview(URL.createObjectURL(file))
    }
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
        type: "lost",
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

      setSuccess("Lost item posted successfully.")

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
      setError("Something went wrong while posting the lost item.")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-[80vh] px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-3xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            Post Lost Item
          </h1>
          <p className="text-red-100 mt-3 max-w-2xl">
            Report an item you lost on campus. Add clear details so others can
            identify and return it easily.
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
                    placeholder="Example: Student ID Card"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
                  placeholder="Describe color, brand, marks, or any special detail..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">
                  Add enough detail to help others recognize the item.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Last Seen Location
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Example: Library, Cafeteria, Block A"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Lost Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This will be visible on item details page.
                </p>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*,.heic,.heif"
                  onChange={handleImageChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Allowed formats: PNG, JPG, JPEG, HEIC, HEIF. Maximum size: 3MB.
                </p>
              </div>

              {imageFile && (
                <div className="border border-slate-200 rounded-2xl p-4">
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    Selected Image
                  </p>

                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full max-h-72 object-cover rounded-xl"
                    />
                  ) : (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm text-gray-600">
                      <p className="font-semibold text-gray-800">
                        {imageFile.name}
                      </p>
                      <p className="mt-1">
                        Preview is not available for this image format, but it
                        can still be uploaded.
                      </p>
                    </div>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-all duration-200 disabled:bg-red-300 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              >
                {loading ? "Posting Lost Item..." : "Post Lost Item"}
              </button>
            </form>
          </div>

          <div className="bg-red-50 border-l border-red-100 p-8">
            <h2 className="text-xl font-bold text-red-700">
              Tips for Better Recovery
            </h2>

            <div className="mt-5 space-y-4 text-sm text-gray-700">
              <div className="bg-white p-4 rounded-xl border border-red-100">
                <p className="font-semibold">Use a clear title</p>
                <p className="text-gray-500 mt-1">
                  Example: “Blue Student ID Card” instead of just “Card”.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-red-100">
                <p className="font-semibold">Add exact location</p>
                <p className="text-gray-500 mt-1">
                  Mention library, lab, cafeteria, classroom, or block name.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-red-100">
                <p className="font-semibold">Upload a useful image</p>
                <p className="text-gray-500 mt-1">
                  Upload a clear image in PNG, JPG, JPEG, HEIC, or HEIF format.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-red-100">
                <p className="font-semibold">Keep contact info correct</p>
                <p className="text-gray-500 mt-1">
                  So the finder can contact you quickly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostLostItem