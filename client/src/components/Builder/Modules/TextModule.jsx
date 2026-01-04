// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// const TextModule = ({ data, onChange }) => {
//     return (
//         <div className="text-module p-4">
//             <ReactQuill
//                 theme="snow"
//                 value={data || ''}
//                 onChange={onChange}
//                 placeholder="Share your story..."
//                 modules={{
//                     toolbar: [
//                         [{ 'header': [1, 2, 3, false] }],
//                         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//                         [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//                         ['link'],
//                         ['clean']
//                     ],
//                 }}
//                 className="bg-white border-0"
//             />
//             {/* Custom style overrides for cleaner look to match Behance */}
//             <style>{`
//                 .ql-toolbar.ql-snow { border: none !important; border-bottom: 1px solid #f3f4f6 !important; }
//                 .ql-container.ql-snow { border: none !important; font-family: 'Poppins', sans-serif; font-size: 16px; }
//                 .ql-editor { padding: 20px 0; min-height: 100px; }
//             `}</style>
//         </div>
//     );
// };

// export default TextModule;

import { useState } from 'react';
import { Bold, Italic, List, ListOrdered, Heading2 } from 'lucide-react';

const TextModule = ({ data, onChange }) => {
    const [content, setContent] = useState(data || '');
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (e) => {
        const newContent = e.target.value;
        setContent(newContent);
        onChange(newContent);
    };

    return (
        <div className="w-full">
            {/* Toolbar */}
            {isFocused && (
                <div className="flex items-center gap-1 p-2 mb-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <button
                        type="button"
                        className="p-2 hover:bg-gray-100 rounded transition"
                        title="Bold (Ctrl+B)"
                    >
                        <Bold size={16} className="text-gray-600" />
                    </button>
                    <button
                        type="button"
                        className="p-2 hover:bg-gray-100 rounded transition"
                        title="Italic (Ctrl+I)"
                    >
                        <Italic size={16} className="text-gray-600" />
                    </button>
                    <div className="w-px h-6 bg-gray-200 mx-1" />
                    <button
                        type="button"
                        className="p-2 hover:bg-gray-100 rounded transition"
                        title="Heading"
                    >
                        <Heading2 size={16} className="text-gray-600" />
                    </button>
                    <button
                        type="button"
                        className="p-2 hover:bg-gray-100 rounded transition"
                        title="Bullet List"
                    >
                        <List size={16} className="text-gray-600" />
                    </button>
                    <button
                        type="button"
                        className="p-2 hover:bg-gray-100 rounded transition"
                        title="Numbered List"
                    >
                        <ListOrdered size={16} className="text-gray-600" />
                    </button>
                </div>
            )}

            {/* Text Area */}
            <textarea
                value={content}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Start typing your content here..."
                className="w-full min-h-[200px] p-4 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-y text-gray-800 leading-relaxed"
                style={{ fontFamily: 'inherit' }}
            />

            {/* Character count */}
            <div className="flex justify-end mt-2">
                <span className="text-xs text-gray-400">
                    {content.length} characters
                </span>
            </div>
        </div>
    );
};

export default TextModule;