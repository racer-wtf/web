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

const styles: { [key: string]: React.CSSProperties } = {
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
};

const App = () => {
  return (
    <RainbowKitProvider>
      <div style={styles.app}>
        <div style={styles.content}>
          <Header />
          <RouterProvider router={router} />
          <Footer />
        </div>
      </div>
    </RainbowKitProvider>
  );
};

export default App;
