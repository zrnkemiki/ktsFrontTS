import { Injectable } from '@angular/core';
import { Departure } from '../model/departure';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DepartureService {

  private departureUrl = "http://localhost:8080/api/polazak";
  private departuresSource = new BehaviorSubject<Departure[]>([]);
  departuresObservable = this.departuresSource.asObservable();
  private departures = [];

  constructor(private http: HttpClient) { }

  findAll() {
    this.http.get<Departure[]>(this.departureUrl)
      .subscribe(
        departures => {
          this.departures = departures;
          this.departuresSource.next(this.departures);
        }
      );
  }

  getAll() {
    return this.http.get<Departure[]>(this.departureUrl);
  }

  addDeparture(departure: Departure) {
    this.http.post<Departure>(this.departureUrl, departure)
      .subscribe(
        addedDeparture => {
          this.departures.push(addedDeparture);
          this.departuresSource.next(this.departures);
          alert("Dodat polazak " + departure.dan + " " + departure.vreme + ".");
        }
      );
  }

  getDeparture(id) {
    return this.http.get<Departure>(this.departureUrl + "/" + id)
      .pipe(tap(
        departure => {
          for (var i = 0; i < this.departures.length; i++) {
            if (departure.id === this.departures[i].id) {
              this.departures[i] = departure;
              this.departuresSource.next(this.departures);
              return departure;
            }
          }
        })
      )
  }

  deleteDeparture(id) {
    this.http.delete<Departure>(this.departureUrl + "/" + id)
      .subscribe(
        response => {
          for (var i = 0; i < this.departures.length; i++) {
            if (id === this.departures[i].id) {
              this.departures.splice(i, 1);
              this.departuresSource.next(this.departures);
              return;
            }
          }
        },
        error => { alert(error.message) }
      )
  }

  editDeparture(departure: Departure) {
    this.http.put<Departure>(this.departureUrl, departure)
      .subscribe(
        editedDeparture => {
          for (var i = 0; i < this.departures.length; i++) {
            if (editedDeparture.id === this.departures[i].id) {
              this.departures[i] = editedDeparture;
              this.departuresSource.next(this.departures);
              return;
            }
          }
        });
  }
}
