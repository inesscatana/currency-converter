import SDK from '@uphold/uphold-sdk-javascript';
import { ValuePerCurrency } from '../types';
import { getSupportedCurrencyPairs } from '../constants/currency';

/**
 * Initialize the Uphold SDK instance with sandbox credentials.
 * Replace `baseUrl` with the production URL when moving to production.
 */
const sdk = new SDK({
  baseUrl: 'http://api-sandbox.uphold.com', // Sandbox API endpoint
  clientId: 'foo', // Replace with actual client ID
  clientSecret: 'bar', // Replace with actual client secret
});

/**
 * Fetches currency exchange rates from the Uphold API.
 *
 * @param currency - The base currency for exchange rates.
 * @returns A promise that resolves to an array of currency values.
 *          Returns an empty array if an error occurs.
 */
export async function fetchCurrencies(
  currency: string
): Promise<ValuePerCurrency[]> {
  try {
    const response = await sdk.getTicker(currency);

    if (!response || !Array.isArray(response)) {
      throw new Error('Unexpected response from the Uphold API.');
    }

    // Filters supported currency pairs and maps them to a simplified format
    return response
      .filter((item) => getSupportedCurrencyPairs(currency).includes(item.pair))
      .map((item) => ({
        currency: item.currency,
        value: parseFloat(item.ask),
      }));
  } catch (error) {
    console.error(`❌ Error fetching exchange rates for ${currency}:`, error);
    return []; // Returns an empty array to prevent UI crashes
  }
}
