import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalusersComponent } from './normalusers.component';

describe('NormalusersComponent', () => {
  let component: NormalusersComponent;
  let fixture: ComponentFixture<NormalusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormalusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
