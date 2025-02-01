import { useQuery } from '@tanstack/react-query';
import { fetchCurrencies } from '../services/upholdService';
import { useLocalStorage } from 'usehooks-ts';

/**
 * Custom hook to fetch currency exchange rates.
 * Implements caching and background refetching for optimized performance.
 *
 * @param baseCurrency - The currency to fetch exchange rates for.
 * @returns Query result with exchange rates, loading state, and errors.
 */
export function useCurrencyRates(baseCurrency: string) {
  const [cachedRates, setCachedRates] = useLocalStorage<Record<string, any>>(
    'RatesCache',
    {}
  );

  return useQuery({
    queryKey: ['currency', baseCurrency],
    queryFn: async () => {
      if (cachedRates[baseCurrency]) {
        return cachedRates[baseCurrency]; // Return cached data
      }

      const newRates = await fetchCurrencies(baseCurrency);

      setCachedRates((prev) => ({
        ...prev,
        [baseCurrency]: newRates,
      }));

      return newRates;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: 'always',
  });
}
