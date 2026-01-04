
"use client"

import { useState } from "react"
import api from "../api"
import { X, ImageIcon } from "lucide-react"

const ImageUpload = ({ label, previewUrl, onUpload, onRemove }) => {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file")
      return
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB")
      return
    }

    setError("")
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append("image", file)

      const response = await api.post("/upload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      console.log("Image uploaded successfully:", response.data)
      onUpload(response.data.url)
    } catch (err) {
      console.error("Upload failed:", err)
      console.error("Error response:", err.response?.data)

      let errorMessage = "Failed to upload image"

      if (err.response?.status === 401) {
        errorMessage = "Authentication required. Please log in again."
      } else if (err.response?.status === 413) {
        errorMessage = "File is too large. Maximum size is 10MB."
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message
      } else if (err.message) {
        errorMessage = err.message
      }

      setError(errorMessage)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-3">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}

      {previewUrl ? (
        <div className="relative group">
          <img
            src={previewUrl || "/placeholder.svg"}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border border-gray-200"
          />
          <button
            onClick={onRemove}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-200 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-3" />
                <p className="text-sm text-gray-500">Uploading...</p>
              </>
            ) : (
              <>
                <ImageIcon className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-400">PNG, JPG, GIF, WEBP (max 10MB)</p>
              </>
            )}
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileSelect} disabled={uploading} />
        </label>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}

export default ImageUpload
