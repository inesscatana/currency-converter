import { useState } from 'react';

import CurrencySelector from './CurrencySelect';
import ExchangeRateMessage from './ExchangeRateMessage';

// Mock data
const supportedCurrencies = [
  { code: 'USD', flag: '🇺🇸' },
  { code: 'EUR', flag: '🇪🇺' },
  { code: 'GBP', flag: '🇬🇧' },
  { code: 'JPY', flag: '🇯🇵' },
  { code: 'AUD', flag: '🇦🇺' },
];

export default function CurrencyInput() {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState(supportedCurrencies[0]);

  return (
    <div className="flex flex-col items-center w-full max-w-lg">
      <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3 w-full shadow-md">
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="bg-transparent text-gray-600 text-3xl font-semibold outline-none flex-1"
        />

        <CurrencySelector
          currency={currency}
          onChange={setCurrency}
          supportedCurrencies={supportedCurrencies}
        />
      </div>
      <ExchangeRateMessage />
    </div>
  );
}
