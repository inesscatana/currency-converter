import { render, screen } from '@testing-library/react';
import ExchangeRateItem from '../ExchangeRateItem';
import { getCalculatedRate } from '../../../utils/currencyUtils';

jest.mock('../../../utils/currencyUtils', () => ({
  getCalculatedRate: jest.fn((value, amount) => (value * amount).toFixed(4)),
}));

describe('ExchangeRateItem Component', () => {
  const mockGetCurrencyIcon = jest.fn((currency) => `icon-${currency}.png`);

  const props = {
    currency: 'USD',
    value: 1.25,
    amount: '100',
    getCurrencyIcon: mockGetCurrencyIcon,
  };

  beforeEach(() => {
    jest.clearAllMocks(); // ✅ Reset mocks before each test
  });

  it('renders correctly with given props', () => {
    render(<ExchangeRateItem {...props} />);

    // Check if the calculated rate is displayed correctly
    const calculatedRate = getCalculatedRate(
      props.value,
      parseFloat(props.amount)
    );
    expect(screen.getByText(calculatedRate)).toBeInTheDocument();

    // Check if currency label is displayed
    expect(screen.getByText(props.currency)).toBeInTheDocument();
  });

  it('renders the correct currency icon', () => {
    render(<ExchangeRateItem {...props} />);

    const currencyIcon = screen.getByRole('img', { name: props.currency });
    expect(currencyIcon).toHaveAttribute(
      'src',
      mockGetCurrencyIcon(props.currency)
    );
  });

  it('ensures the calculation function is called correctly', () => {
    render(<ExchangeRateItem {...props} />);

    expect(getCalculatedRate).toHaveBeenCalledWith(
      props.value,
      parseFloat(props.amount)
    );
  });

  it('matches the snapshot', () => {
    const { container } = render(<ExchangeRateItem {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('only recalculates when props change', () => {
    const { rerender } = render(<ExchangeRateItem {...props} />);

    rerender(<ExchangeRateItem {...props} />);
    rerender(<ExchangeRateItem {...props} />);

    expect(getCalculatedRate).toHaveBeenCalledTimes(1);
  });
});
