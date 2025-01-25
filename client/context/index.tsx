import React from "react";
import { createAppKit } from "@reown/appkit/react";

import { WagmiProvider } from "wagmi";
import { arbitrum, mainnet, AppKitNetwork } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

const queryClient = new QueryClient();

const projectId = "ad0c097d3dcf6119eae95425e517c01a";

const metadata = {
  name: "Smoothie.fun",
  description: "Smoothie.fun is a streaming platform for crypto analysts.",
  url: "https://subscribes.lt",
  icons: ["https://subscribes.lt/favicon.ico"],
};

const networks: [AppKitNetwork, ...AppKitNetwork[]] = [mainnet, arbitrum];

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

createAppKit({
  themeMode: "dark",
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true,
  },
});

import { ReactNode } from "react";

export function AppKitProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
