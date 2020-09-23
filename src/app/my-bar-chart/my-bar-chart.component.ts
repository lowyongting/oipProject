import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DataService } from '../services/data.service';
import { WorldwideComponent } from '../worldwide/worldwide.component';

@Component({
  selector: 'app-my-bar-chart',
  templateUrl: './my-bar-chart.component.html',
  styleUrls: ['./my-bar-chart.component.css']
})
export class MyBarChartComponent implements OnInit {

  country: any;
  deaths: any;
  confirmed: any;
  recovered: any;
  selectedCountry: string;
  countryDeath: any;
  countryConfirmed: any;
  countryRecovered: any;
  worldwide: WorldwideComponent;
  
  constructor(private oip: DataService,worldwide:WorldwideComponent) {
    this.worldwide = worldwide;
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  ngOnInit() {
    this.populateChart();
  }

  populateChart() {
    this.oip.getCountryData().then(data => {
      this.country = Object.values(data).map(key => key.Country);
      this.deaths = Object.values(data).map(key => key.Deaths);
      this.confirmed = Object.values(data).map(key => key.Confirmed);
      this.recovered = Object.values(data).map(key => key.Recovered);
      let afgDeath:any, afgConfirm:any, afgRecover:any;

      for (var i = 0; i < 300; i++) {
        if (this.country[i] === "Afghanistan") {
          afgDeath = this.deaths[i];
          afgConfirm = this.confirmed[i];
          afgRecover = this.recovered[i];
        }
      }

      this.barChartLabels = ["Afghanistan"];
      this.barChartData = [
        { data: [afgConfirm], label: 'Confirmed', backgroundColor: 'Red', hoverBackgroundColor: 'Red'},
        { data: [afgRecover], label: 'Recovered', backgroundColor: 'lightGreen', hoverBackgroundColor: 'lightGreen'},
        { data: [afgDeath], label: 'Deaths', backgroundColor: 'Black', hoverBackgroundColor: 'Black'},
      ];
      this.worldwide.updateData(afgConfirm,afgRecover,afgDeath);

    }).catch(error => {
      console.log(error);
    })
  }

  showCountryBar(event: any) {
    this.selectedCountry = event.target.value;

    for (var i = 0; i < 300; i++) {
      if (this.country[i] === this.selectedCountry) {
        this.countryDeath = this.deaths[i];
        this.countryConfirmed = this.confirmed[i];
        this.countryRecovered = this.recovered[i];
      }
    }

    this.barChartLabels = [this.selectedCountry];
    this.barChartData = [
      { data: [this.countryConfirmed], label: 'Confirmed', backgroundColor: 'Red', hoverBackgroundColor: 'Red'},
      { data: [this.countryRecovered], label: 'Recovered', backgroundColor: 'lightGreen', hoverBackgroundColor: 'lightGreen'},
      { data: [this.countryDeath], label: 'Deaths', backgroundColor: 'Black', hoverBackgroundColor: 'Black'},
    ];

    this.worldwide.updateData(this.countryConfirmed,this.countryRecovered,this.countryDeath);
  }
}
