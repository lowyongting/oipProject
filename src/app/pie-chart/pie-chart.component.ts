import { ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, defaultColors } from 'ng2-charts';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})

export class PieChartComponent implements OnInit {

  date:any;
  perlis: any;
  kedah: any;
  pinang: any;
  perak: any;
  selangor: any;
  sembilan: any;
  melaka: any;
  johor: any;
  pahang: any;
  tereng: any;
  kelantan: any;
  sabah: any;
  sarawak: any;
  search:string;
  @ViewChild('date') d: ElementRef;

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors = [];

  constructor(private oip: DataService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.populateChart();
  }

  populateChart() {
    this.oip.getPerStateData().then(data1 => {
      this.date = Object.values(data1).map(key => key.Date);
      this.perlis = Object.values(data1).map(key => key.Perlis);
      this.kedah = Object.values(data1).map(key => key.Kedah);
      this.pinang = Object.values(data1).map(key => key["Pulau Pinang"]);
      this.perak = Object.values(data1).map(key => key.Perak);
      this.selangor = Object.values(data1).map(key => key.Selangor);
      this.sembilan = Object.values(data1).map(key => key["Negeri Sembilan"]);
      this.melaka = Object.values(data1).map(key => key.Melaka);
      this.johor = Object.values(data1).map(key => key.Johor);
      this.pahang = Object.values(data1).map(key => key.Pahang);
      this.tereng = Object.values(data1).map(key => key.Terengganu);
      this.kelantan = Object.values(data1).map(key => key.Kelantan);
      this.sabah = Object.values(data1).map(key => key.Sabah);
      this.sarawak = Object.values(data1).map(key => key.Sarawak);
      let pe,ke,pi,per,se,sem,me,jo,pa,te,kel,sab,sara;

      for (var i = 0; i < 130; i++) {
        if (this.date[i] === '2020-04-03') {
          pe = this.perlis[i];
          ke = this.kedah[i];
          pi = this.pinang[i];
          per = this.perak[i];
          se = this.selangor[i];
          sem = this.sembilan[i];
          me = this.melaka[i];
          jo = this.johor[i];
          pa = this.pahang[i];
          te = this.tereng[i];
          kel = this.kelantan[i];
          sab = this.sabah[i];
          sara = this.sarawak[i];
        }
      }
      this.pieChartLabels = ['Perlis', 'Kedah', 'Pulau Pinang', 'Perak', 'Selangor', 'Negeri Sembilan', 'Melaka', 
                              'Johor', 'Pahang', 'Terengganu', 'Kelantan', 'Sabah', 'Sarawak'];
        this.pieChartData = [pe,ke,pi,per,se,sem,me,jo,pa,te,kel,sab,sara];
        this.pieChartColors = [
          {backgroundColor:['green', 'yellow', 'blue', 'coffee', 'purple', 'red', 'aqua', 'lime', 'maroon', 'pink', 'orange', 'teal', 'golden']}
        ];

    }).catch(error => {
      console.log(error);
    })
  }

  onSubmit(event:any) {
    this.search = event.target.searchDate.value;
    let pe,ke,pi,per,se,sem,me,jo,pa,te,kel,sab,sara;

      for (var i = 0; i < 130; i++) {
        if (this.date[i] === this.search) {
          pe = this.perlis[i];
          ke = this.kedah[i];
          pi = this.pinang[i];
          per = this.perak[i];
          se = this.selangor[i];
          sem = this.sembilan[i];
          me = this.melaka[i];
          jo = this.johor[i];
          pa = this.pahang[i];
          te = this.tereng[i];
          kel = this.kelantan[i];
          sab = this.sabah[i];
          sara = this.sarawak[i];
        }
      }
      this.pieChartLabels = ['Perlis', 'Kedah', 'Pulau Pinang', 'Perak', 'Selangor', 'Negeri Sembilan', 'Melaka', 
                              'Johor', 'Pahang', 'Terengganu', 'Kelantan', 'Sabah', 'Sarawak'];
        this.pieChartData = [pe,ke,pi,per,se,sem,me,jo,pa,te,kel,sab,sara];
        this.pieChartColors = [
          {backgroundColor:['green', 'yellow', 'blue', 'coffee', 'purple', 'red', 'aqua', 'lime', 'maroon', 'pink', 'orange', 'teal', 'golden']}
        ];
        this.d.nativeElement.innerHTML = this.search;
  }
  // this.pieChartData = [this.perlis[51],this.kedah[51],this.pinang[51],this.perak[51],this.selangor[51],this.sembilan[51],this.melaka[51],this.johor[51],this.pahang[51],this.tereng[51],this.kelantan[51],this.sabah[51],this.sarawak[51]];
  // this.pieChartData = [pe,ke,pi,per,se,sem,me,jo,pe,te,kel,sab,sara];
}
