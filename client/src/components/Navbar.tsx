import React, { useContext, useEffect, useState } from "react";
import Logo from "../img/logo.png";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogout = () => {
    logout();
    setIsLoggedOut(true);
  };

  // const [text, setText] = useState("");

  // useEffect(() => {
  //   console.log("current user has changed:", currentUser);
  //   if (currentUser) {
  //     setText(currentUser.username);
  //   } else {
  //     setText(" ");
  //   }
  // }, [currentUser]);

  // useEffect(() => {
  //   console.log("current user has changed:", currentUser);
  // }, [currentUser]);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link className="link" href="/">
            <Image src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" href="/?fashion=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" href="/?fashion=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" href="/?fashion=life-style">
            <h6>LIFE STYLE</h6>
          </Link>
          <Link className="link" href="/?fashion=suit">
            <h6>SUIT</h6>
          </Link>
          <Link className="link" href="/?fashion=denim">
            <h6>DENIM</h6>
          </Link>
          <Link className="link" href="/?fashion=accessories">
            <h6>ACCESSORIES</h6>
          </Link>
          <Link className="link" href="/?fashion=shoes">
            <h6>SHOES</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {/* <span>{text}</span> */}
          {currentUser ? (
            <span onClick={handleLogout} key="logout">
              Logout
            </span>
          ) : (
            <Link className="link" href="/Login" key="login">
              Login
            </Link>
          )}

          <span className="write">
            <Link className="link" href="/Write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

{
  /* <Link href="/">Home</Link>
        &ensp;
        <Link href="/Single">Single</Link>
        &ensp;
        <Link
          href={{
            pathname: "/Write",
            query: { slug: "my-post" },
          }}
        >
          Write
        </Link>
        &ensp; */
}
