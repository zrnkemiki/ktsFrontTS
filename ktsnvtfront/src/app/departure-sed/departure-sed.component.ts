import { Component, OnInit } from '@angular/core';
import { Departure } from '../model/departure';
import { Router } from '@angular/router'
import { DepartureService } from '../services/departure.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-departure-sed',
  templateUrl: './departure-sed.component.html',
  styleUrls: ['./departure-sed.component.css']
})

export class DepartureSEDComponent implements OnInit {

  public departures: Departure[];
  private currentUserEmail: string;
  private currentUserUsername: string;
  private currentUserType: string;

  private applicationAdministrator: string;
  private applicationEmployee: string;
  private registeredUser: string;


  constructor(private router: Router, private departureService: DepartureService, private loginService: LoginService) { }

  ngOnInit() {
    if (localStorage.getItem('currentUser') != null) {
      const currentUser: any = this.loginService.currentUserValue;

      this.currentUserEmail = currentUser.email
      this.currentUserType = currentUser.userType
    }

    if (this.currentUserType == "ADMINISTRATOR") {
      this.applicationAdministrator = this.currentUserType;
    }
    else if (this.currentUserType == "EMPLOYEE") {
      this.applicationEmployee = this.currentUserType;
    }
    else {
      this.registeredUser = this.currentUserType;
    }

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
