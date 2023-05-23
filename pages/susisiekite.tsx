import { PageBackground } from "@site/components/PageBackground";
import { GetInTouch } from "@site/components/GetInTouch";

const pageTitle = "Susisiekite";

export default function Contacts() {
  return (
    <PageBackground pageTitle={pageTitle}>
      <GetInTouch />
    </PageBackground>
  );
}
