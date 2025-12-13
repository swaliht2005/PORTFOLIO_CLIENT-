import { Upload, X } from 'lucide-react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageModule = ({ data, onChange }) => {
    // data structure: { url: string, caption: string }

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            // Create object URL for preview
            const url = URL.createObjectURL(file);
            onChange({ ...data, url, file }); // Store file for eventual upload
        }
    }, [data, onChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false
    });

    if (data?.url) {
        return (
            <div className="p-2">
                <div className="relative group">
                    <img
                        src={data.url}
                        alt="Content"
                        className="w-full rounded-lg shadow-sm"
                    />
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => onChange(null)}
                            className="p-2 bg-white/90 rounded-full text-red-500 hover:text-red-600 shadow-lg backdrop-blur-sm"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
                <input
                    type="text"
                    placeholder="Add a caption..."
                    className="w-full mt-3 p-2 text-center text-sm text-gray-500 bg-transparent border-b border-transparent hover:border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                    value={data.caption || ''}
                    onChange={(e) => onChange({ ...data, caption: e.target.value })}
                />
            </div>
        );
    }

    return (
        <div
            {...getRootProps()}
            className={`p-16 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors
                ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50'}
            `}
        >
            <input {...getInputProps()} />
            <div className="p-4 bg-white rounded-full shadow-sm mb-4">
                <Upload size={32} className="text-blue-600" />
            </div>
            <p className="text-lg font-medium text-gray-700">Detailed Image</p>
            <p className="text-sm text-gray-400 mt-1">Drag and drop or click to upload</p>
        </div>
    );
};

export default ImageModule;
