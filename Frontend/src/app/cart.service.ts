import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  items = [];
  foodnom: string;
  foodid: number;
  quantity: number;
  price: number;
  email = sessionStorage.getItem('email');
  url = 'http://127.0.0.1:8000/cart';
  addToCart(product, value) {
    this.http
      .post(this.url, {
        foodnom: product.foodnom,
        foodid: product.idfood,
        quantity: Number(value),
        email: this.email,
        price: value * product.price,
      })
      .toPromise()
      .then((data: any) => {});
  }
  getItems() {
    this.items = [];
    let param1 = new HttpParams().set('email', this.email);
    this.http
      .get(this.url, { params: param1 })
      .toPromise()
      .then((data) => {
        console.log(data);
        for (let key in data) {
          if (data.hasOwnProperty(key)) this.items.push(data[key]);
        }
      });

    return this.items;
  }
  clearCart() {
    this.items = [];
    return this.items;
  }
}
