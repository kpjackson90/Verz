import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <nav className="navbar fixed-bottom navbar-light bg-light">
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <Link to="#" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="#" className="nav-link">
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link to="#" className="nav-link">
            Blog
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Footer;
