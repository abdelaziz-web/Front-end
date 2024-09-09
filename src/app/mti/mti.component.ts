import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SendService } from '../send.service';
import { HttpClient } from '@angular/common/http';

interface Option {
  value: string;
  label: string;
}

@Component({
  selector: 'app-mti',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './mti.component.html',
  styleUrls: ['./mti.component.css']
})
export class MtiComponent implements OnInit {
  form!: FormGroup;
  options!: Option[];


  @Output() value = new EventEmitter<number>();

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.form = this.fb.group({
      selectedOption: ['', Validators.required]
    });

    this.options = [
      { value: '0100', label: '0100' },
      { value: '0400', label: '0400' }
    ];

  }

  onSubmit() {
    
    if (this.form.valid) {
      const formData = this.form.value;

      const requestData = {
        mti: [
          {
            selectedOption: formData.selectedOption
          }
        ]
      };

      
      this.http.post('http://localhost:8000/auth/mti', requestData).subscribe({
        next: (response: any) => {
          console.log('Data successfully sent:', response);
          this.sendDataToapp();
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
    }
  }

  getFormValueString() {
    return JSON.stringify(this.form.value);
  }


  sendDataToapp() {
    this.value.emit(1);
  } 
  
 

} 