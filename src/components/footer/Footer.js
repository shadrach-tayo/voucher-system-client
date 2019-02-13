import React from "react";
import "./footer.css";

import githubImg from "../../images/github.svg";
import twitterImg from "../../images/twitter.svg";
import linkedinImg from "../../images/linkedin.svg";

const Footer = () => (
  <footer>
    <div className="footer__text">
      Made with love by{" "}
      <a
        href="httdivs://github.com/shadrach-tayo"
        rel="noopener noreferrer"
        className="footer__link"
      >
        shadrach
      </a>
      <a href="https://github.com/shadrach-tayo" rel="noopener noreferrer">
        <img alt="github icon" className="social github" src={githubImg} />
      </a>
      <a href="https://twitter.com/oloyedeshadrach" rel="noopener noreferrer">
        <img alt="twitter icon" className="social twitter" src={twitterImg} />
      </a>
      <a href="https://linkedin.com/shadrach-oloyede" rel="noopener noreferrer">
        <img
          alt="linkedin icon"
          className="social linkedin"
          src={linkedinImg}
        />
      </a>
    </div>
  </footer>
);

export default Footer;
