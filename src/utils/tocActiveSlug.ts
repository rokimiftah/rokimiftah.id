type HeadingPosition = {
  slug: string;
  offsetTop: number;
};

type FindActiveHeadingSlugOptions = {
  headings: HeadingPosition[];
  scrollY: number;
  viewportHeight: number;
  documentHeight: number;
  activationOffset?: number;
  bottomThreshold?: number;
};

export function findActiveHeadingSlug({
  headings,
  scrollY,
  viewportHeight,
  documentHeight,
  activationOffset = 100,
  bottomThreshold = 2
}: FindActiveHeadingSlugOptions): string | null {
  if (headings.length === 0) return null;

  const lastHeading = headings[headings.length - 1];
  const nearBottom = scrollY + viewportHeight >= documentHeight - bottomThreshold;

  if (nearBottom) {
    return lastHeading.slug;
  }

  const scrollPosition = scrollY + activationOffset;

  for (let index = headings.length - 1; index >= 0; index--) {
    const heading = headings[index];
    if (scrollPosition >= heading.offsetTop) {
      return heading.slug;
    }
  }

  return null;
}
