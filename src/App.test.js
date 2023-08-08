import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import ButtonComponent from './components/ButtonComponent/ButtonComponent';
import InputComponent from './components/InputComponent/InputComponent';

describe('App', () => {
  test('renders tabs correctly', () => {
    render(<App />);
    const tabs = screen.getAllByRole('tab');
    
    expect(tabs).toHaveLength(2);
    expect(tabs[0]).toHaveTextContent('Converter');
    expect(tabs[1]).toHaveTextContent('Currencies');
  });
});

describe('ButtonComponent', () => {
  test('renders a button with the text "Convert"', () => {
    render(<ButtonComponent convertCurrency={() => {}} />);
    
    const convertButton = screen.getByText('Convert');
    expect(convertButton).toBeInTheDocument();
  });

  test('calls convertCurrency function when the button is clicked', () => {
    const mockConvertCurrency = jest.fn();
    render(<ButtonComponent convertCurrency={mockConvertCurrency} />);
    
    const convertButton = screen.getByText('Convert');
    fireEvent.click(convertButton);

    expect(mockConvertCurrency).toHaveBeenCalled();
  });
});

describe('InputComponent', () => {
  test('renders an input element with the correct attributes', () => {
    const mockSetAmount = jest.fn();
    render(<InputComponent amount="0" setAmount={mockSetAmount} />);
    
    const inputElement = screen.getByPlaceholderText('enter a number');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'number');
    expect(inputElement).toHaveAttribute('min', '0');
  });

  test('calls setAmount function when input value changes', () => {
    const mockSetAmount = jest.fn();
    render(<InputComponent amount="0" setAmount={mockSetAmount} />);
    
    const inputElement = screen.getByPlaceholderText('enter a number');
    fireEvent.change(inputElement, { target: { value: '100' } });

    expect(mockSetAmount).toHaveBeenCalledWith('100');
  });
});
