import iconUsd from '../assets/icons/currencies/usd.png';
import iconEur from '../assets/icons/currencies/eur.png';
import iconBat from '../assets/icons/currencies/bat.png';
import iconBtc from '../assets/icons/currencies/btc.png';
import iconBch from '../assets/icons/currencies/bch.png';
import iconCny from '../assets/icons/currencies/cny.png';
import iconEth from '../assets/icons/currencies/eth.png';
import iconGbp from '../assets/icons/currencies/gbp.png';
import iconDkk from '../assets/icons/currencies/dkk.png';
import iconAud from '../assets/icons/currencies/aud.png';
import iconNzd from '../assets/icons/currencies/nzd.png';
import iconNok from '../assets/icons/currencies/nok.png';

/**
 * Object mapping currency codes to their respective icons.
 * This structure makes it easier to maintain and access icons dynamically.
 *
 * Example usage:
 * console.log(currencyIcons["USD"]); // Outputs the path to the USD icon
 */
const currencyIcons: Record<string, string> = {
  USD: iconUsd,
  EUR: iconEur,
  BAT: iconBat,
  BTC: iconBtc,
  BCH: iconBch,
  ETH: iconEth,
  CNY: iconCny,
  GBP: iconGbp,
  AUD: iconAud,
  NZD: iconNzd,
  DKK: iconDkk,
  NOK: iconNok,
};

/**
 * Defines the structure for a supported currency entry.
 * The `id` must be one of the keys in `currencyIcons`, ensuring validity.
 */
export interface SupportedCurrency {
  id: keyof typeof currencyIcons; // Ensures only predefined currencies are used
  iconPath: string; // Path to the corresponding currency icon
}

/**
 * Converts the object into an array of supported currencies for easy iteration.
 */
export const supportedCurrencies: SupportedCurrency[] = Object.entries(
  currencyIcons
).map(([id, iconPath]) => ({ id, iconPath }));

/**
 * Direct mapping for quick lookups, allowing retrieval of icons by currency code.
 */
export const iconMap: Record<string, string> = currencyIcons;

/**
 * Generates a list of supported currency pairs using the provided base currency.
 * The function verifies if the currency is supported before generating the list.
 *
 * @param currency - The base currency code (e.g., "USD", "EUR").
 * @returns An array of formatted currency pairs (e.g., ["USD-EUR", "USD-BTC"]).
 *          Returns an empty array if the provided currency is not supported.
 */
export const getSupportedCurrencyPairs = (currency: string): string[] => {
  if (!currencyIcons[currency]) return []; // Returns an empty array for unsupported currencies

  return supportedCurrencies.map(({ id }) => `${currency}-${id}`);
};
