import type { ModelPricing } from '@/types/pricing';

// OpenAI Models (Latest 2025 pricing)
export const OPENAI_MODELS: ModelPricing[] = [
  // GPT-4o models
  {
    id: 'openai-gpt-4o',
    name: 'GPT-4o',
    inputPrice: 2.50,
    outputPrice: 10.00,
    category: 'GPT-4o',
    provider: 'openai',
    contextWindow: 128000,
    description: 'Most capable GPT-4o model'
  },
  {
    id: 'openai-gpt-4o-2024-11-20',
    name: 'GPT-4o (2024-11-20)',
    inputPrice: 2.50,
    outputPrice: 10.00,
    category: 'GPT-4o',
    provider: 'openai',
    contextWindow: 128000,
    description: 'GPT-4o with November 2024 training'
  },
  {
    id: 'openai-gpt-4o-2024-08-06',
    name: 'GPT-4o (2024-08-06)',
    inputPrice: 2.50,
    outputPrice: 10.00,
    category: 'GPT-4o',
    provider: 'openai',
    contextWindow: 128000,
    description: 'GPT-4o with August 2024 training'
  },
  {
    id: 'openai-gpt-4o-2024-05-13',
    name: 'GPT-4o (2024-05-13)',
    inputPrice: 5.00,
    outputPrice: 15.00,
    category: 'GPT-4o',
    provider: 'openai',
    contextWindow: 128000,
    description: 'Original GPT-4o model'
  },
  // GPT-4o mini models
  {
    id: 'openai-gpt-4o-mini',
    name: 'GPT-4o mini',
    inputPrice: 0.15,
    outputPrice: 0.60,
    category: 'GPT-4o mini',
    provider: 'openai',
    contextWindow: 128000,
    description: 'Fast and cost-effective model'
  },
  {
    id: 'openai-gpt-4o-mini-2024-07-18',
    name: 'GPT-4o mini (2024-07-18)',
    inputPrice: 0.15,
    outputPrice: 0.60,
    category: 'GPT-4o mini',
    provider: 'openai',
    contextWindow: 128000,
    description: 'GPT-4o mini with July 2024 training'
  },
  // GPT-4 Turbo models
  {
    id: 'openai-gpt-4-turbo',
    name: 'GPT-4 Turbo',
    inputPrice: 10.00,
    outputPrice: 30.00,
    category: 'GPT-4 Turbo',
    provider: 'openai',
    contextWindow: 128000,
    description: 'High-performance GPT-4 model'
  },
  {
    id: 'openai-gpt-4-turbo-2024-04-09',
    name: 'GPT-4 Turbo (2024-04-09)',
    inputPrice: 10.00,
    outputPrice: 30.00,
    category: 'GPT-4 Turbo',
    provider: 'openai',
    contextWindow: 128000,
    description: 'GPT-4 Turbo with April 2024 training'
  },
  // GPT-4 models
  {
    id: 'openai-gpt-4',
    name: 'GPT-4',
    inputPrice: 30.00,
    outputPrice: 60.00,
    category: 'GPT-4',
    provider: 'openai',
    contextWindow: 8000,
    description: 'Original GPT-4 model'
  },
  {
    id: 'openai-gpt-4-0613',
    name: 'GPT-4 (0613)',
    inputPrice: 30.00,
    outputPrice: 60.00,
    category: 'GPT-4',
    provider: 'openai',
    contextWindow: 8000,
    description: 'GPT-4 with June 2013 training'
  },
  // GPT-3.5 Turbo models
  {
    id: 'openai-gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    inputPrice: 0.50,
    outputPrice: 1.50,
    category: 'GPT-3.5 Turbo',
    provider: 'openai',
    contextWindow: 16000,
    description: 'Fast and economical model'
  },
  {
    id: 'openai-gpt-3.5-turbo-0125',
    name: 'GPT-3.5 Turbo (0125)',
    inputPrice: 0.50,
    outputPrice: 1.50,
    category: 'GPT-3.5 Turbo',
    provider: 'openai',
    contextWindow: 16000,
    description: 'Updated GPT-3.5 Turbo'
  },
  // o1 models (Reasoning models)
  {
    id: 'openai-o1-preview',
    name: 'o1-preview',
    inputPrice: 15.00,
    outputPrice: 60.00,
    category: 'o1 (Reasoning)',
    provider: 'openai',
    contextWindow: 128000,
    description: 'Advanced reasoning model'
  },
  {
    id: 'openai-o1-preview-2024-09-12',
    name: 'o1-preview (2024-09-12)',
    inputPrice: 15.00,
    outputPrice: 60.00,
    category: 'o1 (Reasoning)',
    provider: 'openai',
    contextWindow: 128000,
    description: 'o1-preview with September 2024 training'
  },
  {
    id: 'openai-o1-mini',
    name: 'o1-mini',
    inputPrice: 3.00,
    outputPrice: 12.00,
    category: 'o1 (Reasoning)',
    provider: 'openai',
    contextWindow: 128000,
    description: 'Compact reasoning model'
  },
  {
    id: 'openai-o1-mini-2024-09-12',
    name: 'o1-mini (2024-09-12)',
    inputPrice: 3.00,
    outputPrice: 12.00,
    category: 'o1 (Reasoning)',
    provider: 'openai',
    contextWindow: 128000,
    description: 'o1-mini with September 2024 training'
  }
];

