import type { Provider } from './providers';

interface ModelPricing {
  id: string;
  name: string;
  inputPrice: number;  // Price per 1M tokens
  outputPrice: number; // Price per 1M tokens
  category: string;
  provider: Provider;
  contextWindow?: number;
  description?: string;
}

interface CostCalculation {
  inputTokens: number;
  outputTokens: number;
  model: ModelPricing;
  inputCost: number;
  outputCost: number;
  totalCost: number;
}

interface CalculatorState {
  inputTokens: number;
  outputTokens: number;
  selectedModel: string;
  selectedProvider: Provider;
  calculation: CostCalculation | null;
  customPricing: Record<string, ModelPricing>;
}

export { ALL_MODELS as DEFAULT_MODEL_PRICING } from '@/data/providerPricing';

export type { ModelPricing, CostCalculation, CalculatorState };