import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {OfferDTO} from '../offers-page_DTO/offerDTO';
import {ListDetailOfferService} from './list-detail-offer.service';
import {PageEvent} from '@angular/material/paginator';
import {Observable, of} from 'rxjs';
import {IndustryDTO} from '../offers-page_DTO/industry-DTO';

@Component({
  selector: 'app-list-detail-offer',
  templateUrl: './list-detail-offer.component.html',
  styleUrls: ['./list-detail-offer.component.css']
})
export class ListDetailOfferComponent implements OnInit, OnChanges {

  @Input()
  industryId?: number;

  offersDTO: OfferDTO[] = [];
  totalElements = 0;
  industryDTO?: IndustryDTO;


  constructor(private listDetailOfferService: ListDetailOfferService) { }

  ngOnInit(): void {
    if (!this.industryId){
      this.getServiceOffersPagination(0, 10);
    } else {
      this.getServiceOffersPaginationForIndustry(this.industryId, 0, 10);
    }
  }

  ngOnChanges() {
    if (!this.industryId){
      this.getServiceOffersPagination(0, 10);
      this.industryDTO = undefined;
    } else {
      this.getServiceOffersPaginationForIndustry(this.industryId, 0, 10);
    }
  }

  getServiceOffersPagination(page: number, size: number): void {
    this.listDetailOfferService.getServiceOffersPagination(location.pathname, page.toString(), size.toString())
      .subscribe(serviceOfferDTO => {
        this.offersDTO = serviceOfferDTO.content;
        this.totalElements = serviceOfferDTO.totalElements;
      });
  }

  nextPage(event: PageEvent, industryId?: number): void {
    if (industryId){
      this.getServiceOffersPaginationForIndustry(industryId, event.pageIndex, event.pageSize);
    } else {
      this.getServiceOffersPagination(event.pageIndex, event.pageSize);
    }
  }

  getServiceOffersPaginationForIndustry(industryId: number, page: number, size: number): void {
    this.listDetailOfferService.getOffersForIndustry(location.pathname, industryId.toString(), page.toString(), size.toString())
      .subscribe(serviceOfferDTO => {
        this.offersDTO = serviceOfferDTO.content;
        this.totalElements = serviceOfferDTO.totalElements;
        this.industryDTO = this.getIndustryForHeadline(this.offersDTO[0].industryDTO);
         });
  }

  getIndustryForHeadline(industryDTO: IndustryDTO){
    if (industryDTO.id === this.industryId){
      return industryDTO;
    }

    let currentIndustryDTO = industryDTO;
    while (currentIndustryDTO.parentIndustryDTO && !(currentIndustryDTO.parentIndustryDTO.id === this.industryId)){
      currentIndustryDTO = currentIndustryDTO.parentIndustryDTO;
    }
    return currentIndustryDTO.parentIndustryDTO;
  }

}
