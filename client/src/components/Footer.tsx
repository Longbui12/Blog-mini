import React from "react";
import Image from "next/image";
import Logo from "../img/logo.png";
const Footer = () => {
  return (
    <footer>
      <Image src={Logo} alt="logo" />
      <span>
        Made with ❤️ fashion and <b>NextJS.tsx & Nodejs</b>
      </span>
    </footer>
  );
};

export default Footer;
