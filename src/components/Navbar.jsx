
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Models3Go</h2>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/shop">Shop</NavLink>
        <NavLink to="/admin">Admin Portal</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
