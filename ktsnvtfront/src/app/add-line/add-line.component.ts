import { Component, OnInit } from '@angular/core';
import { Line } from '../model/line';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router'
import { LineService } from '../services/line.service';
import { DepartureService } from '../services/departure.service';
import { StopService } from '../services/stop.service';
import { Stop } from '../model/stop';
import { Departure } from '../model/departure';

@Component({
  selector: 'app-add-line',
  templateUrl: './add-line.component.html',
  styleUrls: ['./add-line.component.css']
})

export class AddLineComponent implements OnInit {

  public line: Line;
  public stops = Array<Stop>();
  public stopsFields = Array<Number>();
  public departures = Array<Departure>();
  public departuresFields = Array<Number>();

  constructor(private lineService: LineService, private departureService: DepartureService, private stopService: StopService, 
      private toastr: ToastrService, private router: Router, private route: ActivatedRoute) { 
    this.line = { id: "", broj: "", naziv: "", stajalista: Array<Stop>(), polasci: Array<Departure>(), tip: "" };
  }

  ngOnInit() {
    this.getStopsAndDepartures();
    if (this.router.url != "/add-line") {
      this.getEditLine();
    } else {
      this.line.stajalista.push({ id: "", naziv: "", lokacijaX: "", lokacijaY: "", adresa: "" });
      this.line.polasci.push({ id: "", dan: "Radni dan", vreme: "" });
      this.stopsFields.push(1);
      this.departuresFields.push(1);
    }
  }

  allLines() {
    this.router.navigate(["/lineSED"]);
  }

  getEditLine() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.lineService.getLine(id).subscribe(line => {
      this.line = line;
      this.line.stajalista.forEach(stop => {
        this.stopsFields.push(+stop.id);
      });
      this.line.polasci.forEach(departure => {
        this.departuresFields.push(+departure.id);
      });
    });
  }

  getStopsAndDepartures() {
    this.stopService.getAll().subscribe(stops => this.stops = stops as Stop[]);
    this.departureService.getAll().subscribe(departures => this.departures = departures as Departure[]);
  }

  addLine() {
    if (this.line.broj !== '' && this.line.naziv !== '' && this.line.stajalista !== [] && this.line.polasci !== [] && this.line.tip !== '') {
      this.stopService.findAll();
      this.departureService.findAll();
      let temp = {"stops": [], "departures": []};

      this.stopsFields.forEach( (stopID, index) => {
        let id = (<HTMLSelectElement>document.getElementById('stop'+index)).value;
        this.stopService.getStop(id).subscribe(currentStop => {
          temp.stops.push(currentStop);
        });
      });
      this.departuresFields.forEach( (departureID, index) => {
        let id = (<HTMLSelectElement>document.getElementById('departure'+index)).value;
        this.departureService.getDeparture(id).subscribe(currentDeparture => {
          temp.departures.push(currentDeparture);
        });
      });

      setTimeout(() => {
        this.line.stajalista = temp.stops;
        this.line.polasci = temp.departures;
        if (this.router.url != "/add-line") {
          this.lineService.editLine(this.line);
        } else {
          this.lineService.addLine(this.line);
        }
        this.router.navigate(["/homepage"]);
      }, 500);
    }
    else {
      this.toastr.error('Morate popuniti sva polja!');
    }
  }

  editLine() {
    if (this.line.broj !== '' && this.line.naziv !== '' && this.line.stajalista !== [] && this.line.polasci !== [] && this.line.tip !== '') {
      this.lineService.editLine(this.line);
      this.allLines();
    }
    else {
      this.toastr.error('Morate popuniti sva polja!');
    }
  }

  addStopField() {
    this.line.stajalista.push({ id: "", naziv: "", lokacijaX: "", lokacijaY: "", adresa: "" });
    this.stopsFields.push(1);
  }

  addDepartureField() {
    this.line.polasci.push({ id: "", dan: "Radni dan", vreme: "" });
    this.departuresFields.push(1);
  }

  returnHome() {
    this.router.navigate(["/homepage"]);
  }

}
