"use client";

import { Player } from "@lottiefiles/react-lottie-player";
import classes from "./apie-mus.module.css";

export default function LottieAnimation() {
  return (
    <Player
      autoplay
      src="lottie_animations/cctv.json"
      className={classes.animation}
    />
  );
}
