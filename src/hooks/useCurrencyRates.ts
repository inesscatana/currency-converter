import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCurrencies } from '../services/upholdService';
import { useLocalStorage } from 'usehooks-ts';

/**
 * Custom hook to fetch and cache currency exchange rates.
 * Implements local storage caching and background fetching for performance optimization.
 *
 * @param baseCurrency - The base currency for fetching exchange rates.
 * @returns Query result containing exchange rates, loading state, errors, and background fetching state.
 */
export function useCurrencyRates(baseCurrency: string) {
  const [cachedRates, setCachedRates] = useLocalStorage<Record<string, any>>(
    'RatesCache',
    {}
  );

  const query = useQuery({
    queryKey: ['currency', baseCurrency],
    queryFn: async () => {
      const newRates = await fetchCurrencies(baseCurrency);
      setCachedRates((prev) => ({
        ...prev,
        [baseCurrency]: newRates,
      }));
      return newRates;
    },
    initialData: () => cachedRates[baseCurrency] || [],
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchInterval: 30000,
    refetchOnWindowFocus: true,
    refetchOnMount: cachedRates[baseCurrency] ? false : true,
  });

  // Memoize the return value to prevent unnecessary re-renders
  return useMemo(() => {
    return {
      data: query.data ?? [],
      isLoading: query.isLoading,
      isError: query.isError,
      isFetching: query.isFetching,
    };
  }, [query]);
}
