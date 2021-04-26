import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CartService } from './../cart.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: string;
  constructor(
    public authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}
  cart: string = 'assets/images/shopping-bags.svg';
  ngOnInit(): void {}
  isLoggedIn() {
    if (this.authService.getToken() != null) {
      return false;
    } else {
      return true;
    }
  }
  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['home']);
  }
  public iscollapsed = true;
  logo: string = 'assets/images/logo.png';
}
