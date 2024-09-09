import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-can0400',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './can0400.component.html',
  styleUrl: './can0400.component.css'
})
export class Can0400Component implements OnInit {
  iso8583Form!: FormGroup;
  receivedData: any;
  Field_38: any ;
  displayForm !: number;
 canceldata !: any;
 hexFormatData0 !: String;
 hexFormatData1 !: String;

 
  constructor(private dataService: DataService, private fb: FormBuilder, private http: HttpClient) {
    this.initForm();
  }

  ngOnInit() {
    this.displayForm = 0 ;
    this.fetchDataAndFillForm();
  }

  fetchDataAndFillForm() {
    this.receivedData = this.dataService.getData();
    if (this.receivedData) {
      console.log("Received data:", this.receivedData);
      console.log("38 data:", this.receivedData.response?.[0]?.[38]);
    
      this.fillFormAutomatically();
    } else {
      console.log("No data received");
    }
  }

  initForm() {
    this.iso8583Form = this.fb.group({
      Id: [''],
      mti: ['0400', Validators.required],
      pan_2: ['', Validators.required],
      processingCode_3: ['', Validators.required],
      transactionAmount_4: ['', Validators.required],
      billingAmount_6: ['', Validators.required],
      transmissionDateTime_7: ['', Validators.required],
      billingConversionRate_10: ['', Validators.required],
      systemTraceAuditNumber_11: ['', Validators.required],
      cardExpiration_14: ['', Validators.required],
      merchantType_18: ['', Validators.required],
      acquirerCountryCode_19: ['', Validators.required],
      posEntryMode_22: ['', Validators.required],
      posConditionCode_25: ['', Validators.required],
      acquirerInstIdCode_32: ['', Validators.required],
      retrievalReferenceCode_37: ['', Validators.required],
      Authorization_Id_Resp_38: ['', /*Validators.required */],
      cardAcceptorId_41: ['', Validators.required],
      cardAcceptorIdCode_42: ['', Validators.required],
      cardAcceptorNameLocation_43: ['', Validators.required],
      transactionCurrencyCode_49: ['', Validators.required],
      billingCurrencyCode_51: ['', Validators.required],
      jsonData: ['']
    });
  }


  fillFormAutomatically() {
    if (this.receivedData && this.iso8583Form) {
      const autoFillData: any = {
        mti: '0400',
        transmissionDateTime_7: this.generateTransmissionDateTime(),      };

      // Extract data from nested structure
      const acqData = this.receivedData.acq?.[0]?.values;
      const cardsData = this.receivedData.cards?.[0]?.values;
      const transacData = this.receivedData.transac?.[0]?.values;
      const mtiData = this.receivedData.mti?.[0];

      // Map fields from nested structure
      const fieldMapping = {
        pan_2: cardsData?.pan,
        processingCode_3: transacData?.processingCode,
        transactionAmount_4: transacData?.transactionAmount,
        billingAmount_6: transacData?.billingAmount,
        billingConversionRate_10: transacData?.billingConversionRate,
        systemTraceAuditNumber_11: transacData?.systemTraceAuditNumber,
        cardExpiration_14: cardsData?.cardExpiration,
        merchantType_18: acqData?.merchantType,
        acquirerCountryCode_19: acqData?.acquirerCountryCode,
        posEntryMode_22: transacData?.posEntryMode,
        posConditionCode_25: transacData?.posConditionCode,
        acquirerInstIdCode_32: acqData?.acquirerInstIdCode,
        retrievalReferenceCode_37: transacData?.retrievalReferenceCode,
        Authorization_Id_Resp_38: this.receivedData.response?.[0]?.[38],
        cardAcceptorId_41: acqData?.cardAcceptorId,
        cardAcceptorIdCode_42: acqData?.cardAcceptorIdCode,
        cardAcceptorNameLocation_43: acqData?.cardAcceptorNameLocation,
        transactionCurrencyCode_49: transacData?.transactionCurrencyCode,
        billingCurrencyCode_51: transacData?.billingCurrencyCode
      };

      // Populate autoFillData with mapped fields
      Object.entries(fieldMapping).forEach(([key, value]) => {
        if (value !== undefined) {
          autoFillData[key] = value;
        }
      });

      console.log('Auto-fill data:', autoFillData);
      this.iso8583Form.patchValue(autoFillData);

      // Set jsonData field with stringified receivedData
      this.iso8583Form.patchValue({ jsonData: JSON.stringify(this.receivedData) });
    } else {
      console.error('Form or received data is not initialized');
    }
  }

  generateTransmissionDateTime(): string {
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${month}${day}${hours}${minutes}${seconds}`;
  }



  getObjectEntries(obj: any): [string, any][] {
    return Object.entries(obj || {});
  }

  onSubmit() {
    if (this.iso8583Form.valid) {
      const formData = this.iso8583Form.value;
      console.log('Form submitted:', formData);
      
      this.http.post('http://localhost:8000/cancel/submit', formData).subscribe({
        next: (response: any) => {
          console.log('Data successfully sent:', response);
          this.canceldata = {
            request: formData,
            response: response
          };

        delete  this.canceldata.request.jsonData ;

          this.displayForm = 1;
          console.log(this.canceldata.request)
        },
        error: (error: any) => {
          console.error('Error sending data:', error);
          if (error.error instanceof ErrorEvent) {
            console.error('Client-side error:', error.error.message);
          } else if (error.status === 0 && error.statusText === "Unknown Error") {
            console.error('Server not responding or CORS issue');
          } else {
            console.error(`Server-side error: ${error.status} ${error.statusText}`);
            console.error('Error body:', error.error);
          }
        }
      });

    } else {
      console.log('Form is invalid');
    }
  }

  onReset() {
    this.iso8583Form.reset();
    this.iso8583Form.patchValue({ mti: '0400' });
  }

  submitCancellation() {
    console.log('Submitting cancellation request...');
    
    this.http.post('http://localhost:8000/cancel/gethexformat', {}).subscribe({
      next: (response: any) => {
        console.log('Data successfully sent:', response);
        if (response.hex0400 && response.hex0410) {
          console.log('Hex0400:', response.hex0400);
          console.log('Hex0410:', response.hex0410);
          this.hexFormatData0 = response.hex0400 ;
          this.hexFormatData1 = response.hex0410 ;
        } else {
          console.warn('Response does not contain expected hex values:', response);
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error sending data:', error);
        if (error.error instanceof ErrorEvent) {
          console.error('Client-side error:', error.error.message);
        } else {
          console.error(`Server-side error: ${error.status} ${error.statusText}`);
          console.error('Error body:', error.error);
        }
      }
    });
  }



}