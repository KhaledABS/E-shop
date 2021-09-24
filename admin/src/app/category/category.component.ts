import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: any;

  constructor(
    private service:AppService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.service.getCategory().subscribe(
      res => {
        this.categories = res
      }
    )
  }

  onEdit(item) {
    this.router.navigateByUrl('/category/edit/'+item)
  }

  onDelete(item) {
    this.service.deleteCategory(item).subscribe(
      res => {
        this.service.getCategory().subscribe(
          res => {
            this.categories = res
          }
        )
      }
    )
  }

  onAdd() {
    this.router.navigateByUrl('/category/add')
  }

}
