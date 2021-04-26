import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  myimage3: string = 'assets/images/img3.png';

  constructor() {}

  ngOnInit(): void {}
}
