import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../app-models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  show: boolean
  user:User = new User()
  
  constructor(
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    if (this.user.email == "admin@admin.tn" && this.user.password == "admin") {
      this.router.navigateByUrl('/orders');
      this.show = false
    } else {
      this.show = true
    }
  }

}
