import Head from "next/head";
import { APP_NAME, APP_NAME_DEV } from "@site/constants";

export default function PageTitle({ children }: { children?: string }) {
  const ext = process.env.NODE_ENV.includes("dev") ? APP_NAME_DEV : APP_NAME;
  const fullTitle = children ? `${children} | ${ext}` : ext;

  return (
    <Head>
      <title>{fullTitle}</title>
    </Head>
  );
}
