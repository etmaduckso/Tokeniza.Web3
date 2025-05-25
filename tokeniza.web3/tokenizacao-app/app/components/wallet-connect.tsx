"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useWalletStore } from "@/lib/wallet-store";

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<string[]>;
      isMetaMask?: boolean;
    };
    solana?: {
      connect: () => Promise<{ publicKey: { toString: () => string } }>;
      disconnect: () => Promise<void>;
      isPhantom?: boolean;
    };
  }
}

export function WalletConnect() {
  const { toast } = useToast();
  const { isConnected, address, walletType, setConnected, setAddress, setWalletType, disconnect } = useWalletStore();

  // Check for stored wallet connection on component mount
  useEffect(() => {
    const storedWalletData = localStorage.getItem('walletConnection');
    if (storedWalletData) {
      try {
        const { address, walletType } = JSON.parse(storedWalletData);
        setAddress(address);
        setWalletType(walletType);
        setConnected(true);
      } catch (error) {
        console.error("Error parsing stored wallet data:", error);
      }
    }
  }, [setAddress, setConnected, setWalletType]);

  const connectEthereumWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts && accounts[0]) {
          setAddress(accounts[0]);
          setConnected(true);
          setWalletType("ethereum");
          
          // Store connection info
          localStorage.setItem('walletConnection', JSON.stringify({
            address: accounts[0],
            walletType: 'ethereum'
          }));
          
          toast({
            title: "Carteira Ethereum conectada",
            description: `Endereço: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
          });
        }
      } catch (error) {
        toast({
          title: "Erro ao conectar carteira Ethereum",
          description: "Por favor, tente novamente.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "MetaMask não encontrada",
        description: "Por favor, instale a MetaMask para continuar.",
        variant: "destructive",
      });
    }
  };

  const connectSolanaWallet = async () => {
    if (typeof window !== "undefined" && window.solana) {
      try {
        const response = await window.solana.connect();
        const publicKey = response.publicKey.toString();
        setAddress(publicKey);
        setConnected(true);
        setWalletType("solana");
        
        // Store connection info
        localStorage.setItem('walletConnection', JSON.stringify({
          address: publicKey,
          walletType: 'solana'
        }));
        
        toast({
          title: "Carteira Solana conectada",
          description: `Endereço: ${publicKey.slice(0, 6)}...${publicKey.slice(-4)}`,
        });
      } catch (error) {
        toast({
          title: "Erro ao conectar carteira Solana",
          description: "Por favor, tente novamente.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Phantom não encontrada",
        description: "Por favor, instale a Phantom Wallet para continuar.",
        variant: "destructive",
      });
    }
  };

  const disconnectWallet = async () => {
    if (walletType === "solana" && window.solana) {
      try {
        await window.solana.disconnect();
      } catch (error) {
        console.error("Error disconnecting Solana wallet:", error);
      }
    }
    
    // Remove stored connection
    localStorage.removeItem('walletConnection');
    
    disconnect();
    
    toast({
      title: "Carteira desconectada",
      description: "Sua carteira foi desconectada com sucesso.",
    });
  };

  if (isConnected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {walletType === "ethereum" ? "ETH: " : "SOL: "}
            {address.slice(0, 6)}...{address.slice(-4)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={disconnectWallet}>
            Desconectar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Conectar Carteira</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={connectEthereumWallet}>
          Ethereum (MetaMask)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={connectSolanaWallet}>
          Solana (Phantom)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}