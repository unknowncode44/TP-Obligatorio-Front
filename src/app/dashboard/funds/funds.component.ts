import { Component, OnInit }      from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService }            from 'src/app/auth/services/auth.service';
import { TransactionService }     from 'src/app/auth/services/transaction.service';
import { User }                   from '../models/user.model';

// toast 
import {MessageService}   from 'primeng/api';
import { PrimeNGConfig }  from 'primeng/api';

// jsPdf
import {jsPDF}      from 'jspdf';
import html2canvas  from 'html2canvas';

// xlsx file-saver
import * as xlsx from 'xlsx';
import { FileSaverService } from 'ngx-filesaver';



interface Transaction {
  date_?: string,
  id_transaction?: number,
  source_?: string,
  destiny?: string,
  quantity?: string,

}

interface ParsedUsersObject {
  user_id: string,
  user_name: string
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

  // array para completar nombres en tabla
  parsedUsrsArr     : ParsedUsersObject[] = [] 

  // my id
  myId: string = localStorage.getItem('user_id')!


  constructor(
    public service: AuthService,
    private fundsService: TransactionService,
    private messageService: MessageService, 
    private primengConfig: PrimeNGConfig,
    private filesaver: FileSaverService
    ) {
      this.transactionForm.controls.source_.disable()
      this.fundsService.getTransactions().then(
        
        p => {
          p.subscribe((res) => {
            let array_ : Transaction[] = res.result
            let myID = localStorage.getItem('user_id')!;
            for (let i = 0; i < array_.length; i++) {
              var e = array_[i];
              const strID = e.source_?.toString()
              const strDest = e.destiny?.toString()
              
              if(strID === myID){
                e.source_ = `${localStorage.getItem('fristName')} (Yo)`!
                this.transactionsArray.push(e)
              }
              if(strDest === myID){
                e.destiny = `${localStorage.getItem('fristName')} (Yo)`!
                this.transactionsArray.push(e)
              }
             
            }
            
  
            
          })
        }
        
      )
    }

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
          let myID = localStorage.getItem('user_id')!;
          let parsedID = parseInt(myID);
          for (let i = 0; i < this.usersArray.length; i++) {
            const e = this.usersArray[i];
            let parsedUser : ParsedUsersObject = {
              user_id: e.user_id!.toString(),
              user_name: `${e.first_name} ${e.last_name}`
            }
            this.parsedUsrsArr.push(parsedUser) 
            
            this.transactionsArray.forEach(el => {
              if(el.destiny?.toString() == parsedUser.user_id){
                el.destiny = parsedUser.user_name
              }
              if(el.source_?.toString() == parsedUser.user_id){
                el.source_ = parsedUser.user_name
              }
              el.quantity = parseInt(el.quantity!).toFixed(2)
              
              
              
            })
            
            if(e.user_id === parsedID){
              this.myFunds = e.money!.toFixed(2).toString()
            }

          }
          

        })
    })

    

  }


  async createTransaction() {
    let destiny = this.transactionForm.value.destiny;
    let quantity = this.transactionForm.value.quantity;
    let source_ = parseInt(localStorage.getItem('user_id')!)
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

  public openPDF(): void {
    let header = document.getElementById('headerData');
    header!.classList.add('active')
    let data: any = document.getElementById('htmlData');
    html2canvas(data).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const fileUri = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(fileUri, 'PNG', 0, position, fileWidth, fileHeight);
      let date = new Date().toISOString()
      PDF.save(date+' mis_movimentos.pdf')
      header!.classList.remove('active')
    })
  }

  public openXLS() {
    let table = document.getElementById('trans-table')
    var workbook = xlsx.utils.table_to_book(table)
    var ws =  workbook.Sheets["Transacciones"];
    xlsx.utils.sheet_add_aoa(ws, [["Created "+ new Date().toISOString()]], {origin:-1});
    
    xlsx.writeFile(workbook, "Movimientos.csv")
  }

  public saveAsExcelFile(buffer: any, filename: string): void {
    let EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    let date = new Date().toISOString()
    this.filesaver.save(data, date+" "+filename+EXCEL_EXTENSION)
  }

}
