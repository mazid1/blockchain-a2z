import { CryptoHasher } from "bun";
import type { Block } from "./blockchain.types";

class Blockchain {
  chain: Block[];
  hasher: CryptoHasher;

  constructor() {
    this.hasher = new CryptoHasher("sha256");
    this.chain = [];
    this.createBlock(1, "0");
  }

  createBlock(proof: number, previousHash: string) {
    const block = {
      index: this.chain.length + 1,
      timestamp: new Date(),
      proof,
      previousHash,
    };
    this.chain.push(block);
    return block;
  }

  getPreviousBlock() {
    return this.chain[this.chain.length - 1];
  }

  proofOfWork(previousProof: number) {
    let newProof = 1;
    let checkProof = false;
    while (!checkProof) {
      const hashOperation = this.hasher
        .update((newProof ** 2 - previousProof ** 2).toString())
        .digest("hex");
      if (hashOperation.slice(0, 4) === "0000") {
        checkProof = true;
      } else {
        newProof++;
      }
    }
    return newProof;
  }

  hash(block: Block) {
    return this.hasher.update(JSON.stringify(block)).digest("hex");
  }
}

export const blockchain = new Blockchain();
