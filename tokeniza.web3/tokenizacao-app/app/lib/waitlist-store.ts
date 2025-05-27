import { create } from 'zustand';

interface WaitlistEntry {
  assetId: string;
  userAddress: string;
  timestamp: number;
}

interface WaitlistState {
  waitlistEntries: WaitlistEntry[];
  addToWaitlist: (assetId: string, userAddress: string) => void;
  removeFromWaitlist: (assetId: string, userAddress: string) => void;
  isInWaitlist: (assetId: string, userAddress: string) => boolean;
  getWaitlistCountForAsset: (assetId: string) => number;
  hydrate: () => void;
}

export const useWaitlistStore = create<WaitlistState>((set, get) => ({
  waitlistEntries: [],

  addToWaitlist: (assetId, userAddress) => {
    // Check if already in waitlist
    if (get().isInWaitlist(assetId, userAddress)) {
      return;
    }
    
    set((state) => ({
      waitlistEntries: [
        ...state.waitlistEntries,
        {
          assetId,
          userAddress,
          timestamp: Date.now(),
        },
      ],
    }));
    
    // Store in localStorage for persistence
    const updatedEntries = [...get().waitlistEntries];
    if (typeof window !== 'undefined') {
      localStorage.setItem('waitlistEntries', JSON.stringify(updatedEntries));
    }
  },
  
  removeFromWaitlist: (assetId, userAddress) => {
    set((state) => ({
      waitlistEntries: state.waitlistEntries.filter(
        (entry) => !(entry.assetId === assetId && entry.userAddress === userAddress)
      ),
    }));
    
    // Update localStorage
    const updatedEntries = [...get().waitlistEntries];
    if (typeof window !== 'undefined') {
      localStorage.setItem('waitlistEntries', JSON.stringify(updatedEntries));
    }
  },
  
  isInWaitlist: (assetId, userAddress) => {
    return get().waitlistEntries.some(
      (entry) => entry.assetId === assetId && entry.userAddress === userAddress
    );
  },
  
  getWaitlistCountForAsset: (assetId) => {
    return get().waitlistEntries.filter((entry) => entry.assetId === assetId).length;
  },
  
  hydrate: () => {
    if (typeof window !== 'undefined') {
      const storedEntries = localStorage.getItem('waitlistEntries');
      if (storedEntries) {
        try {
          const parsedEntries = JSON.parse(storedEntries);
          set({ waitlistEntries: parsedEntries });
        } catch (error) {
          console.error('Error parsing stored waitlist entries:', error);
        }
      }
    }
  },
}));