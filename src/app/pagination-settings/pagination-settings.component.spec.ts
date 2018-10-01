import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationSettingsComponent } from './pagination-settings.component';

describe('PaginationSettingsComponent', () => {
  let component: PaginationSettingsComponent;
  let fixture: ComponentFixture<PaginationSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
