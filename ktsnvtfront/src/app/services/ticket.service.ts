import { Injectable } from '@angular/core';
import { Ticket } from '../model/ticket';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private ticketUrl = "http://localhost:8080/api/karta";
  private ticketSource = new BehaviorSubject<Ticket[]>([]);
  ticketsObservable = this.ticketSource.asObservable();
  private tickets = [];

  constructor(private http: HttpClient) { }

  addTicket(ticket) {
    debugger;
    this.http.post<Ticket>(this.ticketUrl, ticket)
      .subscribe(
        addedTicket => {
          this.tickets.push(addedTicket);
          this.ticketSource.next(this.tickets);
          alert("Successfully added new Ticket. New " + ticket.tip + " ticket added.");
        }
      )
  }
}

