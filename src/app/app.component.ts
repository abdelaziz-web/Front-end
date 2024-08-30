import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { MtiComponent } from './mti/mti.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { AcquirerComponent } from './acquirer/acquirer.component';
import { TransaComponent } from './transa/transa.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent, MtiComponent, CommonModule,CardsComponent,AcquirerComponent,TransaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  showForm!: number;

constructor(private http:HttpClient){}


  ngOnInit(): void {
      this.showForm = 0 ;
  }

  handleChildData(data: any) {
    console.log('Data received from child:', data);
    this.showForm = data;
  }



  
}