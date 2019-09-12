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
  public stop: Stop;
  public departure: Departure;
  public stopsFields = { fields: Array<Stop>() };
  public departuresFields = { fields: Array<Departure>() };
  public stops = Array<Stop>();
  public departures = Array<Departure>();

  constructor(private lineService: LineService, private departureService: DepartureService, private stopService: StopService, 
      private toastr: ToastrService, private router: Router, private route: ActivatedRoute) { 
    this.line = { id: "", broj: "", naziv: "", stajalista: Array<Stop>(), polasci: Array<Departure>(), tip: "" };
  }

  ngOnInit() {
    this.getStopsAndDepartures();
    if (this.router.url != "/add-line") {
      this.getEditLine();
    } else {
      this.stopsFields.fields.push({ id: "", naziv: "", lokacijaX: "", lokacijaY: "", adresa: "" });
      this.departuresFields.fields.push({ id: "", dan: "", vreme: "" });
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
        this.stopsFields.fields.push(stop);
      });
      this.line.polasci.forEach(departure => {
        this.departuresFields.fields.push(departure);
      });
    });
  }

  getStopsAndDepartures() {
    this.stopService.getAll().subscribe(stops => this.stops = stops as Stop[]);
    this.departureService.getAll().subscribe(departures => this.departures = departures as Departure[]);
  }

  addLine() {
    if (this.line.broj !== '' && this.line.naziv !== '' && this.line.stajalista !== [] && this.line.polasci !== [] && this.line.tip !== '') {
      if (this.router.url != "/add-line") {
        this.stopService.findAll();
        this.departureService.findAll();
        let temp = {"stops": [], "departures": []};
        this.stopsFields.fields.forEach(stopID => {
          this.stopService.getStop(stopID).subscribe(currentStop => { 
            this.stop = currentStop;
            temp.stops.push(this.stop);
          });
        });
        this.departuresFields.fields.forEach(departureID => {
          this.departureService.getDeparture(departureID).subscribe(currentDeparture => { 
            this.departure = currentDeparture;
            temp.departures.push(this.departure);
          });
        });
        setTimeout(() => {
          this.line.stajalista = temp.stops;
          this.line.polasci = temp.departures;
          this.lineService.editLine(this.line);
        }, 500);
      }
      else {
        this.stopService.findAll();
        this.departureService.findAll();
        let temp = {"stops": [], "departures": []};
        this.stopsFields.fields.forEach(stopID => {
          this.stopService.getStop(stopID).subscribe(currentStop => { 
            this.stop = currentStop;
            temp.stops.push(this.stop);
          });
        });
        this.departuresFields.fields.forEach(departureID => {
          this.departureService.getDeparture(departureID).subscribe(currentDeparture => { 
            this.departure = currentDeparture;
            temp.departures.push(this.departure);
          });
        });
        setTimeout(() => {
          this.line.stajalista = temp.stops;
          this.line.polasci = temp.departures;
          this.lineService.addLine(this.line);
        }, 500);
      }
      console.log(this.line);
      this.router.navigate(["/homepage"]);
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
    this.stopsFields.fields.push({ id: "", naziv: "", lokacijaX: "", lokacijaY: "", adresa: "" });
  }

  addDepartureField() {
    this.departuresFields.fields.push({ id: "", dan: "", vreme: "" });
  }

  returnHome() {
    this.router.navigate(["/homepage"]);
  }

}
