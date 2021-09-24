import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders:any
  
  constructor(
    private service:AppService
  ) { }

  ngOnInit(): void {
    this.service.getOrders().subscribe(
      res => {
        this.orders = res
      }
    )
  }

}
