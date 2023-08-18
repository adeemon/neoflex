import companyLogo from '../assets/images/content/logo 1.png'

function Footer() {
    return (
        <footer className="footer">
        <figure className="footer__logo">
            <img src={companyLogo} alt="NeoBank Logo" />
        </figure>
        <div className="footer__contacts">
            <address className="footer__phone">
                <a className="footer__phone-link" href="tel:+74959842513" aria-label="Позвонить по телефону">
                    <span className="footer__phone-text">+7 (495) 984 25 13</span>
                </a>
            </address>
            <address className="footer__email">
                <a className="footer__email-link" href="mailto:info@neoflex.ru" aria-label="Написать письмо">
                    <span className="footer__email-text">info@neoflex.ru</span> </a>
            </address>
        </div>
        <nav className="footer__navigation">
            <ul className="extra-navigation">
                <li className="extra-navigation__element">
                    <a className="extra-navigation__link" href="#" target="_blank" rel="noopener noreferrer">
                      About bank
                    </a>
                </li>
                <li className="extra-navigation__element">
                    <a className="extra-navigation__link" href="#" target="_blank" rel="noopener noreferrer">
                      Ask a Question
                    </a>
                </li>
                <li className="extra-navigation__element">
                    <a className="extra-navigation__link" href="#" target="_blank" rel="noopener noreferrer">
                      Quality of service
                    </a>
                </li>
                <li className="extra-navigation__element">
                    <a className="extra-navigation__link" href="#" target="_blank" rel="noopener noreferrer">
                      Requisites
                    </a>
                </li>
                <li className="extra-navigation__element">
                    <a className="extra-navigation__link" href="#" target="_blank" rel="noopener noreferrer">
                      Press center
                    </a>
                </li>
                <li className="extra-navigation__element">
                    <a className="extra-navigation__link" href="#" target="_blank" rel="noopener noreferrer">
                      Bank career
                    </a>
                </li>
                <li className="extra-navigation__element">
                    <a className="extra-navigation__link" href="#" target="_blank" rel="noopener noreferrer">
                      Investors
                    </a>
                </li>
                <li className="extra-navigation__element">
                    <a className="extra-navigation__link" href="#" target="_blank" rel="noopener noreferrer">
                      Analytics
                    </a>
                </li>
                <li className="extra-navigation__element">
                    <a className="extra-navigation__link" href="#" target="_blank" rel="noopener noreferrer">
                      Business and processes
                    </a>
                </li>
                <li className="extra-navigation__element">
                    <a className="extra-navigation__link" href="#" target="_blank" rel="noopener noreferrer">
                      Compliance and business ethics
                    </a>
                </li>
            </ul>
        </nav>
        <p className="footer__cookie-info">
            We use cookies to personalize our services and improve the user experience of our website. Cookies are small files containing information about previous visits to a website. If you do not want to use cookies, please change your browser settings
        </p>
    </footer>
    );
  }
  
  export default Footer;
  