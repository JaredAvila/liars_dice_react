import React from "react";
import * as styles from "./Score.module.css";
import { Typography } from "@material-ui/core";

const Score = (props) => {
  return (
    <div className={styles.Score}>
      <Typography variant="h6">Total # of Dice: {props.numOfDice}</Typography>
      <Typography variant="h6">Current Call: {props.currentCall}</Typography>
    </div>
  );
};

export default Score;
