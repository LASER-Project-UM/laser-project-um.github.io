import type { LucideIcon } from "lucide-react";
import { Database, FileText, Newspaper, Users } from "lucide-react";
import ForestManagement from "../../assets/forest_management.jpg";
import Wildfire from "../../assets/wildfire.jpg";
import RemoteSensing from "../../assets/remote_sensing.jpg";
import Disturbance from "../../assets/pest_disturbance.jpg";
import LCA from "../../assets/lca_lifecycle_diagram.png";
import Biodiversity from "../../assets/biodiversity_assessment.jpg";
import AmericanForest from "../../assets/American_forest.jpg";
import CanadianForest from "../../assets/Canadian_forest.jpg";
import BrazilForest from "../../assets/Brazil_forest.jpg";
import ForestReliance from "../../assets/Social_risk_image_clean.png";

export const hero = {
  image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1800&q=80",
  imageAlt: "Sunlit temperate forest canopy seen from within the stand",
  eyebrow: "Forest–Natural Climate Solutions · U-M SEAS",
  title: "Life-cycle Assessment Synthesized with Ecosystems and Risk (LASER)",
  description:
    "LASER is a project that aims to develop a scalable, spatially-explicit framework for evaluating the climate, ecosystem, and social impacts of forest-based natural climate solutions across the United States, Canada, and Brazil.",
  supportName: "Institute for Global Change Biology",
  supportUrl: "https://seas.umich.edu/globalchangebiology",
};

export const projectFacts = [
  { value: "3", label: "Focal countries", detail: "The United States, Canada, and Brazil." },
  {
    value: "3",
    label: "Core research areas",
    detail:
      "Forest carbon accounting, forest ecology, and social impacts.",
  },
  {
    value: "4",
    label: "Scales of assessment",
    detail: "Findings scale up from a single forest stand to landscapes, regions, and whole biomes.",
  },
];

export const approach = {
  title: "From ecological process to evidence people can use",
  description:
    "LASER connects ecological modeling, life-cycle assessment, geospatial analysis, and community-centered research to examine how forest–natural climate solutions perform across biomes, management contexts, and social settings.",
  steps: [
    {
      number: "01",
      title: "Forest carbon accounting",
      description:
        "We use dynamic life-cycle assessment to capture the climate impacts of forest products—not only within the forest, but across the entire supply chain.",
    },
    {
      number: "02",
      title: "Forest ecology",
      description:
        "We use advanced forest-growth models, anchored in more than 100 years of empirical data, to simulate forest growth dynamics, carbon storage, and changing disturbance regimes.",
    },
    {
      number: "03",
      title: "Social impacts",
      description:
        "We combine multimodal datasets at global scales to quantify how forest decisions affect local livelihoods, community well-being, and reliance on forest resources.",
    },
  ],
};

export type ResearchArea = {
  title: string;
  tag: string;
  tagColor: string;
  description: string;
  image: string;
  alt: string;
  credit?: string;
  containImage?: boolean;
};

