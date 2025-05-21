import { NavLink } from 'react-router';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/gallery" end>Gallery</NavLink>
        </nav>
    );
}

export default Navbar;