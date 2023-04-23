import { GetInTouch, PageBackground } from "@components";

const pageTitle = "Susisiekite";

export default function Contacts() {
  return (
    <PageBackground pageTitle={pageTitle}>
      <GetInTouch />
    </PageBackground>
  );
}
