import React from "react";
import "./App.css";
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Marketplace from "./components/Marketplace";
import "@rainbow-me/rainbowkit/styles.css";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import Navbar from "./components/Navbar"

const mumbaiChain = {
  id: 80001,
  name: "  Mumbai ",
  network: "Mumbai",
  nativeCurrency: {
    decimals: 18,
    name: "MATIC",
    symbol: "MATIC",
  },
  rpcUrls: {
    default: "https://rpc-mumbai.maticvigil.com",
  },
  blockExplorers: {
    default: {
      name: "MATIC",
      url: "https://mumbai.polygonscan.com/",
    },
  },
  testnet: true,
};
const { chains, provider } = configureChains(
  [mumbaiChain],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== mumbaiChain.id) return null;
        return { http: chain.rpcUrls.default };
      },
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: " NFT Marketplace",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
function App() {


  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Router>
            <Navbar/>
            <Routes>
              <Route exact path="/" element={<Welcome />} />

              <Route exact path="/Marketplace" element={<Marketplace />} />
            </Routes>
            <Footer />
          </Router>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default App;
