import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { MyBarChartComponent } from './my-bar-chart/my-bar-chart.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { WorldwideComponent } from './worldwide/worldwide.component';
import { MalaysiaComponent } from './malaysia/malaysia.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';


const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "/worldwide"},
  {path: "worldwide", component: WorldwideComponent},
  {path: "malaysia", component: MalaysiaComponent},
  {path: "worldwide", component: MyBarChartComponent},
  {path: "malaysia", component: PieChartComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    MyBarChartComponent,
    WorldwideComponent,
    MalaysiaComponent,
    PieChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
