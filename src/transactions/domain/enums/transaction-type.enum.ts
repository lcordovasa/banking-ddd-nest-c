export enum TransactionType {
  DEPOSIT = 'D',
  WITHDRAW = 'W',
  TRANSFER = 'T'
}

export const TransactionTypeLabel = new Map<string, string>([
  [TransactionType.DEPOSIT, 'DEPOSIT'],
  [TransactionType.WITHDRAW, 'WITHDRAW'],
  [TransactionType.TRANSFER, 'TRANSFER'],
]);