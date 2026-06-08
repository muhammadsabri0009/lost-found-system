export async function uploadImageToCloudinary(file) {
  if (!file) {
    return ""
  }

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", uploadPreset)
  formData.append("folder", "lost-found-items")

  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

  const response = await fetch(uploadUrl, {
    method: "POST",
    body: formData,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error?.message || "Image upload failed")
  }

  const optimizedUrl = data.secure_url.replace(
    "/upload/",
    "/upload/f_auto,q_auto/"
  )

  return optimizedUrl
}