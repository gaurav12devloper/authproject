import { Link } from "react-router-dom";

const Navbar = () => {
  /* const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  }; */
  return (
        <nav className="navbar navbar-light bg-light justify-content-between">
            <Link className="navbar-brand">Navbar</Link>
            <form className="form-inline">
                <img className="mr-5 pr-5" src="" alt="gaurav" />
            </form>
            </nav>
  );
};

export default Navbar;