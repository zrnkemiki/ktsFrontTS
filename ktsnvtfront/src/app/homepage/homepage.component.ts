import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.router.navigate(["/registration"]);
  }

  login() {
    this.router.navigate(["/login"]);
  }

  dodajVozilo() {
    this.router.navigate(["/add-vehicle"]);
  }

  svaVozila() {
    this.router.navigate(["/vehicleSED"]);
  }

  dodajZaposlenog() {
    this.router.navigate(["/register-employee"]);
  }
}
