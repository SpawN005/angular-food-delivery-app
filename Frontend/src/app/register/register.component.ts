import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}
  username: String;
  email: String;
  password: String;
  Add() {
    let url = 'http://127.0.0.1:8000/register';
    this.http
      .post(url, {
        username: this.username,
        email: this.email,
        password: this.password,
      })
      .toPromise()
      .then((data: any) => {
        console.log(data);
        if (data) this.router.navigate(['login']);
      });
  }
  ngOnInit(): void {}
}
