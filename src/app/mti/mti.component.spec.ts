import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtiComponent } from './mti.component';

describe('MtiComponent', () => {
  let component: MtiComponent;
  let fixture: ComponentFixture<MtiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MtiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MtiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
