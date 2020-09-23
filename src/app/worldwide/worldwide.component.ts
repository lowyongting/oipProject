import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-worldwide',
  templateUrl: './worldwide.component.html',
  styleUrls: ['./worldwide.component.css']
})
export class WorldwideComponent implements OnInit {

  @ViewChild('tConfirm') p1Con: ElementRef;
  @ViewChild('tRecover') p2Rec: ElementRef;
  @ViewChild('tDeath') p3Dea: ElementRef;

  constructor() { 
  }

  ngOnInit(): void {
  }

  updateData(tCon:any, tRec:any, tDea:any) { 
    this.p1Con.nativeElement.innerHTML = tCon;
    this.p2Rec.nativeElement.innerHTML = tRec;
    this.p3Dea.nativeElement.innerHTML = tDea;

  }

}
