import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../app-models';
import { AppService } from '../app.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  obj: Product = new Product()
  id: string;
  categs: any;

  constructor(
    private service : AppService,
    private router : Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.service.getCategory().subscribe(
      res => this.categs = res
    )
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.getProductsById(this.id).subscribe(
      res => this.obj = res
    )
  }

  onSubmit() {
    this.service.editProducts(this.id,this.obj).subscribe(
      res => {
        this.router.navigateByUrl('/products')
      }
    )
  }

}
