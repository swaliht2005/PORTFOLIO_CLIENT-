import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    rectSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { UploadCloud, X, GripVertical, Image as ImageIcon, Loader2 } from 'lucide-react';
import api from '../api';

// Sortable Item Component
const SortableImage = ({ image, onRemove, onCaptionChange }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: image.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="group relative bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col"
        >
            {/* Drag Handle & Image */}
            <div className="relative h-40 bg-gray-100 cursor-move" {...attributes} {...listeners}>
                <img
                    src={image.url}
                    alt="Gallery item"
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={(e) => { e.stopPropagation(); onRemove(image.id); }}
                        className="bg-black/50 hover:bg-red-500 text-white p-1.5 rounded-full backdrop-blur-sm transition-colors"
                    >
                        <X size={14} />
                    </button>
                </div>
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-black/30 text-white p-1 rounded backdrop-blur-sm">
                        <GripVertical size={14} />
                    </div>
                </div>
            </div>

            {/* Caption Input */}
            <div className="p-3 bg-white flex-1 flex flex-col">
                <input
                    type="text"
                    placeholder="Add caption..."
                    className="text-xs w-full bg-transparent border-b border-transparent focus:border-blue-500 outline-none pb-1 text-gray-600 placeholder-gray-400"
                    value={image.caption || ''}
                    onChange={(e) => onCaptionChange(image.id, e.target.value)}
                    onPointerDown={(e) => e.stopPropagation()} // Prevent drag start from input
                    onKeyDown={(e) => e.stopPropagation()} // Prevent sorting from input
                />
            </div>
        </div>
    );
};

const GalleryManager = ({ images = [], onChange }) => {
    const [uploading, setUploading] = useState(false);

    // Upload images to Cloudinary via server
    const uploadImages = async (files) => {
        const formData = new FormData();
        files.forEach(file => {
            formData.append('images', file);
        });

        try {
            const response = await api.post('/upload/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data.images || [];
        } catch (error) {
            console.error('Upload failed:', error);
            throw new Error(error.response?.data?.message || 'Failed to upload images');
        }
    };

    const handleUpload = useCallback(async (acceptedFiles) => {
        setUploading(true);
        try {
            const uploadedImages = await uploadImages(acceptedFiles);
            const newImages = uploadedImages.map((img, index) => ({
                id: Math.random().toString(36).substr(2, 9), // Simple client ID
                url: img.url || img.secureUrl,
                caption: ''
            }));

            onChange([...images, ...newImages]);
        } catch (err) {
            console.error("Upload failed", err);
            alert(err.message || 'Failed to upload images. Please try again.');
        } finally {
            setUploading(false);
        }
    }, [images, onChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleUpload,
        accept: { 'image/*': [] }
    });

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = images.findIndex((img) => img.id === active.id);
            const newIndex = images.findIndex((img) => img.id === over.id);
            onChange(arrayMove(images, oldIndex, newIndex));
        }
    };

    const handleRemove = (id) => {
        onChange(images.filter(img => img.id !== id));
    };

    const handleCaptionChange = (id, caption) => {
        onChange(images.map(img => img.id === id ? { ...img, caption } : img));
    };

    return (
        <div className="space-y-6">
            {/* Upload Zone */}
            <div
                {...getRootProps()}
                className={`cursor-pointer rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center text-center p-8 h-48 ${isDragActive
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
                    } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                <input {...getInputProps()} disabled={uploading} />
                <div className={`p-4 rounded-full mb-3 ${isDragActive ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-400 shadow-sm'}`}>
                    {uploading ? (
                        <Loader2 size={32} className="animate-spin text-blue-600" />
                    ) : isDragActive ? (
                        <UploadCloud size={32} />
                    ) : (
                        <ImageIcon size={32} />
                    )}
                </div>
                <p className="text-sm font-bold text-gray-700">
                    {uploading ? "Uploading..." : isDragActive ? "Drop images now" : "Upload Gallery Images"}
                </p>
                <p className="text-xs text-gray-500 mt-1">Drag multiple files or click to browse</p>
            </div>

            {/* Sortable Grid */}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={images.map(img => img.id)}
                    strategy={rectSortingStrategy}
                >
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map((image) => (
                            <SortableImage
                                key={image.id}
                                image={image}
                                onRemove={handleRemove}
                                onCaptionChange={handleCaptionChange}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            {images.length === 0 && (
                <div className="text-center py-8 text-gray-400 text-sm">
                    No images in gallery yet.
                </div>
            )}
        </div>
    );
};

export default GalleryManager;
