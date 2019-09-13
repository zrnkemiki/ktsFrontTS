import { Injectable } from '@angular/core';
import { Ticket } from '../model/ticket';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketService {


  private ticketUrl = "http://localhost:8080/api/karta";
  private ticketSource = new BehaviorSubject<Ticket[]>([]);
  ticketsObservable = this.ticketSource.asObservable();
  private tickets = [];

  constructor(private http: HttpClient) { }

  getTicketByUsername(username) {
    this.http.get<Ticket[]>(this.ticketUrl + "/getTicketByUserName/" + username)
      .subscribe(tickets => {
        this.tickets = tickets;
        this.ticketSource.next(this.tickets);
      });
  }

  addTicket(ticket) {
    this.http.post<Ticket>(this.ticketUrl, ticket)
      .subscribe(
        addedTicket => {
          this.tickets.push(addedTicket);
          this.ticketSource.next(this.tickets);
          alert("Successfully added new Ticket. New " + ticket.tip + " ticket added.");
        }
      )
  }

  findUserTickets() {
    this.http.get<Ticket[]>(this.ticketUrl)
      .subscribe(tickets => {
        this.tickets = tickets;
        this.ticketSource.next(this.tickets);
      });
  }

  findAll() {
    this.http.get<Ticket[]>(this.ticketUrl + "/all")
      .subscribe(tickets => {
        this.tickets = tickets;
        this.ticketSource.next(this.tickets);
      });
  }

  getTicket(id) {
    return this.http.get<Ticket>(this.ticketUrl + "/" + id)
      .pipe(tap(
        ticket => {
          for (var i = 0; i < this.tickets.length; i++) {
            if (ticket.id === this.tickets[i].id) {
              this.tickets[i] = ticket;
              this.ticketSource.next(this.tickets);
              return ticket;
            }
          }
        })
      )
  }

  activateTicket(ticket) {
    this.http.put<Ticket>(this.ticketUrl, ticket)
      .subscribe(editedTicket => {
        for (var i = 0; i < this.tickets.length; i++) {
          ;
          if (editedTicket.id === this.tickets[i].id) {
            this.tickets[i] = editedTicket;
            this.ticketSource.next(this.tickets);
            return;
          }
        }
      });
  }

  deleteTicket(id) {
    this.http.delete<Ticket>(this.ticketUrl + "/" + id)
      .subscribe(
        response => {
          for (var i = 0; i < this.tickets.length; i++) {
            if (id === this.tickets[i].id) {
              this.tickets.splice(i, 1);
              this.ticketSource.next(this.tickets);
              return;
            }
          }
        },
        error => { alert(error.message) }
      )
  }
}

