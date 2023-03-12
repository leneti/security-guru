import Head from "next/head";

export default function PageTitle({ children }: { children?: string }) {
  const ext =
    process.env.NODE_ENV === "development" ? "SG-Dev" : "Security Guru";
  const fullTitle = children ? `${children} | ${ext}` : ext;

  return (
    <Head>
      <title>{fullTitle}</title>
    </Head>
  );
}
