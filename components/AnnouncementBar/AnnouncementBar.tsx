"use client";

import { useLocalStorage } from "@mantine/hooks";
import Link from "@site/navigation/link";
import classes from "./AnnouncementBar.module.css";

export function AnnouncementBar() {
  const [showAnnouncementBar, setShowAnnouncementBar] = useLocalStorage({
    key: "show-announcement-bar",
    defaultValue: true,
  });

  if (!showAnnouncementBar) {
    return null;
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.announcementBar} role="banner">
        <div className={classes.announcementBarContent}>
          🎉️ Apsilankykite{" "}
          <b>
            <Link
              href="https://securitygurushop.lt/"
              target="_blank"
              className={classes.content}
            >
              Security Guru e-parduotuvėje
            </Link>
            !
          </b>
          🥳️
        </div>
        <button
          type="button"
          aria-label="Close"
          className={classes.closeButton}
          onClick={() => setShowAnnouncementBar(false)}
        >
          <svg viewBox="0 0 15 15" width="14" height="14">
            <g stroke="currentColor" strokeWidth="3.1">
              <path d="M.75.75l13.5 13.5M14.25.75L.75 14.25"></path>
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}
