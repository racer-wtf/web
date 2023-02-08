import Header from "./components/Header";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RainbowKitProvider from "./providers/RainbowkitProviders";

import "@rainbow-me/rainbowkit/styles.css";
import Leaderboard from "./components/Leaderboard";

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
  },
};

const App = () => {
  return (
    <RainbowKitProvider>
      <div style={styles.app}>
        <div style={styles.content}>
          <Header />
          <RouterProvider router={router} />
        </div>
      </div>
    </RainbowKitProvider>
  );
};

export default App;
