import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


interface IsoMessage {
  mti: any[];
  cards: any[];
  acq: any[];
  transac: any[];
  response?: any[]; 
}

@Component({
  selector: 'app-iso-message-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './iso-message-display.component.html',
  styleUrls: ['./iso-message-display.component.css']
})
export class IsoMessageDisplayComponent implements OnInit {

  @Input() request: IsoMessage | undefined;
  responseall: IsoMessage | undefined;
  
 
  response : any ;
  showHexFormat: boolean = false;
  hexreq !: String  ;
  hexres !: String ;
  @Output() value = new EventEmitter<number>();

  @Output() dataEmitter = new EventEmitter<any>();

  constructor(private http: HttpClient) {}

  sendDataToapp() {
    this.value.emit(400);
  }

  ngOnInit() {
    this.fetchCombinedResponse();
    this.getHexFormat() ;
  }

  fetchCombinedResponse() {
    
    const url = 'http://localhost:8000/auth/combined-response';
    this.http.get<IsoMessage>(url).subscribe(
      (response) => {
        this.responseall = response;
        console.log('Response received:', this.responseall);

        // Create a  copy of the response
       const responseCopy = JSON.parse(JSON.stringify(response));

        this.dataEmitter.emit(responseCopy);

      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getObjectEntries(obj: any): [string, any][] {
    return Object.entries(obj);
  }

 
  toggleHexFormat() {
    this.showHexFormat = !this.showHexFormat;
      this.getHexFormat() ;
  }

  getHexFormat() {

  
    const url = 'http://localhost:8000/auth/hex';
     this.http.get<String>(url).subscribe(
      (response) => {
        this.response = response;
        console.log('Response received:', this.response);
        console.log("res" ,this.response.hexres );
        console.log("req" ,this.response.hexreq  );
        
      },
      (error) => {
        console.error('Error:', error);
      }
    );

    this.hexreq = this.response.hexreq ;
    this.hexres = this.response.hexres ;

  }

  cancellation() {

   this.sendDataToapp() ;
  
  }

}