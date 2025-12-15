
import { useState } from "react"
import api from "../api"
import { Upload, Loader2, ImageIcon } from "lucide-react"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable"
import SortableImageItem from "./SortableImageItem"

const GalleryUpload = ({ images = [], onChange }) => {
  const [uploading, setUploading] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return

    setUploading(true)

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData()
        formData.append("image", file)

        const res = await api.post("/upload/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

        return {
          url: res.data.url,
          id: res.data.public_id || Date.now().toString(),
          caption: "",
        }
      })

      const uploadedImages = await Promise.all(uploadPromises)
      onChange([...images, ...uploadedImages])
    } catch (err) {
      console.error("Upload error:", err)
      alert("Failed to upload images. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = (indexToRemove) => {
    onChange(images.filter((_, i) => i !== indexToRemove))
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over.id) {
      const oldIndex = images.findIndex((img) => img.url === active.id)
      const newIndex = images.findIndex((img) => img.url === over.id)
      onChange(arrayMove(images, oldIndex, newIndex))
    }
  }

  const handleCaptionChange = (index, caption) => {
    const updated = [...images]
    updated[index] = { ...updated[index], caption }
    onChange(updated)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Project Gallery</h3>
          <p className="text-xs text-gray-500 mt-1">Upload multiple images to showcase your project</p>
        </div>
        <label className="cursor-pointer">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            disabled={uploading}
          />
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium">
            {uploading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload size={16} />
                Upload Images
              </>
            )}
          </div>
        </label>
      </div>

      {images.length > 0 ? (
        <div className="space-y-4">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={images.map((img) => img.url)} strategy={horizontalListSortingStrategy}>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <div key={img.url} className="flex-shrink-0">
                    <SortableImageItem url={img.url} onRemove={() => handleRemoveImage(index)} />
                    <input
                      type="text"
                      placeholder="Add caption (optional)"
                      value={img.caption || ""}
                      onChange={(e) => handleCaptionChange(index, e.target.value)}
                      className="mt-2 w-40 px-2 py-1 text-xs bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-blue-500"
                    />
                  </div>
                ))}
              </div>
            </SortableContext>
          </DndContext>
          <p className="text-xs text-gray-400">
            💡 Drag to reorder • {images.length} {images.length === 1 ? "image" : "images"} uploaded
          </p>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
          <ImageIcon className="mx-auto h-10 w-10 text-gray-300 mb-3" />
          <p className="text-sm text-gray-500">No images uploaded yet</p>
          <p className="text-xs text-gray-400 mt-1">Click "Upload Images" to add gallery photos</p>
        </div>
      )}
    </div>
  )
}

export default GalleryUpload
