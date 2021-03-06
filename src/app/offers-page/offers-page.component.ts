import {Component, OnInit} from '@angular/core';
import {ListDetailOfferService} from './list-detail-offer/list-detail-offer.service';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';


@Component({
  selector: 'app-offers-page',
  templateUrl: './offers-page.component.html',
  styleUrls: ['./offers-page.component.css']
})
export class OffersPageComponent implements OnInit {

  industryId?: number;

  constructor(private listDetailOfferService: ListDetailOfferService,
              private route: ActivatedRoute , private router: Router) {

    this.getIndustryId();

  }

  ngOnInit(): void {
  }

  getIndustryId(): void {
    const param = 'industryId';
    this.route.queryParams.subscribe(
      params => {
        this.industryId =  +params[param];
      });
  }

}
