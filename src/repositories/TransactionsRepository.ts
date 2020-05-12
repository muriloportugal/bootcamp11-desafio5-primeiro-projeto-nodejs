import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Extract {
  transactions: Transaction[];
  balance: Balance;
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
    const income = this.transactions.reduce((total, currentTransaction) => {
      if (currentTransaction.type === 'income') {
        return total + currentTransaction.value;
      }
      return total;
    }, 0);

    const outcome = this.transactions.reduce((total, currentTransaction) => {
      if (currentTransaction.type === 'outcome') {
        return total + currentTransaction.value;
      }
      return total;
    }, 0);

    const total = income - outcome;
    const balance: Balance = { income, outcome, total };
    return balance;
  }

  public extract(): Extract {
    const transactions: Transaction[] = this.all();
    const balance = this.getBalance();
    const extrato: Extract = { transactions, balance };
    return extrato;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
