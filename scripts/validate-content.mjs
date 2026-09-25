import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();

const files = [
  {
    name: "UPDATES.txt",
    required: ["TITLE", "DATE", "DESCRIPTION", "LINK"],
    allowed: ["TITLE", "DATE", "DESCRIPTION", "LINK", "LINK LABEL"],
  },
  {
    name: "DATASETS.txt",
    required: ["TITLE", "DATE", "DESCRIPTION", "LINK"],
    allowed: ["TITLE", "AUTHORS", "DATE", "DESCRIPTION", "LINK", "LINK LABEL"],
  },
  {
    name: "PUBLICATIONS.txt",
    required: ["TYPE", "TITLE", "AUTHORS", "DATE", "VENUE", "LINK"],
    allowed: ["TYPE", "TITLE", "AUTHORS", "DATE", "VENUE", "DESCRIPTION", "LINK", "LINK LABEL"],
    types: ["Publication", "Conference Talk", "Conference Poster", "Conference Panel", "Conference Keynote"],
  },
];

const errors = [];

function addError(file, entry, message) {
  errors.push(`${file} — ${entry}: ${message}`);
}

function validDate(value) {
  if (!/\b\d{4}\b/.test(value)) return false;
  return !Number.isNaN(Date.parse(value));
}

function validWebUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

for (const config of files) {
  const filePath = path.join(root, "EDIT-CONTENT", config.name);
  if (!fs.existsSync(filePath)) {
    errors.push(`${config.name}: file is missing from EDIT-CONTENT.`);
    continue;
  }

  const text = fs.readFileSync(filePath, "utf8");
  const itemsMarker = text.match(/^ITEMS\s*$/m);
  if (!itemsMarker) {
    errors.push(`${config.name}: the ITEMS heading is missing.`);
    continue;
  }

  const itemsText = text.slice(itemsMarker.index + itemsMarker[0].length);
  const blocks = itemsText.split(/^---\s*$/m);
  let entryNumber = 0;

  for (const block of blocks) {
    const fields = {};
    const duplicateFields = [];
    const malformedLines = [];

    for (const rawLine of block.split("\n")) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#") || /^=+$/.test(line)) continue;

      const match = line.match(/^([A-Z][A-Z ]*):\s*(.*)$/);
      if (!match) {
        malformedLines.push(line);
        continue;
      }

      const [, key, value] = match;
      if (fields[key] !== undefined) duplicateFields.push(key);
      fields[key] = value.trim();
    }

    if (Object.keys(fields).length === 0 && malformedLines.length === 0) continue;
    entryNumber += 1;
    const entry = `Entry ${entryNumber}${fields.TITLE ? ` (${fields.TITLE})` : ""}`;

    for (const line of malformedLines) {
      addError(config.name, entry, `line is not in FIELD: value format: "${line}"`);
    }

    for (const key of duplicateFields) {
      addError(config.name, entry, `${key} appears more than once. A --- separator may be missing between entries.`);
    }

    for (const key of Object.keys(fields)) {
      if (!config.allowed.includes(key)) {
        addError(config.name, entry, `unknown field ${key}. Check its spelling.`);
      }
    }

    for (const key of config.required) {
      if (!fields[key]) addError(config.name, entry, `${key} is required.`);
    }

    if (fields.DATE && !validDate(fields.DATE)) {
      addError(config.name, entry, `DATE "${fields.DATE}" is not recognized. Use a format such as June 2027 or June 15, 2027.`);
    }

    if (fields.LINK && !validWebUrl(fields.LINK)) {
      addError(config.name, entry, "LINK must be a complete http:// or https:// address.");
    }

    if (config.types && fields.TYPE && !config.types.includes(fields.TYPE)) {
      addError(config.name, entry, `TYPE must be one of: ${config.types.join(", ")}.`);
    }
  }
}

if (errors.length > 0) {
  console.error("\nContent validation failed:\n");
  errors.forEach((error) => console.error(`  • ${error}`));
  console.error("\nFix the listed item(s), then run the build again.\n");
  process.exit(1);
}

console.log("Content validation passed: updates, datasets, and publications are ready to build.");
