declare module '@uphold/uphold-sdk-javascript' {
  export interface SdkConstructorArgs {
    /** Uphold API's url
     * @default https://api.uphold.com
     */
    baseUrl?: string;
    /** Your client id */
    clientId: string;
    /** Your client secret */
    clientSecret: string;
  }

  export interface Ticker {
    ask: string;
    bid: string;
    currency: string;
    pair: string;
  }

  export default class SDK {
    constructor(options: SdkConstructorArgs);
    getTicker(pair?: string): Promise<Ticker[]>;
  }
}
