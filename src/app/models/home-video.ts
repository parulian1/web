export interface IHomeVideo {
  href: string;
  contentItems: IHomeVideoContents[];
}

export interface IHomeVideoContents {
  id: number;
  href: string;
  name: string;
  contentGroup: string;
  youtubeVideoId: string;
  sortPriority: number;
  type: string;
  embededUrl: string;
  isActive: boolean;
}
