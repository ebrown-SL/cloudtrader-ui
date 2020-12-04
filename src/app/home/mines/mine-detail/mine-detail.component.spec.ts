import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineDetailComponent } from './mine-detail.component';

describe('MineDetailComponent', () => {
  let component: MineDetailComponent;
  let fixture: ComponentFixture<MineDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
