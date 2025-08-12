import { create } from 'zustand';
import type { CalculatorState, ModelPricing } from '@/types/pricing';
import { DEFAULT_MODEL_PRICING } from '@/types/pricing';
import type { Currency, ExchangeRates } from '@/types/currency';
import { DEFAULT_EXCHANGE_RATES } from '@/types/currency';
import type { Provider } from '@/types/providers';
import { calculateCost } from '@/utils/calculator';

interface CalculatorStore extends CalculatorState {
  // Currency state
  currency: Currency;
  exchangeRates: ExchangeRates;
  
  // Actions
  setInputTokens: (tokens: number) => void;
  setOutputTokens: (tokens: number) => void;
  setSelectedModel: (modelId: string) => void;
  setSelectedProvider: (provider: Provider) => void;
  setCurrency: (currency: Currency) => void;
  setExchangeRate: (rate: number) => void;
  updateCustomPricing: (modelId: string, pricing: Partial<ModelPricing>) => void;
  resetCustomPricing: (modelId: string) => void;
  calculateCurrentCost: () => void;
  getAllModels: () => ModelPricing[];
  getModelsByProvider: (provider: Provider) => ModelPricing[];
  getSelectedModelPricing: () => ModelPricing | null;
}

export const useCalculatorStore = create<CalculatorStore>((set, get) => ({
  // Initial state
  inputTokens: 0,
  outputTokens: 0,
  selectedModel: 'openai-gpt-4o-mini', // Default to most cost-effective model
  selectedProvider: 'openai', // Default provider
  calculation: null,
  customPricing: {},
  currency: 'USD',
  exchangeRates: DEFAULT_EXCHANGE_RATES,

  // Actions
  setInputTokens: (tokens) => {
    set({ inputTokens: tokens });
    // Auto-calculate when tokens change
    setTimeout(() => get().calculateCurrentCost(), 0);
  },

  setOutputTokens: (tokens) => {
    set({ outputTokens: tokens });
    // Auto-calculate when tokens change
    setTimeout(() => get().calculateCurrentCost(), 0);
  },

  setSelectedModel: (modelId) => {
    set({ selectedModel: modelId });
    // Auto-calculate when model changes
    setTimeout(() => get().calculateCurrentCost(), 0);
  },

  setSelectedProvider: (provider) => {
    const state = get();
    const modelsForProvider = state.getModelsByProvider(provider);
    // Set the first model of the new provider as default
    const defaultModel = modelsForProvider[0]?.id || state.selectedModel;
    
    set({ 
      selectedProvider: provider,
      selectedModel: defaultModel
    });
    // Auto-calculate when provider changes
    setTimeout(() => get().calculateCurrentCost(), 0);
  },

  setCurrency: (currency) => {
    set({ currency });
    // Auto-calculate when currency changes
    setTimeout(() => get().calculateCurrentCost(), 0);
  },

  setExchangeRate: (rate) => {
    const state = get();
    set({ 
      exchangeRates: { 
        ...state.exchangeRates, 
        usdToInr: rate, 
        lastUpdated: new Date().toISOString() 
      } 
    });
    // Auto-calculate when exchange rate changes
    setTimeout(() => get().calculateCurrentCost(), 0);
  },

  updateCustomPricing: (modelId, pricingUpdate) => {
    const state = get();
    const defaultModel = DEFAULT_MODEL_PRICING.find(m => m.id === modelId);
    if (!defaultModel) return;

    const updatedPricing: ModelPricing = {
      ...defaultModel,
      ...state.customPricing[modelId],
      ...pricingUpdate,
    };

    set({
      customPricing: {
        ...state.customPricing,
        [modelId]: updatedPricing,
      },
    });

    // Auto-calculate if this is the selected model
    if (state.selectedModel === modelId) {
      setTimeout(() => get().calculateCurrentCost(), 0);
    }
  },

  resetCustomPricing: (modelId) => {
    const state = get();
    const { [modelId]: removed, ...rest } = state.customPricing;
    set({ customPricing: rest });

    // Auto-calculate if this is the selected model
    if (state.selectedModel === modelId) {
      setTimeout(() => get().calculateCurrentCost(), 0);
    }
  },

  calculateCurrentCost: () => {
    const state = get();
    const modelPricing = state.getSelectedModelPricing();
    
    if (!modelPricing || state.inputTokens < 0 || state.outputTokens < 0) {
      set({ calculation: null });
      return;
    }

    const calculation = calculateCost(
      state.inputTokens,
      state.outputTokens,
      modelPricing
    );

    set({ calculation });
  },

  getAllModels: () => {
    const state = get();
    return DEFAULT_MODEL_PRICING.map(model => ({
      ...model,
      ...state.customPricing[model.id],
    }));
  },

  getModelsByProvider: (provider) => {
    const state = get();
    return DEFAULT_MODEL_PRICING
      .filter(model => model.provider === provider)
      .map(model => ({
        ...model,
        ...state.customPricing[model.id],
      }));
  },

  getSelectedModelPricing: () => {
    const state = get();
    const defaultModel = DEFAULT_MODEL_PRICING.find(m => m.id === state.selectedModel);
    if (!defaultModel) return null;

    return {
      ...defaultModel,
      ...state.customPricing[state.selectedModel],
    };
  },
}));