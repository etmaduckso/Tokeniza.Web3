# Tokenização Backend - Rust API

Este é o backend em Rust para o sistema de tokenização de ativos.

## 🚀 Funcionalidades

- **APIs RESTful** para gerenciamento de ativos
- **Integração Web3** com Ethereum
- **Marketplace** para compra/venda de tokens
- **Sistema de Waitlist**
- **Monitoramento de Blockchain**

## 📋 Pré-requisitos

- Rust 1.70+
- Node.js (para o blockchain local)

## ⚙️ Configuração

1. Copie o arquivo de exemplo:
```bash
cp .env.example .env
```

2. Configure as variáveis de ambiente no `.env`

3. Instale as dependências:
```bash
cargo build
```

## 🏃‍♂️ Executando

### Desenvolvimento
```bash
cargo run
```

### Produção
```bash
cargo build --release
./target/release/tokenizacao-backend
```

## 📚 Endpoints da API

### Health Check
- `GET /` - Status do servidor
- `GET /health` - Health check
- `GET /api/v1/docs` - Documentação

### Assets
- `GET /api/v1/assets` - Listar ativos
- `POST /api/v1/assets` - Criar ativo
- `GET /api/v1/assets/{id}` - Obter ativo
- `POST /api/v1/assets/{id}/tokenize` - Tokenizar ativo

### Marketplace
- `GET /api/v1/marketplace/listings` - Listar ofertas
- `POST /api/v1/marketplace/listings` - Criar oferta
- `POST /api/v1/marketplace/purchase` - Comprar tokens

### Waitlist
- `POST /api/v1/waitlist` - Adicionar à lista de espera
- `GET /api/v1/waitlist` - Listar entradas
- `GET /api/v1/waitlist/stats` - Estatísticas

### Blockchain
- `GET /api/v1/blockchain/status` - Status da blockchain
- `GET /api/v1/blockchain/balance/{address}` - Saldo
- `GET /api/v1/blockchain/block` - Último bloco
- `GET /api/v1/blockchain/gas-price` - Preço do gas

## 🔧 Configuração do Frontend

Para conectar o frontend React ao backend Rust, adicione ao seu `.env` do frontend:

```
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

## 🧪 Testes

```bash
cargo test
```

## 📦 Build para Docker

```dockerfile
FROM rust:1.70 as builder
WORKDIR /app
COPY . .
RUN cargo build --release

FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y ca-certificates
COPY --from=builder /app/target/release/tokenizacao-backend /usr/local/bin/
EXPOSE 8080
CMD ["tokenizacao-backend"]
```

## 🚀 Deploy

O backend está pronto para deploy em qualquer plataforma que suporte Rust:
- Railway
- Fly.io
- AWS
- Google Cloud
- Azure

## 🔄 Integração com Frontend

O backend fornece APIs RESTful que podem ser consumidas pelo frontend Next.js. Exemplo de uso:

```javascript
// Frontend - buscar ativos
const response = await fetch('http://localhost:8080/api/v1/assets');
const data = await response.json();
console.log(data.data); // Lista de ativos
```
