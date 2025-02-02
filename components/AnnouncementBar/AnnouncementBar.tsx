import { cookies } from "next/headers";
import { Cookies } from "@site/constants/cookies";
import Link from "@site/navigation/link";
import classes from "./AnnouncementBar.module.css";

export async function AnnouncementBar() {
  async function handleAnnouncementBarClose() {
    "use server";
    const cookieStore = await cookies();
    if (cookieStore.get(Cookies.Consent)?.value === "1") {
      cookieStore.set(Cookies.HideAnnouncementBar, "1");
    }
  }

  const cookieStore = await cookies();
  const hasCookieConsent = cookieStore.get(Cookies.Consent)?.value === "1";
  const hideAnnouncementBar =
    cookieStore.get(Cookies.HideAnnouncementBar)?.value === "1";

  if (hideAnnouncementBar) return null;

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
        {hasCookieConsent && (
          <button
            type="button"
            aria-label="Close"
            className={classes.closeButton}
            onClick={handleAnnouncementBarClose}
          >
            <svg viewBox="0 0 15 15" width="14" height="14">
              <g stroke="currentColor" strokeWidth="3.1">
                <path d="M.75.75l13.5 13.5M14.25.75L.75 14.25"></path>
              </g>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
