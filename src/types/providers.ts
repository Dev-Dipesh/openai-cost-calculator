export type Provider = 'openai' | 'anthropic' | 'azure';

export interface ProviderInfo {
  id: Provider;
  name: string;
  description: string;
  website: string;
}

export const PROVIDERS: Record<Provider, ProviderInfo> = {
  openai: {
    id: 'openai',
    name: 'OpenAI',
    description: 'Official OpenAI API pricing',
    website: 'https://openai.com/api/pricing/'
  },
  anthropic: {
    id: 'anthropic',
    name: 'Anthropic Claude',
    description: 'Claude API models for conversational AI',
    website: 'https://www.anthropic.com/pricing'
  },
  azure: {
    id: 'azure',
    name: 'Azure OpenAI (India)',
    description: 'Microsoft Azure OpenAI Service - South India pricing',
    website: 'https://azure.microsoft.com/en-us/pricing/details/cognitive-services/openai-service/'
  }
};