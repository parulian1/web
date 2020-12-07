export class PagePagination {
  baseUrl: string;

  nextPage: string;
  prevPage: string;
  lastPage: string;
  firstPage: string;

  totalResults: number;
  currentPageNumber: number;
  totalPerPage: number;

  constructor(baseUrl: string) {
    this.setBaseUrl(baseUrl);
  }

  setBaseUrl(baseUrl: string) {
    let index = baseUrl.indexOf('?');
    if (index !== -1) {
      this.baseUrl = baseUrl;
    } else {
      this.baseUrl = baseUrl.split('?')[0];
    }
  }

  setPaginationByLinkHeaders(links: string) {
    let linkHeaders = this._parseLinkHeaders(links);
    this.prevPage = linkHeaders['prev'];
    this.nextPage = linkHeaders['next'];
    this.lastPage = linkHeaders['last'];
    this.firstPage = linkHeaders['first'];
  }

  setTotalResults(totalResults: number) {
    this.totalResults = totalResults
  }

  setTotalPerPage(totalPerPage: number) {
    this.totalPerPage = totalPerPage;
  }

  setCurrentPageNumber(currentPageNumber: number) {
    this.currentPageNumber = currentPageNumber;
  }

  _parseLinkHeaders(linkHeaders: string) {
    return linkHeaders.split(',').reduce((acc, link) => {
      let match = link.match(/<(.*)>; rel="(\w*)"/)
      let url = match[1]
      let rel = match[2]
      acc[rel] = url
      return acc;
    }, {})
  }

  // Check Condition
  hasPrevious(): boolean {
    return !!this.prevPage;
  }
  hasNext(): boolean {
    return !!this.nextPage;
  }

  // Number
  nextPageNumber(): number {
    if(this.hasNext()) {
      return this.currentPageNumber + 1;
    }
  }
  previousPageNumber(): number {
    if(this.hasPrevious()) {
      return this.currentPageNumber - 1;
    }
  }
  lastPageNumber(): number {
    if (this.lastPage) {
      return this.getPageParamResult(this.lastPage);
    }
  }
  firstPageNumber(): number {
    if (this.firstPage) {
      return this.getPageParamResult(this.firstPage);
    }
  }

  getPageParamResult(url: string): number {
    const params: URLSearchParams = new URL(url).searchParams;
    return parseInt(params.get('page')) || 1;
  }

  getParamsForPagination(): object {
    return {
      page: this.currentPageNumber,
    }
  }
}
