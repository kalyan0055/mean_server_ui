import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitofmeasuersComponent } from './unitofmeasuers.component';

xdescribe('UnitofmeasuersComponent', () => {
  let component: UnitofmeasuersComponent;
  let fixture: ComponentFixture<UnitofmeasuersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitofmeasuersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitofmeasuersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
