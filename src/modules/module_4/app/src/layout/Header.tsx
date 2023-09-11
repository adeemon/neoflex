import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ButtonMain } from '../components/ui-toolkit/buttonMain/ButtonMain';

const Header: React.FC = () =>
  (
    <header className="header">
      <p className="header__company-name">
        <Link to="/" className="header__homepage-link">
          NeoBank
        </Link>
      </p>
      <input id="menu-toggle" type="checkbox" />
      <label className="menu-btn" htmlFor="menu-toggle">
        <span> </span>
      </label>
      <nav className="header__nav">
        <ul className="main-navigation">
          <li className="main-navigation__element">
            <NavLink
              to="loan"
              className={ ({ isActive }) =>
                `main-navigation__link${(isActive ? '-active' : '')}` }
            >
              Product card
            </NavLink>
          </li>
          <li className="main-navigation__element">
            <a className="main-navigation__link" href="/" target="_self">
              Product
            </a>
          </li>
          <li className="main-navigation__element">
            <a className="main-navigation__link" href="/" target="_self">
              Account
            </a>
          </li>
          <li className="main-navigation__element">
            <a className="main-navigation__link" href="/" target="_self">
              Resources
            </a>
          </li>
        </ul>
      </nav>
      <ButtonMain className="header__lk-button" label="Online Bank" />
    </header>
  );

export default Header;
