import React from "react";
import Input from "@material-ui/core/Input";
import Modal from "@material-ui/core/Modal";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Typography } from "@material-ui/core";

import * as styles from "./Modal.module.css";

const MyModal = (props) => {
  const numbers = [1, 2, 3, 4, 5, 6];

  return (
    <Modal
      open={props.open}
      onClose={props.onModalClose}
      aria-labelledby="Make a guess"
      aria-describedby="enter your guess"
    >
      <div className={styles.Call}>
        <Typography className={styles.FormTitle} variant="body1">
          Your call:
        </Typography>
        <Typography className={styles.ErrorText} variant="body1">
          {props.error}
        </Typography>

        <form onSubmit={props.onModalClose} className={styles.Form}>
          <input
            value={props.quantity}
            onChange={props.onCountChanged}
            type="text"
            placeholder="Quantity"
            maxLength={2}
            className={styles.Count}
          />
          <FormControl>
            <Select
              multiple
              value={props.dieVal}
              onChange={props.onSelectChanged}
              input={<Input />}
            >
              {numbers.map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <button type="submit">Bet</button>
        </form>
      </div>
    </Modal>
  );
};

export default MyModal;
