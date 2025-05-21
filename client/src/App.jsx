import { BrowserRouter, Routes, Route } from 'react-router';
import Navbar from './components/Navbar.jsx';
import HomePage from './pages/Home/HomePage.jsx';
import GalleryPage from './pages/Gallery/GalleryPage.jsx';
import ImageView from './pages/ImageView/ImageView.jsx';
import ImageUpload from './pages/ImageUpload/ImageUpload.jsx';

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Navbar />

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/gallery/:imageId" element={<ImageView />} />
                    <Route path="/upload" element={<ImageUpload />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;