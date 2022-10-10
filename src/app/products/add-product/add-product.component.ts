import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'; 
import { Product } from '../models/product.model';
import { ProductService } from '../services/product-service.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addProductForm = new FormGroup({

    id_producto : new FormControl(),
    nombre      : new FormControl(),
    precio      : new FormControl(),
    costo       : new FormControl(),
    cantidad    : new FormControl(),

  })

  product: Product = {
    id_producto : 0,
    nombre      : '',
    costo       : 0,
    precio      : 0,
    cantidad    : 0,
  }


  constructor(private apiRequest: ProductService) {
    
  }

  ngOnInit(): void {
  }
  
  onSubmit(){
    this.product = this.addProductForm.value
    console.warn(this.addProductForm.value);
    this.apiRequest.addProduct(this.product)

    console.log('cargado');
    
    
  }
}
