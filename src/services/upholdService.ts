import SDK from '@uphold/uphold-sdk-javascript';

interface SDKConfig {
  baseUrl: string;
  clientId?: string;
  clientSecret?: string;
}

interface TickerResponse {
  currency: string;
  bid: string;
}

export interface Currency {
  code: string;
  rate: number;
}

const sdk = new SDK({
  baseUrl: 'https://api-sandbox.uphold.com',
  clientId: 'foo',
  clientSecret: 'bar',
  timeout: 5000,
} as SDKConfig);

export const getCurrencies = async (): Promise<Currency[]> => {
  try {
    const response = await sdk.get<TickerResponse[]>('/v0/ticker');

    if (!Array.isArray(response)) {
      throw new Error('Invalid response format from API');
    }

    return response.map((item) => ({
      code: item.currency,
      rate: parseFloat(item.bid),
    }));
  } catch (error: any) {
    if (error.message === 'Invalid response format from API') {
      throw error;
    }

    console.error('Failed to fetch currencies:', error.message || error);
    throw new Error('Failed to fetch currencies. Please try again later.');
  }
};
