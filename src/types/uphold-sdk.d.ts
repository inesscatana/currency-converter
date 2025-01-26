declare module '@uphold/uphold-sdk-javascript' {
  export interface UpholdSDKConfig {
    baseUrl: string;
    clientId?: string;
    clientSecret?: string;
  }

  export default class SDK {
    constructor(config: UpholdSDKConfig);
    get<T = any>(path: string): Promise<T>;
  }
}
