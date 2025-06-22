"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useWalletStore } from "@/lib/wallet-store";
import { useAccessFeeStore } from "@/lib/access-fee-store";
import { AccessFeePayment } from "@/components/access-fee-payment";

const platforms = [
  { id: "securitize", name: "Securitize" },
  { id: "polymath", name: "Polymath" },
  { id: "tokeny", name: "Tokeny Solutions" },
  { id: "realt", name: "RealT" },
  { id: "tzero", name: "tZERO" },
];

const assetTypes = [
  { id: "real-estate", name: "Imóveis" },
  { id: "financial", name: "Ativos Financeiros" },
  { id: "commodities", name: "Commodities" },
  { id: "art", name: "Obras de Arte" },
  { id: "copyright", name: "Direitos Autorais" },
  { id: "infrastructure", name: "Projetos de Infraestrutura" },
];

export default function SimulationPage() {
  const [step, setStep] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedAssetType, setSelectedAssetType] = useState("");
  const [assetValue, setAssetValue] = useState("");
  const [tokenCount, setTokenCount] = useState("");
  const [tokenValue, setTokenValue] = useState("");
  const [useCustomTokenValue, setUseCustomTokenValue] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { isConnected, address } = useWalletStore();
  const { isPaid, checkPaymentStatus } = useAccessFeeStore();

  useEffect(() => {
    // Verificar status do pagamento quando conectar/trocar de conta
    if (isConnected && address) {
      checkPaymentStatus(address);
    }
  }, [isConnected, address, checkPaymentStatus]);
  const handleNext = () => {
    if (step === 1 && !isPaid) {
      toast({
        title: "Acesso não autorizado",
        description: "É necessário pagar a taxa de acesso para continuar.",
        variant: "destructive",
      });
      return;
    }

    if (step === 1 && !selectedPlatform) {
      toast({
        title: "Selecione uma plataforma",
        description: "É necessário selecionar uma plataforma para continuar.",
        variant: "destructive",
      });
      return;
    }

    if (step === 2 && !selectedAssetType) {
      toast({
        title: "Selecione um tipo de ativo",
        description: "É necessário selecionar um tipo de ativo para continuar.",
        variant: "destructive",
      });
      return;
    }

    if (step === 3) {
      if (!assetValue) {
        toast({
          title: "Valor do ativo obrigatório",
          description: "É necessário informar o valor do ativo.",
          variant: "destructive",
        });
        return;
      }
      
      if (!tokenCount) {
        toast({
          title: "Quantidade de tokens obrigatória",
          description: "É necessário informar a quantidade de tokens.",
          variant: "destructive",
        });
        return;
      }
      
      if (useCustomTokenValue && !tokenValue) {
        toast({
          title: "Valor por token obrigatório",
          description: "É necessário informar o valor por token quando a opção personalizada está ativada.",
          variant: "destructive",
        });
        return;
      }
    }

    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  const handlePayAccess = () => {
    // Esta função agora é tratada pelo componente AccessFeePayment
    toast({
      title: "Use o componente de pagamento",
      description: "Use o formulário de pagamento acima para pagar a taxa.",
      variant: "default",
    });
  };

  const calculateTokenValue = () => {
    if (useCustomTokenValue && tokenValue) {
      return Number(tokenValue);
    }
    
    if (assetValue && tokenCount) {
      return Number(assetValue) / Number(tokenCount);
    }
    
    return 0;
  };

  const calculatePotentialProfit = () => {
    if (useCustomTokenValue && tokenValue && assetValue && tokenCount) {
      const baseValue = Number(assetValue) / Number(tokenCount);
      const customValue = Number(tokenValue);
      
      if (customValue > baseValue) {
        return (customValue - baseValue) * Number(tokenCount);
      }
    }
    
    return 0;
  };

  const handleTokenizeAsset = () => {
    // Prepare data to pass to tokenize page
    const simulationData = {
      platform: selectedPlatform,
      assetType: selectedAssetType,
      assetValue,
      tokenCount,
      tokenPrice: useCustomTokenValue ? tokenValue : (Number(assetValue) / Number(tokenCount)).toString(),
    };
    
    // Store in sessionStorage to retrieve on tokenize page
    sessionStorage.setItem('simulationData', JSON.stringify(simulationData));
    
    // Navigate to tokenize page
    router.push('/tokenize');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Simulação de Tokenização
        </h1>        <div className="max-w-2xl mx-auto">
          {!isPaid && (
            <AccessFeePayment onPaymentSuccess={() => {
              toast({
                title: "Pagamento confirmado! 🎉",
                description: "Agora você pode acessar a simulação de tokenização.",
              });
            }} />
          )}

          {isPaid && step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Escolha a Plataforma</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedPlatform}
                  onValueChange={setSelectedPlatform}
                >
                  {platforms.map((platform) => (
                    <div key={platform.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={platform.id} id={platform.id} />
                      <Label htmlFor={platform.id}>{platform.name}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          )}

          {isPaid && step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Selecione o Tipo de Ativo</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedAssetType}
                  onValueChange={setSelectedAssetType}
                >
                  {assetTypes.map((asset) => (
                    <div key={asset.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={asset.id} id={asset.id} />
                      <Label htmlFor={asset.id}>{asset.name}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          )}

          {isPaid && step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Configure os Parâmetros</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="asset-value">Valor do Ativo (R$)</Label>
                  <Input
                    id="asset-value"
                    type="number"
                    value={assetValue}
                    onChange={(e) => setAssetValue(e.target.value)}
                    placeholder="100000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="token-count">Quantidade de Tokens</Label>
                  <Input
                    id="token-count"
                    type="number"
                    value={tokenCount}
                    onChange={(e) => setTokenCount(e.target.value)}
                    placeholder="1000"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="custom-token-value"
                    checked={useCustomTokenValue}
                    onCheckedChange={setUseCustomTokenValue}
                  />
                  <Label htmlFor="custom-token-value">Definir valor personalizado por token</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Definir um valor personalizado por token pode gerar lucro adicional 
                          além da valorização natural do ativo. O valor total dos tokens pode 
                          ser maior que o valor do ativo subjacente.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                {useCustomTokenValue && (
                  <div className="space-y-2">
                    <Label htmlFor="token-value">Valor por Token (R$)</Label>
                    <Input
                      id="token-value"
                      type="number"
                      value={tokenValue}
                      onChange={(e) => setTokenValue(e.target.value)}
                      placeholder={assetValue && tokenCount ? (Number(assetValue) / Number(tokenCount)).toFixed(2) : "100"}
                    />
                    {assetValue && tokenCount && tokenValue && Number(tokenValue) > (Number(assetValue) / Number(tokenCount)) && (
                      <p className="text-sm text-green-600">
                        Lucro potencial: R$ {calculatePotentialProfit().toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {isPaid && step === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>Resumo da Tokenização</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold">Plataforma Selecionada:</p>
                  <p>{platforms.find(p => p.id === selectedPlatform)?.name}</p>
                </div>
                <div>
                  <p className="font-semibold">Tipo de Ativo:</p>
                  <p>{assetTypes.find(a => a.id === selectedAssetType)?.name}</p>
                </div>
                <div>
                  <p className="font-semibold">Valor do Ativo:</p>
                  <p>R$ {Number(assetValue).toLocaleString()}</p>
                </div>
                <div>
                  <p className="font-semibold">Quantidade de Tokens:</p>
                  <p>{Number(tokenCount).toLocaleString()}</p>
                </div>
                <div>
                  <p className="font-semibold">Valor por Token:</p>
                  <p>R$ {calculateTokenValue().toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                </div>
                
                {useCustomTokenValue && calculatePotentialProfit() > 0 && (
                  <div>
                    <p className="font-semibold">Lucro Potencial:</p>
                    <p className="text-green-600">
                      R$ {calculatePotentialProfit().toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </p>
                  </div>
                )}
                
                <div className="pt-4">
                  <Button className="w-full" onClick={handleTokenizeAsset}>
                    Tokenizar Ativo
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-6 flex justify-between">
            {step > 1 && (
              <Button onClick={handleBack} variant="outline">
                Voltar
              </Button>
            )}
            {step < 4 && (
              <Button onClick={handleNext} className="ml-auto">
                Próximo
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}