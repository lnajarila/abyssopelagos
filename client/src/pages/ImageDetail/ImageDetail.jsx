import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

function ImageDetail() {
    const { imageId } = useParams();
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`/api/images/${imageId}`);
                setImage(response.data);
            } catch (err) {
                setError('Failed to fetch image');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchImage();
    }, [imageId]);

    const deleteImage = async (imageId) => {
        try {
            await axios.delete(`/api/images/${imageId}`);
            window.location = "http://localhost:3000/gallery";
        } catch (err) {
            console.error('Error:', err);
        }
    };

    /**
     * Since the API call is asynchronous, we must ensure that the HTML does not attempt to access `image` until
     * it has been fetched and the state has been initialized.
     */
    if (loading) {
        return <div></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <img
                key={image._id}
                src={`${image.originalPath}`}
                alt={image.filename}
            />

            <br />
            <span>Artist: {image.artist}</span>
            <br />
            <button onClick={() => deleteImage(image._id)}>Delete</button>
        </div>
    );
}

export default ImageDetail;