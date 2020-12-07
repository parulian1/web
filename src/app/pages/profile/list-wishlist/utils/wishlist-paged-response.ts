import { Wishlist } from "@app/models/wishlist";
import { LinkHeaderField } from "@app/core/pagination";

// references from paged-response.ts, put slighly differents
export class WishlistPagedResponse {
  public linkHeaders: LinkHeaderField[];
  public totalResults = 0;
  public pageSize = 4;
  public pageNumber = 1;
  public entities: Wishlist[] = [];

  constructor(response: { totalItems: number; pageSize: number; data: Wishlist[]; links: string; pageNumber: number }) {
    const links = response.links;
    this.totalResults = response.totalItems;
    this.pageSize = response.pageSize;
    this.pageNumber = response.pageNumber;

    if (links) {
      this.linkHeaders = links.split(",").map((s) => new LinkHeaderField(s));
    }
    this.entities = response.data;
  }

  get maximumPageCount(): number {
    return Math.ceil(this.totalResults / this.pageSize);
  }
}
