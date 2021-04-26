import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart.service';
import { AuthGuardService } from '../services/auth-guard.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) {}

  product;

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('idfood'));
    console.log(productIdFromRoute);
    let products = JSON.parse(window.localStorage.getItem('food'));

    // Find the product that correspond with the id provided in route.
    this.product = products.find(
      (product) => product.idfood === productIdFromRoute
    );
  }
  addToCart(product, value) {
    let token = localStorage.getItem('token');
    if (token) {
      value = (<HTMLInputElement>document.getElementById('input')).value;
      this.cartService.addToCart(product, value);
      console.log(product);
      window.alert('Your product has been added to the cart !');
    } else {
      this.router.navigate(['login']);
    }
  }
}
