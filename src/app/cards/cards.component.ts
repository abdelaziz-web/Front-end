import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup ,ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SendService } from '../send.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {

  @Output() value = new EventEmitter<number>();

  form!: FormGroup;

  carddata : any ;

  constructor(private fb: FormBuilder , private http: HttpClient) {}

  ngOnInit() {
    this.form = this.fb.group({
      pan: ['', [Validators.required, Validators.minLength(16)]],
      cardExpiration: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cardSequence: ['', [Validators.required, Validators.min(1), Validators.max(999)]],
      track2: ['', [Validators.required, Validators.maxLength(37)]],
     // emvTagData: ['', Validators.required]
    });
  }



  sendDataToapp() {
    this.value.emit(2);
  }


  onSubmit() {
  
    if (this.form.valid) {
      
       this.carddata = this.form.value;

       this.carddata.cardExpiration = this.carddata.cardExpiration.replace('/', '');


       const requestData = {
        cards: [
          {
            values: this.carddata
          }
        ]
      };

       console.log('Data successfully sent:', this.carddata);

      this.http.post('http://localhost:8000/auth/cards', requestData).subscribe({
        next: (response: any) => {
          console.log('Data successfully sent:', response);
          this.sendDataToapp();
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

  




  fillWithSampleData() {
    this.form.patchValue({
      pan: '0123456789012345',
      cardExpiration: '02/31',
      cardSequence: 1,
      track2: '123456',
     // emvTagData: '9F260828BD080FB4279F10120110A04003220000000000000000FF9F3704F516B0B2'
    });

  }



}
