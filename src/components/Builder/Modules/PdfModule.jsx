import { Upload, X, FileText, Download, Eye } from 'lucide-react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const PdfModule = ({ data, onChange }) => {

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            const url = URL.createObjectURL(file);
            // We store the file object for upload later
            onChange({ ...data, url, file, name: file.name });
        }
    }, [data, onChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    });

    if (data?.url) {
        return (
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-center gap-4 relative group">
                    <div className="p-3 bg-white border border-gray-200 text-red-500 rounded-lg shadow-sm">
                        <FileText size={32} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <h4 className="font-medium text-gray-900 truncate pr-8">{data.name || 'PDF Document'}</h4>
                        <div className="flex gap-4 mt-1">
                            <a href={data.url} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                                <Eye size={12} /> Preview
                            </a>
                        </div>
                    </div>

                    <button
                        onClick={() => onChange(null)}
                        className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-white hover:shadow-sm transition-all"
                        title="Remove PDF"
                    >
                        <X size={20} />
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Add a title or caption for this document..."
                    className="w-full mt-3 p-2 text-sm text-gray-600 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
                    value={data.caption || ''}
                    onChange={(e) => onChange({ ...data, caption: e.target.value })}
                />
            </div>
        );
    }

    return (
        <div
            {...getRootProps()}
            className={`p-10 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors
                ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50'}
            `}
        >
            <input {...getInputProps()} />
            <div className="p-4 bg-white rounded-full shadow-sm mb-4">
                <FileText size={32} className="text-red-500" />
            </div>
            <p className="text-lg font-medium text-gray-700">Add PDF Document</p>
            <p className="text-sm text-gray-400 mt-1">Drag and drop or click to upload</p>
        </div>
    );
};

export default PdfModule;
