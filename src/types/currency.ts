export type Currency = 'USD' | 'INR';

export interface CurrencyInfo {
  code: Currency;
  symbol: string;
  name: string;
}

export const CURRENCIES: Record<Currency, CurrencyInfo> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar'
  },
  INR: {
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupee'
  }
};

// Default exchange rate (USD to INR)
// In a real app, this would come from an API
export const DEFAULT_USD_TO_INR_RATE = 86.00;

export interface ExchangeRates {
  usdToInr: number;
  lastUpdated: string;
}

export const DEFAULT_EXCHANGE_RATES: ExchangeRates = {
  usdToInr: DEFAULT_USD_TO_INR_RATE,
  lastUpdated: new Date().toISOString()
};