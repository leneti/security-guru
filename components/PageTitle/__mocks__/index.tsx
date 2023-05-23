export function PageTitle({ children }: { children?: string }) {
  const ext = "SG-Test";
  const fullTitle = `Mock ${children ? `${children} | ${ext}` : ext}`;

  return <title>{fullTitle}</title>;
}
