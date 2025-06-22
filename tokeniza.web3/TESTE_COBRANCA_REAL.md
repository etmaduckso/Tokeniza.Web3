# Guia de Teste - Cobrança Real da Taxa de Contribuição

## 📋 Resumo das Implementações

### ✅ O que foi corrigido:
- **Transação real na blockchain**: Implementada função `sendAccessFeeTransaction()` que executa transação real
- **Valor correto**: $0,01 USD convertido para ETH (~0.0000033 ETH na taxa atual)
- **Endereço destino**: Configurado wallet da plataforma para receber as taxas
- **Verificação de saldo**: Confirma se usuário tem ETH suficiente antes da transação
- **Confirmação on-chain**: Aguarda confirmação da transação na blockchain
- **Interface melhorada**: Novo componente `AccessFeePayment` com feedback detalhado
- **Gerenciamento de estado**: Store dedicado (`useAccessFeeStore`) para status de pagamento
- **Error handling**: Tratamento robusto de erros com mensagens específicas

### 🔧 Arquivos criados/modificados:
1. **`lib/blockchain-utils.ts`** - Funções para transações reais
2. **`lib/access-fee-store.ts`** - Estado global do pagamento
3. **`components/access-fee-payment.tsx`** - Componente de pagamento
4. **`app/simulation/page.tsx`** - Página atualizada com nova lógica
5. **`.env.local`** - Adicionado endereço da carteira da plataforma

## 🧪 Como Testar a Cobrança Real

### Pré-requisitos:
1. **MetaMask instalado** com extensão oficial
2. **Rede zkSync Sepolia** configurada
3. **ETH de teste** na carteira (pelo menos 0.001 ETH para cobrir taxa + gas)
4. **Aplicação rodando** em https://tokenizacao-web3.vercel.app

### Passo a passo do teste:

#### 1. **Conectar Carteira**
```
✅ Abrir https://tokenizacao-web3.vercel.app/simulation
✅ Clicar em "Conectar Carteira" 
✅ Selecionar "MetaMask (zkSync Sepolia)"
✅ Aprovar conexão no MetaMask
✅ Verificar se aparece endereço conectado no canto superior direito
```

#### 2. **Verificar Configuração de Rede**
```
✅ Confirmar que está na rede "zkSync Sepolia" 
✅ Chain ID deve ser 300
✅ Se não estiver, o sistema oferecerá para trocar/adicionar automaticamente
```

#### 3. **Verificar Saldo**
```
✅ Ter pelo menos 0.001 ETH na carteira
✅ Verificar saldo no MetaMask ou no explorer: https://sepolia.explorer.zksync.io
```

#### 4. **Testar Pagamento da Taxa**

##### 4.1 **Antes do Pagamento:**
```
✅ Na página /simulation, deve aparecer o card "Taxa de Acesso"
✅ Deve mostrar "É necessário pagar uma taxa simbólica de $0,01"
✅ Botão deve estar ativo: "Pagar Taxa de Acesso ($0,01)"
✅ Deve mostrar informações sobre como funciona a transação
```

##### 4.2 **Durante o Pagamento:**
```
✅ Clicar em "Pagar Taxa de Acesso ($0,01)"
✅ Deve aparecer toast: "Preparando transação..."
✅ MetaMask deve abrir automaticamente
✅ Verificar no MetaMask:
   - Para: 0x742d35Cc6634C0532925a3b8D1389DD99e04f581
   - Valor: ~0.0000033 ETH
   - Rede: zkSync Sepolia
   - Taxa de gas estimada
✅ Clicar "Confirmar" no MetaMask
```

##### 4.3 **Após Confirmação:**
```
✅ Aguardar confirmação (pode levar 10-30 segundos)
✅ Deve aparecer toast: "Taxa de acesso paga com sucesso! 🎉"
✅ Card deve mudar para verde com ✅ "Taxa de Acesso Paga"
✅ Deve mostrar hash da transação
✅ Botão "Ver no Explorer" deve funcionar
✅ Agora deve aparecer a seção "Escolha a Plataforma"
```

#### 5. **Verificar Transação na Blockchain**

##### 5.1 **No Explorer:**
```
✅ Clicar em "Ver no Explorer"
✅ Verificar que abre: https://sepolia.explorer.zksync.io/tx/[HASH]
✅ Status deve ser "Success"
✅ Value deve ser ~0.0000033 ETH
✅ From: seu endereço
✅ To: 0x742d35Cc6634C0532925a3b8D1389DD99e04f581
```

