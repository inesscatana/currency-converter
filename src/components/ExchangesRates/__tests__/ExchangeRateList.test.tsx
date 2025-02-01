import { render, screen } from '@testing-library/react';
import ExchangeRatesList from '../ExchangeRatesList';
import ExchangeRateItem from '../ExchangeRateItem';

// Mock the child component
jest.mock('../ExchangeRateItem', () => ({
  __esModule: true,
  default: jest.fn(() => <li>Mock ExchangeRateItem</li>),
}));

describe('ExchangeRatesList Component', () => {
  const mockRates = [
    { currency: 'USD', value: 1.25 },
    { currency: 'EUR', value: 0.85 },
  ];

  const props = {
    rates: mockRates,
    amount: '100',
    isLoading: false,
    isError: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state correctly', () => {
    render(<ExchangeRatesList {...props} isLoading={true} />);
    expect(screen.getByText('Loading rates...')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    render(<ExchangeRatesList {...props} isError={true} />);
    expect(screen.getByText('Error loading rates')).toBeInTheDocument();
  });

  it('renders message when no amount is entered', () => {
    render(<ExchangeRatesList {...props} amount="" />);
    expect(
      screen.getByText('Enter an amount to check the rates.')
    ).toBeInTheDocument();
  });

  it('renders exchange rate items when data is available', () => {
    render(<ExchangeRatesList {...props} />);
    expect(screen.getAllByText('Mock ExchangeRateItem')).toHaveLength(2);
  });

  it('passes correct props to ExchangeRateItem', () => {
    render(<ExchangeRatesList {...props} />);

    expect(ExchangeRateItem).toHaveBeenCalledTimes(2);
    expect(ExchangeRateItem).toHaveBeenCalledWith(
      expect.objectContaining({
        currency: 'USD',
        value: 1.25,
        amount: '100',
      }),
      {}
    );
    expect(ExchangeRateItem).toHaveBeenCalledWith(
      expect.objectContaining({
        currency: 'EUR',
        value: 0.85,
        amount: '100',
      }),
      {}
    );
  });
});
