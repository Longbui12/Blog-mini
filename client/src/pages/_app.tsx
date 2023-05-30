//import Layout from "@/components/Layout";
import "@/styles/style.scss";
import type { AppProps } from "next/app";
import React, { useState, useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <>
        <div className="app">
          <div className="container">
            {/* <Layout> */}
            <Component {...pageProps} />
            {/* </Layout> */}
          </div>
        </div>
      </>
    );
  }
}
