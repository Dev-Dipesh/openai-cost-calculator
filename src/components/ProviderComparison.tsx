import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCalculatorStore } from '@/store/calculatorStore';
import { PROVIDERS } from '@/types/providers';
import { formatCost, convertCurrency } from '@/utils/calculator';
import { BarChart3, RefreshCw } from 'lucide-react';
import type { Provider } from '@/types/providers';

export function ProviderComparison() {
  const { inputTokens, outputTokens, getAllModels, currency, exchangeRates, setSelectedProvider } = useCalculatorStore();
  const [selectedProviders, setSelectedProviders] = useState<Provider[]>(['openai', 'anthropic', 'azure']);

  const models = getAllModels();

  if (!inputTokens && !outputTokens) {
    return null;
  }

  // Calculate best model from each selected provider
  const providerComparisons = selectedProviders.map(providerId => {
    const provider = PROVIDERS[providerId];
    const providerModels = models.filter(model => model.provider === providerId);
    
    if (providerModels.length === 0) {
      return null;
    }

    const comparisons = providerModels.map((model) => {
      const inputCostUSD = (inputTokens / 1_000_000) * model.inputPrice;
      const outputCostUSD = (outputTokens / 1_000_000) * model.outputPrice;
      const totalCostUSD = inputCostUSD + outputCostUSD;

      // Convert to selected currency
      const inputCost = convertCurrency(inputCostUSD, currency, exchangeRates.usdToInr);
      const outputCost = convertCurrency(outputCostUSD, currency, exchangeRates.usdToInr);
      const totalCost = convertCurrency(totalCostUSD, currency, exchangeRates.usdToInr);

      return {
        model,
        inputCost,
        outputCost,
        totalCost,
      };
    }).sort((a, b) => a.totalCost - b.totalCost); // Sort by total cost

    const cheapestModel = comparisons[0];

    return {
      provider,
      cheapestModel,
      totalModels: providerModels.length,
      allModels: comparisons
    };
  }).filter(Boolean);

  // Sort providers by cheapest model cost
  const sortedProviders = providerComparisons.sort((a, b) => 
    (a?.cheapestModel.totalCost || 0) - (b?.cheapestModel.totalCost || 0)
  );

  const handleProviderSelect = (providerId: Provider) => {
    setSelectedProvider(providerId);
  };

  const toggleProvider = (providerId: Provider) => {
    if (selectedProviders.includes(providerId)) {
      setSelectedProviders(prev => prev.filter(p => p !== providerId));
    } else {
      setSelectedProviders(prev => [...prev, providerId]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Provider Comparison
          <div className="ml-auto flex gap-2">
            {Object.keys(PROVIDERS).map(providerId => (
              <Button
                key={providerId}
                variant={selectedProviders.includes(providerId as Provider) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleProvider(providerId as Provider)}
              >
                {PROVIDERS[providerId as Provider].name}
              </Button>
            ))}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Provider Rankings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sortedProviders.map((comparison, index) => {
              if (!comparison) return null;
              
              const isWinner = index === 0;
              const { provider, cheapestModel } = comparison;

              return (
                <div
                  key={provider.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${ 
                    isWinner 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                  onClick={() => handleProviderSelect(provider.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">{provider.name}</span>
                      {isWinner && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Best Value
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      #{index + 1}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="font-medium text-2xl text-center">
                      {formatCost(cheapestModel.totalCost, currency)}
                    </div>
                    <div className="text-sm text-center text-muted-foreground">
                      {cheapestModel.model.name}
                    </div>
                    <div className="text-xs text-center text-muted-foreground">
                      {comparison.totalModels} models available
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-3" 
                    size="sm"
                    variant={isWinner ? "default" : "outline"}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProviderSelect(provider.id);
                    }}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Switch to {provider.name}
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Detailed Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Provider</th>
                  <th className="text-left p-3">Cheapest Model</th>
                  <th className="text-right p-3">Input Cost</th>
                  <th className="text-right p-3">Output Cost</th>
                  <th className="text-right p-3 font-bold">Total Cost</th>
                  <th className="text-right p-3">Context Window</th>
                  <th className="text-center p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedProviders.map((comparison, index) => {
                  if (!comparison) return null;
                  
                  const { provider, cheapestModel } = comparison;
                  const isWinner = index === 0;

                  return (
                    <tr
                      key={provider.id}
                      className={`border-b hover:bg-muted/50 ${
                        isWinner ? 'bg-green-50' : ''
                      }`}
                    >
                      <td className="p-3">
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {provider.name}
                            {isWinner && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                Winner
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {provider.description}
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div>
                          <div className="font-medium">{cheapestModel.model.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {cheapestModel.model.category}
                          </div>
                        </div>
                      </td>
                      <td className="text-right p-3 text-green-600">
                        {formatCost(cheapestModel.inputCost, currency)}
                      </td>
                      <td className="text-right p-3 text-blue-600">
                        {formatCost(cheapestModel.outputCost, currency)}
                      </td>
                      <td className="text-right p-3 font-bold">
                        {formatCost(cheapestModel.totalCost, currency)}
                      </td>
                      <td className="text-right p-3 text-muted-foreground">
                        {cheapestModel.model.contextWindow ? 
                          `${(cheapestModel.model.contextWindow / 1000)}K` : 
                          'N/A'
                        }
                      </td>
                      <td className="text-center p-3">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleProviderSelect(provider.id)}
                        >
                          Select
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="text-xs text-muted-foreground text-center p-2">
            Comparison based on {inputTokens.toLocaleString()} input tokens and {outputTokens.toLocaleString()} output tokens
          </div>
        </div>
      </CardContent>
    </Card>
  );
}