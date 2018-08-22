import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxgroupsComponent } from './taxgroups.component';

describe('TaxgroupsComponent', () => {
  let component: TaxgroupsComponent;
  let fixture: ComponentFixture<TaxgroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxgroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxgroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
