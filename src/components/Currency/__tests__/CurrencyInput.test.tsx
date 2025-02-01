import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CurrencyInput from '../CurrencyInput';
import { useCurrencyRates } from '../../../hooks/useCurrencyRates';

jest.mock('../../../hooks/useCurrencyRates');

describe('CurrencyInput Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useCurrencyRates as jest.Mock).mockReturnValue({
      data: [
        { currency: 'EUR', value: 0.85 },
        { currency: 'GBP', value: 0.75 },
      ],
      isLoading: false,
      isError: false,
    });
  });

  it('renders correctly with initial state', () => {
    render(<CurrencyInput />);

    // Check if the input field is rendered with a placeholder
    expect(screen.getByPlaceholderText('0.00')).toBeInTheDocument();

    // Ensure USD is selected as default
    expect(screen.getByText('USD')).toBeInTheDocument();

    // Rates should not be displayed initially (empty input)
    expect(screen.queryByText('EUR')).not.toBeInTheDocument();
    expect(screen.queryByText('GBP')).not.toBeInTheDocument();
  });

  it('renders exchange rates when user enters an amount', async () => {
    render(<CurrencyInput />);

    // Ensure rates are not visible initially
    expect(screen.queryByText('EUR')).not.toBeInTheDocument();
    expect(screen.queryByText('GBP')).not.toBeInTheDocument();

    // Simulate user entering an amount
    fireEvent.change(screen.getByPlaceholderText('0.00'), {
      target: { value: '100' },
    });

    // Wait for the rates to appear
    await waitFor(() => {
      expect(screen.getByText('EUR')).toBeInTheDocument();
      expect(screen.getByText('GBP')).toBeInTheDocument();
    });
  });

  it('allows changing the selected currency', async () => {
    render(<CurrencyInput />);

    // Open the dropdown
    fireEvent.click(screen.getByText('USD'));

    // Select EUR
    fireEvent.click(screen.getByText('EUR'));

    // Wait for selection update
    await waitFor(() => {
      expect(screen.getByText('EUR')).toBeInTheDocument();
    });
  });
});
