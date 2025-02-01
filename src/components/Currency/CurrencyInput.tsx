import { useState, useEffect, useMemo } from 'react';
import { debounce } from 'lodash';
import { useCurrencyRates } from '../../hooks/useCurrencyRates';
import ExchangeRatesList from '../ExchangesRates/ExchangeRatesList';
import { supportedCurrencies } from '../../constants/currency';
import { formatToLocaleString } from '../../utils/currencyUtils';
import CurrencySelector from './CurrencySelector';

export default function CurrencyInput() {
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [showLoading, setShowLoading] = useState(false);

  /**
   * 🕒 Debounced function to update the input value
   */
  const debouncedAmount = useMemo(
    () =>
      debounce((value: string) => {
        setAmount(formatToLocaleString(value));
      }, 200),
    []
  );

  useEffect(() => {
    return () => {
      debouncedAmount.cancel();
    };
  }, [debouncedAmount]);

  /**
   * 🎯 Fetch exchange rates using the selected currency
   */
  const {
    data: exchangeRates = [],
    isLoading,
    isError,
  } = useCurrencyRates(selectedCurrency);

  useEffect(() => {
    if (isLoading) {
      setShowLoading(true);
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setShowLoading(false);
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col items-center w-full max-w-lg">
      {/* Currency Input Field */}
      <div className="relative w-full bg-gray-100 rounded-lg shadow-md flex items-center px-4 py-4">
        <input
          type="text"
          value={amount}
          onChange={(e) => debouncedAmount(e.target.value)}
          placeholder="0.00"
          className="w-full bg-transparent text-gray text-3xl sm:text-2xl font-semibold outline-none tracking-tight pr-[7.5rem] rounded-lg"
        />

        {/* Currency Selector Dropdown */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[7rem] sm:w-[6rem]">
          <CurrencySelector
            currency={selectedCurrency}
            onChange={setSelectedCurrency}
            supportedCurrencies={supportedCurrencies}
          />
        </div>
      </div>

      {/* Loader while fetching exchange rates */}
      {showLoading && (
        <p className="text-light-gray text-center mt-4 text-lg animate-pulse">
          Loading rates...
        </p>
      )}

      {/* Exchange Rates List */}
      {!showLoading && (
        <ExchangeRatesList
          rates={exchangeRates}
          amount={amount}
          isLoading={isLoading}
          isError={isError}
        />
      )}
    </div>
  );
}
