import Link from "next/link";
import { useEffect, useState } from "react";

const ApplicationLogo = () => {
  return (
    <Link href="/">
      <h1 className="navbar-brand mb-0 text-primary">SFSTasks</h1>
    </Link>
  );
};

export default ApplicationLogo;
