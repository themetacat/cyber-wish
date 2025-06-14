import { Chain, defineChain, http, webSocket } from "viem";
import { anvil } from "viem/chains";
import { createWagmiConfig } from "@latticexyz/entrykit/internal";
import { rhodolite, garnet, redstone } from "@latticexyz/common/chains";
import { chainId } from "./common";

const MetaCatDev = defineChain({
  id: 31_338,
  name: 'MetaCat Devnet',
  network: 'MetaCat Devnet',
  iconUrl: 'https://poster-phi.vercel.app/MetaCat_Logo_Circle.png',
  contracts: {
    ...anvil.contracts,
    paymaster: {
      address: "0xf03E61E7421c43D9068Ca562882E98d1be0a6b6e",
    },
  },
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },

  rpcUrls: {
    default: {
      http: ['https://devnet.pixelaw.world/rpc'],
      webSocket: ['wss://devnet.pixelaw.world/rpc'],
    },
    public: {
      http: ['https://devnet.pixelaw.world/rpc'],
      webSocket: ['wss://devnet.pixelaw.world/rpc'],
    },
  },
  blockExplorers: {
    default: {} as never,
  },
})

export const chains = [
  redstone,
  garnet,
  rhodolite,
  MetaCatDev,
  {
    ...anvil,
    contracts: {
      ...anvil.contracts,
      paymaster: {
        address: "0xf03E61E7421c43D9068Ca562882E98d1be0a6b6e",
      },
    },
    blockExplorers: {
      default: {} as never,
      worldsExplorer: {
        name: "MUD Worlds Explorer",
        url: "http://localhost:13690/anvil/worlds",
      },
    },
  },
] as const satisfies Chain[];

export const transports = {
  [anvil.id]: webSocket(),
  [garnet.id]: http(),
  [rhodolite.id]: http(),
  [redstone.id]: http(),
  [MetaCatDev.id]: webSocket(),
} as const;

export const wagmiConfig = createWagmiConfig({
  chainId,
  // TODO: swap this with another default project ID or leave empty
  walletConnectProjectId: "e4cf17cbcf19b89caa3e3343a0b33240",
  appName: document.title,
  chains,
  transports,
  pollingInterval: {
    [anvil.id]: 2000,
    [garnet.id]: 2000,
    [rhodolite.id]: 2000,
    [redstone.id]: 2000,
    [MetaCatDev.id]: 2000,
  },
});
