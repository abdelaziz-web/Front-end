import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsoMessageDisplayComponent } from './iso-message-display.component';

describe('IsoMessageDisplayComponent', () => {
  let component: IsoMessageDisplayComponent;
  let fixture: ComponentFixture<IsoMessageDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IsoMessageDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IsoMessageDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
