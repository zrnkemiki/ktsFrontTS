import { Component, OnInit } from '@angular/core';
import { Line } from '../model/line';
import { Router } from '@angular/router'
import { LineService } from '../services/line.service';

@Component({
  selector: 'app-line-sed',
  templateUrl: './line-sed.component.html',
  styleUrls: ['./line-sed.component.css']
})
export class LineSEDComponent implements OnInit {

  public lines: Line[];

  constructor(private router: Router, private lineService: LineService) { }

  ngOnInit() {
    this.lines = [];
    if (this.router.url === "/lineSED") {
      this.getLines();
    }
  }

  getLines() {
    this.lineService.linesObservable.subscribe(lines => this.lines = lines);
    this.lineService.findAll();
  }

  addLine() {
    this.router.navigate(["/add-line"]);
  }

  editLine(id) {
    this.router.navigate(["/edit-line/" + id]);
  }

  deleteLine(id) {
    this.lineService.deleteLine(id);
  }

  returnHome() {
    this.router.navigate(["/homepage"]);
  }

}
