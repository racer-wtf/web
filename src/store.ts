import { create } from "zustand";

type Subscription = "online" | "leaderboard";

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

interface OnlineCount {
  count: number;
  setCount: (count: number) => void;
}

export const useOnlineCount = create<OnlineCount>()((set) => ({
  count: 0,
  setCount: (count: number) => set({ count }),
}));
