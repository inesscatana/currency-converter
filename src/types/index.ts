/**
 * Represents a currency pair returned by the Uphold API.
 *
 * Example response:
 * ```json
 * {
 *   "pair": "BTC-USD",
 *   "ask": "28900.5",
 *   "bid": "28850.2",
 *   "currency": "USD"
 * }
 * ```
 */
export interface CurrencyPair {
  pair: string; // The name of the currency pair (e.g., "BTC-USD")
  ask: string; // The buying price (ask price)
  bid: string; // The selling price (bid price)
  currency: string; // The base currency used in the quote (e.g., "USD")
}

/**
 * Represents a formatted exchange rate after conversion.
 *
 * Example:
 * ```json
 * {
 *   "rate": "28900.50",
 *   "currency": "BTC",
 *   "baseCurrency": "USD"
 * }
 * ```
 */
export interface ExchangeRate {
  rate: string; // The formatted conversion rate
  currency: string; // The target currency (e.g., "BTC", "EUR", etc.)
  baseCurrency: string; // The base currency (e.g., "USD")
}

/**
 * Defines the type for an Uphold API ticker response.
 *
 * Example response:
 * ```json
 * {
 *   "pair": "BTC-USD",
 *   "ask": "28900.5",
 *   "bid": "28850.2",
 *   "currency": "USD"
 * }
 * ```
 */
export type TickerAPIResponse = CurrencyPair;

/**
 * Represents the structure of a simplified exchange value.
 *
 * Example:
 * ```json
 * {
 *   "currency": "BTC",
 *   "value": 28900.5
 * }
 * ```
 */
export interface ValuePerCurrency {
  currency: string; // The target currency (e.g., "BTC", "EUR")
  value: number; // The exchange value (numeric)
}
