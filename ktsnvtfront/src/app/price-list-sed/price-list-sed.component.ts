import { Component, OnInit } from '@angular/core';
import { PriceList } from '../model/priceList';
import { Router } from '@angular/router'
import { PriceListService } from '../services/price-list.service';
;

@Component({
  selector: 'app-price-list-sed',
  templateUrl: './price-list-sed.component.html',
  styleUrls: ['./price-list-sed.component.css']
})
export class PriceListSEDComponent implements OnInit {


  public priceLists: PriceList[];


  constructor(
    private router: Router,
    private priceListService: PriceListService,
  ) {
  }

  ngOnInit() {
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
