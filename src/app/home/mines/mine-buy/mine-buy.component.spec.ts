import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineBuyComponent } from './mine-buy.component';

describe('MineBuyComponent', () => {
  let component: MineBuyComponent;
  let fixture: ComponentFixture<MineBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MineBuyComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
