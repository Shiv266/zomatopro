import { Component, OnInit } from '@angular/core';
// cookie service 
import { CookieService } from 'ngx-cookie-service';
//// importing route related code
import { ActivatedRoute, Router } from '@angular/router';
//our App service
import { ZomatoService } from '../zomato.service';
// toaster
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  public geoPosition;
  public restaurants = 0;
  public RestaurantSearch = true;
  public LocationSearch = false;
  public noRestrauntsFound = false;
  public RestaurantName;
  public location = this.cookieService.get('cityname');
  public autoLocation = this.cookieService.get('cityname');


  constructor(private zomato: ZomatoService, private activatedRoute: ActivatedRoute, public router: Router, private cookieService: CookieService, private toastr: ToastrService) { }

  ngOnInit() {
    //Getting User current Longitude And Latitude
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.geoPosition = position
          // Calling Geocode method to get Long and Latitude
          this.zomato.Geocode(position.coords.latitude, position.coords.longitude).subscribe(
            (data) => {
              this.location = data.location.city_name;
              this.autoLocation = data.location.city_name;
              //Seeting cookie containing Cityname,EntityId,EntityType
              this.cookieService.set('cityname', data.location.city_name);
              this.cookieService.set('entityId', data.location.entityId);
              this.cookieService.set('entityType', data.location.entityType);
              //Getting Restaurant List Based on data
              this.zomato.restaurantList(data.location.entity_id, data.location.entity_type).subscribe(
                (data) => {
                  this.restaurants = data.best_rated_restaurant;
                },
                (error) => {
                  console.log(error);
                }
              )
            },
            (error) => {
              this.location = "Enter city";
              this.autoLocation = "Enter city";
            }
          )
        });
    }
  }
  //Changing The LOcation Of the User
  public changeLoc() {
    //Calling ChangeLocation Methode
    this.zomato.changeLocation(this.location).subscribe(
      (data) => {
        this.location = data.location_suggestions[0].city_name;
        this.autoLocation = this.location;
        this.LocationSearch = !this.LocationSearch;
        this.RestaurantSearch = !this.RestaurantSearch;
        //Seeting cookie containing Cityname,EntityId,EntityType
        this.cookieService.set('cityName', data.location_suggestions[0].city_name);
        this.cookieService.set('entityId', data.location_suggestions[0].entity_id);
        this.cookieService.set('entityType', data.location_suggestions[0].entity_type);
        this.zomato.restaurantList(this.cookieService.get('entityId'), this.cookieService.get('entityType')).subscribe(
          (data) => {
            console.log(data);
            this.restaurants = data.best_rated_restaurant.length;
            this.restaurants = data.best_rated_restaurant;
            console.log(this.restaurants);
          },
          (error) => {
            console.log("oops some error occured");
          }
        )
      },
      (error) => {
        console.log("oops some error occured");
      }
    )
  }
  //Searching Restaurants
  public searchRes() {
    //If Restaurant Name is Not Entered Then It will show error through toaster
    if (!this.RestaurantName) {
      this.toastr.warning("Enter Restaurant Name")
    }
    else {
      this.zomato.SearchRestaurants(this.cookieService.get('entityId'), this.cookieService.get('entityType'), this.RestaurantName).subscribe(
        (data) => {
          this.RestaurantName = "";
          this.restaurants = data.restaurants;
        },
        (error) => {
          console.log("Oops Some Error Occured")
        }
      )
    }
  }
  //Used when we want to search by restaurant or by location
  public toggle() {
    this.RestaurantSearch = !this.RestaurantSearch
    this.LocationSearch = !this.LocationSearch;
  }
  //Setting the current location
  public setCurrenLocation() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.geoPosition = position,
            //Getting LOngitude and Latitude
            this.zomato.Geocode(position.coords.latitude, position.coords.longitude).subscribe(
              (data) => {
                this.RestaurantSearch = !this.RestaurantSearch
                this.LocationSearch = !this.LocationSearch;
                this.location = data.location.city_name;
                this.autoLocation = data.location.city_name;
                this.cookieService.set('cityName', data.location.city_name);
                this.cookieService.set('entityId', data.location.entity_id);
                this.cookieService.set('entityType', data.location.entity_type);
                this.zomato.SearchRestaurants(this.cookieService.get('entityId'), this.cookieService.get('entityType'), this.RestaurantName).subscribe(
                  (data) => {
                    this.RestaurantName = "";
                    this.restaurants = data.restaurants;
                  },
                  (error) => {
                    console.log("oops some error occured");
                  }
                )
              },
              (error) => {
                this.location = "Enter city";
                this.autoLocation = "Enter city";
              }
            )
        }
      );
    };
    //Getting RestaurantLIst in the current location
    this.zomato.restaurantList(this.cookieService.get('entityId'), this.cookieService.get('entityType')).subscribe(
      (data) => {

        this.restaurants = data.best_rated_restaurant.length;
        this.restaurants = data.best_rated_restaurant;

      },
      (error) => {
        console.log("oops some error occured");
      }
    )
  }
}


