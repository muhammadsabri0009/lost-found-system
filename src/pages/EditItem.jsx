import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import {
  getItemById,
  updateItemDetails,
} from "../services/itemService"
import { uploadImageToCloudinary } from "../services/uploadService"

function EditItem() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const fileInputRef = useRef(null)

  const [item, setItem] = useState(null)

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")
  const [contactInfo, setContactInfo] = useState("")

  const [existingImageUrl, setExistingImageUrl] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState("")

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
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

  useEffect(() => {
    async function fetchItem() {
      if (!currentUser) return

      try {
        setLoading(true)
        setError("")

        const itemData = await getItemById(id)

        if (!itemData) {
          setError("This item could not be found.")
          setLoading(false)
          return
        }

        if (itemData.postedBy !== currentUser.uid) {
          setError("You are not allowed to edit this post.")
          setLoading(false)
          return
        }

        setItem(itemData)
        setTitle(itemData.title || "")
        setCategory(itemData.category || "")
        setDescription(itemData.description || "")
        setLocation(itemData.location || "")
        setDate(itemData.date || "")
        setContactInfo(itemData.contactInfo || "")
        setExistingImageUrl(itemData.imageUrl || "")
      } catch (err) {
        console.log(err)
        setError("Failed to load the item details.")
      }

      setLoading(false)
    }

    fetchItem()
  }, [id, currentUser])

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])

  function handleImageChange(e) {
    const file = e.target.files[0]

    setError("")
    setSuccess("")

    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview)
    }

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

    const allowedExtensions = [
      ".png",
      ".jpg",
      ".jpeg",
      ".heic",
      ".heif",
    ]

    const fileName = file.name.toLowerCase()
    const fileType = file.type
    const maxSize = 3 * 1024 * 1024

    const hasAllowedType = allowedTypes.includes(fileType)

    const hasAllowedExtension = allowedExtensions.some((extension) =>
      fileName.endsWith(extension)
    )

    if (!hasAllowedType && !hasAllowedExtension) {
      setError(
        "Please upload a PNG, JPG, JPEG, HEIC, or HEIF image."
      )

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

  function handleKeepExistingImage() {
    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview)
    }

    setImageFile(null)
    setImagePreview("")

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    setError("")
    setSuccess("")

    const cleanTitle = title.trim()
    const cleanDescription = description.trim()
    const cleanLocation = location.trim()
    const cleanContactInfo = contactInfo.trim()

    if (cleanTitle.length < 3) {
      setError("Item name must contain at least 3 characters.")
      return
    }

    if (!category) {
      setError("Please select an item category.")
      return
    }

    if (cleanDescription.length < 10) {
      setError("Description must contain at least 10 characters.")
      return
    }

    if (!cleanLocation) {
      setError("Please enter the item location.")
      return
    }

    if (!date) {
      setError("Please select the item date.")
      return
    }

    if (!cleanContactInfo) {
      setError("Please enter your contact information.")
      return
    }

    try {
      setSaving(true)

      let finalImageUrl = existingImageUrl

      if (imageFile) {
        finalImageUrl = await uploadImageToCloudinary(imageFile)
      }

      await updateItemDetails(id, {
        title: cleanTitle,
        category,
        description: cleanDescription,
        location: cleanLocation,
        date,
        contactInfo: cleanContactInfo,
        imageUrl: finalImageUrl,
      })

      setExistingImageUrl(finalImageUrl)
      setImageFile(null)
      setImagePreview("")
      setSuccess("Post updated successfully.")

      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      setTimeout(() => {
        navigate("/my-posts")
      }, 1000)
    } catch (err) {
      console.log(err)
      setError("Failed to update the post. Please try again.")
    }

    setSaving(false)
  }

  if (loading) {
    return (
      <div className="min-h-[80vh] px-4 py-10">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow p-10 text-center">
          <p className="text-gray-600 text-lg">
            Loading item details...
          </p>
        </div>
      </div>
    )
  }

  if (error && !item) {
    return (
      <div className="min-h-[80vh] px-4 py-10">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto text-2xl font-bold">
            !
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mt-5">
            Unable to Edit Post
          </h1>

          <p className="text-red-600 mt-3">
            {error}
          </p>

          <Link
            to="/my-posts"
            className="inline-block mt-6 bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition"
          >
            Back to My Posts
          </Link>
        </div>
      </div>
    )
  }

  const isLostItem = item?.type === "lost"

  return (
    <div className="min-h-[80vh] px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-white rounded-3xl shadow-lg p-8 mb-8 ${
            isLostItem
              ? "bg-gradient-to-r from-red-600 to-red-700"
              : "bg-gradient-to-r from-green-600 to-green-700"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide opacity-90">
                Edit Existing Report
              </p>

              <h1 className="text-3xl md:text-4xl font-bold mt-2">
                Edit {isLostItem ? "Lost" : "Found"} Item
              </h1>

              <p className="mt-3 max-w-2xl opacity-90">
                Correct or update the item information you previously
                submitted.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="bg-white/15 border border-white/20 px-4 py-2 rounded-xl text-sm font-semibold">
                Type: {isLostItem ? "Lost" : "Found"}
              </span>

              <span className="bg-white/15 border border-white/20 px-4 py-2 rounded-xl text-sm font-semibold">
                Status:{" "}
                {item?.status === "resolved"
                  ? "Resolved"
                  : "Active"}
              </span>
            </div>
          </div>
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
                    placeholder="Enter item name"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select category</option>

                    {categories.map((categoryName) => (
                      <option
                        key={categoryName}
                        value={categoryName}
                      >
                        {categoryName}
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
                  placeholder="Describe the item clearly..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>

                <p className="text-xs text-gray-500 mt-1">
                  Add enough information to help others recognize the item.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    {isLostItem
                      ? "Last Seen Location"
                      : "Found Location"}
                  </label>

                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Example: Library, Cafeteria, Block A"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    {isLostItem ? "Lost Date" : "Found Date"}
                  </label>

                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                <p className="text-xs text-gray-500 mt-1">
                  This information will remain visible on the item details
                  page.
                </p>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Replace Image
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.heic,.heif"
                  onChange={handleImageChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <p className="text-xs text-gray-500 mt-1">
                  Leave this empty to keep the existing image. Allowed
                  formats: PNG, JPG, JPEG, HEIC and HEIF. Maximum size:
                  3MB.
                </p>
              </div>

              {imageFile && (
                <div className="border border-blue-200 bg-blue-50 rounded-2xl p-4">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        New Selected Image
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        This image will replace the existing image after
                        saving.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleKeepExistingImage}
                      className="text-sm font-semibold text-blue-700 hover:underline"
                    >
                      Keep Existing
                    </button>
                  </div>

                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="New selected preview"
                      className="w-full max-h-72 object-cover rounded-xl"
                    />
                  ) : (
                    <div className="bg-white border border-blue-100 rounded-xl p-5">
                      <p className="font-semibold text-gray-800 break-all">
                        {imageFile.name}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        Preview is unavailable for this image format, but
                        the image can still be uploaded.
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition-all duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                >
                  {saving ? "Saving Changes..." : "Save Changes"}
                </button>

                <Link
                  to="/my-posts"
                  className="flex-1 text-center bg-slate-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-slate-200 transition"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>

          <div className="bg-slate-50 border-l border-slate-100 p-8">
            <h2 className="text-xl font-bold text-gray-800">
              Current Post
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Review the existing information before saving your changes.
            </p>

            <div className="mt-6">
              {existingImageUrl ? (
                <img
                  src={existingImageUrl}
                  alt={item?.title}
                  className="w-full h-56 object-cover rounded-2xl border border-slate-200"
                />
              ) : (
                <div className="w-full h-56 bg-slate-200 rounded-2xl border border-slate-300 flex items-center justify-center text-gray-500">
                  No Existing Image
                </div>
              )}
            </div>

            <div className="mt-6 space-y-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">
                  Item Type
                </p>

                <p className="font-bold text-gray-800 mt-1">
                  {isLostItem ? "Lost Item" : "Found Item"}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  The item type cannot be changed while editing.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">
                  Current Status
                </p>

                <p className="font-bold text-gray-800 mt-1 capitalize">
                  {item?.status || "active"}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Status can be changed separately from the My Posts page.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <p className="font-semibold text-gray-800">
                  Ownership Protected
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Only the user who created this post is allowed to edit
                  its information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditItem