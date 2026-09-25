import { PageShell } from "./PageShell";
import datasetsText from "../../../EDIT-CONTENT/DATASETS.txt?raw";
import { parsePlainTextListing, sortNewestFirst } from "../content/plainTextContent";
import { PlainTextListing } from "./PlainTextListing";

export function Datasets() {
  const content = parsePlainTextListing(datasetsText);
  const sortedContent = { ...content, items: sortNewestFirst(content.items) };
  return (
    <PageShell breadcrumb={[["Home", "/"], ["Datasets"]]}>
      <header className="mb-8 max-w-3xl">
        <h1 className="mb-5 text-4xl font-semibold lg:text-5xl">Open Datasets</h1>
      </header>
      <PlainTextListing {...sortedContent} />
    </PageShell>
  );
}
