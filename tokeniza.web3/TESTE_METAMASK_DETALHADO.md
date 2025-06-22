# 🔍 Guia de Teste Detalhado - Conexão MetaMask

## 🎯 Objetivo
Testar a conexão da carteira MetaMask no ambiente de produção com logs detalhados.

## 📋 Pré-requisitos
- [ ] MetaMask instalado no navegador
- [ ] Conta MetaMask configurada
- [ ] Acesso ao site: https://tokenizacao-web3.vercel.app

## 🔧 Preparação para Teste

### 1. Abrir Developer Tools
1. Acesse o site da aplicação
2. Pressione `F12` ou `Ctrl+Shift+I`
3. Vá para a aba **Console**
4. Limpe o console (ícone de lixeira ou `Ctrl+L`)

### 2. Estado Inicial
Antes de clicar em conectar, observe:
- [ ] Botão "Conectar Carteira" está visível
- [ ] Console mostra: `🔧 WalletConnect montado - Estado atual:`
- [ ] Console mostra: `📭 Nenhuma conexão armazenada encontrada` (primeira vez)

## 🧪 Cenários de Teste

### Cenário 1: ✅ Conexão Aceita (Fluxo Esperado)

**Passos:**
1. Clique em "Conectar Carteira"
2. Selecione "MetaMask"
3. **ACEITE** a conexão no popup do MetaMask
4. **ACEITE** adicionar/trocar para zkSync Sepolia (se solicitado)

**Logs Esperados no Console:**
```
🚀 Iniciando conexão com MetaMask...
✅ MetaMask detectada
📱 Solicitando conexão com a carteira...
📝 Resposta da conexão: 1 conta(s) encontrada(s)
👤 Conta conectada: 0x1234...
🔍 Verificando rede atual...
🌐 Rede detectada: [número] (zkSync Sepolia = 300)
[Se rede diferente] 🔄 Tentando configurar rede zkSync Sepolia...
✅ Rede trocada/adicionada com sucesso (ou já configurada)
💾 Salvando dados da conexão...
🎉 Conexão estabelecida com sucesso!
```

**Resultado Visual:**
- [ ] Toast verde: "✅ Conectado com sucesso!"
- [ ] Botão mostra endereço da carteira: `0x1234...5678`
- [ ] Menu dropdown disponível para desconectar

### Cenário 2: ❌ Conexão Rejeitada

**Passos:**
1. Clique em "Conectar Carteira"
2. Selecione "MetaMask"
3. **REJEITE** a conexão no popup do MetaMask

**Logs Esperados no Console:**
```
🚀 Iniciando conexão com MetaMask...
✅ MetaMask detectada
📱 Solicitando conexão com a carteira...
💥 Erro detalhado ao conectar carteira: [objeto de erro]
❌ Usuário rejeitou a conexão inicial
```

**Resultado Visual:**
- [ ] Toast vermelho: "❌ Conexão cancelada"
- [ ] Descrição: "Você cancelou a conexão. Clique novamente e aceite no MetaMask para conectar."
- [ ] Botão volta ao estado "Conectar Carteira"

### Cenário 3: ⚠️ Configuração de Rede Rejeitada

**Passos:**
1. Conecte a carteira (aceite a conexão)
2. **REJEITE** adicionar/trocar para zkSync Sepolia

**Logs Esperados no Console:**
```
🚀 Iniciando conexão com MetaMask...
✅ MetaMask detectada
📱 Solicitando conexão com a carteira...
📝 Resposta da conexão: 1 conta(s) encontrada(s)
👤 Conta conectada: 0x1234...
🔍 Verificando rede atual...
🌐 Rede detectada: [número] (zkSync Sepolia = 300)
🔄 Tentando configurar rede zkSync Sepolia...
❌ Usuário rejeitou adicionar/trocar rede
💾 Salvando dados da conexão...
🎉 Conexão estabelecida com sucesso!
```

