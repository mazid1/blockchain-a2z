import { randomUUID } from "node:crypto";
import { getMinerId } from "./parseArgv/getMinerId";

export const NODE_ADDRESS = randomUUID().replace(/-/g, "");
export const MINING_REWARD = 1;
export const DEFAULT_PORT = 8080;
export const MINER_ID = getMinerId();
