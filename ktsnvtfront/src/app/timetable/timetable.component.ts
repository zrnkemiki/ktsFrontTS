import { Component, OnInit } from '@angular/core';
import { Line } from '../model/line';
import { LineService } from '../services/line.service';
import { Stop } from '../model/stop';
import { Departure } from '../model/departure';
import { Router } from '@angular/router'

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})

export class TimetableComponent implements OnInit {

  public line: Line;
  public lines: Line[];
  public day: string;
  public departures = Array<Departure>();

  constructor(private lineService: LineService, private router: Router) { }

  ngOnInit() {
    this.line = { id: "", broj: "", naziv: "", stajalista: Array<Stop>(), polasci: Array<Departure>(), tip: "" };
    this.day = "";
    this.getLines();
  }

  getLines() {
    this.lineService.linesObservable.subscribe(lines => this.lines = lines);
    this.lineService.findAll();
  }

  search() {
    this.departures= Array<Departure>();
    this.lineService.getLine(this.line.id).subscribe(line => this.line = line);
    setTimeout(() => {
      this.line.polasci.forEach(departure => {
        if (departure.dan === this.day) {
          this.departures.push(departure);
        }
      });
    }, 300);
  }

  returnHome() {
    this.router.navigate(["/homepage"]);
  }

}
