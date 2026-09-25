export type PlainTextItem = Record<string, string>;

function dateValue(date = "") {
  const parsed = Date.parse(date);
  if (!Number.isNaN(parsed)) return parsed;
  const year = date.match(/\b\d{4}\b/);
  return year ? Number(year[0]) : 0;
}

export function sortNewestFirst(items: PlainTextItem[]) {
  return [...items].sort((a, b) => dateValue(b.DATE) - dateValue(a.DATE));
}

export function parsePlainTextListing(text: string) {
  const [beforeItems, itemsText = ""] = text.split(/^ITEMS\s*$/m);
  const emptyMessage = beforeItems
    .split(/^EMPTY MESSAGE\s*$/m)[1]
    ?.split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !/^=+$/.test(line) && !line.startsWith("#"))
    .join(" ") ?? "";

  const items = itemsText
    .split(/^---\s*$/m)
    .map((block) => {
      const item: PlainTextItem = {};
      block.split("\n").forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#") || /^=+$/.test(trimmed)) return;
        const match = trimmed.match(/^([A-Z][A-Z ]*):\s*(.*)$/);
        if (match) item[match[1]] = match[2];
      });
      return item;
    })
    .filter((item) => item.TITLE);

  return { emptyMessage, items };
}
