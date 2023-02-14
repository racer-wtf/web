import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Banner from "./components/Banner";
import About from "./components/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RainbowKitProvider from "./providers/RainbowkitProviders";
import Leaderboard from "./components/Leaderboard";
import Rewards from "./components/Rewards";
import NotFound from "./components/NotFound";
import { useBreakpoint } from "./hooks/useBreakpoint";

import "@rainbow-me/rainbowkit/styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Banner />
        <Leaderboard />
      </>
    ),
  },
  {
    path: "/rewards",
    element: <Rewards />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/leaderboard",
    element: <Leaderboard />,
  },
  {
    path: "*",
    element: <NotFound />,
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
          <RouterProvider router={router} />
        </div>
        <Footer />
      </div>
    </RainbowKitProvider>
  );
};

export default App;
