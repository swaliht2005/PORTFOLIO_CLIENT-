import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Image as ImageIcon, X, Loader2 } from 'lucide-react';
import api from '../api';

const ImageUpload = ({ onUpload, previewUrl, label, className = "", height = "h-64", onRemove }) => {
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    // Upload image to Cloudinary via server
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await api.post('/upload/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data.url || response.data.secureUrl;
        } catch (error) {
            console.error('Upload failed:', error);
            throw new Error(error.response?.data?.message || 'Failed to upload image');
        }
    };

    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            setUploading(true);
            setUploadError(null);
            try {
                const imageUrl = await uploadImage(file);
                onUpload(imageUrl);
            } catch (err) {
                console.error("Upload failed", err);
                setUploadError(err.message || 'Upload failed. Please try again.');
            } finally {
                setUploading(false);
            }
        }
    }, [onUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        maxFiles: 1
    });

    if (previewUrl) {
        return (
            <div className={`relative rounded-xl overflow-hidden border border-gray-200 shadow-sm group ${className} ${height}`}>
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                        onClick={(e) => { e.stopPropagation(); onRemove(); }}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                    >
                        <X size={20} />
                    </button>
                    <button
                        onClick={() => document.getElementById('dropzone-input').click()} // Hack to re-trigger
                        className="ml-3 bg-white text-gray-900 px-4 py-2 rounded-full font-bold hover:bg-gray-100 hidden"
                    >
                        Change
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            {...getRootProps()}
            className={`cursor-pointer rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center text-center p-6 ${isDragActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
                } ${uploading ? 'opacity-50 cursor-not-allowed' : ''} ${className} ${height}`}
        >
            <input {...getInputProps()} id="dropzone-input" disabled={uploading} />
            <div className={`p-4 rounded-full mb-3 ${isDragActive ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-400 shadow-sm'}`}>
                {uploading ? (
                    <Loader2 size={32} className="animate-spin text-blue-600" />
                ) : isDragActive ? (
                    <UploadCloud size={32} />
                ) : (
                    <ImageIcon size={32} />
                )}
            </div>
            {uploading ? (
                <p className="text-sm font-bold text-blue-600">Uploading...</p>
            ) : (
                <>
                    <p className="text-sm font-bold text-gray-700">{label || "Drag & Drop Image"}</p>
                    <p className="text-xs text-gray-500 mt-1">or click to browse</p>
                </>
            )}
            {uploadError && (
                <p className="text-xs text-red-500 mt-2">{uploadError}</p>
            )}
        </div>
    );
};

export default ImageUpload;
