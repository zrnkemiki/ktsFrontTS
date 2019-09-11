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

  public aplicationAdmin: User;
  public registeredUser: User;


  constructor(
    private http: HttpClient,
    private router: Router,
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private loginService: LoginService,
  ) {
  }

  ngOnInit() {
    const currentUser: User = this.loginService.currentUserValue;
    if (currentUser == null) {
      alert("Mozete pregledati vozila ali se morate registrovati odnosno ulogovati kako bi rezervisali.")
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
