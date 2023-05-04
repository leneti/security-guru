import { PageBackground } from "@components/PageBackground";
import { GetInTouch } from "@components/GetInTouch";

const pageTitle = "Susisiekite";

export default function Contacts() {
  return (
    <PageBackground pageTitle={pageTitle}>
      <GetInTouch />
    </PageBackground>
  );
}
