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
import { PROVIDERS } from '@/types/providers';
import { Settings, RotateCcw, ExternalLink } from 'lucide-react';

export function ModelSelector() {
  const {
    selectedModel,
    selectedProvider,
    setSelectedModel,
    setSelectedProvider,
    getModelsByProvider,
    getSelectedModelPricing,
    updateCustomPricing,
    resetCustomPricing,
  } = useCalculatorStore();

  const [showCustomPricing, setShowCustomPricing] = useState(false);
  const [customInputPrice, setCustomInputPrice] = useState('');
  const [customOutputPrice, setCustomOutputPrice] = useState('');

  const models = getModelsByProvider(selectedProvider);
  const selectedModelPricing = getSelectedModelPricing();
  const currentProvider = PROVIDERS[selectedProvider];

  // Group models by category for the selected provider
  const modelsByCategory = models.reduce((acc, model) => {
    if (!acc[model.category]) {
      acc[model.category] = [];
    }
    acc[model.category].push(model);
    return acc;
  }, {} as Record<string, typeof models>);

  const handleCustomPricingToggle = () => {
    if (!selectedModelPricing) return;
    
    if (showCustomPricing) {
      // Save custom pricing
      const inputPrice = parseFloat(customInputPrice);
      const outputPrice = parseFloat(customOutputPrice);
      
      if (!isNaN(inputPrice) && !isNaN(outputPrice)) {
        updateCustomPricing(selectedModel, {
          inputPrice,
          outputPrice,
        });
      }
      setShowCustomPricing(false);
    } else {
      // Show custom pricing form
      setCustomInputPrice(selectedModelPricing.inputPrice.toString());
      setCustomOutputPrice(selectedModelPricing.outputPrice.toString());
      setShowCustomPricing(true);
    }
  };

  const handleResetPricing = () => {
    resetCustomPricing(selectedModel);
    setShowCustomPricing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Provider & Model Selection
          <Button
            variant="outline"
            size="sm"
            onClick={handleCustomPricingToggle}
          >
            <Settings className="h-4 w-4" />
            {showCustomPricing ? 'Save' : 'Customize'}
          </Button>
          {selectedModelPricing && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetPricing}
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Provider Selection */}
        <div>
          <Label htmlFor="provider-select">AI Provider</Label>
          <Select value={selectedProvider} onValueChange={setSelectedProvider}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a provider" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(PROVIDERS).map(([providerId, provider]) => (
                <SelectItem key={providerId} value={providerId}>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{provider.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <span>{currentProvider.description}</span>
            <a
              href={currentProvider.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
            >
              <ExternalLink className="h-3 w-3" />
              View Pricing
            </a>
          </div>
        </div>
        <div>
          <Label htmlFor="model-select">Select Model</Label>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a model" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(modelsByCategory).map(([category, categoryModels]) => (
                <div key={category}>
                  <div className="px-2 py-1 text-sm font-medium text-muted-foreground">
                    {category}
                  </div>
                  {categoryModels.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </div>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedModelPricing && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Input Price (per 1M tokens)</Label>
                {showCustomPricing ? (
                  <Input
                    type="number"
                    step="0.01"
                    value={customInputPrice}
                    onChange={(e) => setCustomInputPrice(e.target.value)}
                    placeholder="Input price"
                  />
                ) : (
                  <div className="text-2xl font-bold text-green-600">
                    ${selectedModelPricing.inputPrice.toFixed(2)}
                  </div>
                )}
              </div>
              <div>
                <Label>Output Price (per 1M tokens)</Label>
                {showCustomPricing ? (
                  <Input
                    type="number"
                    step="0.01"
                    value={customOutputPrice}
                    onChange={(e) => setCustomOutputPrice(e.target.value)}
                    placeholder="Output price"
                  />
                ) : (
                  <div className="text-2xl font-bold text-blue-600">
                    ${selectedModelPricing.outputPrice.toFixed(2)}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}