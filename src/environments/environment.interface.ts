export interface IEnvironment {
  production: boolean;
  BASE_API_URL: string;
  FB_APPLICATION_ID: string;
  GOOGLE_APPLICATION_ID: string;
  SHIPPING_COUNTRY_CODE: string;
  YOUTUBE_API_KEY: string;
  elasticAPM: {
    serviceName: string,
    serverUrl: string,
    serviceVersion: string,
    debug: boolean,
    active: boolean,
    environment: string,
    breakdownMetrics: boolean,
    distributedTracingOrigins: Array<any>,
    ignoreTransactions: Array<any>,
  }
}
