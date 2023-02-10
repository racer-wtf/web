import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RainbowKitProvider from "./providers/RainbowkitProviders";
import Leaderboard from "./components/Leaderboard";

import "@rainbow-me/rainbowkit/styles.css";

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
  },
  content: {
    minHeight: "100vh",
    width: 800,
    display: "flex",
    flexDirection: "column",
  },
  description: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
} satisfies Record<string, React.CSSProperties>;

const App = () => {
  return (
    <RainbowKitProvider>
      <div style={styles.app}>
        <div style={styles.content}>
          <Header />
          <p style={styles.description}>
            Ethereum's first hype market - <em>Emoji Racer</em>. Learn more
            about racing <a href="#">here</a>.
          </p>
          <RouterProvider router={router} />
          <Footer />
        </div>
      </div>
    </RainbowKitProvider>
  );
};

export default App;
