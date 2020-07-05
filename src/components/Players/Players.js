import React from "react";
import * as styles from "./Players.module.css";
import Player from "./Player/Player";

const Players = (props) => {
  return (
    <div className={styles.PlayersContainer}>
      {props.players.map((player, i) => {
        return <Player player={player} key={i} formatCall={props.formatCall} />;
      })}
    </div>
  );
};

export default Players;
