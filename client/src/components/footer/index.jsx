import BrandLogo from '../../../assets/BrandLogoBlack.png';
import Config from '@/configs/configs';
import './_footer.scss';

const { LINKEDIN_URL, GMAIL, GITHUB_URL, PORTFOLIO_URL } = Config;

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__logo-wrapper">
        <img src={BrandLogo} alt="Brand Logo Black" className="footer__logo" />
      </div>
      <div className="footer__content">
        <p className="footer__copyright">
          © Designed and Developed By Manuj Haritwal.
        </p>
        <div className="footer__social-links">
          <a
            className="footer__social-link"
            href={GMAIL}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Gmail (opens in a new tab)"
            title="Gmail"
          >
            <span className="material-symbols-outlined">mail</span>
          </a>
          <a
            className="footer__social-link"
            href={PORTFOLIO_URL}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Portfolio (opens in a new tab)"
            title="Portfolio"
          >
            <span className="material-symbols-outlined">globe_book</span>
          </a>
          <a
            className="footer__social-link"
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub (opens in a new tab)"
            title="GitHub"
          >
            <span className="material-symbols-outlined">deployed_code</span>
          </a>
          <a
            className="footer__social-link"
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn (opens in a new tab)"
            title="LinkedIn"
          >
            <span className="material-symbols-outlined">work</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
