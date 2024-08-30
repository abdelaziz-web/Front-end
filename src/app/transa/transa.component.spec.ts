import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaComponent } from './transa.component';

describe('TransaComponent', () => {
  let component: TransaComponent;
  let fixture: ComponentFixture<TransaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
