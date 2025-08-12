import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCalculatorStore } from '@/store/calculatorStore';
import { CURRENCIES } from '@/types/currency';
import { DollarSign, Settings, RotateCcw } from 'lucide-react';

export function CurrencySelector() {
  const {
    currency,
    exchangeRates,
    setCurrency,
    setExchangeRate,
  } = useCalculatorStore();

  const [showCustomRate, setShowCustomRate] = useState(false);
  const [customRate, setCustomRate] = useState(exchangeRates.usdToInr.toString());

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency as 'USD' | 'INR');
  };

  const handleCustomRateToggle = () => {
    if (showCustomRate) {
      // Save custom rate
      const rate = parseFloat(customRate);
      if (!isNaN(rate) && rate > 0) {
        setExchangeRate(rate);
      }
      setShowCustomRate(false);
    } else {
      // Show custom rate form
      setCustomRate(exchangeRates.usdToInr.toString());
      setShowCustomRate(true);
    }
  };

  const handleResetRate = () => {
    setExchangeRate(86.00); // Default rate
    setShowCustomRate(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Currency & Exchange Rate
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="currency-select">Display Currency</Label>
          <Select value={currency} onValueChange={handleCurrencyChange}>
            <SelectTrigger>
              <SelectValue placeholder="Choose currency" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(CURRENCIES).map(([code, info]) => (
                <SelectItem key={code} value={code}>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-lg">{info.symbol}</span>
                    <span>{info.name} ({code})</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {currency === 'INR' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Label>Exchange Rate (1 USD = ? INR)</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCustomRateToggle}
              >
                <Settings className="h-4 w-4" />
                {showCustomRate ? 'Save' : 'Edit'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetRate}
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </div>
            
            {showCustomRate ? (
              <Input
                type="number"
                step="0.01"
                value={customRate}
                onChange={(e) => setCustomRate(e.target.value)}
                placeholder="Enter exchange rate"
              />
            ) : (
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <div className="text-2xl font-bold text-orange-600">
                    ₹{exchangeRates.usdToInr.toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    per 1 USD
                  </div>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <div>Last updated:</div>
                  <div>{new Date(exchangeRates.lastUpdated).toLocaleDateString()}</div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="text-xs text-muted-foreground p-2 bg-blue-50 rounded border border-blue-200">
          <strong>Note:</strong> OpenAI prices are in USD. Exchange rates are for display purposes only.
          {currency === 'INR' && ' Current rate is approximate and should be updated regularly.'}
        </div>
      </CardContent>
    </Card>
  );
}