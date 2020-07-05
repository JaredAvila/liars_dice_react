import React, { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import io from "socket.io-client";

import MyModal from "../Modal/Modal";
import Score from "../Score/Score";
import Players from "../Players/Players";
import Controls from "../Controls/Controls";
import Nav from "../Nav/Nav";

import * as styles from "./Game.module.css";

let socket;

const Game = () => {
  if (!socket) {
    socket = io(":3001");
    socket.on("message", (msg) => {
      console.log(msg);
    });
  }

  const history = useHistory();
  const [gameActive, setgameActive] = useState(false);
  const [error, setError] = useState(null);
  const [numOfDice, setNumOfDice] = useState(0);
  const [currentCall, setCurrentCall] = useState(0);
  const [dieVal, setDieVal] = useState([1]);
  const [countVal, setCountVal] = useState();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [players, setPlayers] = useState([]);
  const [userHand, setUserHand] = useState([]);

  //COMPONENT DID MOUNT
  useEffect(() => {
    console.log("Component Did Mount");

    let newUser;
    if (!history.location.state) {
      newUser = "NOPE";
    } else {
      newUser = {
        name: history.location.state.userName,
        turn: false,
        lastCall: null,
        id: history.location.state.id,
        hand: null,
      };
      socket.emit("newUser", newUser);
    }

    setUser(newUser);
  }, []);

  // COMPONENET DID UPDATE
  useEffect(() => {
    console.log("re-rednered");
  }, [user, players]);

  const gameStartHandler = () => {
    socket.emit("gameStart");
  };

  socket.on("startGame", (data) => {
    // console.log("Start Game ", data);
    setPlayers(data.users);
    setgameActive(data.gameActive);

    if (user) {
      let newUser;
      setUser((user) => {
        newUser = data.users.find((el) => el.id === user.id);
        return newUser;
      });
      if (newUser) {
        setUserHand(newUser.hand);
      }
    }
  });

  socket.on("playerList", (data) => {
    setPlayers(data);
  });

  const formatCall = (num) => {
    let numArray = num.toString().split("");
    let formatedNum;
    if (numArray.length > 2) {
      formatedNum = numArray[0] + numArray[1] + " - " + numArray[2] + "'s";
    } else {
      formatedNum = numArray[0] + " - " + numArray[1] + "'s";
    }
    return [formatedNum, numArray];
  };

  const handleClose = () => {
    setUser((user) => {
      return { ...user, turn: false };
    });
    setOpen(false);
  };

  const selectChangedHandler = (e) => {
    setDieVal([e.target.value[1]]);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!countVal) {
      setError("*Must enter a value");
      return;
    }
    handleClose();
  };

  const countChangedHanlder = (e) => {
    setCountVal(e.target.value);
  };

  const callHandHandler = () => {
    setgameActive(false);
  };

  const logoutHandler = () => {
    //remove player from players list
    socket.emit("logOutUser", user);
    //remove player from state
    setUser("NOPE");
  };
  let html = (
    <div className={styles.Game}>
      <MyModal
        onModalClose={onSubmitHandler}
        open={open}
        quantity={countVal}
        onCountChanged={countChangedHanlder}
        onSelectChanged={selectChangedHandler}
        dieVal={dieVal}
        error={error}
      />
      <Score numOfDice={numOfDice} currentCall={currentCall} />
      <Players players={players} formatCall={formatCall} />
      <Controls
        userHand={userHand}
        onCallHand={callHandHandler}
        ongameActive={gameStartHandler}
        gameActive={gameActive}
      />
      <Nav onLogout={logoutHandler} />
    </div>
  );
  if (user === "NOPE") {
    html = <Redirect to="/" />;
  }
  return html;
};

export default Game;
