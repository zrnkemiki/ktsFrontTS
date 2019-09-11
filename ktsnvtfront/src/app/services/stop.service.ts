import { Injectable } from '@angular/core';
import { Stop } from '../model/stop';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class StopService {

  private stopUrl = "http://localhost:8080/api/stajaliste";
  private stopsSource = new BehaviorSubject<Stop[]>([]);
  stopsObservable = this.stopsSource.asObservable();
  private stops = [];

  constructor(private http: HttpClient) { }

  findAll() {
    this.http.get<Stop[]>(this.stopUrl)
      .subscribe(
        stops => {
          this.stops = stops;
          this.stopsSource.next(this.stops);
        }
      );
  }

  getAll() {
    return this.http.get<Stop[]>(this.stopUrl);
  }

  addStop(stop: Stop) {
    this.http.post<Stop>(this.stopUrl, stop)
      .subscribe(
        addedStop => {
          this.stops.push(addedStop);
          this.stopsSource.next(this.stops);
          alert("Dodato stajalište " + stop.naziv + " na adresi " + stop.adresa + ".");
        }
      )
  }

  getStop(id) {
    return this.http.get<Stop>(this.stopUrl + "/" + id)
      .pipe(tap(
        stop => {
          for (var i = 0; i < this.stops.length; i++) {
            if (stop.id === this.stops[i].id) {
              this.stops[i] = stop;
              this.stopsSource.next(this.stops);
              return stop;
            }
          }
        })
      )
  }

  deleteStop(id) {
    this.http.delete<Stop>(this.stopUrl + "/" + id)
      .subscribe(
        response => {
          for (var i = 0; i < this.stops.length; i++) {
            if (id === this.stops[i].id) {
              this.stops.splice(i, 1);
              this.stopsSource.next(this.stops);
              return;
            }
          }
        },
        error => { alert(error.message) }
      )
  }

  editStop(stop: Stop) {
    this.http.put<Stop>(this.stopUrl, stop)
      .subscribe(
        editedStop => {
          for (var i = 0; i < this.stops.length; i++) {
            if (editedStop.id === this.stops[i].id) {
              this.stops[i] = editedStop;
              this.stopsSource.next(this.stops);
              return;
            }
          }
        });
  }
}
