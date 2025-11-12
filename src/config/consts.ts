import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
  TITLE: "Roki Miftah Kamaludin",
  DESCRIPTION:
    "A lifelong learner with a passion for keeping up with the latest trends and developments in the ever-evolving field of software engineering.",
  EMAIL: "me@rokimiftah.id",
  NUM_POSTS_ON_HOMEPAGE: 5,
  NUM_PROJECTS_ON_HOMEPAGE: 5,
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "A collection of my projects, with links to repositories and demos.",
};

export const SOCIALS: Socials = [
  {
    NAME: "GitHub",
    HREF: "https://go.rokimiftah.id/github",
  },
  {
    NAME: "LinkedIn",
    HREF: "https://go.rokimiftah.id/linkedin",
  },
];
