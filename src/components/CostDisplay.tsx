import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCalculatorStore } from '@/store/calculatorStore';
import { formatCost, formatTokens, calculatePercentage, convertCurrency } from '@/utils/calculator';
import { Calculator, DollarSign, TrendingUp, Info } from 'lucide-react';

export function CostDisplay() {
  const { calculation, calculateCurrentCost, currency, exchangeRates } = useCalculatorStore();

  if (!calculation) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Cost Calculation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Enter token counts and select a model to see cost breakdown
            </p>
            <Button onClick={calculateCurrentCost} variant="outline">
              Calculate Cost
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Convert costs to selected currency
  const convertedInputCost = convertCurrency(calculation.inputCost, currency, exchangeRates.usdToInr);
  const convertedOutputCost = convertCurrency(calculation.outputCost, currency, exchangeRates.usdToInr);
  const convertedTotalCost = convertCurrency(calculation.totalCost, currency, exchangeRates.usdToInr);
  
  const inputPercentage = calculatePercentage(calculation.inputCost, calculation.totalCost);
  const outputPercentage = calculatePercentage(calculation.outputCost, calculation.totalCost);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Cost Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Cost - Large Display */}
        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border">
          <div className="text-4xl font-bold text-indigo-600 mb-2">
            {formatCost(convertedTotalCost, currency)}
          </div>
          <p className="text-sm text-muted-foreground">
            Total Cost for {formatTokens(calculation.inputTokens + calculation.outputTokens)} tokens
          </p>
        </div>

        {/* Detailed Breakdown */}
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Detailed Breakdown
          </h3>
          
          {/* Input Cost */}
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <div>
              <div className="font-medium text-green-700">Input Tokens</div>
              <div className="text-sm text-green-600">
                {formatTokens(calculation.inputTokens)} × ${calculation.model.inputPrice}/1M
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-green-700">
                {formatCost(convertedInputCost, currency)}
              </div>
              <div className="text-sm text-green-600">
                {inputPercentage.toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Output Cost */}
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div>
              <div className="font-medium text-blue-700">Output Tokens</div>
              <div className="text-sm text-blue-600">
                {formatTokens(calculation.outputTokens)} × ${calculation.model.outputPrice}/1M
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-blue-700">
                {formatCost(convertedOutputCost, currency)}
              </div>
              <div className="text-sm text-blue-600">
                {outputPercentage.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        {/* Formula Display */}
        <div className="p-4 bg-gray-50 rounded-lg border">
          <h4 className="font-medium flex items-center gap-2 mb-2">
            <Info className="h-4 w-4" />
            Calculation Formula
          </h4>
          <div className="text-sm font-mono space-y-1">
            <div>Input Cost = {formatTokens(calculation.inputTokens)} ÷ 1,000,000 × ${calculation.model.inputPrice} = {formatCost(convertedInputCost, currency)}</div>
            <div>Output Cost = {formatTokens(calculation.outputTokens)} ÷ 1,000,000 × ${calculation.model.outputPrice} = {formatCost(convertedOutputCost, currency)}</div>
            <div className="pt-2 border-t font-semibold">
              Total Cost = {formatCost(convertedInputCost, currency)} + {formatCost(convertedOutputCost, currency)} = {formatCost(convertedTotalCost, currency)}
            </div>
            {currency === 'INR' && (
              <div className="pt-2 text-xs text-muted-foreground">
                (Converted from USD at rate: 1 USD = ₹{exchangeRates.usdToInr})
              </div>
            )}
          </div>
        </div>

        {/* Model Info */}
        <div className="text-xs text-muted-foreground text-center p-2 bg-muted/50 rounded">
          Using {calculation.model.name} pricing
        </div>
      </CardContent>
    </Card>
  );
}