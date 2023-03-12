import Head from "next/head";

export default function PageTitle({ children }: { children?: string }) {
  return (
    <Head>
      <title>
        {children ? `${children} | Security Guru` : "Security Guru"}
      </title>
    </Head>
  );
}
