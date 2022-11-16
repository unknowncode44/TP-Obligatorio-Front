import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TransactionService } from 'src/app/auth/services/transaction.service';
import { User } from '../models/user.model';

// toast 
import {MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

interface Transaction {
  date_?: string,
  id_transaction?: number,
  source_?: string,
  destiny?: string,
  quantity?: number,

}

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css'],
  providers: [MessageService]

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
    private fundsService: TransactionService,
    private messageService: MessageService, 
    private primengConfig: PrimeNGConfig
    ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
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

    this.fundsService.getTransactions().then(
      p => {
        p.subscribe((res) => {
          this.transactionsArray = res.result
        })
      }
    ).then(() => {
      for (let i = 0; i < this.transactionsArray.length; i++) {
        const e = this.transactionsArray[i];
        const destiny = e.destiny
        const origin = e.source_
        for (let a = 0; a < this.usersArray.length; a++) {
          const r = this.usersArray[a];
          if(r.user_id === destiny){
            this.transactionsArray[i].destiny = r.first_name
            break
          }

          if(r.user_id === origin){
            e.source_ = r.first_name
            break
          }
        }

        
      }
    })

  
  }

  async createTransaction() {
    let destiny = this.transactionForm.value.destiny;
    let quantity = this.transactionForm.value.quantity;
    let source_ = this.transactionForm.value.source_

    await this.fundsService.createTransactionn(source_, destiny, quantity).then((resp) => {
      resp.subscribe((r) => {
        console.info(r);
        this.messageService.add({key: 'bc', severity:'success', summary: 'Exito!', detail: 'Transaccion exitosa'});
        
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
        this.messageService.add({key: 'bc', severity:'success', summary: 'Exito!', detail: 'Fondos Agregados Con Exito'});
        
      })
    })
  }

}