##### 5.2 **No MetaMask:**
```
✅ Verificar histórico de transações
✅ Deve aparecer transação enviada
✅ Saldo deve ter diminuído
```

#### 6. **Testar Persistência**
```
✅ Recarregar a página /simulation
✅ Taxa deve continuar marcada como paga
✅ Não deve pedir para pagar novamente
✅ Deve lembrar do status mesmo após recarregar
```

#### 7. **Testar com Conta Diferente**
```
✅ Trocar conta no MetaMask
✅ Página deve detectar nova conta
✅ Nova conta deve precisar pagar a taxa novamente
✅ Status de pagamento é por conta
```

## ⚠️ Problemas Possíveis e Soluções

### 1. **"Saldo insuficiente"**
```
Problema: Não tem ETH suficiente na carteira
Solução: Conseguir ETH de teste para zkSync Sepolia
- Bridge de Sepolia ETH: https://bridge.zksync.io/
- Faucets: https://docs.zksync.io/build/tooling/network-faucets
```

### 2. **"Rede incorreta"**
```
Problema: MetaMask não está na zkSync Sepolia
Solução: Sistema tentará trocar automaticamente, ou configurar manualmente:
- Nome: zkSync Sepolia Testnet
- RPC: https://sepolia.era.zksync.dev
- Chain ID: 300
- Symbol: ETH
- Explorer: https://sepolia.explorer.zksync.io
```

### 3. **"Transação rejeitada"**
```
Problema: Usuário cancelou no MetaMask
Solução: Tentar novamente e aprovar a transação
```

### 4. **"MetaMask não abre"**
```
Problema: Popup bloqueado ou extensão com problema
Solução: 
- Permitir popups para o site
- Atualizar/reinstalar MetaMask
- Verificar se MetaMask está desbloqueado
```

### 5. **"Erro de gas"**
```
Problema: Gas insuficiente ou rede congestionada
Solução: Tentar novamente, sistema adiciona 20% de margem automaticamente
```

## 📊 Logs de Debug

### Console do Navegador:
```javascript
// Logs esperados durante o pagamento:
"🚀 Iniciando transação de taxa de acesso..."
"👤 Usuário: 0x..."
"🌐 Rede: zkSync Sepolia Chain ID: 300"
"💰 Saldo do usuário: X ETH"
"💸 Taxa necessária: 0.0000033 ETH"
"⛽ Gas estimado: XXXXX"
"📝 Enviando transação..."
"✅ Transação enviada: 0x..."
"⏳ Aguardando confirmação..."
"🎉 Transação confirmada!"
```

### No MetaMask:
```
- Activity > deve aparecer transação "Send ETH"
- Status: "Confirmed"
- Amount: ~0.0000033 ETH
```

## 🔍 Verificação Final

### Checklist de Funcionamento:
- [ ] Conecta carteira corretamente
- [ ] Detecta rede zkSync Sepolia
- [ ] Verifica saldo antes da transação
- [ ] Abre MetaMask para aprovação
- [ ] Envia transação real na blockchain
- [ ] Aguarda confirmação on-chain
- [ ] Mostra feedback visual correto
- [ ] Persiste status de pagamento
- [ ] Permite acesso à simulação após pagamento
- [ ] Link para explorer funciona
- [ ] Hash da transação é válido

### URLs Importantes:
- **App**: https://tokenizacao-web3.vercel.app/simulation
- **Explorer**: https://sepolia.explorer.zksync.io
- **Bridge**: https://bridge.zksync.io/
- **Docs**: https://docs.zksync.io/

---

## 🎯 Resultado Esperado

Após este teste, a aplicação deve:
1. **Cobrar taxa real** de $0,01 convertida para ETH
2. **Debitar da conta** do usuário no MetaMask
3. **Enviar para carteira** da plataforma (0x742d35Cc6634C0532925a3b8D1389DD99e04f581)
4. **Confirmar na blockchain** zkSync Sepolia
5. **Persistir status** de pagamento por usuário
6. **Liberar acesso** à simulação apenas após pagamento confirmado

**A cobrança agora é REAL e não mais simulada!** 🎉
