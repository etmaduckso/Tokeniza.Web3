#!/usr/bin/env node

/**
 * Script para verificar o saldo da carteira da plataforma
 * Uso: node check-wallet-balance.js
 */

import { ethers } from 'ethers';

// Configurações
const ZKSYNC_SEPOLIA_RPC = 'https://sepolia.era.zksync.dev';
const PLATFORM_WALLET_ADDRESS = '0xa3d5737c037981F02275eD1f4a1dde3b3577355c';

async function checkBalance() {
  try {
    console.log('🔍 Verificando saldo da carteira da plataforma...\n');
    
    // Conectar ao provider
    const provider = new ethers.JsonRpcProvider(ZKSYNC_SEPOLIA_RPC);
    
    // Verificar se a rede está acessível
    const network = await provider.getNetwork();
    console.log(`🌐 Rede: ${network.name} (Chain ID: ${network.chainId})`);
    
    // Obter saldo
    const balance = await provider.getBalance(PLATFORM_WALLET_ADDRESS);
    const balanceFormatted = ethers.formatEther(balance);
    
    console.log(`💰 Endereço: ${PLATFORM_WALLET_ADDRESS}`);
    console.log(`💰 Saldo: ${balanceFormatted} ETH`);
    console.log(`💰 Saldo (Wei): ${balance.toString()}`);
    
    // Link para o explorer
    const explorerUrl = `https://sepolia.explorer.zksync.io/address/${PLATFORM_WALLET_ADDRESS}`;
    console.log(`🔗 Explorer: ${explorerUrl}`);
    
    // Calcular equivalente em taxas de acesso
    const feePerAccess = 0.0000034; // ETH por acesso
    const estimatedAccesses = Math.floor(parseFloat(balanceFormatted) / feePerAccess);
    console.log(`📊 Acessos estimados recebidos: ~${estimatedAccesses} (baseado em ${feePerAccess} ETH por acesso)`);
    
    console.log('\n✅ Verificação concluída!');
    
  } catch (error) {
    console.error('❌ Erro ao verificar saldo:', error.message);
    process.exit(1);
  }
}

// Executar se for chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  checkBalance();
}

export { checkBalance };
