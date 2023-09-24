import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLiveMapComponent } from './view-live-map.component';

describe('ViewLiveMapComponent', () => {
  let component: ViewLiveMapComponent;
  let fixture: ComponentFixture<ViewLiveMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLiveMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLiveMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
