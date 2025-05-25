"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useWalletStore } from "@/lib/wallet-store";
import { useWaitlistStore } from "@/lib/waitlist-store";
import { Bell, BellOff } from "lucide-react";

interface WaitlistButtonProps {
  assetId: string;
  assetName: string;
}

export function WaitlistButton({ assetId, assetName }: WaitlistButtonProps) {
  const { toast } = useToast();
  const { isConnected, address } = useWalletStore();
  const { addToWaitlist, removeFromWaitlist, isInWaitlist, getWaitlistCountForAsset } = useWaitlistStore();
  const [isLoading, setIsLoading] = useState(false);
  
  const waitlistCount = getWaitlistCountForAsset(assetId);
  const isUserInWaitlist = isConnected && isInWaitlist(assetId, address);

  const handleWaitlistToggle = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet não conectada",
        description: "Conecte sua wallet para entrar na lista de espera.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (isUserInWaitlist) {
        removeFromWaitlist(assetId, address);
        toast({
          title: "Removido da lista de espera",
          description: `Você foi removido da lista de espera para ${assetName}.`,
        });
      } else {
        addToWaitlist(assetId, address);
        toast({
          title: "Adicionado à lista de espera",
          description: `Você será notificado quando ${assetName} estiver disponível para compra.`,
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao processar sua solicitação.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-2">
      <Button 
        variant={isUserInWaitlist ? "outline" : "default"}
        className="w-full"
        onClick={handleWaitlistToggle}
        disabled={isLoading}
      >
        {isLoading ? (
          "Processando..."
        ) : isUserInWaitlist ? (
          <>
            <BellOff className="mr-2 h-4 w-4" />
            Sair da lista de espera
          </>
        ) : (
          <>
            <Bell className="mr-2 h-4 w-4" />
            Entrar na lista de espera
          </>
        )}
      </Button>
      
      <p className="text-xs text-center text-gray-500">
        {waitlistCount > 0 ? (
          <>
            <span className="font-medium">{waitlistCount}</span> {waitlistCount === 1 ? 'pessoa está' : 'pessoas estão'} na lista de espera
          </>
        ) : (
          'Seja o primeiro a entrar na lista de espera'
        )}
      </p>
    </div>
  );
}