**Resultado Visual:**
- [ ] Toast laranja: "⚠️ Conectado com aviso"
- [ ] Descrição: "MetaMask conectada, mas configure zkSync Sepolia para usar todas as funcionalidades"
- [ ] Botão mostra endereço da carteira

### Cenário 4: 🔄 Solicitação Pendente

**Passos:**
1. Clique em "Conectar Carteira"
2. NÃO responda ao popup do MetaMask
3. Clique novamente em "Conectar Carteira"

**Logs Esperados no Console:**
```
🚀 Iniciando conexão com MetaMask...
✅ MetaMask detectada
📱 Solicitando conexão com a carteira...
💥 Erro detalhado ao conectar carteira: [objeto de erro]
⏳ Solicitação pendente no MetaMask
```

**Resultado Visual:**
- [ ] Toast azul: "⏳ Solicitação pendente"
- [ ] Descrição: "Já existe uma solicitação aberta no MetaMask. Verifique a extensão."

## 🐛 Problemas Conhecidos e Soluções

### Problema: "Conexão rejeitada" mesmo aceitando
**Possíveis causas:**
1. MetaMask travou durante a conexão
2. Popup foi fechado acidentalmente
3. Extensão MetaMask desatualizada

**Soluções:**
1. Recarregue a página
2. Atualize a extensão MetaMask
3. Verifique se o MetaMask está desbloqueado

### Problema: Rede não muda para zkSync Sepolia
**Possíveis causas:**
1. Configuração manual necessária
2. RPC zkSync Sepolia indisponível temporariamente

**Soluções:**
1. Configure manualmente a rede zkSync Sepolia
2. Use os dados:
   - Nome: zkSync Sepolia
   - RPC: https://sepolia.era.zksync.dev
   - Chain ID: 300
   - Símbolo: ETH
   - Explorer: https://sepolia.explorer.zksync.io

## 📊 Informações de Debug

### Dados da Rede zkSync Sepolia:
- **Chain ID:** 300 (0x12c em hex)
- **RPC URL:** https://sepolia.era.zksync.dev
- **Explorer:** https://sepolia.explorer.zksync.io
- **Símbolo:** ETH

### Códigos de Erro Comuns:
- **4001:** Usuário rejeitou a solicitação
- **4902:** Rede não existe (precisa adicionar)
- **-32002:** Solicitação pendente
- **-32603:** Erro interno do MetaMask

## ✅ Checklist de Validação

Após conectar com sucesso:
- [ ] Console mostra "🎉 Conexão estabelecida com sucesso!"
- [ ] LocalStorage contém dados da carteira
- [ ] Botão mostra endereço da carteira
- [ ] Menu dropdown funciona
- [ ] Toast de sucesso aparece
- [ ] Rede é zkSync Sepolia (300) ou aviso é exibido

## 🔄 Teste de Persistência

1. Conecte a carteira com sucesso
2. Recarregue a página
3. Observe o console:
   - [ ] `📦 Dados armazenados encontrados:`
   - [ ] `✅ Conexão restaurada do localStorage`
4. Carteira deve aparecer conectada automaticamente

## 📝 Relatório de Teste

Copie e cole este template após realizar os testes:

```
## Relatório de Teste - [Data/Hora]

### Ambiente:
- Navegador: [Chrome/Firefox/etc] [versão]
- MetaMask: [versão]
- URL: https://tokenizacao-web3.vercel.app

### Cenário 1 - Conexão Aceita:
- [ ] ✅ Funcionou perfeitamente
- [ ] ⚠️ Funcionou com ressalvas: ___________
- [ ] ❌ Falhou: ___________

### Cenário 2 - Conexão Rejeitada:
- [ ] ✅ Funcionou perfeitamente
- [ ] ⚠️ Funcionou com ressalvas: ___________
- [ ] ❌ Falhou: ___________

### Logs Observados:
[Cole aqui os logs do console]

### Observações:
[Comentários adicionais]
```

---

**💡 Dica:** Mantenha o console aberto durante todos os testes para acompanhar os logs detalhados!
