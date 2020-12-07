export interface Navigation {
  title: string;
  url?: string;
  href?: string;
  children?: Array<Navigation>;
  childs?: Navigation;
}
