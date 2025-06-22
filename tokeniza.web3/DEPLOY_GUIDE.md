# 🌐 Deploy para Acesso Mundial - Tokenização Web3

Este guia mostra como disponibilizar sua aplicação de tokenização para acesso mundial via navegador, conectada à rede de teste zkSync Sepolia.

## 🎯 Visão Geral

A aplicação será deployada em:
- **Frontend**: Vercel (gratuito) - `https://seu-projeto.vercel.app`
- **Backend**: Render (gratuito) - `https://tokenizacao-backend.onrender.com`
- **Contratos**: zkSync Sepolia (já deployados)

## 🚀 Deploy Automático

### Opção 1: Script PowerShell (Windows)
```powershell
.\deploy.ps1
```

### Opção 2: Script Bash (Linux/Mac)
```bash
chmod +x deploy.sh
./deploy.sh
```

## 📋 Deploy Manual

### 1. Frontend (Vercel)

1. **Instale a Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Navegue para o frontend:**
   ```bash
   cd tokenizacao-app/app
   ```

3. **Instale dependências e faça build:**
   ```bash
   npm ci
   npm run build
   ```

4. **Deploy na Vercel:**
   ```bash
   vercel --prod
   ```

5. **Configure as variáveis de ambiente na Vercel:**
   - `NEXT_PUBLIC_API_URL`: `https://tokenizacao-backend.onrender.com`
   - `NEXT_PUBLIC_DEFAULT_NETWORK`: `zksync-sepolia`
   - `NEXT_PUBLIC_RPC_URL`: `https://sepolia.era.zksync.dev`
   - `NEXT_PUBLIC_CHAIN_ID`: `300`
   - `NEXT_PUBLIC_ASSET_TOKEN_ADDRESS`: `0xC2B8d5aefD7d490314D4f9c7ff6dFa129670CE64`
   - `NEXT_PUBLIC_MARKETPLACE_ADDRESS`: `0x61b2bC16fc652418FB15D4a319b31E1853f38B84`
   - `NEXT_PUBLIC_WAITLIST_ADDRESS`: `0x019ab49cE22877EA615b5c544cAA178525266b51`

### 2. Backend (Render)

1. **Acesse [Render.com](https://render.com)**
2. **Conecte seu repositório GitHub**
3. **Crie um novo Web Service**
4. **Configure:**
   - **Environment**: `Rust`
   - **Build Command**: `cargo build --release`
   - **Start Command**: `./target/release/tokenizacao-backend`
   - **Plan**: `Free`

5. **Configure as variáveis de ambiente:**
   - `HOST`: `0.0.0.0`
   - `PORT`: `10000`
   - `RPC_URL`: `https://sepolia.era.zksync.dev`
   - `CHAIN_ID`: `300`
   - `PRIVATE_KEY`: `0x5b161397b1a9d087665e3dde45bec7b382fc7cca66542ad587abc83848ff021c`
   - `ASSETTOKEN_ADDRESS`: `0xC2B8d5aefD7d490314D4f9c7ff6dFa129670CE64`
   - `MARKETPLACE_ADDRESS`: `0x61b2bC16fc652418FB15D4a319b31E1853f38B84`
   - `WAITLIST_ADDRESS`: `0x019ab49cE22877EA615b5c544cAA178525266b51`

## 🔗 Contratos na zkSync Sepolia

Seus contratos já estão deployados e funcionais:

| Contrato | Endereço | Explorer |
|----------|----------|----------|
| Asset Token | `0xC2B8d5aefD7d490314D4f9c7ff6dFa129670CE64` | [Ver](https://sepolia.explorer.zksync.io/address/0xC2B8d5aefD7d490314D4f9c7ff6dFa129670CE64) |
| Marketplace | `0x61b2bC16fc652418FB15D4a319b31E1853f38B84` | [Ver](https://sepolia.explorer.zksync.io/address/0x61b2bC16fc652418FB15D4a319b31E1853f38B84) |
| Waitlist | `0x019ab49cE22877EA615b5c544cAA178525266b51` | [Ver](https://sepolia.explorer.zksync.io/address/0x019ab49cE22877EA615b5c544cAA178525266b51) |

## 🌍 Acesso Mundial

Após o deploy, qualquer pessoa no mundo poderá:

1. **Acessar a aplicação** via navegador no domínio da Vercel
2. **Conectar carteira MetaMask** à zkSync Sepolia
3. **Interagir com os contratos** de tokenização
4. **Fazer transações** na rede de teste

## 🔧 Configuração do Usuário Final

Para usar a aplicação, os usuários precisam:

1. **Instalar MetaMask**
2. **Adicionar a rede zkSync Sepolia** (a aplicação faz isso automaticamente)
3. **Obter ETH de teste** no [faucet](https://sepolia.era.zksync.dev/faucet)
4. **Conectar a carteira** na aplicação

## 📱 Funcionalidades Disponíveis

- ✅ Conexão com carteira Web3
- ✅ Seleção automática de rede zkSync Sepolia
- ✅ Interação com contratos de tokenização
- ✅ Interface responsiva para desktop e mobile
- ✅ Marketplace de ativos tokenizados
- ✅ Sistema de waitlist
- ✅ Mint de tokens de teste

## 🔒 Segurança

- ⚠️ **Rede de Teste**: Use apenas para demonstração e testes
- 🔐 **Chaves Privadas**: Nunca use chaves de produção
- 🌐 **HTTPS**: Todas as comunicações são criptografadas
- 🔍 **Transparência**: Todos os contratos são verificáveis na blockchain

## 📞 Suporte

Sua aplicação estará disponível 24/7 para acesso mundial. Os usuários podem:
- Acessar a aplicação de qualquer lugar do mundo
- Usar qualquer navegador moderno
- Conectar carteiras Web3 compatíveis
- Interagir com contratos reais na blockchain

## 🎉 Resultado Final

Após seguir este guia, você terá:
- ✅ Aplicação web acessível mundialmente
- ✅ Backend API funcionando
- ✅ Contratos deployados na zkSync Sepolia
- ✅ Interface completa para tokenização
- ✅ Experiência multiusuário funcional

**Sua aplicação de tokenização estará live e acessível para o mundo inteiro! 🌍**
