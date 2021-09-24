import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from '../app-models';
import { AppService } from '../app.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  user: Utilisateur = new Utilisateur()

  constructor(
    private service :AppService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  signup() {
    this.service.signup(this.user).subscribe(
      res => {
        this.router.navigateByUrl('/intro')
      }

    )

  }

}
