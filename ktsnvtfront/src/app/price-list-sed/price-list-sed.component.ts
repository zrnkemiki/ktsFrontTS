import { Component, OnInit } from '@angular/core';
import { PriceList } from '../model/priceList';
import { Router } from '@angular/router'
import { PriceListService } from '../services/price-list.service';
import { LoginService } from '../services/login.service';
;

@Component({
  selector: 'app-price-list-sed',
  templateUrl: './price-list-sed.component.html',
  styleUrls: ['./price-list-sed.component.css']
})
export class PriceListSEDComponent implements OnInit {


  public priceLists: PriceList[];
  private currentUserEmail: string;
  private currentUserUsername: string;
  private currentUserType: string;

  private applicationAdministrator: string;
  private applicationEmployee: string;
  private registeredUser: string;


  constructor(
    private router: Router,
    private priceListService: PriceListService,    
    private loginService: LoginService,
  ) {
  }

  ngOnInit() {
    if (localStorage.getItem('currentUser') != null) {
      const currentUser: any = this.loginService.currentUserValue;

      this.currentUserEmail = currentUser.email
      this.currentUserType = currentUser.userType
    }

    if (this.currentUserType == "ADMINISTRATOR") {
      this.applicationAdministrator = this.currentUserType;
    }
    else if (this.currentUserType == "EMPLOYEE") {
      this.applicationEmployee = this.currentUserType;
    }
    else {
      this.registeredUser = this.currentUserType;
    }

    this.priceLists = [];

    if (this.router.url === "/priceListSED") {
      this.getPriceLists();
    }
  }

  deletePriceList(id) {
    this.priceListService.deletePriceList(id);

  }
  getPriceLists() {
    this.priceListService.priceListObservable.subscribe(priceLists => this.priceLists = priceLists);
    this.priceListService.findAll();
  }
}
