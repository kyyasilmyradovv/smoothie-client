import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, arbitrum, sepolia } from "@reown/appkit/networks";
import type { AppKitNetwork } from "@reown/appkit/networks";

export const projectId =
  process.env.VITE_PUBLIC_PROJECT_ID || "ad0c097d3dcf6119eae95425e517c01a";

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const metadata = {
  name: "Smoothie.fun",
  description: "Smoothie.fun is a streaming platform for crypto analysts.",
  url: "https://subscribes.lt",
  icons: ["https://subscribes.lt/favicon.ico"],
};

export const networks = [mainnet, arbitrum, sepolia] as [
  AppKitNetwork,
  ...AppKitNetwork[]
];

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
