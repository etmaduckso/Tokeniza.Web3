import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Aprenda sobre Tokenização
        </h1>

        <Tabs defaultValue="process" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="process">Processo</TabsTrigger>
            <TabsTrigger value="platforms">Plataformas</TabsTrigger>
            <TabsTrigger value="assets">Tipos de Ativos</TabsTrigger>
            <TabsTrigger value="benefits">Vantagens</TabsTrigger>
          </TabsList>

          <TabsContent value="process">
            <Card>
              <CardHeader>
                <CardTitle>Processo de Tokenização</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">1. Identificação e avaliação do ativo</h3>
                  <p>Seleção do ativo a ser tokenizado e avaliação de seu valor de mercado por especialistas.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">2. Estruturação jurídica</h3>
                  <p>Criação de um modelo legal que defina os direitos associados aos tokens, incluindo aspectos regulatórios e de compliance.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">3. Escolha da plataforma blockchain</h3>
                  <p>Seleção da tecnologia blockchain mais adequada para emissão e registro dos tokens, geralmente utilizando contratos inteligentes.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">4. Emissão dos tokens</h3>
                  <p>Criação digital dos tokens na blockchain escolhida, representando frações do ativo subjacente.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">5. Distribuição e negociação</h3>
                  <p>Disponibilização dos tokens em plataformas de negociação, permitindo a compra, venda e transferência entre investidores.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="platforms">
            <Card>
              <CardHeader>
                <CardTitle>Plataformas de Tokenização</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Securitize</h3>
                  <p>Plataforma end-to-end para emissão, gestão e negociação de security tokens, com foco em conformidade regulatória. Utiliza DS Protocol e suporta múltiplas blockchains.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Polymath</h3>
                  <p>Especializada em security tokens com protocolo ERC-1400, oferece blockchain própria (Polymesh) otimizada para ativos regulados.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Tokeny Solutions</h3>
                  <p>Plataforma europeia usando protocolo T-REX, com forte gestão de identidade digital através do ONCHAINID.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">RealT</h3>
                  <p>Focada em tokenização de imóveis residenciais, permite investimento fracionado com distribuição de rendimentos em tempo real.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">tZERO</h3>
                  <p>Combina blockchain com infraestrutura tradicional de mercado de capitais, oferecendo plataforma regulamentada de negociação.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assets">
            <Card>
              <CardHeader>
                <CardTitle>Tipos de Ativos Tokenizáveis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Imóveis</h3>
                  <p>Propriedades residenciais, comerciais, terrenos e empreendimentos imobiliários.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Ativos Financeiros</h3>
                  <p>Ações, títulos de dívida, fundos de investimento e recebíveis.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Commodities</h3>
                  <p>Metais preciosos, commodities agrícolas e recursos energéticos.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Obras de Arte</h3>
                  <p>Pinturas, esculturas, itens colecionáveis e antiguidades.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Direitos Autorais</h3>
                  <p>Direitos musicais, patentes, marcas registradas e conteúdo digital.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Projetos de Infraestrutura</h3>
                  <p>Energia renovável, transporte, saneamento e telecomunicações.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="benefits">
            <Card>
              <CardHeader>
                <CardTitle>Vantagens da Tokenização</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Aumento da liquidez</h3>
                  <p>Permite negociar frações de ativos que antes eram ilíquidos.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Democratização do acesso</h3>
                  <p>Possibilita que pequenos investidores participem de mercados antes restritos.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Transparência e segurança</h3>
                  <p>Transações registradas na blockchain são auditáveis e imutáveis.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Redução de custos</h3>
                  <p>Elimina intermediários tradicionais, tornando as operações mais eficientes.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Fracionamento</h3>
                  <p>Permite a divisão de ativos de alto valor em frações acessíveis.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Automação</h3>
                  <p>Smart contracts automatizam processos como distribuição de rendimentos e conformidade.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}