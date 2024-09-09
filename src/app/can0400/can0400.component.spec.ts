import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Can0400Component } from './can0400.component';

describe('Can0400Component', () => {
  let component: Can0400Component;
  let fixture: ComponentFixture<Can0400Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Can0400Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Can0400Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
