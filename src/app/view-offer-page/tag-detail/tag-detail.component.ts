import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.css']
})
export class TagDetailComponent implements OnInit {
  @Input()
  tagList?: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
