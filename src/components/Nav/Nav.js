import React from "react";
import { Typography } from "@material-ui/core";

const Nav = (props) => {
  return (
    <nav>
      <Typography variant="h6">Liars Dice</Typography>
      <button onClick={props.onLogout}>Logout</button>
    </nav>
  );
};

export default Nav;
