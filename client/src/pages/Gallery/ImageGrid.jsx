import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import './ImageGrid.css';

function ImageGrid() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('/api/images');
                setImages(response.data);
            } catch (err) {
                setError('Failed to fetch images');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    /**
     * Since the API call is asynchronous, we must ensure that the HTML does not attempt to access `images` until
     * it has been fetched and the state has been initialized.
     */
    if (loading) {
        <div></div>
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="image-grid">
            {images.map((image) => (
                <div key={image._id} className="image-item">
                    <Link to={`/gallery/${image._id}`}>
                        <img
                            key={image._id}
                            src={`${image.thumbnailPath}`}
                            alt={image.filename}
                        />
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default ImageGrid;
