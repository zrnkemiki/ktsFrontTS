import { Component, OnInit } from '@angular/core';
import { Stop } from '../model/stop';
import { Router } from '@angular/router'
import { StopService } from '../services/stop.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-stop-sed',
  templateUrl: './stop-sed.component.html',
  styleUrls: ['./stop-sed.component.css']
})

export class StopSEDComponent implements OnInit {

  public stops: Stop[];

  private currentUserEmail: string;
  private currentUserUsername: string;
  private currentUserType: string;

  private applicationAdministrator: string;
  private applicationEmployee: string;
  private registeredUser: string;

  constructor(private router: Router, private stopService: StopService, private loginService: LoginService) { }

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

    this.stops = [];
    if (this.router.url === "/stopSED") {
      this.getStops();
    }
  }

  getStops() {
    this.stopService.stopsObservable.subscribe(stops => this.stops = stops);
    this.stopService.findAll();
  }

  addStop() {
    this.router.navigate(["/add-stop"]);
  }

  editStop(id) {
    this.router.navigate(["/edit-stop/" + id]);
  }

  deleteStop(id) {
    this.stopService.deleteStop(id);
  }

  returnHome() {
    this.router.navigate(["/homepage"]);
  }

}
