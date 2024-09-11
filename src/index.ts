import Elysia from "elysia";
import { blockchain } from "./blockchain/Blockchain";

const server = new Elysia()
  .get("mine-block", () => {
    const previousBlock = blockchain.getPreviousBlock();
    const previousProof = previousBlock.proof;
    const proof = blockchain.proofOfWork(previousProof);
    const previousHash = blockchain.hash(previousBlock);
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
  });

server.listen(8080, () => console.info("Server is running on port 8080"));
