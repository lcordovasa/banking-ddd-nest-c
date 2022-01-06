import { TransactionType } from './transaction-type.enum';

export enum TransactionStatus {
  STARTED = 1,
  COMPLETED = 2,
  FAILED = 3
}

export const TransactionStatusLabel = new Map<number, string>([
  [TransactionStatus.STARTED, 'STARTED'],
  [TransactionStatus.COMPLETED, 'COMPLETED'],
  [TransactionStatus.FAILED, 'FAILED'],
]);