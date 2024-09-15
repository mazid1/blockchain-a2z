import { Elysia, t } from "elysia";
import { blockchain } from "../blockchain/Blockchain";
import { MINER_ID, MINING_REWARD, NODE_ADDRESS } from "./server.constants";

export const server = new Elysia()
  .get("mine-block", () => {
    const previousBlock = blockchain.getPreviousBlock();
    const previousProof = previousBlock.proof;
    const proof = blockchain.proofOfWork(previousProof);
    const previousHash = blockchain.hash(previousBlock);

    blockchain.addTransaction(NODE_ADDRESS, MINER_ID, MINING_REWARD);

    const block = blockchain.createBlock(proof, previousHash);

    return {
      message: "Congratulations, you just mined a block!",
      block,
    };
  })
  .get("/chain", () => {
    return {
      chain: blockchain.chain,
      length: blockchain.chain.length,
    };
  })
  .get("/is-valid", () => {
    return {
      isValid: blockchain.isValidChain(blockchain.chain),
    };
  })
  .post(
    "/add-transaction",
    ({ body, set }) => {
      const { sender, receiver, amount } = body;
      const index = blockchain.addTransaction(sender, receiver, amount);
      set.status = 201;
      return {
        message: `This transaction will be added to Block ${index}`,
      };
    },
    {
      body: t.Object({
        sender: t.String(),
        receiver: t.String(),
        amount: t.Number(),
      }),
    }
  )
  .post(
    "/connect-nodes",
    ({ body, set, error }) => {
      const { nodes } = body;
      if (!nodes || nodes.length === 0) {
        return error(400, "Nodes must be provided");
      }
      for (const node of nodes) {
        blockchain.addNode(node);
      }
      set.status = 201;
      return {
        message: "All the nodes are connected successfully.",
        totalNodes: Array.from(blockchain.nodes),
      };
    },
    {
      body: t.Object({
        nodes: t.Array(t.String()),
      }),
    }
  )
  .get("/replace-chain", async () => {
    const replaced = await blockchain.replaceChain();
    if (replaced) {
      return {
        message: "The chain was replaced by the longest chain",
        newChain: blockchain.chain,
      };
    }
    return {
      message: "The chain is already the longest chain",
      chain: blockchain.chain,
    };
  });
