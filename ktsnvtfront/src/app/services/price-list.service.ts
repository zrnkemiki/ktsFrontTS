import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PriceList } from '../model/priceList';

@Injectable({
  providedIn: 'root'
})
export class PriceListService {

  private priceListUrl = "http://localhost:8080/api/cenovnik";
  private priceListSource = new BehaviorSubject<PriceList[]>([]);
  priceListObservable = this.priceListSource.asObservable();
  private priceLists = [];

  constructor(private http: HttpClient) { }

  findAll() {
    this.http.get<PriceList[]>(this.priceListUrl)
      .subscribe(
        priceLists => {
          this.priceLists = priceLists;
          this.priceListSource.next(this.priceLists);
        }
      );
  }

  addPriceList(priceList) {
    this.http.post<PriceList>(this.priceListUrl, priceList)
      .subscribe(
        addedPriceList => {
          this.priceLists.push(addedPriceList);
          this.priceListSource.next(this.priceLists);
          alert("Dodat novi cenovnik za " + priceList.tipKarte + " kartu, i datum od " + priceList.datumOd + ".");
        }
      )
  }


  deletePriceList(id) {
    this.http.delete<PriceList>(this.priceListUrl + "/" + id)
      .subscribe(
        () => {
          for (var i = 0; i < this.priceLists.length; i++) {
            if (id === this.priceLists[i].id) {
              this.priceLists.splice(i, 1);
              this.priceListSource.next(this.priceLists);
              return;
            }
          }
        },
        error => { alert(error.message) }
      )
  }
}