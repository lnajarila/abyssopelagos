import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
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
        <div className="app">
            <div className="image-grid">
                {images.map((image) => (
                    <div key={image._id} className="image-item">
                        <img
                            key={image._id}
                            src={`http://localhost:5000/${image.path}/${image.filename}`}
                            alt={image.filename}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;