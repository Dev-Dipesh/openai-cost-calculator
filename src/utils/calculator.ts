import type { ModelPricing, CostCalculation } from '@/types/pricing';
import type { Currency } from '@/types/currency';
import { CURRENCIES } from '@/types/currency';

export function calculateCost(
  inputTokens: number,
  outputTokens: number,
  model: ModelPricing
): CostCalculation {
  // Calculate costs based on per 1M tokens pricing
  const inputCost = (inputTokens / 1_000_000) * model.inputPrice;
  const outputCost = (outputTokens / 1_000_000) * model.outputPrice;
  const totalCost = inputCost + outputCost;

  return {
    inputTokens,
    outputTokens,
    model,
    inputCost,
    outputCost,
    totalCost
  };
}

export function convertCurrency(amountUSD: number, currency: Currency, exchangeRate: number): number {
  if (currency === 'USD') {
    return amountUSD;
  }
  if (currency === 'INR') {
    return amountUSD * exchangeRate;
  }
  return amountUSD;
}

export function formatCost(cost: number, currency: Currency = 'USD'): string {
  const currencyInfo = CURRENCIES[currency];
  const symbol = currencyInfo.symbol;
  
  if (currency === 'INR') {
    // Indian Rupee formatting
    if (cost < 1) {
      return `${symbol}${cost.toFixed(4)}`;
    } else if (cost < 100) {
      return `${symbol}${cost.toFixed(2)}`;
    } else {
      return `${symbol}${cost.toLocaleString('en-IN', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      })}`;
    }
  } else {
    // USD formatting
    if (cost < 0.01) {
      return `${symbol}${cost.toFixed(6)}`;
    } else if (cost < 1) {
      return `${symbol}${cost.toFixed(4)}`;
    } else {
      return `${symbol}${cost.toFixed(2)}`;
    }
  }
}

export function formatTokens(tokens: number): string {
  if (tokens >= 1_000_000) {
    return `${(tokens / 1_000_000).toFixed(2)}M`;
  } else if (tokens >= 1_000) {
    return `${(tokens / 1_000).toFixed(1)}K`;
  } else {
    return tokens.toString();
  }
}

export function calculatePercentage(part: number, total: number): number {
  if (total === 0) return 0;
  return (part / total) * 100;
}