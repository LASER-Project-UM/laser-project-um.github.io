import BenImage from "../../assets/1516627247056.jpeg";
import KaiImage from "../../assets/kai-zhu-800x800.jpg";
import peopleListText from "../../edit/EDIT_PEOPLE.txt?raw";

export type TeamLeader = {
  name: string;
  role: string;
  institution: string;
  bio: string;
  image?: string;
  imagePosition?: string;
};

export const teamIntroduction =
  "LASER brings together researchers across forest ecology, life-cycle assessment, geospatial analysis, biodiversity, wildfire, and forest reliance to better understand the full impacts of forest-natural climate solutions. Our team combines modeling, field-based research, spatial analysis, and interdisciplinary collaboration across the United States, Canada, and Brazil.";

export const teamLeaders: TeamLeader[] = [
  {
    name: "Dr. Benjamin Goldstein",
    role: "Co-PI",
    institution: "University of Michigan, School for Environment and Sustainability",
    bio: "Dr. Benjamin Goldstein studies the environmental and social impacts of timber production and usage across local and global scales. His research combines life-cycle assessment, geospatial analysis, and data science to trace how supply chains drive resource use and environmental change. He is particularly interested in forestry products, energy, and the distribution of environmental impacts across communities. His work aims to identify pathways toward more sustainable and equitable systems of production and consumption.",
    image: BenImage,
    imagePosition: "center 12%",
  },
  {
    name: "Dr. Kai Zhu",
    role: "Co-PI",
    institution: "University of Michigan, School for Environment and Sustainability",
    bio: "Dr. Kai Zhu studies how ecosystems respond to environmental change, with a particular focus on climate-vegetation interactions. His research combines ecology and modeling to investigate processes ranging from plant phenology and species distributions to ecosystem responses to climate change, disturbances, and management. He works across scales, integrating field observations, experiments, remote sensing, and large ecological datasets. His research helps improve understanding of ecosystem resilience and nature-based responses to climate and biodiversity challenges.",
    image: KaiImage,
    imagePosition: "center 8%",
  },
];

function namesUnderHeading(heading: string, nextHeading?: string) {
  const afterHeading = peopleListText.split(heading)[1] ?? "";
  const section = nextHeading
    ? afterHeading.split(nextHeading)[0]
    : afterHeading;

  return section
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !/^=+$/.test(line));
}

// These lists come from src/edit/EDIT_PEOPLE.txt so routine membership edits
// never require changing application code.
export const currentCollaborators = namesUnderHeading(
  "CURRENT COLLABORATORS",
  "EXTERNAL ADVISORS",
);

export const externalAdvisors = namesUnderHeading(
  "EXTERNAL ADVISORS",
  "PAST COLLABORATORS",
);

export const pastCollaborators = namesUnderHeading("PAST COLLABORATORS");
