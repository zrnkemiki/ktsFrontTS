import { Component, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-control',
  templateUrl: './ticket-control.component.html',
  styleUrls: ['./ticket-control.component.css']
})
export class TicketControlComponent implements OnInit {

  username: string;

  constructor(private ticketService: TicketService, private router: Router) { }

  ngOnInit() {
  }

  checkTicket(username){
    this.router.navigate(["/userTicketControl/" + username])
  }

  returnHome(){
    this.router.navigate(["/homepage"]);
  }
}
