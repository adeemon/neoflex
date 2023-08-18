function Header() {
  return (
    <header className="header">
        <p className="header__company-name">
            <a className="header__homepage-link" href="#" >
              NeoBank
            </a>
        </p>
        <input id="menu-toggle" type="checkbox" />
        <label className="menu-btn" htmlFor="menu-toggle">
          <span></span>
      </label>
        <nav className="header__nav">
            <ul className="main-navigation">
                <li className="main-navigation__element">
                    <a className="main-navigation__link" href="#" target="_self" >
                      Credit card
                    </a>
                </li>
                <li className="main-navigation__element">
                    <a className="main-navigation__link" href="#" target="_self" >
                      Product
                    </a>
                </li>
                <li className="main-navigation__element">
                    <a className="main-navigation__link" href="#" target="_self" >
                      Account
                    </a>
                </li>
                <li className="main-navigation__element">
                    <a className="main-navigation__link" href="#" target="_self" >
                      Resources
                    </a>
                </li>
            </ul>
        </nav>
        <button className="header__lk-button">
          <span className="header_lk-button-text">
            Online Bank
          </span>
        </button>
    </header>
  );
}

export default Header;
