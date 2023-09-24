import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLiveMapPageComponent } from './view-live-map-page.component';

describe('ViewLiveMapPageComponent', () => {
  let component: ViewLiveMapPageComponent;
  let fixture: ComponentFixture<ViewLiveMapPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLiveMapPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLiveMapPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
