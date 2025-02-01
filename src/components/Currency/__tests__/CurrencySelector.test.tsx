import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CurrencySelector from '../CurrencySelector';
import { SupportedCurrency } from '../../../constants/currency';

describe('CurrencySelector Component', () => {
  const mockOnChange = jest.fn();
  const mockSupportedCurrencies: SupportedCurrency[] = [
    { id: 'USD', iconPath: 'usd.png' },
    { id: 'EUR', iconPath: 'eur.png' },
    { id: 'GBP', iconPath: 'gbp.png' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('closes dropdown when clicking outside', async () => {
    render(
      <CurrencySelector
        currency="USD"
        onChange={mockOnChange}
        supportedCurrencies={mockSupportedCurrencies}
      />
    );

    fireEvent.click(screen.getByText('USD'));
    expect(screen.getByText('EUR')).toBeInTheDocument();

    fireEvent.mouseDown(document.body);

    await waitFor(() => {
      expect(screen.queryByText('EUR')).not.toBeInTheDocument();
    });
  });
});
