import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCalculatorStore } from '@/store/calculatorStore';
import { formatCost, convertCurrency } from '@/utils/calculator';
import { PROVIDERS } from '@/types/providers';
import { Table, BarChart3 } from 'lucide-react';
import type { Provider } from '@/types/providers';

export function CostTable() {
  const { inputTokens, outputTokens, getAllModels, currency, exchangeRates } = useCalculatorStore();

  const models = getAllModels();

  if (!inputTokens && !outputTokens) {
    return null;
  }

  // Calculate costs for all models and group by provider
  const comparisons = models.map((model) => {
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

  // Group comparisons by provider for better table organization
  const comparisonsByProvider = comparisons.reduce((acc, comparison) => {
    const provider = comparison.model.provider;
    if (!acc[provider]) {
      acc[provider] = [];
    }
    acc[provider].push(comparison);
    return acc;
  }, {} as Record<Provider, typeof comparisons>);

  // Get provider order based on cheapest model
  const providerOrder = Object.keys(comparisonsByProvider) as Provider[];
  providerOrder.sort((a, b) => {
    const cheapestA = comparisonsByProvider[a][0]?.totalCost || 0;
    const cheapestB = comparisonsByProvider[b][0]?.totalCost || 0;
    return cheapestA - cheapestB;
  });

  const cheapest = comparisons[0];
  const mostExpensive = comparisons[comparisons.length - 1];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Model Cost Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Summary */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
            <div>
              <div className="text-sm text-muted-foreground">Cheapest Option</div>
              <div className="font-semibold text-green-600">
                {cheapest.model.name}: {formatCost(cheapest.totalCost, currency)}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Most Expensive</div>
              <div className="font-semibold text-red-600">
                {mostExpensive.model.name}: {formatCost(mostExpensive.totalCost, currency)}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Model</th>
                  <th className="text-right p-2">Input Cost</th>
                  <th className="text-right p-2">Output Cost</th>
                  <th className="text-right p-2 font-bold">Total Cost</th>
                  <th className="text-right p-2">vs Cheapest</th>
                </tr>
              </thead>
              <tbody>
                {providerOrder.map((providerId, providerIndex) => {
                  const providerModels = comparisonsByProvider[providerId];
                  const providerInfo = PROVIDERS[providerId];
                  
                  return (
                    <React.Fragment key={providerId}>
                      {/* Provider Header Row */}
                      <tr className="bg-gray-100 border-b-2 border-gray-300">
                        <td colSpan={5} className="p-3 font-bold text-gray-800">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{providerInfo.name}</span>
                            <span className="text-sm font-normal text-gray-600">
                              ({providerModels.length} models)
                            </span>
                            <span className="ml-auto text-sm font-normal text-gray-500">
                              Best: {formatCost(providerModels[0]?.totalCost || 0, currency)}
                            </span>
                          </div>
                        </td>
                      </tr>
                      
                      {/* Provider Models */}
                      {providerModels.map((comparison, index) => {
                        const overallIndex = comparisons.findIndex(c => c.model.id === comparison.model.id);
                        const savingsVsCheapest = comparison.totalCost / cheapest.totalCost;
                        const isOverallBest = overallIndex === 0;
                        const isProviderBest = index === 0;

                        return (
                          <tr
                            key={comparison.model.id}
                            className={`border-b hover:bg-muted/50 ${
                              isOverallBest ? 'bg-green-50 border-green-200' : 
                              isProviderBest ? 'bg-blue-50 border-blue-200' : ''
                            }`}
                          >
                            <td className="p-2 pl-6">
                              <div>
                                <div className="font-medium flex items-center gap-2">
                                  {comparison.model.name}
                                  {isOverallBest && (
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                      🏆 Overall Best
                                    </span>
                                  )}
                                  {isProviderBest && !isOverallBest && (
                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                      Best in {providerInfo.name}
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {comparison.model.category}
                                  {comparison.model.contextWindow && (
                                    <span className="ml-2">
                                      • {(comparison.model.contextWindow / 1000).toFixed(0)}K context
                                    </span>
                                  )}
                                </div>
                                {comparison.model.description && (
                                  <div className="text-xs text-muted-foreground mt-1">
                                    {comparison.model.description}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="text-right p-2 text-green-600">
                              {formatCost(comparison.inputCost, currency)}
                            </td>
                            <td className="text-right p-2 text-blue-600">
                              {formatCost(comparison.outputCost, currency)}
                            </td>
                            <td className="text-right p-2 font-bold">
                              {formatCost(comparison.totalCost, currency)}
                            </td>
                            <td className="text-right p-2">
                              {savingsVsCheapest === 1 ? (
                                <span className="text-green-600 font-medium">🥇 Best</span>
                              ) : (
                                <span className="text-red-600">
                                  {savingsVsCheapest.toFixed(1)}x
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                      
                      {/* Add spacing between providers */}
                      {providerIndex < providerOrder.length - 1 && (
                        <tr>
                          <td colSpan={5} className="p-2"></td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Note */}
          <div className="text-xs text-muted-foreground text-center p-2">
            Costs calculated based on {inputTokens.toLocaleString()} input tokens and {outputTokens.toLocaleString()} output tokens
          </div>
        </div>
      </CardContent>
    </Card>
  );
}