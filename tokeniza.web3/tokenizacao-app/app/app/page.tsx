import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Tokenização de Ativos do Mundo Real
            </h1>
            <p className="text-xl mb-8">
              Aprenda e simule o processo de tokenização de diferentes tipos de ativos
              através de uma experiência interativa e educativa.
            </p>
            <Link href="/simulation">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                Iniciar Simulação
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Explore o Mundo da Tokenização
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="platform-card">
              <CardHeader>
                <CardTitle>Plataformas Populares</CardTitle>
                <CardDescription>
                  Conheça as principais plataformas de tokenização do mercado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>Securitize</li>
                  <li>Polymath</li>
                  <li>Tokeny Solutions</li>
                  <li>RealT</li>
                  <li>tZERO</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="platform-card">
              <CardHeader>
                <CardTitle>Tipos de Ativos</CardTitle>
                <CardDescription>
                  Diversos ativos que podem ser tokenizados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>Imóveis</li>
                  <li>Ativos Financeiros</li>
                  <li>Commodities</li>
                  <li>Obras de Arte</li>
                  <li>Direitos Autorais</li>
                  <li>Projetos de Infraestrutura</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="platform-card">
              <CardHeader>
                <CardTitle>Benefícios</CardTitle>
                <CardDescription>
                  Vantagens da tokenização de ativos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>Maior liquidez</li>
                  <li>Acesso democratizado</li>
                  <li>Transparência</li>
                  <li>Redução de custos</li>
                  <li>Fracionamento de ativos</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Pronto para começar sua jornada na tokenização?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/simulation">
              <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
                Começar Simulação
              </Button>
            </Link>
            <Link href="/testnet">
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Testar na zkSync Sepolia
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Use a simulação para aprender ou teste com contratos reais na rede de teste
          </p>
        </div>
      </section>
    </div>
  );
}