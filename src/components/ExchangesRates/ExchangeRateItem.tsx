import { useMemo } from 'react';
import { getCalculatedRate } from '../../utils/currencyUtils';

interface ExchangeRateItemProps {
  currency: string;
  value: number;
  amount: string;
  getCurrencyIcon: (currency: string) => string;
}

const ExchangeRateItem = ({
  currency,
  value,
  amount,
  getCurrencyIcon,
}: ExchangeRateItemProps) => {
  const calculatedRate = useMemo(
    () => getCalculatedRate(value, parseFloat(amount)),
    [value, amount]
  );

  return (
    <li className="flex justify-between items-center px-6 sm:px-4">
      {/* Amount */}
      <span className="text-gray-900 font-semibold text-2xl leading-7 tracking-tight min-w-[7rem] sm:min-w-[6rem] text-left">
        {calculatedRate}
      </span>

      {/* Currency Icon + Label */}
      <div className="flex items-center gap-2 px-2 py-2 min-w-[7.5rem] sm:min-w-[6.5rem] justify-center">
        <img
          src={getCurrencyIcon(currency)}
          alt={currency}
          className="w-6 h-6 sm:w-5 sm:h-5 rounded-full"
        />
        <span className="text-gray-700 font-semibold text-lg sm:text-sm leading-6">
          {currency}
        </span>
      </div>
    </li>
  );
};

export default ExchangeRateItem;
