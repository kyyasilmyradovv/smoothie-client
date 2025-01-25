import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, arbitrum, sepolia } from "@reown/appkit/networks";
import type { AppKitNetwork } from "@reown/appkit/networks";

export const projectId =
  process.env.VITE_PUBLIC_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694";

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const metadata = {
  name: "Smoothie.fun",
  description: "Smoothie.fun is a streaming platform for crypto analysts.",
  url: "https://smoothie.fun",
  icons: ["https://smoothie.fun/favicon.ico"],
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
