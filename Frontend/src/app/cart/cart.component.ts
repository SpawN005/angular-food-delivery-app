import { Component, OnInit } from '@angular/core';
import { CartService } from './../cart.service';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService, private http: HttpClient) {
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload');
      location.reload();
    } else {
      localStorage.removeItem('foo');
    }
  }
  items = this.cartService.getItems();
  items$: Observable<any[]>;
  deleteItem$ = new Subject<{ id: string }>();
  ngOnInit() {
    this.items$ = of(this.items).pipe(delay(0));
    combineLatest([this.items$, this.deleteItem$])
      .pipe(
        map(([items, deleteItem]) => {
          if (deleteItem) {
            let index = items.findIndex(
              (item: any) => item.id === deleteItem.id
            );
            if (index >= 0) {
              items.splice(index, 1);
            }
            return items;
          } else {
            items.concat(deleteItem);
          }
        })
      )
      .subscribe();
  }

  delete(item: any) {
    this.deleteItem$.next({ id: item.id });
    let param2 = new HttpParams()
      .set('foodid', item.foodid)
      .set('email', sessionStorage.getItem('email'));
    this.http
      .delete('http://127.0.0.1:8000/cart', { params: param2 })
      .toPromise()
      .then((data) => {
        console.log(data);
      });
  }
  Subtotal = [];
  total() {
    let param = new HttpParams().set('email', sessionStorage.getItem('email'));
    this.http
      .get('http://127.0.0.1:8000/mycart', { params: param })
      .toPromise()
      .then((data) => {
        for (let key in data) {
          if (data.hasOwnProperty(key)) this.Subtotal.push(data[key]);
        }
      });
  }
}
