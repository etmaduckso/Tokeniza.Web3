# Tokeniza.web3 - Plataforma de Tokenização de Ativos Reais

[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)](https://github.com/yourusername/tokeniza.web3)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 📝 Visão Geral

O **Tokeniza.web3** é uma plataforma educativa e funcional para a tokenização de ativos do mundo real utilizando tecnologias blockchain. A plataforma permite a criação, gestão e negociação de tokens representativos de ativos reais (imóveis, obras de arte, commodities, etc.) de forma transparente, segura e em conformidade com regulamentações relevantes.

### 💡 Recursos Principais

- **Tokenização 🪙**: Processo guiado para transformar ativos físicos em tokens digitais
- **Marketplace 🛒**: Ambiente para negociação de ativos tokenizados
- **Simulação 🎮**: Ferramenta educacional para entender o processo de tokenização
- **Integração Web3 🔗**: Suporte para múltiplas carteiras blockchain (Ethereum, Solana)
- **Documentação Educativa 📚**: Conteúdo explicativo sobre tokenização e blockchain

## 🧰 Stack Tecnológico

### Frontend
- **Framework**: Next.js 13+ com React 18
- **Linguagem**: TypeScript
- **Estilização**: TailwindCSS
- **Estado**: Zustand
- **Web3**: ethers.js, wagmi
- **UI**: Radix UI, lucide-react, class-variance-authority, next-themes

### Backend
- **Framework**: Axum (Rust)
- **Banco de Dados**: PostgreSQL (via Prisma)
- **API**: RESTful

### Blockchain
- **Contracts**: Solidity 0.8+
- **Ferramentas**: Foundry, Hardhat
- **Bibliotecas**: OpenZeppelin

## 🚀 Como Iniciar

### Pré-requisitos

- Node.js 18+
- Rust 1.70+
- PostgreSQL
- Foundry (forge, anvil)
- Metamask ou outra carteira compatível

### Instalação

1. **Clone o repositório**

```powershell
git clone https://github.com/yourusername/tokeniza.web3.git
cd tokeniza.web3
```

2. **Configuração do Frontend**

```powershell
cd tokenizacao-app/app
npm install
# Instale dependências extras se necessário
npm install @radix-ui/react-radio-group @radix-ui/react-select @radix-ui/react-icons @radix-ui/react-toast @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-popover @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-tooltip next-themes lucide-react class-variance-authority tailwind-merge tailwindcss-animate
cp ..\.env.example .env.local
# Configure as variáveis de ambiente necessárias (RPC_URL, CONTRACT_ADDRESS, etc)
```

3. **Configuração do Backend**

```powershell
cd ../../backend
cp .env.example .env
# Configure as variáveis de ambiente necessárias (DB_URL, etc)
cargo build
```

4. **Configuração da Blockchain**

```powershell
cd ../onchain
forge install
cp .env.example .env
# Configure as variáveis de ambiente necessárias (PRIVATE_KEY, RPC_URL, etc)
```

### Executando o Projeto

1. **Iniciar o Ambiente de Blockchain Local/Testnet**

```powershell
cd ../onchain
# Para ambiente local:
./script/start_anvil.sh
# Para testnet (exemplo Sepolia):
# Configure .env com RPC_URL e PRIVATE_KEY da testnet
```

2. **Deployar os Contratos**

```powershell
cd ../onchain
# Local:
./script/deploy_local.sh
# Testnet (exemplo Sepolia):
forge script script/DeployContracts.s.sol --rpc-url $RPC_URL --private-key $PRIVATE_KEY --broadcast --verify
```

3. **Atualize o Frontend com os endereços dos contratos**

- Edite `.env.local` em `tokenizacao-app/app` com os endereços dos contratos deployados.

4. **Iniciar o Backend**

```powershell
cd ../backend
cargo run
```

5. **Iniciar o Frontend**

```powershell
cd ../app
npm run dev
```

6. **Acesse a aplicação**

Abra seu navegador e acesse `http://localhost:3000`

## 🌐 Deploy em Testnet

- Configure `.env` e `.env.local` para usar endpoints e contratos da testnet (Sepolia, Goerli, etc).
- Use faucet para obter ETH de teste para sua wallet.
- Certifique-se de que a wallet (MetaMask) está conectada à mesma testnet.
- Teste todas as interações (compra, waitlist, etc) usando a testnet.

## 🛠️ Troubleshooting

- **Erro de dependências**: Rode `npm install` novamente no frontend.
- **Tela branca no marketplace**: Certifique-se de que todas as dependências do Radix UI e Zustand estão instaladas e que o backend/blockchain estão rodando.
- **Problemas de conexão com a blockchain**: Verifique se o RPC_URL está correto e se há saldo na wallet de teste.
- **Problemas de build**: Rode `npm run build` para ver mensagens detalhadas.

## 📚 Documentação

- [Guia de Testes de Contratos](./guia-teste-contratos.md)
- [Guia de Produção](./docs/Guia_Producao_Tokenizacao.md)
- [Documentação de Pesquisa](./tokenizacao_pesquisa.md)
- [Detecção de Ambiente](./tokenizacao-app/deteccao-ambiente.md)
- [Integração Foundry](./tokenizacao-app/foundry-integration.md)

## 🧪 Testes

### Frontend
```powershell
cd tokenizacao-app/app
npm test
```

### Backend
```powershell
cd tokenizacao-app/backend
cargo test
```

### Smart Contracts
```powershell
cd tokenizacao-app/onchain
forge test
```

## 🔐 Segurança

Este projeto implementa as melhores práticas de segurança para contratos inteligentes:

- Utilização de padrões OpenZeppelin
- Padrões anti-reentrância
- Controle de acesso baseado em papéis
- Testes automatizados abrangentes
- Verificação de overflow/underflow

## 📊 Arquitetura

```
tokenizacao-app/
├── app/             # Frontend Next.js
├── backend/         # Backend Rust/Axum
└── onchain/         # Smart Contracts Solidity/Foundry
```

## 🎯 Roadmap

- [x] MVP com tokenização básica
- [x] Marketplace de tokens
- [ ] Integração com oráculos para avaliação de ativos
- [ ] Sistema de governança descentralizada
- [ ] Suporte para fracionamento de tokens
- [ ] Integração com DeFi para liquidez

## 👥 Contribuição

Contribuições são bem-vindas! Por favor, leia as [diretrizes de contribuição](CONTRIBUTING.md) para mais detalhes.

## 📜 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📬 Contato

- **Website**: [tokeniza.web3.example.com](https://tokeniza.web3.example.com)
- **Email**: contato@tokeniza.web3.example.com
- **Twitter**: [@tokenizaweb3](https://twitter.com/tokenizaweb3)

---

<p align="center">
  Desenvolvido com ❤️ pela equipe Tokeniza
</p>
