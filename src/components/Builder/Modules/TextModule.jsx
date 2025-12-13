import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextModule = ({ data, onChange }) => {
    return (
        <div className="text-module p-4">
            <ReactQuill
                theme="snow"
                value={data || ''}
                onChange={onChange}
                placeholder="Share your story..."
                modules={{
                    toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['link'],
                        ['clean']
                    ],
                }}
                className="bg-white border-0"
            />
            {/* Custom style overrides for cleaner look to match Behance */}
            <style>{`
                .ql-toolbar.ql-snow { border: none !important; border-bottom: 1px solid #f3f4f6 !important; }
                .ql-container.ql-snow { border: none !important; font-family: 'Poppins', sans-serif; font-size: 16px; }
                .ql-editor { padding: 20px 0; min-height: 100px; }
            `}</style>
        </div>
    );
};

export default TextModule;
