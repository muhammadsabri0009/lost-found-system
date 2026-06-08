export async function uploadImageToCloudinary(file) {
  if (!file) {
    return ""
  }

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", uploadPreset)

  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

  const response = await fetch(uploadUrl, {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error("Image upload failed")
  }

  const data = await response.json()
  return data.secure_url
}