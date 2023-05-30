import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { AuthContextProvider } from "../context/authContext";

type Props = {
  children: JSX.Element;
};
function Layout({ children }: Props) {
  return (
    <div className="layout">
      <AuthContextProvider>
        <Navbar />
        <div>{children}</div>
        <Footer />
      </AuthContextProvider>
    </div>
  );
}

export default Layout;
