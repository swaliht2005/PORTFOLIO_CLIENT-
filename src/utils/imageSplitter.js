
/**
 * Detects image dimensions and splits tall images into chunks.
 * @param {File} file - The uploaded file object.
 * @param {number} maxHeight - Maximum height per chunk (default 4000px).
 * @returns {Promise<File[]>} - Array of File objects (chunks or original).
 */
export const splitImage = async (file, maxHeight = 4000) => {
    // 1. Validate if it's an image
    if (!file.type.startsWith('image/')) {
        return [file];
    }

    return new Promise((resolve, reject) => {
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);

        img.onload = async () => {
            URL.revokeObjectURL(objectUrl);
            const { width, height } = img;

            // 2. If valid height <= maxHeight, return original
            if (height <= maxHeight) {
                resolve([file]);
                return;
            }

            // 3. Split the image
            const chunks = [];
            const timestamp = Date.now();
            const totalChunks = Math.ceil(height / maxHeight);
            
            console.log(`Splitting image (${width}x${height}) into ${totalChunks} chunks...`);

            try {
                for (let i = 0; i < totalChunks; i++) {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    
                    const chunkHeight = Math.min(maxHeight, height - (i * maxHeight));
                    
                    canvas.width = width;
                    canvas.height = chunkHeight;
                    
                    // Draw slice
                    // drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
                    ctx.drawImage(
                        img, 
                        0, i * maxHeight, width, chunkHeight, 
                        0, 0, width, chunkHeight
                    );

                    // Convert to Blob => File
                    const blob = await new Promise(r => canvas.toBlob(r, file.type, 0.95));
                    const chunkName = `${file.name.split('.')[0]}_part${i+1}.${file.name.split('.').pop()}`;
                    
                    const chunkFile = new File([blob], chunkName, { type: file.type });
                    chunks.push(chunkFile);
                }
                
                resolve(chunks);
            } catch (err) {
                console.error("Error splitting image:", err);
                // Fallback to original if canvas fails
                resolve([file]);
            }
        };

        img.onerror = (err) => {
            console.error("Error loading image for splitting:", err);
            resolve([file]);
        };

        img.src = objectUrl;
    });
};
