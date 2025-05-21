import { useState, useEffect } from 'react';
import axios from 'axios';

function TagsPage() {
    const [tags, setTags] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await axios.get('/api/tags');
                console.log('response:', response);
                setTags(response.data);
            } catch (err) {
                setError('Failed to fetch tags.');
                console.error('Error:', err.response);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTags();
    }, []);

    /**
     * Since the API call is asynchronous, we must ensure that the HTML does not attempt to access `images` until
     * it has been fetched and the state has been initialized.
     */
    if (isLoading) {
        <div></div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div>
            <ul>
                {tags.map((tag) => (
                    <li key={tag._id}>
                        {tag.tagName} ({tag.count})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TagsPage;