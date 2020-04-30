export interface HighlightCategory {
  name: string;
  fullSlug?: string;
  parent?: string;
  href?: string;
  image: string;
  sort_priority?: number;
  site?: string;
  children?: HighlightCategoryChild;
}

export interface HighlightCategoryChild {
  title: string;
  href: string;
}

