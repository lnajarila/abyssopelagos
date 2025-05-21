import { useState } from 'react';
import axios from 'axios';

function ImageUpload() {
    const [uploadMethod, setUploadMethod] = useState('file');
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        let contentType;

        if (uploadMethod === 'file') {
            formData.append('image', file);
            contentType = 'multipart/form-data';
        } else {
            formData.append('url', url);
            contentType = 'application/json';
        }

        try {
            const response = await axios.post('/api/images', formData, {
                headers: { 'Content-Type': contentType, },
            });

            window.location = 'http://localhost:3000/gallery';
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Upload Method: </label>
                <select onChange={(e) => setUploadMethod(e.target.value)}>
                    <option value="file">Upload File</option>
                    <option value="url">Provide URL</option>
                </select>
            </div>

            {uploadMethod === "file" ? (
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                    />
                </div>
            ) : (
                <div>
                    <input
                        type="url"
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        required
                    />
                </div>
            )}
            
            <button type="submit">Upload</button>
        </form>
    );
}

export default ImageUpload;