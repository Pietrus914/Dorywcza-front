import {Component, Input, OnInit} from '@angular/core';
import {OfferDTO} from '../../offers-page/offers-page_DTO/offerDTO';
import {IndustryDTO} from '../../offers-page/offers-page_DTO/industry-DTO';

@Component({
  selector: 'app-industry-headline',
  templateUrl: './industry-headline.component.html',
  styleUrls: ['./industry-headline.component.css']
})
export class IndustryHeadlineComponent implements OnInit {

  @Input()
  offerDTO?: OfferDTO;
  industries: IndustryDTO[] = [];
  kindOfOffer?: string;


  constructor() {
    // console.log('headline start');
  }

  ngOnInit(): void {
    if (this.offerDTO){
      this.getIndustries(this.offerDTO);
    }
    if (location.pathname.includes('jobs')){
      this.kindOfOffer = 'jobs';
    } else if (location.pathname.includes('service-offers')){
      this.kindOfOffer = 'service-offers';
    }

  }

  getIndustries(offerDTO: OfferDTO): void{
    let currentIndustryDTO = offerDTO.industryDTO;
    this.industries.push(currentIndustryDTO);

    while (currentIndustryDTO.parentIndustryDTO){
      const parentIndustryDTO = currentIndustryDTO.parentIndustryDTO;
      this.industries.unshift(parentIndustryDTO);
      currentIndustryDTO = parentIndustryDTO;
    }
  }

}
