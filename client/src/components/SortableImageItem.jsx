"use client"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, X } from "lucide-react"

const SortableImageItem = ({ url, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: url })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : "auto",
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="relative group w-40 h-24 flex-shrink-0">
      <img
        src={url || "/placeholder.svg"}
        alt="Project"
        className="w-full h-full object-cover rounded-lg border border-gray-200"
      />
      <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-2 text-white">
          <GripVertical size={20} />
        </button>
        <button
          onClick={onRemove}
          className="absolute top-1 right-1 bg-white bg-opacity-70 rounded-full p-0.5 text-gray-800 hover:bg-opacity-100"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}

export default SortableImageItem
