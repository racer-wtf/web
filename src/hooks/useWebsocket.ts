import { useEffect } from "react";
import { useAccount } from "wagmi";
import useWebsocketConnection, { ReadyState } from "react-use-websocket";
import { environment } from "../utils/environment";
import {
  useIsOnline,
  useOnlineCount,
  useSubscriptions,
  useLeaderboard,
} from "../store";
import { shallow } from "zustand/shallow";

export const useWebsocket = () => {
  // websocket connection will always retry every 3 seconds
  const { sendMessage, lastMessage, readyState } = useWebsocketConnection(
    environment.VITE_WEBSOCKET_SERVER,
    {
      shouldReconnect: (_) => true,
      reconnectAttempts: Infinity,
      reconnectInterval: 3000,
    }
  );

  const setIsOnline = useIsOnline((state) => state.setIsOnline);
  const subscriptions = useSubscriptions(
    (state) => ({
      subscriptions: state.subscriptions,
      address: state.address,
    }),
    shallow
  );

  // any time the subscription changes, send a message to the server
  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      setIsOnline(true);
      sendMessage(JSON.stringify(subscriptions));
    } else {
      setIsOnline(false);
    }
  }, [readyState, subscriptions]);

  const setAddress = useSubscriptions((state) => state.setAddress);
  const { address } = useAccount();

  // if the signer changes, update the address
  useEffect(() => {
    setAddress(address);
  }, [address]);

  const setOnlineCount = useOnlineCount((state) => state.setCount);
  const setLeaderboard = useLeaderboard((state) => state.setLeaderboard);

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
        if (parsedMessage.count) {
          setOnlineCount(parsedMessage.count);
        }
        break;

      case "leaderboard":
        if (
          parsedMessage.leaderboard &&
          Array.isArray(parsedMessage.leaderboard)
        ) {
          setLeaderboard(parsedMessage.leaderboard);
        }
        break;
    }
  }, [lastMessage]);
};
