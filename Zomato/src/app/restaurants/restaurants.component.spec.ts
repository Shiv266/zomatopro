import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantsComponent } from './restaurants.component';

describe('RestaurantListComponent', () => {
  let component: RestaurantsComponent;
  let fixture: ComponentFixture<RestaurantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
