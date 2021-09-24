import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categ } from '../app-models';
import { AppService } from '../app.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  obj: Categ = new Categ()

  constructor(
    private service : AppService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.service.addCategory(this.obj).subscribe(
      res => {
        this.router.navigateByUrl('/category')

      }
    )
  }

}
