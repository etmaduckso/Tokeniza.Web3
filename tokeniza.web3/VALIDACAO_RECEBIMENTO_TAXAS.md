# Guia de Validação de Recebimento de Taxas

Este documento descreve como validar se as taxas de acesso estão sendo corretamente enviadas para a carteira da plataforma.

## Informações da Configuração

### Endereço da Carteira da Plataforma
- **Endereço**: `0xa3d5737c037981F02275eD1f4a1dde3b3577355c`
- **Rede**: zkSync Sepolia (Chain ID: 300)
- **Taxa por acesso**: 0.0000034 ETH (~$0,01 USD)

### Links Úteis
- **Explorer**: https://sepolia.explorer.zksync.io/address/0xa3d5737c037981F02275eD1f4a1dde3b3577355c
- **RPC**: https://sepolia.era.zksync.dev

## Métodos de Validação

### 1. Verificação Manual via Explorer

1. Acesse o link do explorer acima
2. Verifique o saldo atual da carteira
3. Monitore a aba "Transactions" para novas transações recebidas
4. Cada transação deve ter valor de aproximadamente 0.0000034 ETH

### 2. Verificação via Página de Administração

A aplicação possui uma página de administração em `/admin` que fornece:

- **Saldo atual** da carteira da plataforma
- **Transações recentes** nas últimas 24 horas
- **Monitor em tempo real** que atualiza quando há mudanças no saldo
- **Links diretos** para o explorer

Para usar:
1. Acesse `https://seu-dominio.vercel.app/admin`
2. Clique em "Iniciar Monitor" para acompanhamento em tempo real
3. Use "Atualizar" para verificar dados mais recentes

### 3. Verificação via Script

Execute o script de verificação de saldo:

```bash
cd tokenizacao-app
node check-wallet-balance.js
```

O script mostra:
- Saldo atual em ETH e Wei
- Estimativa de quantos acessos foram pagos
- Link direto para o explorer

### 4. Verificação Programática

Use as funções utilitárias em `lib/wallet-checker.ts`:

```javascript
import { checkPlatformWalletBalance, checkRecentTransactions } from '@/lib/wallet-checker';

// Verificar saldo atual
const balance = await checkPlatformWalletBalance();
console.log('Saldo:', balance.balanceFormatted, 'ETH');

// Verificar transações das últimas 24h
const transactions = await checkRecentTransactions(24);
console.log('Transações recebidas:', transactions.count);
console.log('Total recebido:', transactions.totalReceived, 'ETH');
```

## Processo de Teste Completo

### 1. Teste de Pagamento

1. **Acesse a aplicação** em produção
2. **Conecte a MetaMask** à rede zkSync Sepolia
3. **Vá para a página de simulação** (`/simulation`)
4. **Certifique-se** de ter pelo menos 0.001 ETH para taxa + gas
5. **Execute o pagamento** da taxa de acesso
6. **Aguarde a confirmação** da transação

### 2. Validação do Recebimento

1. **Anote o hash da transação** que aparece no toast/interface
2. **Verifique no explorer** se a transação foi confirmada
3. **Confirme** que o destinatário é o endereço da plataforma
4. **Verifique** que o valor é aproximadamente 0.0000034 ETH

### 3. Monitoramento Contínuo

1. **Use a página `/admin`** para monitoramento em tempo real
2. **Configure alertas** se necessário
3. **Verifique regularmente** o acúmulo de taxas

## Troubleshooting

### Problema: Transação não aparece no saldo

**Possíveis causas:**
1. Transação ainda está pendente (aguarde mais tempo)
2. Transação falhou (verifique o hash no explorer)
3. Problema de sincronização do explorer (tente recarregar)

**Solução:**
1. Verifique o status da transação no explorer
2. Se pendente, aguarde até 10 minutos
3. Se falhada, investigue o motivo (saldo insuficiente, gas, etc.)

### Problema: Valor incorreto recebido

**Possíveis causas:**
1. Configuração incorreta do valor da taxa
2. Problema na conversão ETH/USD

**Solução:**
1. Verifique o valor fixo em `blockchain-utils.ts` (0.0000034 ETH)
2. Confirme que está usando o valor fixo, não conversão dinâmica

### Problema: Endereço incorreto

**Possíveis causas:**
1. Variável de ambiente não configurada
2. Fallback com endereço antigo

**Solução:**
1. Verifique `NEXT_PUBLIC_PLATFORM_WALLET_ADDRESS` no `.env.local`
2. Confirme que o valor é `0xa3d5737c037981F02275eD1f4a1dde3b3577355c`

## Métricas Importantes

### Monitoramento de Sucesso

- **Taxa de sucesso**: % de transações confirmadas vs tentativas
- **Tempo médio**: Tempo entre envio e confirmação
- **Volume total**: Soma de todas as taxas recebidas
- **Frequência**: Número de pagamentos por dia/hora

### Alertas Recomendados

1. **Saldo baixo** na carteira pagadora (usuários)
2. **Transações falhando** sistematicamente
3. **Diferenças** entre pagamentos esperados vs recebidos

## Logs e Debug

### No Frontend (Console do Browser)

```javascript
// Ativar logs detalhados
localStorage.setItem('debug', 'blockchain:*');

// Verificar estado do pagamento
console.log(useAccessFeeStore.getState());

// Verificar configuração
console.log({
  platformWallet: process.env.NEXT_PUBLIC_PLATFORM_WALLET_ADDRESS,
  chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL
});
```

### Verificação de Configuração

```bash
# Verificar variáveis de ambiente
grep PLATFORM_WALLET .env.local

# Verificar build sem erros
npm run build

# Verificar deploy
vercel --prod
```

## Contatos e Suporte

Para problemas relacionados a:
- **Blockchain**: Verificar RPC zkSync Sepolia
- **Explorer**: Usar https://sepolia.explorer.zksync.io
- **MetaMask**: Verificar se a rede zkSync Sepolia está configurada

## Conclusão

O sistema de cobrança de taxas está configurado para:
1. **Debitar** 0.0000034 ETH (~$0,01) da conta do usuário
2. **Enviar** para a carteira da plataforma `0xa3d5737c037981F02275eD1f4a1dde3b3577355c`
3. **Confirmar** na blockchain zkSync Sepolia
4. **Permitir** acesso à funcionalidade após confirmação

Use as ferramentas descritas acima para validar que o fluxo está funcionando corretamente em produção.
