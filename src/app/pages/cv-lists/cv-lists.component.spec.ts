import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvListsComponent } from './cv-lists.component';

describe('CvListsComponent', () => {
  let component: CvListsComponent;
  let fixture: ComponentFixture<CvListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvListsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
