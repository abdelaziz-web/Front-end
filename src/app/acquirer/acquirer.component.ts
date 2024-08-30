import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SendService } from '../send.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-acquirer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './acquirer.component.html',
  styleUrl: './acquirer.component.css'
})
export class AcquirerComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      merchantType: ['', [Validators.required, Validators.maxLength(4)]],
      acquirerCountryCode: ['', [Validators.required, Validators.maxLength(3)]],
      acquirerInstIdCode: ['', [Validators.required, Validators.maxLength(11)]],
      forwardInstIdCode: ['', [Validators.required, Validators.maxLength(11)]],
      cardAcceptorId: ['', [Validators.required, Validators.maxLength(15)]],
      cardAcceptorIdCode: ['', [Validators.required, Validators.maxLength(15)]],
      cardAcceptorNameLocation: ['', [Validators.required, Validators.maxLength(40)]],
      field56: [''], // This field is disabled in the HTML
 //     additionalPOSInfo: ['', [Validators.required, Validators.maxLength(12)]],
 //     customPayService: ['', Validators.required],
  //    vipPrivateUse: ['', [Validators.required, Validators.maxLength(26)]]
    });

    // Set current date and time for customPayService
    this.form.get('customPayService')?.setValue(new Date().toISOString().slice(0, 16));
  }




  onSubmit() {
    if (this.form.valid) {
      
      const acq = this.form.value;

      const requestData = {
        acq: [
          {
            values: acq
          }
        ]
      };
       
       
      console.log('Data successfully sent:', acq);

     this.http.post('http://localhost:8000/Acq', requestData).subscribe({
       next: (response: any) => {
         console.log('Data successfully sent:', response);
      
       },
       error: (error: any) => {
         console.error('Error sending data:', error);
         if (error.error instanceof ErrorEvent) {
           console.error('Client-side error:', error.error.message);
         } else {
           console.error(`Server-side error: ${error.status} ${error.statusText}`);
           console.error('Error body:', error.error);
         }
       }
     });
    } else {
      console.log('Form is invalid');
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        control?.markAsTouched();
      });
    }
  }





  fillWithSampleData() {
    this.form.patchValue({
      merchantType: '5814',
      acquirerCountryCode: '528',
      acquirerInstIdCode: '498750',
      forwardInstIdCode: '498750',
      cardAcceptorId: '12618655',
      cardAcceptorIdCode: '498750003486694',
      cardAcceptorNameLocation: 'FOOD SOCIETY PARIS*PARIS*FR',
   //   additionalPOSInfo: '123456789012',
   //   customPayService: new Date().toISOString().slice(0, 16),
   //   vipPrivateUse: 'VIP1234567890'
    });
  } 



}
