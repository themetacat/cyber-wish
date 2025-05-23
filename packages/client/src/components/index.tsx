import { AccountButton } from "@latticexyz/entrykit/internal";
import { Direction, Entity } from "../common";
import mudConfig from "contracts/mud.config";
import { useMemo } from "react";
import { useWorldContract } from "../mud/useWorldContract";
import { Synced } from "./mud/Synced";
import { useSync } from "@latticexyz/store-sync/react";
import { components } from "../mud/recs";
import { useEntityQuery } from "@latticexyz/react";
import { Has, getComponentValueStrict } from "@latticexyz/recs";
import { Address } from "viem";
import styles from "./index.module.css";
import WishPanel from "./wish/WishPanel";
import WishesPanel from "./wish/wishesPanel";

export default function Main() {
  // const playerEntities = useEntityQuery([Has(components.Owner), Has(components.Position)]);
  // const players = useMemo(
  //   () =>
  //     playerEntities.map((entity) => {
  //       const owner = getComponentValueStrict(components.Owner, entity);
  //       const position = getComponentValueStrict(components.Position, entity);
  //       return {
  //         entity: entity as Entity,
  //         owner: owner.owner as Address,
  //         x: position.x,
  //         y: position.y,
  //       };
  //     }),
  //   [playerEntities],
  // );

  const sync = useSync();
  const worldContract = useWorldContract();
  const wishPool = "0x0000000000000000000000000000000000000000000000000000000000000001" as `0x${string}`;
  
  const wish = useMemo(
    () =>
      sync.data && worldContract
        ? async (incenseId: number, blindBoxId: number, wishContent: string, value: number) => {
          console.log("incenseId:", incenseId);
          console.log("blindBoxId:", blindBoxId);
          console.log("wishContent:", wishContent);
          
          const tx = await worldContract.write.cyberwish__wish([wishPool, BigInt(incenseId), BigInt(blindBoxId), wishContent], {value: BigInt((value * 1e18).toFixed(0))});
          console.log("tx", tx);
          console.log(await sync.data.waitForTransaction(tx));
          worldContract.simulate.cyberwish__wish([wishPool, BigInt(incenseId), BigInt(blindBoxId), wishContent], {value: BigInt(Math.floor(value * 1e18))});
          // const simulateRes = await worldContract.simulate.cyberwish__wish([wishPool, BigInt(incenseId), BigInt(blindBoxId), wishContent], {value: BigInt(Math.floor(value * 1e18))});
          // console.log(simulateRes);
        }
        : undefined,
    [sync.data, worldContract],
  );

  const boostByStar = useMemo(
    () =>
      sync.data && worldContract
        ? async () => {
          console.log("boost star");
          
          const tx = await worldContract.write.cyberwish__BoostWisherByStar([wishPool, BigInt(1)]);
          console.log("tx", tx);
          console.log(await sync.data.waitForTransaction(tx));
          const simulateRes = await worldContract.simulate.cyberwish__BoostWisherByStar([wishPool, BigInt(1)]);
          console.log(simulateRes);
        }
        : undefined,
    [sync.data, worldContract],
  );

  return (
    <>
      <div className={styles.container}>
        <button onClick={() => boostByStar()}>boost star</button>
        <WishPanel wish={wish} />
        <WishesPanel />
      </div>
    </>
  );
}
