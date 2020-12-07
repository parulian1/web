export interface Category {
  name: string;
  pathName: string;
  productCount: number;
  depth: number;
  sourceMappings: Array<SourceMappings>;
  href: string;
  image: null;
  parent: null;
}

// default schema, nothing returned yet from API
export interface SourceMappings {
  href: string;
  name: string;
}

export interface CategoryFilter {
  name: string;
  href?: string;
  total: number;
  subCategory?: Array<CategoryFilter>;
}

export interface SubCategoryFilter {
  name: string;
  href?: string,
  fullSlug: string,
}

