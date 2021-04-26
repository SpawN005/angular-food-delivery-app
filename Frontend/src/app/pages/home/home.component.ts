import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  myimage1: string = 'assets/images/img1.png';
  myimage2: string = 'assets/images/img2.png';
  profile1: string = 'assets/images/profile-1.jpg';
  profile2: string = 'assets/images/profile-3.jpg';
  profile3: string = 'assets/images/profile-7.jpg';
  constructor() {}

  ngOnInit(): void {}
}
