import { Component, OnInit } from '@angular/core';
import { Departure } from '../model/departure';
import { Router } from '@angular/router'
import { DepartureService } from '../services/departure.service';

@Component({
  selector: 'app-departure-sed',
  templateUrl: './departure-sed.component.html',
  styleUrls: ['./departure-sed.component.css']
})

export class DepartureSEDComponent implements OnInit {

  public departures: Departure[];

  constructor(private router: Router, private departureService: DepartureService) { }

  ngOnInit() {
    this.departures = [];
    if (this.router.url === "/departureSED") {
      this.getDepartures();
    }
  }

  getDepartures() {
    this.departureService.departuresObservable.subscribe(departures => this.departures = departures);
    this.departureService.findAll();
  }

  addDeparture() {
    this.router.navigate(["/add-departure"]);
  }

  editDeparture(id) {
    this.router.navigate(["/edit-departure/" + id]);
  }

  deleteDeparture(id) {
    this.departureService.deleteDeparture(id);
  }

  returnHome() {
    this.router.navigate(["/homepage"]);
  }

}
