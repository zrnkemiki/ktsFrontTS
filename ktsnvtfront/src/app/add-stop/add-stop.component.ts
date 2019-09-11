import { Component, OnInit } from '@angular/core';
import { Stop } from '../model/stop';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router'
import { StopService } from '../services/stop.service';

@Component({
  selector: 'app-add-stop',
  templateUrl: './add-stop.component.html',
  styleUrls: ['./add-stop.component.css']
})

export class AddStopComponent implements OnInit {

  public stop: Stop;

  constructor(private stopService: StopService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) {
    this.stop = { id: "", naziv: "", lokacijaX: "", lokacijaY: "", adresa: "" };
  }

  ngOnInit() {
    if (this.router.url != "/add-stop") {
      this.getEditStop();
    }
  }

  allStops() {
    this.router.navigate(["/stopSED"]);
  }

  getEditStop() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.stopService.getStop(id).subscribe(stop => this.stop = stop);
  }

  addStop() {
    if (this.stop.naziv !== '' && this.stop.lokacijaX !== '' && this.stop.lokacijaY !== '' && this.stop.adresa !== '') {
      if (this.router.url != "/add-stop") {
        this.stopService.editStop(this.stop);
      }
      else {
        this.stopService.addStop(this.stop);
      }
      this.router.navigate(["/homepage"]);
    }
    else {
      this.toastr.error('Morate popuniti sva polja!');
    }
  }

  editStop() {
    if (this.stop.naziv !== '' && this.stop.lokacijaX !== '' && this.stop.lokacijaY !== '' && this.stop.adresa !== '') {
      this.stopService.editStop(this.stop);
      this.allStops();
    }
    else {
      this.toastr.error('Morate popuniti sva polja!');
    }
  }

  returnHome() {
    this.router.navigate(["/homepage"]);
  }

}
