import { BrowserRouter, Routes, Route } from 'react-router';
import Navbar from './components/Navbar.jsx';
import HomePage from './pages/Home/HomePage.jsx';
import GalleryPage from './pages/Gallery/GalleryPage.jsx';
import ViewFilePage from './pages/Gallery/ViewFilePage.jsx';
import TagsPage from './pages/Tags/TagsPage.jsx';
import UploadPage from './pages/Upload/UploadPage.jsx';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Navbar />

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/gallery/:imageId" element={<ViewFilePage />} />
                    <Route path="/tags" element={<TagsPage />} />
                    <Route path="/upload" element={<UploadPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;