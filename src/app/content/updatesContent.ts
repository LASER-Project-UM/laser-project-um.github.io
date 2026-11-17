import updatesText from "../../../EDIT-CONTENT/UPDATES.txt?raw";

export type PicturePlacement = "up" | "down" | "left" | "right";

export type UpdatePost = {
  title: string;
  author?: string;
  date: string;
  text: string;
  picture?: string;
  picturePlacement: PicturePlacement;
  separatePage: boolean;
  link?: string;
  linkLabel?: string;
  links: Array<{ url: string; label: string }>;
  slug: string;
};

const numberedLinkFields = Array.from({ length: 5 }, (_, index) => [`LINK ${index + 1}`, `LINK ${index + 1} LABEL`]).flat();

const updateFields = new Set([
  "TITLE",
  "AUTHOR",
  "DATE",
  "TEXT",
  "PICTURE",
  "PICTURE PLACEMENT",
  "SEPARATE PAGE",
  "LINK",
  "LINK LABEL",
  ...numberedLinkFields,
]);

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function dateValue(date = "") {
  const parsed = Date.parse(date);
  if (!Number.isNaN(parsed)) return parsed;
  const year = date.match(/\b\d{4}\b/);
  return year ? Number(year[0]) : 0;
}

function normalizePlacement(value = "up"): PicturePlacement {
  const placement = value.trim().toLowerCase();
  if (placement === "bottom") return "down";
  return (["up", "down", "left", "right"] as PicturePlacement[]).includes(placement as PicturePlacement)
    ? (placement as PicturePlacement)
    : "up";
}

function parseBlock(block: string): UpdatePost | null {
  const fields: Record<string, string> = {};
  const textLines: string[] = [];
  let readingText = false;

  for (const rawLine of block.split("\n")) {
    const trimmed = rawLine.trim();
    if (!readingText && (!trimmed || trimmed.startsWith("#") || /^=+$/.test(trimmed))) continue;

    const match = trimmed.match(/^([A-Z][A-Z0-9 ]*):\s*(.*)$/);
    if (match && updateFields.has(match[1])) {
      const [, key, value] = match;
      readingText = key === "TEXT";
      if (readingText) {
        if (value) textLines.push(value);
      } else {
        fields[key] = value.trim();
      }
      continue;
    }

    if (readingText) textLines.push(rawLine.trimEnd());
  }

  const title = fields.TITLE?.trim();
  if (!title) return null;

  const links = Array.from({ length: 5 }, (_, index) => {
    const number = index + 1;
    const url = fields[`LINK ${number}`]?.trim();
    return url ? { url, label: fields[`LINK ${number} LABEL`]?.trim() || `View session ${number}` } : null;
  }).filter((link): link is { url: string; label: string } => Boolean(link));

  return {
    title,
    author: fields.AUTHOR?.trim() || undefined,
    date: fields.DATE?.trim() || "",
    text: textLines.join("\n").trim(),
    picture: fields.PICTURE?.trim() || undefined,
    picturePlacement: normalizePlacement(fields["PICTURE PLACEMENT"]),
    separatePage: fields["SEPARATE PAGE"]?.trim().toLowerCase() === "yes",
    link: fields.LINK?.trim() || undefined,
    linkLabel: fields["LINK LABEL"]?.trim() || undefined,
    links,
    slug: slugify(title),
  };
}

export function getUpdatePosts() {
  const [, itemsText = ""] = updatesText.split(/^ITEMS\s*$/m);
  return itemsText
    .split(/^---\s*$/m)
    .map(parseBlock)
    .filter((post): post is UpdatePost => Boolean(post))
    .sort((a, b) => dateValue(b.date) - dateValue(a.date));
}

export function updatePictureUrl(post: UpdatePost) {
  return post.picture
    ? `${import.meta.env.BASE_URL}updates/${post.picture.split("/").map(encodeURIComponent).join("/")}`
    : undefined;
}

export function updateExcerpt(text: string, length = 260) {
  const compact = text.replace(/\s+/g, " ").trim();
  return compact.length > length ? `${compact.slice(0, length).trimEnd()}…` : compact;
}

