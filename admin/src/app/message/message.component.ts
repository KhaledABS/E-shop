import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  messages: any;

  constructor(
    private service: AppService
  ) { }

  ngOnInit(): void {
    this.service.getMessages().subscribe(
      res => {this.messages = res, console.log(res)}
    )
  }

}
