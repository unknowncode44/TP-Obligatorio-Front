import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';

interface Transaction {
  date?: string,
  transaction_id: number,
  origin?: string,
  destiny?: string,
  amount?: number,
  status?: string,

}

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css']
})
export class FundsComponent implements OnInit {

  

  transactionForm = new FormGroup({
    source_: new FormControl(),
    destiny: new FormControl(),
    quantity: new FormControl()
  })

  loading$ = this.service.loading$

  transactionsArray : Transaction[] = []

  constructor(public service: AuthService) { }

  ngOnInit(): void {
  }

}
