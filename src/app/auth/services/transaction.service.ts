import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface AddFunds  {
  destiny   : number,
  amount    : number,
  created_by: number
}

@Injectable({
  providedIn: 'root'
})

export class TransactionService {
  // variables privadas
  private transactionEndPoint: string = 'http://localhost:3000/api/transaction'
  private addFundsEndPoint: string = 'http://localhost:3000/api/addfunds' 
  private httpOptions = {
            headers: {
              'Content-Type': 'application/json',
              'x-token'     : localStorage.getItem('token') || '',
            },
}

  constructor(private http: HttpClient) {
  }

  async addFunds(destUser: number, amount: number, created_by: number) : Promise<Observable<any>>{
    console.log(destUser+ " " +amount+ " " +created_by);
    
    const body: AddFunds = {
      destiny: destUser,
      amount: amount,
      created_by: created_by
    }
    return this.http.post<AddFunds>(this.addFundsEndPoint, body, this.httpOptions)
  }

  createTransactionn(){
    // TODO 
  }

  // async getTransactions() : Promise<Observable<Transaction>> {
  //   return
  // }
}
