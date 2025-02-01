import { render, screen } from '@testing-library/react';
import Header from '../Header';
import UpholdLogo from '../assets/icons/uphold-logo.svg';

describe('Header Component', () => {
  test('renders the logo with the correct alt text', () => {
    render(<Header />);
    const logo = screen.getByAltText('Uphold Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', UpholdLogo);
  });

  test('renders the main heading', () => {
    render(<Header />);
    const heading = screen.getByRole('heading', {
      name: /currency converter/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('renders the description text', () => {
    render(<Header />);
    const paragraph = screen.getByText(
      /receive competitive and transparent pricing/i
    );
    expect(paragraph).toBeInTheDocument();
  });

  test('applies the correct styles to elements', () => {
    render(<Header />);
    const container = screen.getByRole('heading', {
      name: /currency converter/i,
    }).parentElement;
    expect(container).toHaveClass(
      'max-w-[42rem] text-center flex flex-col items-center'
    );
  });
});
