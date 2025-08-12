import { ModelSelector } from '@/components/ModelSelector';
import { TokenInput } from '@/components/TokenInput';
import { CostDisplay } from '@/components/CostDisplay';
import { CostTable } from '@/components/CostTable';
import { CurrencySelector } from '@/components/CurrencySelector';
import { ProviderComparison } from '@/components/ProviderComparison';
import { DollarSign, Zap, Github } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-blue-600 rounded-lg">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              OpenAI Cost Calculator
            </h1>
            <div className="p-2 bg-green-600 rounded-lg">
              <Zap className="h-8 w-8 text-white" />
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate the exact cost of your OpenAI API usage with detailed breakdowns, 
            formula explanations, and model comparisons. Updated with latest 2025 pricing.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Inputs */}
          <div className="space-y-6">
            <ModelSelector />
            <TokenInput />
            <CurrencySelector />
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            <CostDisplay />
          </div>
        </div>

        {/* Full Width - Provider Comparison */}
        <div className="mb-8">
          <ProviderComparison />
        </div>

        {/* Full Width - Model Comparison Table */}
        <div className="mb-8">
          <CostTable />
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 border-t pt-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <a
              href="https://openai.com/api/pricing/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-600 transition-colors"
            >
              <DollarSign className="h-4 w-4" />
              Official OpenAI Pricing
            </a>
            <span>•</span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-600 transition-colors"
            >
              <Github className="h-4 w-4" />
              View Source
            </a>
          </div>
          <p>
            Built with React, TypeScript, Tailwind CSS, and shadcn/ui. 
            Pricing data updated January 2025.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
