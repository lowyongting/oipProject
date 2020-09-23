import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //Get details per country
  urlLink1 = "https://api.oip.tmrnd.com.my/app/t/opendata.oip.tm.com.my/covid19/1.0.0/country";

  //Get the Number of Cases per State
  urlLink2 = "https://api.oip.tmrnd.com.my/app/t/opendata.oip.tm.com.my/covid19kkm/1.0.0/state";

  private token = "Bearer 0a275fe6-03dd-3ee4-9039-97ef4e17023a";

  constructor(private http: HttpClient) { }

  getCountryData() {
    return this.http.get(this.urlLink1, {headers:{
            Authorization:this.token}}).toPromise();
  }

  getPerStateData() {
    return this.http.get(this.urlLink2, {headers:{
            Authorization:this.token}}).toPromise();
  }
}
