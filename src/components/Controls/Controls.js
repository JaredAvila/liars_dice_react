import React from "react";
import * as styles from "./Controls.module.css";
import { Typography } from "@material-ui/core";
import Dice from "../Dice/Dice";

const Controls = (props) => {
  let markup = (
    <div className={styles.LiftContainer}>
      <button onClick={props.ongameActive}>Start Game</button>
    </div>
  );
  if (props.gameActive) {
    markup = (
      <div className={styles.LiftContainer}>
        <Typography className={styles.HandTitle} variant="h6">
          Your hand
        </Typography>
        <Dice userHand={props.userHand} />
        <button onClick={props.onCallHand}>Lift</button>
      </div>
    );
  }
  return markup;
};

export default Controls;
