import { PageShell } from "./PageShell";
import updatesText from "../../../EDIT-CONTENT/UPDATES.txt?raw";
import { parsePlainTextListing, sortNewestFirst } from "../content/plainTextContent";
import { PlainTextListing } from "./PlainTextListing";

export function Blog() {
  const content = parsePlainTextListing(updatesText);
  const sortedContent = { ...content, items: sortNewestFirst(content.items) };
  return (
    <PageShell breadcrumb={[["Home", "/"], ["Updates"]]}>
      <header className="mb-8 max-w-3xl">
        <h1 className="mb-5 text-4xl font-semibold lg:text-5xl">Research Updates</h1>
      </header>
      <PlainTextListing {...sortedContent} />
    </PageShell>
  );
}
