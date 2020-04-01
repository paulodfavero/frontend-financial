import React from "react";
import { Link } from "react-router-dom";

import Theme from "../../styles/theme";

import Header from "../../components/header";

export default function Login() {
  return (
    <>
      <Theme>
        <Header />
        <Link to="/categoria">Categoria</Link>
      </Theme>
    </>
  );
}
