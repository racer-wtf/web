import { useEffect } from "react";
import { useAccount } from "wagmi";
import useWebsocketConnection, { ReadyState } from "react-use-websocket";
import { environment } from "../utils/environment";
import { useOnlineCount, useSubscriptions } from "../store";
import { shallow } from "zustand/shallow";

export const useWebsocket = () => {
  const subscriptions = useSubscriptions(
    (state) => ({
      subscriptions: state.subscriptions,
      address: state.address,
    }),
    shallow
  );
  const setAddress = useSubscriptions((state) => state.setAddress);
  const { address } = useAccount();
  const { sendMessage, lastMessage, readyState } = useWebsocketConnection(
    environment.VITE_WEBSOCKET_SERVER
  );

  // if the signer changes, update the address
  useEffect(() => {
    setAddress(address);
  }, [address]);

  // any time the subscription changes, send a message to the server
  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      console.log("subscriptions changed:", subscriptions);
      sendMessage(JSON.stringify(subscriptions));
    }
  }, [readyState, subscriptions]);

  const setOnlineCount = useOnlineCount((state) => state.setCount);

  useEffect(() => {
    const message = lastMessage?.data;
    if (message && !lastMessage.type) {
      return;
    }

    let parsedMessage;
    try {
      parsedMessage = JSON.parse(message);
    } catch (e) {
      return;
    }

    switch (parsedMessage.type) {
      case "online":
        setOnlineCount(parsedMessage.count);
    }
  }, [lastMessage]);
};
