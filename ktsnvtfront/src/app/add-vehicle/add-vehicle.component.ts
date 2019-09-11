import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../model/vehicle';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router'
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  public vehicle: Vehicle;

  constructor(
    private vehicleService: VehicleService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.vehicle = { id: "", idTrenutnoStajaliste: "", linijaString: "", tip: "" };
  }

  ngOnInit() {
    if (this.router.url != "/add-vehicle") {
      this.getEditVehicle();
    }
  }

  getEditVehicle() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.vehicleService.getVehicle(id).subscribe(vehicle => this.vehicle = vehicle);
  }

  addVehicle() {
    if (this.vehicle.tip !== '') {
      if (this.router.url != "/add-vehicle") {
        this.vehicleService.editVehicle(this.vehicle);
      }
      else {
        this.vehicleService.addVehicle(this.vehicle);
      }
      this.router.navigate(["/homepage"]);

    }
    else {
      this.toastr.error('Morate uneti tip vozila!');
    }
  }

  editVehicle() {
    if (this.vehicle.tip !== '') {
      this.vehicleService.editVehicle(this.vehicle);
      this.allVehicles();
    }
    else {
      this.toastr.error('Morate uneti tip vozila!');
    }
  }

  allVehicles() {
    this.router.navigate(["/vehicleSED"]);
  }

}
