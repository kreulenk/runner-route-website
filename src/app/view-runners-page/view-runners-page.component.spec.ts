import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRunnersPageComponent } from './view-runners-page.component';

describe('ViewRunnersPageComponent', () => {
  let component: ViewRunnersPageComponent;
  let fixture: ComponentFixture<ViewRunnersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRunnersPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRunnersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
