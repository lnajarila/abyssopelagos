import { useState } from 'react';
import UploadForm from './UploadForm.jsx';
import UploadPreview from './UploadPreview.jsx';
import './UploadPage.css';

function UploadPage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setSelectedFile(file);
                setPreviewUrl(e.target.result);
            };

            reader.readAsDataURL(file);
        } else {
            setSelectedFile(null);
            setPreviewUrl('');
        }  
    };

    return (
        <div className="upload-container">
            <div className="upload-form">
                <UploadForm selectedFile={selectedFile} handleFileChange={handleFileChange} />
            </div>

            <div className="upload-preview">
                <UploadPreview previewUrl={previewUrl} />
            </div>
        </div>
    );
}

export default UploadPage;