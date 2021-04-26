import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  url = 'http://127.0.0.1:8000/food';
  products = [];
  constructor(private http: HttpClient) {
    this.http
      .get(this.url)
      .toPromise()
      .then((data) => {
        console.log(data);
        window.localStorage.setItem('food', JSON.stringify(data));
        for (let key in data) {
          if (data.hasOwnProperty(key)) this.products.push(data[key]);
        }
      });
  }
  readonly = true;
  ngOnInit(): void {}
}