// Anthropic Claude Models (Latest 2025 pricing)
export const ANTHROPIC_MODELS: ModelPricing[] = [
  // Claude 4 Series
  {
    id: 'claude-opus-4',
    name: 'Claude Opus 4',
    inputPrice: 15.00,
    outputPrice: 75.00,
    category: 'Claude Opus',
    provider: 'anthropic',
    contextWindow: 200000,
    description: 'Most powerful Claude model for complex tasks'
  },
  {
    id: 'claude-opus-4.1',
    name: 'Claude Opus 4.1',
    inputPrice: 15.00,
    outputPrice: 75.00,
    category: 'Claude Opus',
    provider: 'anthropic',
    contextWindow: 200000,
    description: 'Latest Opus with improved coding capabilities'
  },
  {
    id: 'claude-sonnet-4',
    name: 'Claude Sonnet 4',
    inputPrice: 3.00,
    outputPrice: 15.00,
    category: 'Claude Sonnet',
    provider: 'anthropic',
    contextWindow: 200000,
    description: 'Balanced performance and cost'
  },
  // Claude 3.5 Series
  {
    id: 'claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    inputPrice: 3.00,
    outputPrice: 15.00,
    category: 'Claude 3.5',
    provider: 'anthropic',
    contextWindow: 200000,
    description: 'Previous generation Sonnet model'
  },
  {
    id: 'claude-3.5-haiku',
    name: 'Claude 3.5 Haiku',
    inputPrice: 0.25,
    outputPrice: 1.25,
    category: 'Claude 3.5',
    provider: 'anthropic',
    contextWindow: 200000,
    description: 'Fast and economical Claude model'
  },
  // Claude 3 Series
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    inputPrice: 15.00,
    outputPrice: 75.00,
    category: 'Claude 3',
    provider: 'anthropic',
    contextWindow: 200000,
    description: 'Powerful Claude 3 model'
  },
  {
    id: 'claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    inputPrice: 3.00,
    outputPrice: 15.00,
    category: 'Claude 3',
    provider: 'anthropic',
    contextWindow: 200000,
    description: 'Balanced Claude 3 model'
  },
  {
    id: 'claude-3-haiku',
    name: 'Claude 3 Haiku',
    inputPrice: 0.25,
    outputPrice: 1.25,
    category: 'Claude 3',
    provider: 'anthropic',
    contextWindow: 200000,
    description: 'Fast Claude 3 model'
  }
];

// Azure OpenAI Models (South India pricing - 2025)
export const AZURE_MODELS: ModelPricing[] = [
  // GPT-4o models on Azure
  {
    id: 'azure-gpt-4o',
    name: 'GPT-4o (Azure)',
    inputPrice: 3.00,
    outputPrice: 10.00,
    category: 'GPT-4o',
    provider: 'azure',
    contextWindow: 128000,
    description: 'GPT-4o on Azure OpenAI Service'
  },
  {
    id: 'azure-gpt-4o-mini',
    name: 'GPT-4o mini (Azure)',
    inputPrice: 0.15,
    outputPrice: 0.60,
    category: 'GPT-4o mini',
    provider: 'azure',
    contextWindow: 128000,
    description: 'Cost-efficient GPT-4o mini on Azure'
  },
  {
    id: 'azure-gpt-4o-mini-0718',
    name: 'GPT-4o mini 0718 (Azure)',
    inputPrice: 0.15,
    outputPrice: 0.60,
    category: 'GPT-4o mini',
    provider: 'azure',
    contextWindow: 128000,
    description: 'GPT-4o mini 0718 with caching support (cached input: $0.075/1M)'
  },
  // GPT-4 Turbo on Azure
  {
    id: 'azure-gpt-4-turbo',
    name: 'GPT-4 Turbo (Azure)',
    inputPrice: 10.00,
    outputPrice: 30.00,
    category: 'GPT-4 Turbo',
    provider: 'azure',
    contextWindow: 128000,
    description: 'GPT-4 Turbo on Azure OpenAI Service'
  },
  // GPT-4 on Azure
  {
    id: 'azure-gpt-4',
    name: 'GPT-4 (Azure)',
    inputPrice: 30.00,
    outputPrice: 60.00,
    category: 'GPT-4',
    provider: 'azure',
    contextWindow: 8000,
    description: 'GPT-4 on Azure OpenAI Service'
  },
  {
    id: 'azure-gpt-4-32k',
    name: 'GPT-4 32K (Azure)',
    inputPrice: 60.00,
    outputPrice: 120.00,
    category: 'GPT-4',
    provider: 'azure',
    contextWindow: 32000,
    description: 'GPT-4 with 32K context on Azure'
  },
  // GPT-3.5 Turbo on Azure
  {
    id: 'azure-gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo (Azure)',
    inputPrice: 0.50,
    outputPrice: 1.50,
    category: 'GPT-3.5 Turbo',
    provider: 'azure',
    contextWindow: 16000,
    description: 'GPT-3.5 Turbo on Azure OpenAI Service'
  },
  {
    id: 'azure-gpt-3.5-turbo-16k',
    name: 'GPT-3.5 Turbo 16K (Azure)',
    inputPrice: 3.00,
    outputPrice: 4.00,
    category: 'GPT-3.5 Turbo',
    provider: 'azure',
    contextWindow: 16000,
    description: 'GPT-3.5 Turbo with 16K context on Azure'
  }
];

// Combined model pricing for all providers
export const ALL_MODELS = [
  ...OPENAI_MODELS,
  ...ANTHROPIC_MODELS,
  ...AZURE_MODELS
];