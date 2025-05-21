import axios from 'axios';

function UploadForm({ selectedFile, handleFileChange }) {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        const contentType = 'multipart/form-data';
        formData.append('image', selectedFile);

        try {
            await axios.post('/api/images', formData, {
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
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                />
            </div>
            
            <button type="submit">Upload</button>
        </form>
    );
}

export default UploadForm;