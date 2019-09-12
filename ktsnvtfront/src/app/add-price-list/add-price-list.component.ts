import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router'
import { PriceList } from '../model/priceList';
import { PriceListService } from '../services/price-list.service';

@Component({
  selector: 'app-add-price-list',
  templateUrl: './add-price-list.component.html',
  styleUrls: ['./add-price-list.component.css']
})
export class AddPriceListComponent implements OnInit {

  public priceList: PriceList;

  constructor(private priceListService: PriceListService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) {
    this.priceList = { id: "", datumOd: undefined, datumDo: undefined, tipKarte: "", cena: undefined, aktivan: "" };
  }

  ngOnInit() {
  }

  allStops() {
    this.router.navigate(["/priceListSED"]);
  }

  addPriceList() {
    if (this.priceList.datumOd !== undefined && this.priceList.datumDo !== undefined && this.priceList.tipKarte !== "" && this.priceList.cena !== undefined) {
      this.priceListService.addPriceList(this.priceList);
      this.router.navigate(["/homepage"]);
    }
    else {
      this.toastr.error('Morate popuniti sva polja!');
    }
  }
  returnHome() {
    this.router.navigate(["/homepage"]);
  }

}

