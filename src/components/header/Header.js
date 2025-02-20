import React from 'react';
import './Header.css';

function Header({ navLinks }) {
  return (
    <header className="app-header">
      <div className="logo-container">
        <img src="/images/logo.svg" alt="PetFoodDesigner" className="logo" />
      </div>
      <nav className="navigation">
        <ul className="nav-links">
          {navLinks && navLinks.map((link, index) => (
            <li key={index} className={link.dropdown ? 'dropdown' : ''}>
              <a href={link.href} className={link.dropdown ? 'dropbtn' : ''}>{link.text}</a>
              {link.dropdown && (
                <div className="dropdown-content">
                  {link.dropdown.map((dropdownLink, dropdownIndex) => (
                    <a key={dropdownIndex} href={dropdownLink.href}>{dropdownLink.text}</a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
