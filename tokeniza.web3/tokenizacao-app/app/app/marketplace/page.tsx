"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Building, Coins, Landmark, PaintBucket, Copyright, Construction, Search } from "lucide-react";
import { WaitlistButton } from "@/components/waitlist-button";
import { useWaitlistStore } from "@/lib/waitlist-store";

// Sample marketplace data
const marketplaceAssets = [
  {
    id: "asset-1",
    name: "Edifício Comercial Centro",
    type: "real-estate",
    description: "Edifício comercial de 10 andares localizado no centro financeiro",
    creator: "0x8f7a...e3b9",
    totalValue: 5000000,
    tokenCount: 5000,
    tokenPrice: 1200,
    basePrice: 1000,
    sold: 2340,
    available: 2660,
    status: "active",
  },
  {
    id: "asset-2",
    name: "Fundo de Investimento XYZ",
    type: "financial",
    description: "Fundo de investimento diversificado com foco em empresas de tecnologia",
    creator: "0x3d2c...9f7b",
    totalValue: 1000000,
    tokenCount: 10000,
    tokenPrice: 110,
    basePrice: 100,
    sold: 7500,
    available: 2500,
    status: "active",
  },
  {
    id: "asset-3",
    name: "Reserva de Ouro",
    type: "commodities",
    description: "Participação em reserva de ouro físico armazenado em cofre seguro",
    creator: "0x6e1f...2a8d",
    totalValue: 800000,
    tokenCount: 2000,
    tokenPrice: 420,
    basePrice: 400,
    sold: 1200,
    available: 800,
    status: "active",
  },
  {
    id: "asset-4",
    name: "Obra de Arte Contemporânea",
    type: "art",
    description: "Obra de arte de artista renomado com exposição internacional",
    creator: "0x9c4a...7d2e",
    totalValue: 300000,
    tokenCount: 1000,
    tokenPrice: 350,
    basePrice: 300,
    sold: 600,
    available: 400,
    status: "active",
  },
  {
    id: "asset-5",
    name: "Direitos Autorais Música",
    type: "copyright",
    description: "Direitos autorais de catálogo musical com mais de 100 músicas",
    creator: "0x2b5d...8c3f",
    totalValue: 250000,
    tokenCount: 5000,
    tokenPrice: 55,
    basePrice: 50,
    sold: 3000,
    available: 2000,
    status: "active",
  },
  {
    id: "asset-6",
    name: "Projeto Energia Solar",
    type: "infrastructure",
    description: "Projeto de usina de energia solar com capacidade de 5MW",
    creator: "0x7a3b...4e1c",
    totalValue: 2000000,
    tokenCount: 20000,
    tokenPrice: 105,
    basePrice: 100,
    sold: 12000,
    available: 8000,
    status: "active",
  },
  {
    id: "asset-7",
    name: "Apartamento Residencial",
    type: "real-estate",
    description: "Apartamento de 120m² em área nobre com 3 quartos e 2 vagas",
    creator: "0x4d2e...9c7b",
    totalValue: 750000,
    tokenCount: 1500,
    tokenPrice: 550,
    basePrice: 500,
    sold: 0,
    available: 1350,
    status: "em-analise",
    estimatedReleaseDate: "2023-12-15",
  },
  {
    id: "asset-8",
    name: "Coleção de Vinhos Raros",
    type: "commodities",
    description: "Coleção de vinhos raros com mais de 50 garrafas de safras premiadas",
    creator: "0x1a5b...7e3d",
    totalValue: 180000,
    tokenCount: 900,
    tokenPrice: 220,
    basePrice: 200,
    sold: 0,
    available: 810,
    status: "em-analise",
    estimatedReleaseDate: "2023-12-20",
  },
  {
    id: "asset-9",
    name: "Startup de Tecnologia",
    type: "financial",
    description: "Participação em startup de tecnologia com foco em inteligência artificial",
    creator: "0x5e2f...8b4a",
    totalValue: 1200000,
    tokenCount: 12000,
    tokenPrice: 105,
    basePrice: 100,
    sold: 0,
    available: 10800,
    status: "em-analise",
    estimatedReleaseDate: "2024-01-10",
  },
];

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [assetTypeFilter, setAssetTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [purchaseAmount, setPurchaseAmount] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const { getWaitlistCountForAsset, hydrate } = useWaitlistStore();

  // Corrige hidratação do Zustand/localStorage
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  // Initialize waitlist counts for display
  useEffect(() => {
    // This effect ensures the waitlist counts are properly initialized
    // from localStorage when the component mounts
  }, []);

  const handlePurchaseAmountChange = (assetId: string, value: string) => {
    setPurchaseAmount({
      ...purchaseAmount,
      [assetId]: value,
    });
  };

  const handlePurchase = (assetId: string) => {
    const asset = marketplaceAssets.find((a) => a.id === assetId);
    const amount = parseInt(purchaseAmount[assetId] || "0");
    
    if (!asset) return;
    
    if (asset.status === "em-analise") {
      toast({
        title: "Ativo em análise",
        description: "Este ativo ainda está em processo de análise e não está disponível para compra.",
        variant: "destructive",
      });
      return;
    }
    
    if (!amount || amount <= 0) {
      toast({
        title: "Quantidade inválida",
        description: "Por favor, informe uma quantidade válida de tokens.",
        variant: "destructive",
      });
      return;
    }
    
    if (amount > asset.available) {
      toast({
        title: "Quantidade indisponível",
        description: `Apenas ${asset.available} tokens estão disponíveis para compra.`,
        variant: "destructive",
      });
      return;
    }
    
    const totalCost = amount * asset.tokenPrice;
    
    toast({
      title: "Compra realizada com sucesso",
      description: `Você adquiriu ${amount} tokens de ${asset.name} por R$ ${totalCost.toLocaleString()}.`,
    });
    
    // Reset purchase amount
    setPurchaseAmount({
      ...purchaseAmount,
      [assetId]: "",
    });
  };

  const getAssetIcon = (type: string) => {
    switch (type) {
      case "real-estate":
        return <Building className="h-6 w-6 text-blue-600" />;
      case "financial":
        return <Landmark className="h-6 w-6 text-green-600" />;
      case "commodities":
        return <Coins className="h-6 w-6 text-yellow-600" />;
      case "art":
        return <PaintBucket className="h-6 w-6 text-purple-600" />;
      case "copyright":
        return <Copyright className="h-6 w-6 text-red-600" />;
      case "infrastructure":
        return <Construction className="h-6 w-6 text-orange-600" />;
      default:
        return <Building className="h-6 w-6 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === "active") {
      return <Badge className="bg-green-500">Ativo</Badge>;
    } else if (status === "em-analise") {
      return <Badge className="bg-yellow-500">Em Análise</Badge>;
    }
    return null;
  };

  const filteredAssets = marketplaceAssets.filter((asset) => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          asset.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = assetTypeFilter === "" || asset.type === assetTypeFilter;
    const matchesStatus = statusFilter === "" || asset.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Marketplace de Ativos Tokenizados
        </h1>
        
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar ativos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={assetTypeFilter} onValueChange={setAssetTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os tipos</SelectItem>
                  <SelectItem value="real-estate">Imóveis</SelectItem>
                  <SelectItem value="financial">Ativos Financeiros</SelectItem>
                  <SelectItem value="commodities">Commodities</SelectItem>
                  <SelectItem value="art">Obras de Arte</SelectItem>
                  <SelectItem value="copyright">Direitos Autorais</SelectItem>
                  <SelectItem value="infrastructure">Infraestrutura</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-64">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os status</SelectItem>
                  <SelectItem value="active">Ativos</SelectItem>
                  <SelectItem value="em-analise">Em Análise</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {filteredAssets.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">Nenhum ativo encontrado com os filtros atuais.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAssets.map((asset) => (
                <Card key={asset.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getAssetIcon(asset.type)}
                        <CardTitle className="text-lg">{asset.name}</CardTitle>
                      </div>
                      {getStatusBadge(asset.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p className="text-sm text-gray-600 mb-4">{asset.description}</p>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500">Criador</p>
                        <p className="font-medium">{asset.creator}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Valor Total</p>
                        <p className="font-medium">R$ {asset.totalValue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Preço por Token</p>
                        <p className="font-medium">R$ {asset.tokenPrice.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Disponíveis</p>
                        <p className="font-medium">
                          {asset.status === "em-analise" 
                            ? "Pendente" 
                            : `${asset.available.toLocaleString()} / ${asset.tokenCount.toLocaleString()}`}
                        </p>
                      </div>
                    </div>
                    
                    {asset.tokenPrice > asset.basePrice && (
                      <div className="mt-3 bg-green-50 p-2 rounded-md">
                        <p className="text-xs text-green-700">
                          Valorização: +{(((asset.tokenPrice - asset.basePrice) / asset.basePrice) * 100).toFixed(2)}%
                        </p>
                      </div>
                    )}
                    
                    {asset.status === "em-analise" && asset.estimatedReleaseDate && (
                      <div className="mt-3 bg-blue-50 p-2 rounded-md">
                        <p className="text-xs text-blue-700">
                          Previsão de disponibilidade: {new Date(asset.estimatedReleaseDate).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-col gap-3 pt-0">
                    {asset.status === "active" ? (
                      <>
                        <div className="flex items-center gap-2 w-full">
                          <Label htmlFor={`amount-${asset.id}`} className="sr-only">
                            Quantidade
                          </Label>
                          <Input
                            id={`amount-${asset.id}`}
                            type="number"
                            placeholder="Quantidade"
                            value={purchaseAmount[asset.id] || ""}
                            onChange={(e) => handlePurchaseAmountChange(asset.id, e.target.value)}
                            min="1"
                            max={asset.available}
                          />
                          <Button 
                            onClick={() => handlePurchase(asset.id)}
                            disabled={!purchaseAmount[asset.id] || parseInt(purchaseAmount[asset.id]) <= 0}
                          >
                            Comprar
                          </Button>
                        </div>
                        {purchaseAmount[asset.id] && parseInt(purchaseAmount[asset.id]) > 0 && (
                          <p className="text-sm text-right w-full">
                            Total: R$ {(parseInt(purchaseAmount[asset.id]) * asset.tokenPrice).toLocaleString()}
                          </p>
                        )}
                      </>
                    ) : (
                      <WaitlistButton assetId={asset.id} assetName={asset.name} />
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}