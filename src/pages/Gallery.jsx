
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Maximize2, Loader2, Trash2 } from "lucide-react";
import api from "../api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ImageUpload from "../components/ImageUpload";

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    // Upload Form State
    const [uploadData, setUploadData] = useState({
        imageUrl: "",
        title: "",
        description: ""
    });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchImages();
        checkAdmin();
    }, []);

    const fetchImages = async () => {
        try {
            const res = await api.get("/gallery");
            setImages(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const checkAdmin = () => {
        // Simple check for token presence - real app might fetch profile
        const token = localStorage.getItem("token"); // Assuming standard storage
        if (token) setIsAdmin(true);
    };

    const handleUploadComplete = (url, metadata) => {
        setUploadData(prev => ({
            ...prev,
            imageUrl: url,
            width: metadata?.width,
            height: metadata?.height
        }));
    };

    const handleSubmitImage = async (e) => {
        e.preventDefault();
        if (!uploadData.imageUrl) return;

        setUploading(true);
        try {
            const res = await api.post("/gallery", uploadData);
            setImages([res.data, ...images]);
            setShowUploadModal(false);
            setUploadData({ imageUrl: "", title: "", description: "" });
        } catch (err) {
            console.error("Failed to save image", err);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        if (!window.confirm("Are you sure you want to delete this image?")) return;

        try {
            await api.delete(`/gallery/${id}`);
            setImages(images.filter(img => img._id !== id));
            if (selectedImage?._id === id) setSelectedImage(null);
        } catch (err) {
            console.error("Failed to delete", err);
        }
    };

    return (
        <div className="min-h-screen bg-black text-gray-100 font-sans selection:bg-purple-500/30">
            <Navbar />

            <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent mb-4">
                            Gallery
                        </h1>
                        <p className="text-gray-400 max-w-xl text-lg">
                            A collection of visual works, experiments, and creative moments.
                        </p>
                    </div>

                    {isAdmin && (
                        <button
                            onClick={() => setShowUploadModal(true)}
                            className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition-all font-medium text-sm"
                        >
                            <Plus size={18} /> Add Image
                        </button>
                    )}
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="animate-spin text-purple-500" size={32} />
                    </div>
                ) : (
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                        {images.map((img) => (
                            <motion.div
                                key={img._id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="break-inside-avoid relative group rounded-xl overflow-hidden bg-gray-900 cursor-zoom-in"
                                onClick={() => setSelectedImage(img)}
                            >
                                <img
                                    src={img.imageUrl}
                                    alt={img.title || "Gallery Item"}
                                    loading="lazy"
                                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    {img.title && <h3 className="text-white font-medium text-lg">{img.title}</h3>}
                                    {img.description && <p className="text-gray-300 text-sm mt-1 line-clamp-2">{img.description}</p>}
                                    {img.width && img.height && (
                                        <p className="text-xs text-gray-500 mt-2 font-mono">
                                            {img.width} × {img.height}px
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">
                                        Click to view
                                    </p>
                                </div>

                                {isAdmin && (
                                    <button
                                        onClick={(e) => handleDelete(img._id, e)}
                                        className="absolute top-4 right-4 p-2 bg-red-500/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-7xl max-h-[90vh] flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage.imageUrl}
                                alt={selectedImage.title}
                                className="max-w-full max-h-[85vh] object-contain rounded-md shadow-2xl"
                            />

                            {(selectedImage.title || selectedImage.description) && (
                                <div className="mt-4 text-center">
                                    <h3 className="text-xl font-semibold text-white">{selectedImage.title}</h3>
                                    <p className="text-gray-400 mt-1">{selectedImage.description}</p>
                                </div>
                            )}

                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors"
                            >
                                <X size={32} />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Upload Modal */}
            <AnimatePresence>
                {showUploadModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-lg p-6 shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-white">Add New Image</h2>
                                <button onClick={() => setShowUploadModal(false)} className="text-gray-400 hover:text-white">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmitImage} className="space-y-4">
                                <div>
                                    <ImageUpload
                                        label="Upload Image"
                                        previewUrl={uploadData.imageUrl}
                                        onUpload={handleUploadComplete}
                                        onRemove={() => setUploadData({ ...uploadData, imageUrl: "" })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Title (Optional)</label>
                                    <input
                                        type="text"
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                                        placeholder="e.g. Neon City"
                                        value={uploadData.title}
                                        onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Description (Optional)</label>
                                    <textarea
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors h-24 resize-none"
                                        placeholder="What's this image about?"
                                        value={uploadData.description}
                                        onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={!uploadData.imageUrl || uploading}
                                    className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                                >
                                    {uploading ? "Saving..." : "Add to Gallery"}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
