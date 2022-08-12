import type { ContractTransaction } from "ethers";

export async function getIndexFromTxEventLog(
  tx: ContractTransaction
): Promise<number> {
  const event = await tx.wait();
  const topicSize = event.logs[0].topics.length;
  return parseInt(event.logs[0].topics[topicSize - 1]);
}
