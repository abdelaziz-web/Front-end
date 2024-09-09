import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { MtiComponent } from './mti/mti.component';
import { CommonModule } from '@angular/common';
import { NavigationExtras, Router, RouterModule } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { AcquirerComponent } from './acquirer/acquirer.component';
import { TransaComponent } from './transa/transa.component';
import { HttpClient } from '@angular/common/http';
import { IsoMessageDisplayComponent } from "./iso-message-display/iso-message-display.component";
import { __makeTemplateObject } from 'tslib';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent, MtiComponent, CommonModule, CardsComponent, AcquirerComponent, TransaComponent, IsoMessageDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  showForm!: number;
  mti!:number;
  data!: any ;


constructor(private http:HttpClient, private router: Router,private dataService: DataService){}


  ngOnInit(): void {
      this.showForm = 0 ;
      this.router.navigate([]);
     
  }

  handleChildData(data: any) {
    console.log('Data received from child:', data);
    this.showForm = data;

    if(this.showForm == 400) {
      console.log("0400");
    
      this.router.navigate(['/cancellation']);
    }

  }

  receivingdata(data: any) {
    console.log('Data receiving from isochild:', data);
    this.data = data;


 /*   if (this.data && this.data.response) {
      delete this.data.response;
    }  */

    this.dataService.setData(data) ;

  }
  
}