import { useEffect } from "react";
import { shallow } from "zustand/shallow";
import { useSubscriptions, Subscription } from "../store";

export const useSubscription = (subscription: Subscription) => {
  const { addSubscription, removeSubscription } = useSubscriptions(
    (state) => ({
      addSubscription: state.addSubscription,
      removeSubscription: state.removeSubscription,
    }),
    shallow
  );

  useEffect(() => {
    addSubscription(subscription);
    return () => removeSubscription(subscription);
  }, []);
};
