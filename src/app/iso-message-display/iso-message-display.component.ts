import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IsoMessage {
  mti: any[];
  cards: any[];
  acq: any[];
  transac: any[];
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
  responseall:  any;
  response : any ;
  showHexFormat: boolean = false;
  hexreq !: String  ;
  hexres !: String ;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchCombinedResponse();
    this.getHexFormat() ;
  }

  fetchCombinedResponse() {
    const url = 'http://localhost:8000/combined-response';
    this.http.get<IsoMessage>(url).subscribe(
      (response) => {
        this.responseall = response;
        console.log('Response received:', this.responseall);
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

  
    const url = 'http://localhost:8000/hex';
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
    this.hexres = this.response.hexres  ;

   
  }


}