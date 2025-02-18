import React from "react";
import "../style/footer.css";

const Footer = () => {
  return (
    <div className="developer-credit">
      <p onClick={() => window.open("https://mamoon-portfolio.vercel.app/", "_blank")}>
        Develop By <span>M. Mamoon</span>
      </p>
    </div>
  );
};

export default Footer;
