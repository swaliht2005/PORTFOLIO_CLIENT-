import React, { useState } from 'react';
import api from '../../../../api'; // Import the pre-configured axios instance

/**
 * A reusable component for uploading a single image.
 * @param {object} props
 * @param {(imageData: {url: string, publicId: string, secureUrl: string}) => void} props.onUploadSuccess - Callback function executed on successful upload.
 */
const ImageUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError(null); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file); // The key 'image' must match your backend route `upload.single('image')`

    setUploading(true);
    setError(null);

    try {
      // Use the 'api' instance which has the base URL and auth interceptors configured
      const response = await api.post('/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload successful:', response.data);
      if (onUploadSuccess) {
        onUploadSuccess(response.data); // Pass the uploaded image data to the parent component
      }
    } catch (err) {
      console.error('Upload failed:', err);
      setError(err.response?.data?.message || 'An error occurred during upload.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="image/*" disabled={uploading} />
        <button type="submit" disabled={uploading || !file}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ImageUpload;