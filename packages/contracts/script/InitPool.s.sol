// // SPDX-License-Identifier: MIT
// pragma solidity >=0.8.24;

// import { ResourceId } from "@latticexyz/store/src/ResourceId.sol";
// import { WorldResourceIdLib } from "@latticexyz/world/src/WorldResourceId.sol";
// import { RESOURCE_SYSTEM } from "@latticexyz/world/src/worldResourceTypes.sol";
// import { Script } from "forge-std/Script.sol";
// import { console } from "forge-std/console.sol";
// import { StoreSwitch } from "@latticexyz/store/src/StoreSwitch.sol";
// import { WishingPool } from "../src/codegen/index.sol";
// import { IWorld } from "../src/codegen/world/IWorld.sol";
// import { WishingPool, Props, PropBlindBox, Incense } from "../src/codegen/index.sol";

// contract InitPool is Script {
//   function run() external {
//     uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
//     // address worldAddress = vm.envAddress("WORLD_ADDRESS");
//     address worldAddress = address(0xfDf868Ea710FfD8cd33b829c5AFf79eDd15EcD5f);
//     console.log("world Address: ", worldAddress);

//     vm.startBroadcast(deployerPrivateKey);
//     StoreSwitch.setStoreAddress(worldAddress);

//     bytes32 poolId = bytes32(uint256(1));
//     WishingPool.set(poolId, 0x60EA96f57B3a5715A90DAe1440a78f8bb339C92e, 0, block.timestamp, 1800, "CyberWish");

//     Incense.set(poolId, 1, 0, 3600, 0, 3, 0, false, "Pure Wish");
//     Incense.set(poolId, 2, 5*10**14, 3600 * 6, 5, 20, 10, true, "Luck Wish");
//     Incense.set(poolId, 3, 10** 15, 3600 * 18, 20, 40, 20, true, "Fortune Bloom");
//     Incense.set(poolId, 4, 15* 10 ** 14, 3600 * 36, 40, 60, 30, true, "Fate Whisper");
//     Incense.set(poolId, 5, 10 **16, 3600*72, 200, 350, 40, true, "Celestial Wish");

//     PropBlindBox.set(poolId, 1, 0, 0, 3, 0, false, "Pray");
//     PropBlindBox.set(poolId, 2, 5 * 10 ** 14, 5, 20, 10, true, "Health Blessing");
//     PropBlindBox.set(poolId, 3, 8 * 10 ** 14, 10, 30, 15, true, "Fortune Blessing");
//     PropBlindBox.set(poolId, 4, 12 * 10 ** 14, 20, 45, 25, true, "Wisdom Blessing");
//     PropBlindBox.set(poolId, 5, 15 * 10 ** 14, 40, 60, 30, true, "Love Blessing");
//     // Props.set(poolId, boxId, id, name);

//     vm.stopBroadcast();
//   }
// }
