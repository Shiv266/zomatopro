import { Injectable } from '@angular/core';
// importing http client to make the requests
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';

import { Router } from '@angular/router';
// import observable related code
import { Observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
// importing cookie
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ZomatoService {
  //url of API
  public baseUrl = 'https://developers.zomato.com/api/v2.1';

  constructor(private http: Http, public router: Router, private cookieService: CookieService) { }

  //Handling Errors
  handleErrors(error: Response) {
    console.log(error.json().message);
    this.router.navigate(['/ErrorpageComponent']);
    return Observable.throw(error);
  }
  // Getting Category of the restaurants in the city
  public getCategory() {
    return this.http.get(this.baseUrl + '/categories',
      { headers: this.getHeader() }).pipe(
        map(Response => Response.json())
        , catchError(this.handleErrors)

      );
  }
  // Finding Location with latitude and longitude
  public Geocode(latitude, longitude) {
    return this.http.get(this.baseUrl + '/geocode?lat=' + latitude + '&lon=' + longitude,
      { headers: this.getHeader() }).pipe(
        map(Response => Response.json())
        , tap(getdata =>
          console.log(getdata)
        )

      );
  }
  //changing the location of the user
  public changeLocation(data) {
    return this.http.get(this.baseUrl + '/locations?query=' + data,
      { headers: this.getHeader() }).pipe(map(Response => Response.json()),
        tap(getdata => console.log(getdata)
        ),
        catchError(this.handleErrors)
      );
  }
  //Searching restaurants
  public SearchRestaurants(entityId, entityType, restaurantName) {
    return this.http.get(this.baseUrl + '/search?entity_id=' + entityId + '&entity_type=' + entityType + '&q=' + restaurantName,
      { headers: this.getHeader() }).pipe(map(Response => Response.json()),
        tap((getdata) => console.log(getdata)
        ),
        catchError(this.handleErrors)
      );
  }
  // getting restaurants list in the location
  public restaurantList(entity_id, entity_type) {
    return this.http.get(this.baseUrl + '/location_details?entity_id=' + entity_id + '&entity_type=' + entity_type,
      { headers: this.getHeader() }).pipe(map(Response => Response.json()),
        tap((getdata) => console.log(getdata)),
        catchError(this.handleErrors)
      );

  }
  // getting restaurant detail
  public restaurantDetail(restaurantId) {
    return this.http.get(this.baseUrl + '/restaurant?res_id=' + restaurantId,
      { headers: this.getHeader() }).pipe(map(Response => Response.json()),
        tap((getdata) => console.log(getdata)),
        catchError(this.handleErrors)
      );
  }
  // getting restaurant review
  public restaurantReview(restaurantId) {
    return this.http.get(this.baseUrl + '/reviews?res_id=' + restaurantId,
      { headers: this.getHeader() }).pipe(map(Response => Response.json()),
        tap((getdata) => console.log(getdata)),
        catchError(this.handleErrors)
      );
  }
  // Header which is required with request
  getHeader() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('user-key', 'cde53cc465577ebe17405df5cd9f2035');
    return headers;

  }

}

