import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import { SyncProvider } from "@latticexyz/store-sync/react";
import { defineConfig, EntryKitProvider } from "@latticexyz/entrykit/internal";
import { wagmiConfig } from "./wagmiConfig";
import { chainId, getWorldAddress, indexerUrl, startBlock } from "./common";
import { syncAdapter } from "./mud/recs";

const queryClient = new QueryClient();

export type Props = {
  children: ReactNode;
};

export function Providers({ children }: Props) {
  const worldAddress = getWorldAddress();
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {/* <EntryKitProvider config={defineConfig({ chainId, worldAddress })}> */}
          <SyncProvider chainId={chainId} address={worldAddress} startBlock={startBlock} indexerUrl={indexerUrl} adapter={syncAdapter}>
            {children}
          </SyncProvider>
        {/* </EntryKitProvider> */}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
