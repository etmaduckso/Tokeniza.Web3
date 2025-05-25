"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { FileText, Upload, CheckCircle, ArrowRight } from "lucide-react";

const assetTypes = [
  { id: "real-estate", name: "Imóveis" },
  { id: "financial", name: "Ativos Financeiros" },
  { id: "commodities", name: "Commodities" },
  { id: "art", name: "Obras de Arte" },
  { id: "copyright", name: "Direitos Autorais" },
  { id: "infrastructure", name: "Projetos de Infraestrutura" },
];

interface SimulationData {
  platform: string;
  assetType: string;
  assetValue: string;
  tokenCount: string;
  tokenPrice: string;
}

export default function TokenizePage() {
  const [step, setStep] = useState(1);
  const [assetName, setAssetName] = useState("");
  const [assetType, setAssetType] = useState("");
  const [assetDescription, setAssetDescription] = useState("");
  const [assetValue, setAssetValue] = useState("");
  const [tokenCount, setTokenCount] = useState("");
  const [tokenPrice, setTokenPrice] = useState("");
  const [custodyTokens, setCustodyTokens] = useState("");
  const [documentUploaded, setDocumentUploaded] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const { toast } = useToast();

  // Load simulation data if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = sessionStorage.getItem('simulationData');
      if (savedData) {
        try {
          const data: SimulationData = JSON.parse(savedData);
          setAssetType(data.assetType);
          setAssetValue(data.assetValue);
          setTokenCount(data.tokenCount);
          setTokenPrice(data.tokenPrice);
          
          // Default custody tokens to 10% of total
          const defaultCustody = Math.round(Number(data.tokenCount) * 0.1).toString();
          setCustodyTokens(defaultCustody);
          
          toast({
            title: "Dados carregados",
            description: "Os dados da sua simulação foram carregados automaticamente.",
          });
        } catch (error) {
          console.error("Error parsing simulation data:", error);
        }
      }
    }
  }, [toast]);

  const handleNext = () => {
    if (step === 1) {
      if (!assetName || !assetType || !assetDescription) {
        toast({
          title: "Campos obrigatórios",
          description: "Preencha todos os campos para continuar.",
          variant: "destructive",
        });
        return;
      }
    } else if (step === 2) {
      if (!assetValue || !tokenCount || !tokenPrice) {
        toast({
          title: "Campos obrigatórios",
          description: "Preencha todos os campos para continuar.",
          variant: "destructive",
        });
        return;
      }
      
      if (custodyTokens && Number(custodyTokens) >= Number(tokenCount)) {
        toast({
          title: "Quantidade inválida",
          description: "A quantidade de tokens em custódia não pode ser maior ou igual ao total de tokens.",
          variant: "destructive",
        });
        return;
      }
    } else if (step === 3) {
      if (!documentUploaded || !imageUploaded) {
        toast({
          title: "Documentos obrigatórios",
          description: "Faça o upload de todos os documentos necessários.",
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

  const simulateUpload = (type: "document" | "image") => {
    toast({
      title: "Upload em andamento",
      description: "Aguarde enquanto processamos seu arquivo...",
    });

    setTimeout(() => {
      if (type === "document") {
        setDocumentUploaded(true);
      } else {
        setImageUploaded(true);
      }
      
      toast({
        title: "Upload concluído",
        description: "Seu arquivo foi enviado com sucesso.",
      });
    }, 2000);
  };

  const handleSubmit = () => {
    toast({
      title: "Ativo enviado para tokenização",
      description: "Seu ativo foi enviado para análise e será tokenizado em breve.",
    });
    
    // Clear simulation data from session storage
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('simulationData');
    }
    
    // Reset form
    setAssetName("");
    setAssetType("");
    setAssetDescription("");
    setAssetValue("");
    setTokenCount("");
    setTokenPrice("");
    setCustodyTokens("");
    setDocumentUploaded(false);
    setImageUploaded(false);
    setStep(1);
  };

  const getAvailableTokens = () => {
    const total = Number(tokenCount);
    const custody = Number(custodyTokens) || 0;
    return total - custody;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Tokenize seus Ativos
        </h1>
        
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between mb-8">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= stepNumber 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {stepNumber}
                </div>
                <div className="text-xs mt-2 text-center">
                  {stepNumber === 1 && "Informações"}
                  {stepNumber === 2 && "Parâmetros"}
                  {stepNumber === 3 && "Documentos"}
                  {stepNumber === 4 && "Revisão"}
                </div>
              </div>
            ))}
          </div>

          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Informações do Ativo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="asset-name">Nome do Ativo</Label>
                  <Input
                    id="asset-name"
                    value={assetName}
                    onChange={(e) => setAssetName(e.target.value)}
                    placeholder="Ex: Apartamento Centro SP"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="asset-type">Tipo de Ativo</Label>
                  <Select value={assetType} onValueChange={setAssetType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de ativo" />
                    </SelectTrigger>
                    <SelectContent>
                      {assetTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="asset-description">Descrição do Ativo</Label>
                  <Textarea
                    id="asset-description"
                    value={assetDescription}
                    onChange={(e) => setAssetDescription(e.target.value)}
                    placeholder="Descreva detalhes importantes sobre o ativo"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Parâmetros de Tokenização</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                
                <div className="space-y-2">
                  <Label htmlFor="custody-tokens">Tokens em Custódia</Label>
                  <Input
                    id="custody-tokens"
                    type="number"
                    value={custodyTokens}
                    onChange={(e) => setCustodyTokens(e.target.value)}
                    placeholder={tokenCount ? Math.round(Number(tokenCount) * 0.1).toString() : "100"}
                  />
                  <p className="text-sm text-gray-500">
                    Quantidade de tokens que você deseja manter em sua custódia (não disponíveis para venda).
                  </p>
                  {tokenCount && custodyTokens && (
                    <p className="text-sm">
                      Tokens disponíveis para venda: {getAvailableTokens().toLocaleString()}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="token-price">Preço por Token (R$)</Label>
                  <Input
                    id="token-price"
                    type="number"
                    value={tokenPrice}
                    onChange={(e) => setTokenPrice(e.target.value)}
                    placeholder={assetValue && tokenCount ? (Number(assetValue) / Number(tokenCount)).toFixed(2) : "100"}
                  />
                  {assetValue && tokenCount && tokenPrice && (
                    <div className="text-sm mt-2">
                      <p>
                        Valor base por token: R$ {(Number(assetValue) / Number(tokenCount)).toFixed(2)}
                      </p>
                      {Number(tokenPrice) > (Number(assetValue) / Number(tokenCount)) && (
                        <p className="text-green-600">
                          Lucro potencial: R$ {((Number(tokenPrice) * Number(tokenCount)) - Number(assetValue)).toFixed(2)}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Documentação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-6 w-6 text-blue-600" />
                      <div>
                        <p className="font-medium">Comprovante de Propriedade</p>
                        <p className="text-sm text-gray-500">Documento que comprove a propriedade do ativo (PDF)</p>
                      </div>
                    </div>
                    {documentUploaded ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <Button onClick={() => simulateUpload("document")} variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-6 w-6 text-blue-600" />
                      <div>
                        <p className="font-medium">Imagem do Ativo</p>
                        <p className="text-sm text-gray-500">Imagem de alta qualidade do ativo (JPG, PNG)</p>
                      </div>
                    </div>
                    {imageUploaded ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <Button onClick={() => simulateUpload("image")} variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>Revisão e Confirmação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Nome do Ativo:</p>
                    <p>{assetName}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Tipo de Ativo:</p>
                    <p>{assetTypes.find(t => t.id === assetType)?.name}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-semibold">Descrição:</p>
                    <p className="text-sm">{assetDescription}</p>
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
                    <p className="font-semibold">Tokens em Custódia:</p>
                    <p>{Number(custodyTokens || "0").toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Tokens para Venda:</p>
                    <p>{getAvailableTokens().toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Preço por Token:</p>
                    <p>R$ {Number(tokenPrice).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Valor Total dos Tokens:</p>
                    <p>R$ {(Number(tokenPrice) * Number(tokenCount)).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button onClick={handleSubmit} className="w-full">
                    Confirmar e Tokenizar
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
                Próximo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}