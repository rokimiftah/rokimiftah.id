import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
	NAME: "Roki Miftah Kamaludin",
	EMAIL: "me@rokimiftah.id",
	NUM_POSTS_ON_HOMEPAGE: 2,
	NUM_PROJECTS_ON_HOMEPAGE: 2,
};

export const HOME: Metadata = {
	TITLE: "Home",
	DESCRIPTION: "Roki Miftah Kamaludin personal blog and portfolio.",
};

export const BLOG: Metadata = {
	TITLE: "Blog",
	DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const PROJECTS: Metadata = {
	TITLE: "Projects",
	DESCRIPTION:
		"A collection of my projects, with links to repositories and demos.",
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
