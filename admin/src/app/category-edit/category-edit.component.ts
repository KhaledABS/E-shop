import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categ } from '../app-models';
import { AppService } from '../app.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  obj: Categ = new Categ()
  id: string;

  constructor(
    private service : AppService,
    private router : Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.getCategoryById(this.id).subscribe(
      res => this.obj = res
    )
  }

  onSubmit() {
    this.service.editCategory(this.id,this.obj).subscribe(
      res => {
        this.router.navigateByUrl('/category')
      }
    )
  }

}
