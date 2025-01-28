import { useState } from 'react';
import CaretIcon from '../assets/icons/caret.svg';

interface Currency {
  code: string;
  flag: string;
}

export default function CurrencySelector({
  currency,
  onChange,
  supportedCurrencies,
}: {
  currency: Currency;
  onChange: (currency: Currency) => void;
  supportedCurrencies: Currency[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (newCurrency: Currency) => {
    onChange(newCurrency);
    setIsOpen(false);
  };

  return (
    <div className="relative w-28">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full bg-white px-3 py-2 rounded-full shadow-sm border border-gray-300 transition"
      >
        <span className="text-lg">{currency.flag}</span>
        <span className="text-gray-700 font-medium">{currency.code}</span>
        <img
          src={CaretIcon}
          alt="caret"
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-full bg-white shadow-lg rounded-lg border border-gray-200 z-10">
          {supportedCurrencies
            .filter((curr) => curr.code !== currency.code)
            .map((curr) => (
              <button
                key={curr.code}
                onClick={() => handleSelect(curr)}
                className="flex items-center w-full px-3 py-2 hover:bg-gray-100 transition"
              >
                <span className="text-lg">{curr.flag}</span>
                <span className="ml-2 text-gray-700">{curr.code}</span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
