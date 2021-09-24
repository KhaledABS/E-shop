import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: any;

  constructor(
    private service : AppService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.service.getProducts().subscribe(
      res => {
       this.products = res
      }
    )
  }

  onEdit(item) {
    this.router.navigateByUrl('/products/edit/' +item)
  }

  onDelete(item) {
    this.service.deleteProducts(item).subscribe(
      res => {
        this.service.getProducts().subscribe(
          res => {
           this.products = res
          }
        )
      }
    )
    
  }

  onAdd() {
    this.router.navigateByUrl('/products/add')
  }

}
