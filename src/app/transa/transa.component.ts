import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transa.component.html',
  styleUrls: ['./transa.component.css']
})
export class TransaComponent implements OnInit {
  @Output() value = new EventEmitter<number>();
  form!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      processingCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      transactionAmount: ['', [Validators.required, Validators.pattern(/^\d{1,12}$/)]],
      billingAmount: ['', [Validators.required, Validators.pattern(/^\d{1,12}$/)]],
      transmissionDateTime: [this.formatTransmissionDateTime(new Date()), Validators.required],
      billingConversionRate: ['', [Validators.required, Validators.pattern(/^\d{1,8}(\.\d{1,2})?$/)]],
      systemTraceAuditNumber: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      posEntryMode: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      posConditionCode: ['', [Validators.required, Validators.pattern(/^\d{2}$/)]],
      retrievalReferenceCode: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{12}$/)]],
      transactionCurrencyCode: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      billingCurrencyCode: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      // transactionDescription: ['', [Validators.required, Validators.maxLength(255)]]
    });
  }

  sendDataToApp() {
    this.value.emit(3);
  }

  onSubmit() {
    if (this.form.valid) {
      const transac = this.form.value;
      const requestData = {
        transac: [
          {
            values: transac
          }
        ]
      };

      console.log('Data successfully sent:', transac);
      this.http.post('http://localhost:8000/transac', requestData).subscribe({
        next: (response: any) => {
          console.log('Data successfully sent:', response);
          this.sendDataToApp();
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

  formatTransmissionDateTime(date: Date): string {
    const pad = (num: number) => num.toString().padStart(2, '0');
    return (
      pad(date.getMonth() + 1) +
      pad(date.getDate()) +
      pad(date.getHours()) +
      pad(date.getMinutes()) +
      pad(date.getSeconds())
    );
  }

  fillWithSampleData() {
    this.form.patchValue({
      processingCode: '000012',                    // Invalid: Should be 6 digits
      transactionAmount: '800',                // Valid
      billingAmount: '0000000875',             // Valid
      transmissionDateTime: this.formatTransmissionDateTime(new Date()), // Valid
      billingConversionRate: '61093750',           // Valid
      systemTraceAuditNumber: '146040',        // Valid
      posEntryMode: '0520',                    // Valid
      posConditionCode: '00',                  // Valid
      retrievalReferenceCode: '422615146040',  // Valid
      transactionCurrencyCode: '978',          // Valid
      billingCurrencyCode: '840',              // Valid
      transactionDescription: 'Purchase of goods at XYZ Store'
    });
  }
}