export interface Banner {
  clickUrl: string;
  description: string;
  displayHomepage: boolean;
  href: string;
  image: string;
  phoneImage?: string;
  tabletImage?: string;
  isActive: boolean;
  name: string;
  sortPriority: number;
  type: string;
  validFrom: string;
  validTo: string;
}
