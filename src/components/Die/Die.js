import React from "react";
import * as styles from "./Die.module.css";

const Die = (props) => {
  let face;
  switch (props.number) {
    case 1:
      face = <div className={styles.Dot} />;
      break;
    case 2:
      face = (
        <div className={styles.Two}>
          <div className={styles.TwoUp}></div>
          <div className={styles.TwoDn}></div>
        </div>
      );
      break;
    case 3:
      face = (
        <div className={styles.Two}>
          <div className={styles.TwoUp}></div>
          <div className={styles.ThreeMid}></div>
          <div className={styles.TwoDn}></div>
        </div>
      );
      break;
    case 4:
      face = (
        <div className={styles.Two}>
          <div className={styles.FourTop}>
            <div className={styles.Dot}></div>
            <div className={styles.Dot}></div>
          </div>
          <div className={styles.FourBot}>
            <div className={styles.Dot}></div>
            <div className={styles.Dot}></div>
          </div>
        </div>
      );
      break;
    case 5:
      face = (
        <div className={styles.Two}>
          <div className={styles.FourTop}>
            <div className={styles.Dot}></div>
            <div className={styles.Dot}></div>
          </div>
          <div className={styles.ThreeMid}></div>
          <div className={styles.FourBot}>
            <div className={styles.Dot}></div>
            <div className={styles.Dot}></div>
          </div>
        </div>
      );
      break;
    case 6:
      face = (
        <div className={styles.Two}>
          <div className={styles.FourTop}>
            <div className={styles.Dot}></div>
            <div className={styles.Dot}></div>
          </div>
          <div className={styles.FourTop}>
            <div className={styles.Dot}></div>
            <div className={styles.Dot}></div>
          </div>
          <div className={styles.FourBot}>
            <div className={styles.Dot}></div>
            <div className={styles.Dot}></div>
          </div>
        </div>
      );
      break;
    default:
      face = <p></p>;
  }
  return face;
};

export default Die;
