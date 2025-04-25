import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={`navbar navbar-expand-lg   ${styles.navContainer}`}>
      <div className="container-fluid ">
        <h1 className="navbar-brand fs-1 text-light">Health</h1>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse gap-5 justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/programs">
                Programs
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/register_client">
                Register_client
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/enroll_program">
                Enroll_client
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/registered_client">
                Clients
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
