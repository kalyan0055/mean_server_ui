import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoiresComponent } from './subcategoires.component';

describe('SubcategoiresComponent', () => {
  let component: SubcategoiresComponent;
  let fixture: ComponentFixture<SubcategoiresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcategoiresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
