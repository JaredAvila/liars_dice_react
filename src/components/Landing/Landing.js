import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

import * as styles from "./Landing.module.css";

const Landing = () => {
  const [nameInput, setNameInput] = useState("");
  const [error, setError] = useState("");
  let history = useHistory();
  const userId = Math.random() * Math.random();

  const inputChangedHandler = (e) => {
    setNameInput(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!nameInput) {
      setError("Invalid Name");
      return;
    }
    history.push("/game", { userName: nameInput, id: userId });
  };
  return (
    <div className={styles.Landing}>
      <Typography className={styles.Title} variant="h2">
        Liars Dice
      </Typography>
      <Paper className={styles.FormWrap} elevation={3}>
        <form onSubmit={onSubmitHandler} className={styles.Form}>
          <label htmlFor="name">Pick your liars name</label>
          <input
            value={nameInput}
            onChange={inputChangedHandler}
            type="text"
            name="name"
            placeholder="enter your name"
            maxLength={15}
          />
          <button type="submit">Start Game</button>
          <Typography className={styles.ErrorText} variant="body1">
            {error}
          </Typography>
        </form>
      </Paper>
    </div>
  );
};

export default Landing;
