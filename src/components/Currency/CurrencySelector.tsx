import { useState, useEffect, useRef } from 'react';
import { SupportedCurrency } from '../../constants/currency';
import CaretIcon from '../../assets/icons/caret-down.svg';

interface CurrencySelectorProps {
  currency: string;
  onChange: (currency: string) => void;
  supportedCurrencies: SupportedCurrency[];
}

export default function CurrencySelector({
  currency,
  onChange,
  supportedCurrencies,
}: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (newCurrency: string) => {
    onChange(newCurrency);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOptionData = supportedCurrencies.find(
    (item) => item.id === currency
  );

  return (
    <div
      className="relative flex-shrink-0 min-w-[7rem] sm:min-w-[6rem]"
      ref={dropdownRef}
    >
      {/* Currency Selector Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between w-full bg-white px-4 py-2 rounded-full shadow-sm transition text-left min-w-[7.5rem] sm:min-w-[6.5rem]"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <img
            src={selectedOptionData?.iconPath}
            alt={selectedOptionData?.id}
            className="w-6 h-6 sm:w-5 sm:h-5 rounded-full"
          />
          <span className="text-gray-700 font-medium text-lg sm:text-sm">
            {currency}
          </span>
        </div>

        <img
          src={CaretIcon}
          alt="caret"
          className="w-3 h-3 sm:w-2.5 sm:h-2.5 ml-1 sm:ml-0.5 self-center"
        />
      </button>

      {isOpen && (
        <ul className="absolute right-0 mt-2 w-full bg-white shadow-lg rounded-md z-10 overflow-hidden max-h-[200px] sm:max-h-[150px] overflow-y-auto">
          {supportedCurrencies
            .filter((curr) => curr.id !== currency)
            .map((curr) => (
              <li key={curr.id}>
                <button
                  onClick={() => handleSelect(curr.id)}
                  className="flex items-center w-full px-3 sm:px-2 py-2 hover:bg-gray-100 transition"
                  role="option"
                >
                  <img
                    src={curr.iconPath}
                    alt={curr.id}
                    className="w-6 h-6 sm:w-5 sm:h-5 rounded-full"
                  />
                  <span className="ml-2 text-gray-700 text-lg sm:text-sm">
                    {curr.id}
                  </span>
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
