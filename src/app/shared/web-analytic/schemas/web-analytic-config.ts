export type IWebAnalyticConfigType = 'ga' | 'gtm';


export interface IWebAnalyticConfig {
  id: string;
  type: IWebAnalyticConfigType;
}
