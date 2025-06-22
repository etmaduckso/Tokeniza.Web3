# Guia de Teste - Integração Web3 em Produção

## ✅ Status do Deploy
- **Frontend**: Vercel (funcionando)
- **Backend**: Render (funcionando)
- **Contratos**: zkSync Sepolia (deployados)

## 🔧 Correções Aplicadas

### 1. Erro de Dependência Resolvido
- **Problema**: `@radix-ui/react-radio-group` não estava instalado
- **Solução**: Adicionado ao package.json e instalado

### 2. Erro de Sintaxe na Conexão de Carteira
- **Problema**: Comentário inline quebrava o código JavaScript
- **Solução**: Movido comentário para linha separada

## 🧪 Testes a Realizar

### Teste 1: Conexão de Carteira
1. Acesse o site: https://tokenizacao-web3-[deployment-id].vercel.app
2. Clique em "Conectar Carteira"
3. Verifique se:
   - ✅ MetaMask abre corretamente
   - ✅ Solicita mudança para zkSync Sepolia (se necessário)
   - ✅ Mostra endereço conectado
   - ✅ Toast de sucesso aparece

### Teste 2: Navegação entre Páginas
1. Teste todas as rotas:
   - `/` - Página inicial
   - `/learn` - Página de aprendizado
   - `/simulation` - Simulação de tokenização
   - `/tokenize` - Tokenização de ativos
   - `/marketplace` - Marketplace
   - `/testnet` - Testes na testnet

### Teste 3: Funcionalidades Web3
1. **Tokenização**: Criar um novo ativo tokenizado
2. **Marketplace**: Listar e visualizar ativos
3. **Waitlist**: Adicionar à lista de espera

## 🚨 Possíveis Problemas e Soluções

### Se a carteira não conectar:
1. Verificar se MetaMask está instalado
2. Verificar se está na rede zkSync Sepolia
3. Verificar console do browser para erros

### Se os contratos não respondem:
1. Verificar se os endereços estão corretos:
   - AssetToken: `0xC2B8d5aefD7d490314D4f9c7ff6dFa129670CE64`
   - Marketplace: `0x61b2bC16fc652418FB15D4a319b31E1853f38B84`
   - Waitlist: `0x019ab49cE22877EA615b5c544cAA178525266b51`

2. Verificar se tem ETH na zkSync Sepolia para gas

## 📊 Métricas de Sucesso
- [ ] Deploy sem erros
- [ ] Todas as páginas carregam
- [ ] Carteira conecta sem erro
- [ ] Interface responsiva
- [ ] Funcionalidades Web3 operacionais

## 🔧 Debugging
Se houver problemas:
1. Abrir DevTools (F12)
2. Verificar aba Console para erros
3. Verificar aba Network para requests falhados
4. Verificar se variáveis de ambiente estão corretas na Vercel

---
**Próximos Passos**: Após confirmar funcionamento, documentar para usuários finais.
