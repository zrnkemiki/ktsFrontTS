import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../model/vehicle';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router'
import { VehicleService } from '../services/vehicle.service';
import { LoginService } from '../services/login.service';
import { User } from '../model/user';

@Component({
  selector: 'app-vehicle-sed',
  templateUrl: './vehicle-sed.component.html',
  styleUrls: ['./vehicle-sed.component.css']
})
export class VehicleSEDComponent implements OnInit {

  public vehicles: Vehicle[];

  private currentUserEmail: string;
  private currentUserUsername: string;
  private currentUserType: string;

  private applicationAdministrator: string;
  private applicationEmployee: string;
  private registeredUser: string;


  constructor(
    private router: Router,
    private vehicleService: VehicleService,
    private loginService: LoginService,
  ) {
  }

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

    this.vehicles = [];

    if (this.router.url === "/vehicleSED") {
      this.getVehicles();
    }
  }

  addVehicle() {
    this.router.navigate(["/add-vehicle"]);
  }

  searchVehicleModel(searchParam) {
    this.vehicleService.vehiclesObservable.subscribe(vehicles => this.vehicles = vehicles);
    this.vehicleService.searchVehiclesModel(searchParam);
  }
  deleteVehicle(id) {
    this.vehicleService.deleteVehicle(id);

  }

  editVehicle(id) {
    this.router.navigate(["/edit-vehicle/" + id]);
  }
  getVehicles() {
    this.vehicleService.vehiclesObservable.subscribe(vehicles => this.vehicles = vehicles);
    this.vehicleService.findAll();
  }
}
