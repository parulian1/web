import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveBreakpointsService {
  public breakpoints = {
    'xs' : 0,
    'sm' : 600,
    'md' : 960,
    'lg' : 1280,
    'xl' : 1920
  }

  get isDesktop(): boolean {
    return window.innerWidth >= this.breakpoints.md;
  }

  get isTablet(): boolean {
    return window.innerWidth >= this.breakpoints.sm && window.innerWidth < this.breakpoints.md;
  }

  get isMobile(): boolean {
    return window.innerWidth >= this.breakpoints.xs && window.innerWidth < this.breakpoints.sm;
  }
}
