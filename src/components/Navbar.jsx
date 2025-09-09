import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu--open", isMenuOpen);
    return () => document.body.classList.remove("menu--open");
  }, [isMenuOpen]);

  return (
    <>
      <nav className="nav__bar">
        <img src={logo} alt="Nav Logo" className="logo nav__logo" />
        <ul className="links nav__links">
          <li>
            <Link to="/" className="link nav__link">
              Home
            </Link>
          </li>
          <li>
            <Link to="search" className="link nav__link">
              Find Your Movies
            </Link>
          </li>
          <li>
            <button className="btn nav__link--contact">Contact</button>
          </li>
        </ul>
        <button
          className="btn__menu"
          onClick={() => {
            setIsMenuOpen(true);
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="menu__backdrop">
          <button
            className="btn__menu btn__menu--close"
            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <ul className="menu__links">
            <li>
              <Link
                to="/"
                className="menu__link"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="search"
                className="menu__link"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                Find Your Movies
              </Link>
            </li>
            <li>
              <button
                className="menu__link--contact"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                Contact
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
