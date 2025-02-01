/**
 * Extracts the target currency code from a currency pair.
 * Example: "AAVE-USD" => "AAVE", "$ADS-USD" => "ADS"
 *
 * @param pair - The currency pair string (e.g., "BTC-USD").
 * @param base - The base currency to be removed (e.g., "USD").
 * @returns The extracted currency code without the base currency.
 */
export function getCurrencyCodeFromPair(pair: string, base: string): string {
  return pair.replace(`-${base}`, '').replace(/^\$/, ''); // Removes "-USD" and "$" prefix
}

/**
 * Calculates the converted amount based on the exchange rate.
 * Example: (1.25, 100) => "125.0000"
 *
 * @param currencyValue - The exchange rate of the target currency.
 * @param inputAmount - The amount to be converted.
 * @returns The converted value formatted to 4 decimal places.
 */
export function getCalculatedRate(
  currencyValue: number,
  inputAmount: number
): string {
  return (currencyValue * inputAmount).toFixed(4);
}

/**
 * Formats a numeric string into a localized number with thousands separators.
 *
 * - Removes any non-numeric characters except for one decimal point.
 * - Ensures proper formatting with thousands separators and a defined number of decimal places.
 * - Returns an empty string if the input is invalid or empty.
 *
 * Example:
 * ```ts
 * formatToLocaleString("1234567.89") // "1,234,567.89"
 * formatToLocaleString("1000000.123456", 4) // "1,000,000.1235"
 * ```
 *
 * @param entry - The input string containing a numeric value.
 * @param decimalPlaces - The number of decimal places to retain (default: 6).
 * @returns The formatted number as a string, or an empty string if invalid.
 */
export function formatToLocaleString(entry: string, decimalPlaces = 6): string {
  if (!entry) return '';

  let sanitizedValue = entry.replace(/[^0-9.]/g, ''); // Remove non-numeric characters except '.'
  sanitizedValue = sanitizedValue.replace(/\.(?=.*\.)/g, ''); // Ensure only one decimal point

  const number = parseFloat(sanitizedValue);
  return isNaN(number)
    ? ''
    : number.toLocaleString('en-US', { maximumFractionDigits: decimalPlaces });
}
