import { Component, OnInit } from '@angular/core';
import { Ticket } from '../model/ticket';
import { TicketService } from '../services/ticket.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent implements OnInit {

  public ticket: Ticket;

  constructor(private ticketService: TicketService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) {
    this.ticket = { id: "", vaziDo: undefined, vaziOd: undefined, tip:"", cena: undefined, aktivirana:"", idVlasnik:""};
  }

  ngOnInit() {}

  allTickets() {
    this.router.navigate(["/ticketSED"]);
  }

  addTicket() {
    debugger;
    if (this.ticket.tip !== '' && this.ticket.vaziDo !== undefined && this.ticket.vaziOd) {
      if (this.router.url === "/add-ticket") {
        this.ticketService.addTicket(this.ticket);
      }
      this.router.navigate(["/homepage"]);
    }
    else {
      this.toastr.error('Morate popuniti sva polja!');
    }
  }


  returnHome() {
    this.router.navigate(["/homepage"]);
  }

}
