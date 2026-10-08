import peopleText from "../../edit/EDIT_PEOPLE.txt?raw";

export const peopleCategories = ["Principal Investigator", "Team Member", "External Advisor", "Past Collaborator"] as const;
export type PeopleCategory = (typeof peopleCategories)[number];
export type Person = { category: PeopleCategory; name: string; title?: string; teams: string[]; bio?: string; photo?: string };

export const teamIntroduction =
  "LASER brings together researchers across forest ecology, life-cycle assessment, geospatial analysis, biodiversity, wildfire, and forest reliance to better understand the full impacts of forest-natural climate solutions. Our team combines modeling, field-based research, spatial analysis, and interdisciplinary collaboration across the United States, Canada, and Brazil.";

function parsePeople(text: string): Person[] {
  const afterHeading = text.split(/^PEOPLE\s*$/m)[1] ?? "";
  return afterHeading.split(/^---\s*$/m).map((block) => {
    const fields: Record<string, string> = {};
    block.split("\n").forEach((rawLine) => {
      const line = rawLine.trim();
      if (!line || line.startsWith("#") || /^=+$/.test(line)) return;
      const match = line.match(/^([A-Z][A-Z ]*):\s*(.*)$/);
      if (match) fields[match[1]] = match[2].trim();
    });
    if (!fields.NAME || !peopleCategories.includes(fields.CATEGORY as PeopleCategory)) return null;
    return {
      category: fields.CATEGORY as PeopleCategory,
      name: fields.NAME,
      title: fields.TITLE || undefined,
      teams: fields.TEAMS ? fields.TEAMS.split(",").map((team) => team.trim()).filter(Boolean) : [],
      bio: fields.BIO || undefined,
      photo: fields.PHOTO || undefined,
    };
  }).filter((person): person is Person => Boolean(person));
}

export const people = parsePeople(peopleText);
// Fixed display order chosen to make the filter rows visually balanced.
export const researchTeams = [
  "Forest Management & Restoration",
  "Forest Carbon Modeling",
  "Life-cycle Assessment",
  "Remote Sensing & Geospatial Analysis",
  "Biodiversity Assessment",
  "Forest Reliance",
  "Disturbance",
  "Wildfire",
].filter((team) => people.some((person) => person.teams.includes(team)));

function roleRank(title = "") {
  const normalized = title.toLowerCase();
  if (normalized.includes("research scientist")) return 0;
  if (normalized.includes("research area specialist lead")) return 0;
  if (normalized.includes("postdoc")) return 2;
  if (normalized.includes("ph.d") || normalized.includes("phd")) return 3;
  if (normalized.includes("master")) return 5;
  if (normalized.includes("undergraduate")) return 6;
  if (normalized.includes("research assistant")) return 4;
  return 6;
}

export function peopleInCategory(category: PeopleCategory) {
  return people
    .filter((person) => person.category === category)
    .sort((a, b) => roleRank(a.title) - roleRank(b.title));
}

export function peopleInCategoryAndTeam(category: PeopleCategory, team: string) {
  return peopleInCategory(category).filter((person) => team === "All" || person.teams.includes(team));
}
export function personPhotoUrl(person: Person) {
  return person.photo ? `${import.meta.env.BASE_URL}people/${encodeURIComponent(person.photo)}` : undefined;
}
