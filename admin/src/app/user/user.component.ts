import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: any

  constructor(
    private service: AppService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.getUsers().subscribe(
      res => this.users = res
    )
  }

  onDelete(item) {
    this.service.deleteUser(item).subscribe(
      res => {
        this.service.getUsers().subscribe(
          res => {
           this.users = res
          }
        )
      }
    )
    
  }

  onAdd() {
    this.router.navigateByUrl('/users/add')
  }

}
