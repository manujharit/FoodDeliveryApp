import React, { useState } from 'react';
import BrandLogo from '../../../assets/BrandLogo.png';
import { Link } from 'react-router';
import useLocationData from '@/hooks/useLocationData';
import { useSelector } from 'react-redux';
import './_navbar.scss';

const Navbar = () => {
  useLocationData();

  const qty = useSelector((state) => state.cart.totalQuantity);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="navbar">
      <div className="navbar__container">
        <div className="navbar__brand">
          <Link to="/">
            <img src={BrandLogo} alt="Food Delivery App Logo" className="navbar__logo" />
          </Link>
        </div>
        <div className="navbar__menu">
          <Link to="/" className="navbar__menu-item">
            Home
          </Link>
          <Link to="/search" className="navbar__menu-item">
            <span className="material-symbols-outlined navbar__menu-icon">search</span>
            Search
          </Link>
          <Link to="/about" className="navbar__menu-item">
            About
          </Link>
          <Link to="/cart" className="navbar__menu-item navbar__menu-item--cart">
            <span className="navbar__menu-text">Cart</span>
            <div className="navbar__cart-icon-wrapper">
              <span className="material-symbols-outlined">shopping_cart</span>
              <span className="navbar__cart-badge">{qty}</span>
            </div>
          </Link>
          <button className="navbar__mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="navbar__mobile-menu">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="navbar__mobile-item">
            Home
          </Link>
          <Link to="/search" onClick={() => setIsMobileMenuOpen(false)} className="navbar__mobile-item">
            <span className="material-symbols-outlined navbar__mobile-icon">search</span>
            Search
          </Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="navbar__mobile-item">
            About
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
