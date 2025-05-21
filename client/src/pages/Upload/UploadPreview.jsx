import './UploadPreview.css';

function UploadPreview({ previewUrl, mediaType }) {
    return (
        <img className="preview-image" src={previewUrl} />
    );
}

export default UploadPreview;