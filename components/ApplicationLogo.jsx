// import NoteApp from "@img/NoteApp.png";
import Image from "next/image";
import { useEffect, useState } from "react";

const ApplicationLogo = ({ height, classes, ...props }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const defaultHeight = 45

  const logoHeight =
    height ? height :
      isMobile ? defaultHeight / 1.5 : defaultHeight;

  return (
    <a href="/">
      {/* <Image
        src={NoteApp}
        alt="NoteApp Logo"
        height={logoHeight}
        className={classes}
        {...props}
      /> */}
      <h1 className="navbar-brand mb-0 text-primary">SFSTasks</h1>
    </a>
  );
};

export default ApplicationLogo;
