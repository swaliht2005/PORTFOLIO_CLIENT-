import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import galleryImages from "../data/gallery";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);

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
                </div>

                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                    {galleryImages.map((img) => (
                        <motion.div
                            key={img.id}
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
                        </motion.div>
                    ))}
                </div>
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
        </div>
    );
};

export default Gallery;
