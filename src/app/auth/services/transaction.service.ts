import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface AddFunds  {
  destiny   : number,
  amount    : number,
  created_by: number
}

interface Transaction {
  destiny   : number,
  quantity  : number,
  source_   : number
}

@Injectable({
  providedIn: 'root'
})

export class TransactionService {
  // variables privadas
  private transactionEndPoint: string = 'http://localhost:3000/api/trans'
  private getTransactionsEndPoint: string = 'http://localhost:3000/api/transaction'
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
    const body: AddFunds = {
      destiny: destUser,
      amount: amount,
      created_by: created_by
    }
    return this.http.post<AddFunds>(this.addFundsEndPoint, body, this.httpOptions)
  }

  async createTransactionn(source_: number, destiny: number, quantity: number ): Promise<Observable<any>>{
    // creamos objeto http options para pasar los params y el token
    let httpOpt = {
      headers: {
        'Content-Type': 'application/json',
        'x-token'     : localStorage.getItem('token') || '',
      },
    }

    // el body lo creamos con los datos requeridos por Back End
    const body: Transaction = {
      quantity: quantity,
      destiny: destiny,
      source_: source_
    }

    // hacemos la solicitud http
    return this.http.post<Transaction>(this.transactionEndPoint, body, httpOpt)
  }

  async getTransactions() : Promise<Observable<any>> {
    return this.http.get(this.getTransactionsEndPoint)
  }
}
