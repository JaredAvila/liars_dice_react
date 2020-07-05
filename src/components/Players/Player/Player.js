import React from "react";
import * as styles from "./Player.module.css";
import { Typography } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const Player = (props) => {
  let markup = (
    <div className={styles.PlayerContainer}>
      <Chip
        avatar={<Avatar>{props.player.name[0]}</Avatar>}
        label={props.player.name}
        variant="outlined"
        className={styles.Player}
      />
      {props.player.lastCall ? (
        <Typography variant="body1">
          Last call: {props.formatCall(props.player.lastCall)[0]}
        </Typography>
      ) : (
        ""
      )}
    </div>
  );
  if (props.player.turn) {
    markup = (
      <div className={styles.PlayerContainerActive}>
        <ArrowForwardIcon />
        <Chip
          avatar={<Avatar>{props.player.name[0]}</Avatar>}
          label={props.player.name}
          variant="outlined"
          className={styles.Player}
        />
        {props.player.lastCall ? (
          <Typography variant="body1">
            Last call: {props.formatCall(props.player.lastCall)[0]}
          </Typography>
        ) : (
          ""
        )}
      </div>
    );
  }

  return markup;
};

export default Player;
