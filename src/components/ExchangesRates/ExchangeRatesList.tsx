import { supportedCurrencies } from '../../constants/currency';
import ExchangeRateItem from './ExchangeRateItem';

interface ExchangeRatesListProps {
  rates: { currency: string; value: number }[];
  amount: string;
  isLoading: boolean;
  isError: boolean;
}

export default function ExchangeRatesList({
  rates,
  amount,
  isLoading,
  isError,
}: ExchangeRatesListProps) {
  // Function to get the corresponding currency icon
  const getCurrencyIcon = (currency: string) =>
    supportedCurrencies.find((item) => item.id === currency)?.iconPath || '';

  // Filter only supported currencies
  const supportedCurrencyIds = supportedCurrencies.map((c) => c.id);
  const filteredRates = rates.filter(({ currency }) =>
    supportedCurrencyIds.includes(currency)
  );

  if (isLoading) {
    return (
      <p className="text-light-gray text-center mt-4 text-lg">
        Loading rates...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-red-500 text-center mt-4 text-lg">
        Error loading rates
      </p>
    );
  }

  if (!amount) {
    return (
      <p className="text-light-gray text-center mt-4 text-lg">
        Enter an amount to check the rates.
      </p>
    );
  }

  return (
    <div className="w-full max-w-lg mt-6">
      <ul className="flex flex-col gap-3">
        {filteredRates.map(({ currency, value }) => (
          <ExchangeRateItem
            key={currency}
            currency={currency}
            value={value}
            amount={amount}
            getCurrencyIcon={getCurrencyIcon}
          />
        ))}
      </ul>
    </div>
  );
}
