import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCalculatorStore } from '@/store/calculatorStore';
import { formatTokens } from '@/utils/calculator';

export function TokenInput() {
  const { inputTokens, outputTokens, setInputTokens, setOutputTokens } = useCalculatorStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Token Usage</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="input-tokens">Input Tokens</Label>
          <Input
            id="input-tokens"
            type="number"
            min="0"
            value={inputTokens || ''}
            onChange={(e) => setInputTokens(parseInt(e.target.value) || 0)}
            placeholder="Enter number of input tokens"
          />
          {inputTokens > 0 && (
            <p className="text-sm text-muted-foreground mt-1">
              {formatTokens(inputTokens)} tokens
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="output-tokens">Output Tokens</Label>
          <Input
            id="output-tokens"
            type="number"
            min="0"
            value={outputTokens || ''}
            onChange={(e) => setOutputTokens(parseInt(e.target.value) || 0)}
            placeholder="Enter number of output tokens"
          />
          {outputTokens > 0 && (
            <p className="text-sm text-muted-foreground mt-1">
              {formatTokens(outputTokens)} tokens
            </p>
          )}
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between text-sm">
            <span>Total Tokens:</span>
            <span className="font-medium">{formatTokens(inputTokens + outputTokens)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}