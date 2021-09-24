import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from '../app-models';
import { AppService } from '../app.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  obj: Utilisateur = new Utilisateur()

  constructor(
    private service : AppService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.service.addUser(this.obj).subscribe(
      res => {
        this.router.navigateByUrl('/users')

      }
    )
  }

}