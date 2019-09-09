import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../model/vehicle';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { isNumber } from 'util';
import { BehaviorSubject } from 'rxjs';
import { Router, RouterLink, ActivatedRoute } from '@angular/router'
import { VehicleService } from '../services/vehicle.service';
import { LoginService } from '../services/login.service';
import { User } from '../model/user';;
//import { disableBindings } from '@angular/core/src/render3';

@Component({
  selector: 'app-vehicle-sed',
  templateUrl: './vehicle-sed.component.html',
  styleUrls: ['./vehicle-sed.component.css']
})
export class VehicleSEDComponent implements OnInit {

  public vehicles: Vehicle[];

  constructor(
    private http: HttpClient,
    private router: Router,
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private loginService: LoginService,
  ) {
  }

  ngOnInit() {
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
