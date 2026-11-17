import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();

const files = [
  {
    name: "DATASETS.txt",
    required: ["TITLE", "DATE", "DESCRIPTION", "LINK"],
    allowed: ["TITLE", "AUTHORS", "DATE", "DESCRIPTION", "LINK", "LINK LABEL"],
  },
  {
    name: "PUBLICATIONS.txt",
    required: ["TYPE", "TITLE", "AUTHORS", "DATE", "VENUE"],
    allowed: ["TYPE", "TITLE", "AUTHORS", "DATE", "VENUE", "PRESENTATION TYPE", "LOCATION", "DESCRIPTION", "LINK", "LINK LABEL"],
    types: ["Publication", "Conference"],
  },
];

const errors = [];
const peopleFile = path.join(root, "src", "edit", "EDIT_PEOPLE.txt");

function addError(file, entry, message) {
  errors.push(`${file} — ${entry}: ${message}`);
}

if (!fs.existsSync(peopleFile)) {
  errors.push("EDIT_PEOPLE.txt: file is missing from src/edit.");
} else {
  const text = fs.readFileSync(peopleFile, "utf8");
  const marker = text.match(/^PEOPLE\s*$/m);
  const allowedFields = ["CATEGORY", "NAME", "TITLE", "TEAMS", "BIO", "PHOTO"];
  const categories = ["Principal Investigator", "Team Member", "External Advisor", "Past Collaborator"];
  const names = new Set();

  if (!marker) {
    errors.push("EDIT_PEOPLE.txt: the PEOPLE heading is missing.");
  } else {
    const blocks = text.slice(marker.index + marker[0].length).split(/^---\s*$/m);
    let entryNumber = 0;
    for (const block of blocks) {
      const fields = {};
      const duplicates = [];
      const malformed = [];
      for (const rawLine of block.split("\n")) {
        const line = rawLine.trim();
        if (!line || line.startsWith("#") || /^=+$/.test(line)) continue;
        const match = line.match(/^([A-Z][A-Z ]*):\s*(.*)$/);
        if (!match) { malformed.push(line); continue; }
        const [, key, value] = match;
        if (fields[key] !== undefined) duplicates.push(key);
        fields[key] = value.trim();
      }
      if (Object.keys(fields).length === 0 && malformed.length === 0) continue;
      entryNumber += 1;
      const entry = `Entry ${entryNumber}${fields.NAME ? ` (${fields.NAME})` : ""}`;
      malformed.forEach((line) => addError("EDIT_PEOPLE.txt", entry, `line is not in FIELD: value format: "${line}"`));
      duplicates.forEach((key) => addError("EDIT_PEOPLE.txt", entry, `${key} appears more than once. A --- separator may be missing.`));
      Object.keys(fields).filter((key) => !allowedFields.includes(key)).forEach((key) => addError("EDIT_PEOPLE.txt", entry, `unknown field ${key}. Check its spelling.`));
      if (!fields.NAME) addError("EDIT_PEOPLE.txt", entry, "NAME is required.");
      if (!fields.CATEGORY) addError("EDIT_PEOPLE.txt", entry, "CATEGORY is required.");
      if (fields.CATEGORY && !categories.includes(fields.CATEGORY)) addError("EDIT_PEOPLE.txt", entry, `CATEGORY must be one of: ${categories.join(", ")}.`);
      if (fields.NAME && names.has(fields.NAME)) addError("EDIT_PEOPLE.txt", entry, "NAME is duplicated.");
      if (fields.NAME) names.add(fields.NAME);
      if (fields.PHOTO && (!/^[^/\\]+$/.test(fields.PHOTO) || !fs.existsSync(path.join(root, "public", "people", fields.PHOTO)))) {
        addError("EDIT_PEOPLE.txt", entry, `PHOTO "${fields.PHOTO}" is not present in public/people.`);
      }
    }
  }
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

const updatesFile = path.join(root, "EDIT-CONTENT", "UPDATES.txt");

if (!fs.existsSync(updatesFile)) {
  errors.push("UPDATES.txt: file is missing from EDIT-CONTENT.");
} else {
  const text = fs.readFileSync(updatesFile, "utf8");
  const itemsMarker = text.match(/^ITEMS\s*$/m);
  const numberedLinkFields = Array.from({ length: 5 }, (_, index) => [`LINK ${index + 1}`, `LINK ${index + 1} LABEL`]).flat();
  const allowedFields = ["TITLE", "AUTHOR", "DATE", "TEXT", "PICTURE", "PICTURE PLACEMENT", "SEPARATE PAGE", "LINK", "LINK LABEL", ...numberedLinkFields];
  const placements = ["UP", "DOWN", "BOTTOM", "LEFT", "RIGHT"];
  const titles = new Set();

  if (!itemsMarker) {
    errors.push("UPDATES.txt: the ITEMS heading is missing.");
  } else {
    const blocks = text.slice(itemsMarker.index + itemsMarker[0].length).split(/^---\s*$/m);
    let entryNumber = 0;

    for (const block of blocks) {
      const fields = {};
      const duplicateFields = [];
      const textLines = [];
      const malformedLines = [];
      let readingText = false;

      for (const rawLine of block.split("\n")) {
        const line = rawLine.trim();
        if (!readingText && (!line || line.startsWith("#") || /^=+$/.test(line))) continue;

        const match = line.match(/^([A-Z][A-Z0-9 ]*):\s*(.*)$/);
        if (match && allowedFields.includes(match[1])) {
          const [, key, value] = match;
          if (fields[key] !== undefined) duplicateFields.push(key);
          readingText = key === "TEXT";
          fields[key] = value.trim();
          if (readingText && value) textLines.push(value.trim());
          continue;
        }

        if (readingText) textLines.push(rawLine.trimEnd());
        else if (line) malformedLines.push(line);
      }

      if (Object.keys(fields).length === 0 && malformedLines.length === 0) continue;
      entryNumber += 1;
      fields.TEXT = textLines.join("\n").trim();
      const entry = `Entry ${entryNumber}${fields.TITLE ? ` (${fields.TITLE})` : ""}`;

      malformedLines.forEach((line) => addError("UPDATES.txt", entry, `line is not a recognized FIELD: value line: "${line}"`));
      duplicateFields.forEach((key) => addError("UPDATES.txt", entry, `${key} appears more than once. A --- separator may be missing.`));
      ["TITLE", "DATE", "TEXT", "PICTURE PLACEMENT", "SEPARATE PAGE"].forEach((key) => {
        if (!fields[key]) addError("UPDATES.txt", entry, `${key} is required.`);
      });
      if (fields.TITLE && titles.has(fields.TITLE)) addError("UPDATES.txt", entry, "TITLE is duplicated.");
      if (fields.TITLE) titles.add(fields.TITLE);
      if (fields.DATE && !validDate(fields.DATE)) addError("UPDATES.txt", entry, `DATE "${fields.DATE}" is not recognized. Use a format such as June 2027 or June 15, 2027.`);
      if (fields["PICTURE PLACEMENT"] && !placements.includes(fields["PICTURE PLACEMENT"].toUpperCase())) {
        addError("UPDATES.txt", entry, "PICTURE PLACEMENT must be UP, DOWN, LEFT, or RIGHT.");
      }
      if (fields["SEPARATE PAGE"] && !["YES", "NO"].includes(fields["SEPARATE PAGE"].toUpperCase())) {
        addError("UPDATES.txt", entry, "SEPARATE PAGE must be YES or NO.");
      }
      if (fields.PICTURE && (!/^[^/\\]+$/.test(fields.PICTURE) || !fs.existsSync(path.join(root, "public", "updates", fields.PICTURE)))) {
        addError("UPDATES.txt", entry, `PICTURE "${fields.PICTURE}" is not present in public/updates.`);
      }
      if (fields.LINK && !validWebUrl(fields.LINK)) addError("UPDATES.txt", entry, "LINK must be a complete http:// or https:// address.");
      for (let number = 1; number <= 5; number += 1) {
        const link = fields[`LINK ${number}`];
        const label = fields[`LINK ${number} LABEL`];
        if (link && !validWebUrl(link)) addError("UPDATES.txt", entry, `LINK ${number} must be a complete http:// or https:// address.`);
        if (label && !link) addError("UPDATES.txt", entry, `LINK ${number} LABEL has text, but LINK ${number} is blank.`);
      }
    }
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

    if (config.name === "PUBLICATIONS.txt" && fields.TYPE === "Publication" && !fields.LINK) {
      addError(config.name, entry, "LINK is required for publications.");
    }

    if (config.name === "PUBLICATIONS.txt" && fields.TYPE === "Conference" && !fields["PRESENTATION TYPE"]) {
      addError(config.name, entry, "PRESENTATION TYPE is required for conference entries.");
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

console.log("Content validation passed: people, updates, datasets, and publications are ready to build.");
