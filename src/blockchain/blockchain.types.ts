export type Block = {
  index: number;
  timestamp: Date;
  proof: number;
  previousHash: string;
  transactions: Transaction[];
};

export type Transaction = {
  sender: string;
  receiver: string;
  amount: number;
};
