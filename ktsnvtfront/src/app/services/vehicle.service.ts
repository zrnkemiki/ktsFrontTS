import { Injectable } from '@angular/core';
import { Vehicle } from '../model/vehicle';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private vehicleUrl = "http://localhost:8080/api/vozilo";
  private vehiclesSource = new BehaviorSubject<Vehicle[]>([]);
  vehiclesObservable = this.vehiclesSource.asObservable();
  private vehicles = [];

  constructor(private http: HttpClient) { }

  addVehicle(vehicle) {
    this.http.post<Vehicle>(this.vehicleUrl, vehicle)
      .subscribe(
        addedVehicle => {
          this.vehicles.push(addedVehicle);
          this.vehiclesSource.next(this.vehicles);
          alert("Successfully added vehicle. New " + vehicle.lineNumber + " vehicle added.");
        }
      )
  }

  searchVehiclesModel(searchParam) {
    this.http.get<Vehicle[]>("http://localhost:8080/api/vehicle/getVehicleByModel/" + searchParam)
      .subscribe(vehicles => {
        this.vehicles = vehicles;
        this.vehiclesSource.next(this.vehicles);
      });
  }

  findVehiclesByHotelName(dateFrom, dateUntil, hotelName) {
    this.http.get<Vehicle[]>("http://localhost:8080/api/reservationRentaCar/getVehicleByDateAndHotelName" + "/" + dateFrom + "/" + dateUntil + "/" + hotelName)
      .subscribe(vehicles => {
        this.vehicles = vehicles;
        this.vehiclesSource.next(this.vehicles);
      });
  }

  getVehicle(id) {
    return this.http.get<Vehicle>(this.vehicleUrl + "/" + id)
      .pipe(tap(
        vehicle => {
          for (var i = 0; i < this.vehicles.length; i++) {
            if (vehicle.id === this.vehicles[i].id) {
              this.vehicles[i] = vehicle;
              this.vehiclesSource.next(this.vehicles);
              return vehicle;
            }
          }
        })
      )
  }

  deleteVehicle(id) {
    this.http.delete<Vehicle>(this.vehicleUrl + "/" + id)
      .subscribe(
        response => {
          for (var i = 0; i < this.vehicles.length; i++) {
            if (id === this.vehicles[i].id) {
              this.vehicles.splice(i, 1);
              this.vehiclesSource.next(this.vehicles);
              return;
            }
          }
        },
        error => { alert(error.message) }
      )
  }

  editVehicle(vehicle) {
    debugger;
    this.http.put<Vehicle>(this.vehicleUrl, vehicle)
      .subscribe(editedVehicle => {
        for (var i = 0; i < this.vehicles.length; i++) {
          ;
          if (editedVehicle.id === this.vehicles[i].id) {
            this.vehicles[i] = editedVehicle;
            this.vehiclesSource.next(this.vehicles);
            return;
          }
        }
      });
  }

  findAll() {
    this.http.get<Vehicle[]>(this.vehicleUrl)
      .subscribe(vehicles => {
        this.vehicles = vehicles;
        this.vehiclesSource.next(this.vehicles);
      });
  }



}
