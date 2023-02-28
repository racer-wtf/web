import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Subscription = "online" | "leaderboard";

interface SubscriptionState {
  address?: string;
  subscriptions: Subscription[];
  setAddress: (address?: string) => void;
  addSubscription: (subscription: Subscription) => void;
  removeSubscription: (subscription: Subscription) => void;
}

export const useSubscriptions = create<SubscriptionState>()((set) => ({
  subscriptions: [],
  setAddress: (address?: string) => set((state) => ({ ...state, address })),
  addSubscription: (subscription: Subscription) =>
    set((state) => ({
      ...state,
      subscriptions: [...state.subscriptions, subscription],
    })),
  removeSubscription: (subscription: Subscription) =>
    set((state) => ({
      ...state,
      subscriptions: state.subscriptions.filter((s) => s !== subscription),
    })),
}));

interface Online {
  isOnline: boolean;
  setIsOnline: (isOnline: boolean) => void;
}

export const useIsOnline = create<Online>((set) => ({
  isOnline: false,
  setIsOnline: (isOnline: boolean) => set({ isOnline }),
}));

interface OnlineCount {
  count: number;
  setCount: (count: number) => void;
}

export const useOnlineCount = create<OnlineCount>()((set) => ({
  count: 0,
  setCount: (count: number) => set({ count }),
}));

export type Emoji = {
  emoji: string;
  value: number;
};

export type Metadata = {
  blocks_remaining: number;
  votes: number;
  payout: string;
};

interface Leaderboard {
  metadata: Metadata;
  emojis: Emoji[];
  setLeaderboard: (_: { emojis: Emoji[]; metadata: Metadata }) => void;
}

export const useLeaderboard = create<Leaderboard>()(
  persist(
    (set) => ({
      emojis: [],
      metadata: {
        blocks_remaining: 0,
        votes: 0,
        payout: "0",
      },
      setLeaderboard: ({
        emojis,
        metadata,
      }: {
        emojis: Emoji[];
        metadata: Metadata;
      }) => set({ emojis, metadata }),
    }),
    {
      name: "racer.wtf::leaderboard",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

interface Cycle {
  id: number;
  setId: (id: number) => void;
}

export const useCycle = create<Cycle>()((set) => ({
  id: 0,
  setId: (id: number) => set({ id }),
}));
