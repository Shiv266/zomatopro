import { Component, OnInit } from '@angular/core';
//Route related code to get restaurant id
import { ActivatedRoute, Router } from '@angular/router';
//App service
import { ZomatoService } from '../zomato.service';

@Component({
  selector: 'app-detailview',
  templateUrl: './detailview.component.html',
  styleUrls: ['./detailview.component.css']
})
export class DetailviewComponent implements OnInit {
  public RestaurantDetails:any = 0;
  public UserReviews = 0;

  constructor(private zomato: ZomatoService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    //Getting detail of particular restaurant by resid
    let restaurantId = this.activatedRoute.snapshot.paramMap.get('resid');
    this.zomato.restaurantDetail(restaurantId).subscribe(
      (data) => {
        this.RestaurantDetails = data;
        //Getting Review of that restaurants
        this.zomato.restaurantReview(restaurantId).subscribe(
          (data) => {
            this.UserReviews = data.user_reviews;
          },
          (error) => { console.log('Error') }
        )
      },
      (error) => {
        console.log('Error')
      }
    )
  }
}
