import React from "react";
import * as styles from "./Dice.module.css";
import Paper from "@material-ui/core/Paper";
import Die from "../Die/Die";
const Dice = (props) => {
  return (
    <div className={styles.DiceContainer}>
      {props.userHand.map((num, i) => {
        return (
          <Paper className={styles.Die} key={i}>
            <Die number={num} />
          </Paper>
        );
      })}
    </div>
  );
};

export default Dice;
