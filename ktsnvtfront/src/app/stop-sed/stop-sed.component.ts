import { Component, OnInit } from '@angular/core';
import { Stop } from '../model/stop';
import { Router } from '@angular/router'
import { StopService } from '../services/stop.service';

@Component({
  selector: 'app-stop-sed',
  templateUrl: './stop-sed.component.html',
  styleUrls: ['./stop-sed.component.css']
})

export class StopSEDComponent implements OnInit {

  public stops: Stop[];

  constructor(private router: Router, private stopService: StopService) { }

  ngOnInit() {
    this.stops = [];
    if (this.router.url === "/stopSED") {
      this.getStops();
    }
  }

  getStops() {
    this.stopService.stopsObservable.subscribe(stops => this.stops = stops);
    this.stopService.findAll();
  }

  addStop() {
    this.router.navigate(["/add-stop"]);
  }

  editStop(id) {
    this.router.navigate(["/edit-stop/" + id]);
  }

  deleteStop(id) {
    this.stopService.deleteStop(id);
  }

  returnHome() {
    this.router.navigate(["/homepage"]);
  }

}
