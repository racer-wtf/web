import {
  RainbowKitProvider,
  type Theme,
  darkTheme,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
  argentWallet,
  braveWallet,
  coinbaseWallet,
  ledgerWallet,
  omniWallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { CustomAvatar } from "../components/CustomAvatar";

const { chains, provider } = configureChains([mainnet], [publicProvider()]);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [metaMaskWallet({ chains, shimDisconnect: true })],
  },
  {
    groupName: "Others",
    wallets: [
      argentWallet({ chains }),
      braveWallet({ chains }),
      coinbaseWallet({ appName: "racer.wtf", chains }),
      ledgerWallet({ chains }),
      omniWallet({ chains }),
      rainbowWallet({ chains }),
      trustWallet({ chains, shimDisconnect: true }),
      walletConnectWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const theme: Theme = {
  ...darkTheme(),
  // blurs: {
  //   modalOverlay: '...',
  // },
  colors: {
    ...darkTheme().colors,
    accentColor: "#d2222d",
    // accentColorForeground: "red",
    //   actionButtonBorder: '...',
    //   actionButtonBorderMobile: '...',
    //   actionButtonSecondaryBackground: '...',
    closeButton: "#005ad9",
    closeButtonBackground: "#005ad944",
    // connectButtonBackground: "green",
    //   connectButtonBackgroundError: '...',
    //   connectButtonInnerBackground: '...',
    //   connectButtonText: '...',
    //   connectButtonTextError: '...',
    //   connectionIndicator: '...',
    //   downloadBottomCardBackground: '...',
    //   downloadTopCardBackground: '...',
    //   error: '...',
    //   generalBorder: '...',
    //   generalBorderDim: '...',
    //   menuItemBackground: '...',
    modalBackdrop: "#00000099",
    modalBackground: "#000",
    modalBorder: "#005ad9",
    //   modalText: '...',
    //   modalTextDim: '...',
    //   modalTextSecondary: '...',
    //   profileAction: '...',
    //   profileActionHover: '...',
    //   profileForeground: '...',
    //   selectedOptionBorder: '...',
    //   standby: '...',
  },
  fonts: {
    body: "SFMono,ui-monospace,monospace",
  },
  radii: {
    actionButton: "0",
    connectButton: "0",
    menuButton: "0",
    modal: "0",
    modalMobile: "0",
  },
  // shadows: {
  //   connectButton: '...',
  //   dialog: '...',
  //   profileDetailsAction: '...',
  //   selectedOption: '...',
  //   selectedWallet: '...',
  //   walletLogo: '...',
  // },
};

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} avatar={CustomAvatar} theme={theme}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Provider;
