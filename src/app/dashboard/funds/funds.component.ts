import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TransactionService } from 'src/app/auth/services/transaction.service';
import { User } from '../models/user.model';

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

  // usamos formularios reactivos, definimos los grupos de formulario
  //# Formulario transacciones
  transactionForm = new FormGroup({
    source_ : new FormControl(),
    destiny : new FormControl(),
    quantity: new FormControl()
  })

  //# Furmulario de ingreso de fondos
  addFundsForm = new FormGroup({
    user_   : new FormControl(),
    amount_ : new FormControl()
  })

  // variable con fondos del usuario
  myFunds: string = "0.00"

  // booleano que manejara el spinner
  loading$ = this.service.loading$

  // array que contendra las transacciones del usuario
  transactionsArray : Transaction[] = []

  // array de usuarios, necesario para transferir
  usersArray        : User[] = []

  constructor(
    public service: AuthService,
    private fundsService: TransactionService
    ) { }

  ngOnInit(): void {
    /* Al inicio, lo que hacemos es obtener los usuarios 
    e instanciarlos en el array de usuarios, y buscamos 
    nuestros datos en los mismos, recurriendo a localstorage
    con los datos que se guardaron cuando inicie sesion */ 
    this.service.getUsers().then(
      p => {
        p.subscribe((res) => {
          this.usersArray = res.result
          console.log(`${this.usersArray}  <=Array`);
          let myID = localStorage.getItem('user_id')!;
          let parsedID = parseInt(myID);
          
          for (let i = 0; i < this.usersArray.length; i++) {
            const e = this.usersArray[i];
            if(e.user_id === parsedID){
              this.myFunds = e.money!.toFixed(2).toString()
            }
            
          }
        })
    })
  }

  async addFunds() {
    let destiny     = this.addFundsForm.value.user_
    let amount      = this.addFundsForm.value.amount_
    let created_by  = parseInt(localStorage.getItem('user_id')!);
    
    await this.fundsService.addFunds(destiny, amount, created_by)
    .then((resp) => {
      resp.subscribe((r) => {
        console.info(r);
        
      })
    })
  }

}
