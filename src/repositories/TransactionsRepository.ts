import { v4 } from 'uuid';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let incomeSum = 0;
    let outcomeSum = 0;

    this.transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        incomeSum += transaction.value;
      } else {
        outcomeSum += transaction.value;
      }
    });

    const balance = {
      income: incomeSum,
      outcome: outcomeSum,
      total: incomeSum - outcomeSum,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = {
      id: v4(),
      title,
      value,
      type,
    };

    this.transactions.push(transaction);

    return transaction;
  }
}
export default TransactionsRepository;
