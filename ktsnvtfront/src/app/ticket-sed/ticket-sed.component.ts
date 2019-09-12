import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../model/vehicle';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router'
import { VehicleService } from '../services/vehicle.service';
import { LoginService } from '../services/login.service';
import { User } from '../model/user';
import { Ticket } from '../model/ticket';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-ticket-sed',
  templateUrl: './ticket-sed.component.html',
  styleUrls: ['./ticket-sed.component.css']
})
export class TicketSedComponent implements OnInit {

  public tickets: Ticket[];



  constructor(
    private http: HttpClient,
    private router: Router,
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private loginService: LoginService,
  ) {
  }

  ngOnInit() {
    this.tickets = [];

    if (this.router.url === "/ticketSED") {
      this.getTickets();
    }
  }
  deleteTicket(id) {
    this.ticketService.deleteTicket(id);

  }

  activateTicket(id) {
    this.router.navigate(["/activate-ticket/" + id]);
  }

  getTickets() {
    this.ticketService.ticketsObservable.subscribe(tickets => this.tickets = tickets);
    this.ticketService.findUserTickets();
  }
}
