import { CryptoHasher } from "bun";
import type { Block, Transaction } from "./blockchain.types";

class Blockchain {
  chain: Block[];
  transactions: Transaction[];
  nodes: Set<string>;
  hasher: CryptoHasher;

  constructor() {
    this.hasher = new CryptoHasher("sha256");
    this.chain = [];
    this.transactions = [];
    this.nodes = new Set();
    this.createBlock(1, "0");
  }

  createBlock(proof: number, previousHash: string) {
    const block = {
      index: this.chain.length + 1,
      timestamp: new Date(),
      proof,
      previousHash,
      transactions: this.transactions,
    };
    this.chain.push(block);
    this.transactions = [];
    return block;
  }

  getPreviousBlock() {
    return this.chain[this.chain.length - 1];
  }

  proofOfWork(previousProof: number) {
    let newProof = 1;
    let checkProof = false;
    while (!checkProof) {
      const hash = this.hasher
        .update((newProof ** 2 - previousProof ** 2).toString())
        .digest("hex");
      if (hash.slice(0, 4) === "0000") {
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

  isValidChain(chain: Block[]) {
    let previousBlock = chain[0];
    let blockIndex = 1;
    while (blockIndex < chain.length) {
      const block = chain[blockIndex];
      if (block.previousHash !== this.hash(previousBlock)) {
        return false;
      }
      const previousProof = previousBlock.proof;
      const proof = block.proof;
      const hash = this.hasher
        .update((proof ** 2 - previousProof ** 2).toString())
        .digest("hex");
      if (hash.slice(0, 4) !== "0000") {
        return false;
      }
      previousBlock = block;
      blockIndex++;
    }
    return true;
  }

  addTransaction(sender: string, receiver: string, amount: number) {
    this.transactions.push({ sender, receiver, amount });
    return this.getPreviousBlock().index + 1;
  }

  addNode(address: string) {
    const url = new URL(address);
    this.nodes.add(url.host);
  }

  async replaceChain() {
    const network = Array.from(this.nodes);
    let longestChain = null;
    let maxLength = this.chain.length;
    for (const node of network) {
      const response = await fetch(`http://${node}/chain`);
      if (response.ok) {
        const { length, chain } = await response.json();
        if (length > maxLength && this.isValidChain(chain)) {
          maxLength = length;
          longestChain = chain;
        }
      }
    }
    if (longestChain) {
      this.chain = longestChain;
      return true;
    }
    return false;
  }
}

export const blockchain = new Blockchain();
