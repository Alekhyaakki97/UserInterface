import { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';
function Nav() {
  const { user, updateUser } = useContext(UserContext);
  const loginCmps = (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Register
        </Link>
      </li>
    </>
  );
  const profileCmp = (
    <li className="nav-item">
      <Link className="nav-link" to="/profile">
        Profile
      </Link>
    </li>
  );
  return (
    <div className="app">
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            MERN
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {!user['username'] && loginCmps}
              { user['username'] && profileCmp}
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default Nav;
