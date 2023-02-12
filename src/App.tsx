import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RainbowKitProvider from "./providers/RainbowkitProviders";
import Leaderboard from "./components/Leaderboard";

import "@rainbow-me/rainbowkit/styles.css";
import { useBreakpoint } from "./hooks/useBreakpoint";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Leaderboard />,
  },
]);

const styles = {
  app: {
    backgroundColor: "#000",
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "SFMono,ui-monospace,monospace",
    overflowX: "hidden",
    overflowY: "auto",
    paddingBottom: 54,
  },
  appMobile: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  content: {
    width: "100%",
    maxWidth: 800,
    display: "flex",
    flexDirection: "column",
  },
  description: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
} satisfies Record<string, React.CSSProperties>;

const App = () => {
  const isMobile = useBreakpoint();

  return (
    <RainbowKitProvider>
      <div
        style={{
          ...styles.app,
          ...(isMobile ? styles.appMobile : {}),
        }}
      >
        <Header />
        <div style={styles.content}>
          <p
            style={{
              ...styles.description,
              ...(isMobile ? { textAlign: "center" } : {}),
            }}
          >
            Ethereum's first hype market - <em>Emoji Racer</em>. Learn more
            about racing <a href="#">here</a>.
          </p>
          <RouterProvider router={router} />
        </div>
        <Footer />
      </div>
    </RainbowKitProvider>
  );
};

export default App;
