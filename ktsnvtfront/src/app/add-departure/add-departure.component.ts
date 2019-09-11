import { Component, OnInit } from '@angular/core';
import { Departure } from '../model/departure';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router'
import { DepartureService } from '../services/departure.service';

@Component({
  selector: 'app-add-departure',
  templateUrl: './add-departure.component.html',
  styleUrls: ['./add-departure.component.css']
})

export class AddDepartureComponent implements OnInit {

  public departure: Departure;

  constructor(private departureService: DepartureService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) {
    this.departure = { id: "", dan: "", vreme: "" };
  }

  ngOnInit() {
    if (this.router.url != "/add-departure") {
      this.getEditDeparture();
    }
  }

  allDepartures() {
    this.router.navigate(["/departureSED"]);
  }

  getEditDeparture() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.departureService.getDeparture(id).subscribe(departure => this.departure = departure);
  }

  addDeparture() {
    if (this.departure.dan !== '' && this.departure.vreme !== '') {
      if (this.router.url != "/add-departure") {
        this.departureService.editDeparture(this.departure);
      }
      else {
        this.departureService.addDeparture(this.departure);
      }
      this.router.navigate(["/homepage"]);
    }
    else {
      this.toastr.error('Morate popuniti sva polja!');
    }
  }

  editDeparture() {
    if (this.departure.dan !== '' && this.departure.vreme !== '') {
      this.departureService.editDeparture(this.departure);
      this.allDepartures();
    }
    else {
      this.toastr.error('Morate popuniti sva polja!');
    }
  }

  returnHome() {
    this.router.navigate(["/homepage"]);
  }

}
