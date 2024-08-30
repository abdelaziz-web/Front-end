import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquirerComponent } from './acquirer.component';

describe('AcquirerComponent', () => {
  let component: AcquirerComponent;
  let fixture: ComponentFixture<AcquirerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcquirerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcquirerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
