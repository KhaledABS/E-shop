import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../app-models';
import { AppService } from '../app.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  obj : Product = new Product()
  categs: any;

  constructor(
    private service : AppService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.getCategory().subscribe(
      res => this.categs = res
    )
  }

  onSubmit() {
    this.service.addProducts(this.obj).subscribe(
      res => this.router.navigateByUrl('products')
    )
  }

}
