import { useState, useEffect } from 'react';
import axios from 'axios';
import './ImageGrid.css';

function ImageGrid() {
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/images');
                setImages(response.data);
            } catch (err) {
                setError('Failed to fetch images');
                console.error('Error:', err);
            }
        };

        fetchImages();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div class="image-grid">
            {images.map((image) => (
                <div key={image._id} className="image-item">
                    <img
                        key={image._id}
                        src={`${image.thumbnailPath}`}
                        alt={image.filename}
                    />
                </div>
            ))}
        </div>
    );
}

export default ImageGrid;
