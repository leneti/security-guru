import { GetInTouch, PageBackground } from "@components";

const pageTitle = "Kontaktai";

export default function Contacts() {
  return (
    <PageBackground pageTitle={pageTitle}>
      <GetInTouch />
    </PageBackground>
  );
}
