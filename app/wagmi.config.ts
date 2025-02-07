// wagmi.config.ts
import { createConfig, http } from "wagmi";
import { base, baseSepolia, Chain } from "wagmi/chains";
import { coinbaseWallet, metaMask } from "wagmi/connectors";

const isTestnet = process.env.NEXT_PUBLIC_USE_TESTNET === "true";

// 顯式告訴 TypeScript `chains` 的類型
const chains: readonly [Chain, ...Chain[]] = isTestnet ? [baseSepolia] : [base];

export const getConfig = () =>
  createConfig({
    chains,
    connectors: [
      // coinbaseWallet({
      //   appName: "hackathon",
      // }),
      metaMask(),
    ],
    transports: {
      [base.id]: http(),
      [baseSepolia.id]: http(),
    },
    ssr: true,
  });
