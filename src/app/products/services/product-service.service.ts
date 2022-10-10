import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  // agregar un producto a la base de datos
  addProduct(product: Product){
    console.log(product);
    const headers = new HttpHeaders({'exampleKey':'exampleValue'}) // aca definimos los headers, podemos pasar un token por ejemplo
    this.http.post<{name: string}>(
      'localhost:3000/products/new',
      product, {headers: headers}
    )
    .subscribe( (res)=> {
      console.log('Producto Cargado');
      
    } )
  }

  // obtener todos los productos
  getProducts(){

  }

  // borrar producto
  deleteProduct(){

  }

  //modificar producto
  modifyProduct(){

  }


}
