export interface IOnboarding {
  contents: Array<IOnboardingContent>;
  created: string;
  href: string;
  isActive: boolean;
  modified: string;
  modifiedBy: string;
  name: string;
  type: string;
}

export interface IOnboardingContent {
  buttonStatus: boolean;
  buttonText: string;
  buttonUrl: string;
  created: string;
  description: string;
  href: string;
  image: string;
  modified: string;
  modifiedBy: string;
  name: string;
  sortPriority: number;
}
