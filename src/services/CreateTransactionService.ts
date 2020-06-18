import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface IRequest {
  title: string
  value: number
  type: "income"| "outcome"
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}:IRequest): Transaction {
//Repository vai lidar de todos os nosso dados

    const {total} = this.transactionsRepository.getBalance()
    if( total < value && type =='outcome'){
      throw new Error('O valor de saida é maior que o que vc possui em caixa')
    }
    const transaction = this.transactionsRepository.create({
      title, value, type
    })
    return transaction
  }

}

export default CreateTransactionService;