export const researchAreas: ResearchArea[] = [
  {
    title: "Forest carbon modeling",
    tag: "Forest carbon",
    tagColor: "var(--forest)",
    description:
      "We combine process-based simulation and machine learning to forecast forest change over time, from individual-tree growth to a continent's carbon budget. Using forest models, inventory data, and climate projections, we simulate carbon storage under alternative management pathways, project how fire, drought, and insect outbreaks reshape forests in a changing climate, and track these dynamics across the United States, Canada, and Brazil.",
    image: "https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?auto=format&fit=crop&w=1400&q=80",
    alt: "Aerial view of a forested landscape with varied canopy",
  },
  {
    title: "Life-cycle assessment",
    tag: "Industrial ecology",
    tagColor: "var(--bark)",
    description:
      "Across LASER, we track carbon from forests through the entire life cycle of forest products—from forest growth and harvest to processing, use, recycling, and disposal. By combining forest carbon modeling with dynamic life-cycle assessment, we reveal how the timing of carbon storage and emissions shapes the climate impacts of different forest management and product pathways.",
    image: LCA,
    alt: "Diagram tracing forest-product carbon through growth, harvest, processing, use, recycling, and disposal",
    containImage: true,
  },
  {
    title: "Remote sensing & geospatial analysis",
    tag: "Geospatial",
    tagColor: "var(--primary)",
    description:
      "Across LASER, we use remote sensing to understand forests from multiple perspectives, from their ecological dynamics to their importance for people. Our work uses satellite imagery, LiDAR, and other geospatial datasets to map forest biomass and its response to disturbance and recovery across the United States, predict species richness and other biodiversity metrics, and identify global patterns of human reliance on forests.",
    image: RemoteSensing,
    alt: "ESA Biomass radar image revealing rainforest structure",
  },
  {
    title: "Disturbance",
    tag: "Risk",
    tagColor: "var(--primary)",
    description:
      "Quantifying changes in disturbance regimes (e.g. wildfire, insect outbreaks, flooding, and harvest) and examining how disturbance interactions shape forest ecosystems across large spatial scales over the near and long term.",
    image: Disturbance,
    alt: "Stacked GIS layers representing integrated forestry datasets",
  },
  {
    title: "Biodiversity assessment",
    tag: "Biodiversity",
    tagColor: "var(--forest)",
    description:
      "We study global biodiversity trends in plants and animals to understand how species and ecological communities are responding to land-use change, climate pressures, and other transformations in a rapidly changing landscape. Using large-scale datasets such as LandFrag, PREDICTS and GLOBIO, we map patterns in species richness to identify where biodiversity is most vulnerable.",
    image: Biodiversity,
    alt: "Aerial view of fragmented forest and surrounding agricultural landscape",
    credit: "Credit: Adriano Gambarini",
  },
  {
    title: "Forest Reliance",
    tag: "Social",
    tagColor: "var(--clay)",
    description:
      "We study where communities are most reliant on forests for their livelihoods. Using a machine-learning framework and global geospatial datasets with unprecedented granularity and geographic specificity, we estimate the likelihood of forest dependency across the world. Our model captures both subsistence- and income-driven forest dependency, drawing on well-established relationships between forest proximity, socioeconomic status, and income diversity identified in the development literature. This research advances efforts to understand how forest governance and a changing climate may shape people’s reliance on forests globally. Ultimately, our findings can help inform forestry initiatives that are both practical and inclusive for the communities they are intended to serve.",
    image: ForestReliance,
    alt: "Map of forest cover and human reliance across South America",
    containImage: true,
  },
  {
    title: "Wildfire",
    tag: "Fire ecology",
    tagColor: "var(--primary)",
    description:
      "We study wildfire patterns across the western United States to understand where fires are most likely to occur and their potential impacts on forests. We combine historical fire records from MTBS with remote sensing, climate, and landscape data to characterize wildfire risk and potential biomass loss. This helps us identify where forest management, including thinning, could most effectively reduce wildfire impacts and support climate mitigation.",
    image: Wildfire,
    alt: "Wildfire burning across a forested landscape",
  },
  {
    title: "Forest management and restoration",
    tag: "Management",
    tagColor: "var(--primary)",
    description:
      "We test forest management and restoration strategies across scales, from the resilience of individual stands to the carbon and biodiversity of entire landscapes. Using field data, forest inventories, and ecological models, we evaluate how management choices affect resilience and carbon storage, identify restoration strategies that recover biodiversity, and develop climate-adaptive approaches to help forests keep pace with a warming world.",
    image: ForestManagement,
    alt: "Forest restoration and management work in a wooded landscape",
  },
];

export const focalRegions = [
  {
    country: "United States",
    biome: "Temperate · boreal transition",
    image: AmericanForest,
    alt: "Mixed forest canopy in the United States",
  },
  { country: "Canada", biome: "Boreal forest", image: CanadianForest, alt: "Boreal forest landscape in Canada" },
  { country: "Brazil", biome: "Tropical forest", image: BrazilForest, alt: "Tropical forest landscape in Brazil" },
];

export type ProjectResource = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
};

export const projectResources: ProjectResource[] = [
  { icon: Newspaper, title: "Latest updates", description: "Recent project news, field updates, and research notes.", href: "/blog" },
  { icon: Database, title: "Open datasets", description: "Curated spatial, ecological, and project data resources.", href: "/datasets" },
  { icon: FileText, title: "Publications", description: "Peer-reviewed articles, reports, and project outputs.", href: "/publications" },
  { icon: Users, title: "Our team", description: "Collaborators, roles, and institutional affiliations.", href: "/people" },
];
