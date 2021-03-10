import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-state',
  templateUrl: './data-state.component.html',
  styleUrls: ['./data-state.component.scss'],
})
export class DataStateComponent implements OnInit {

  @Input() state: { code, message?};

  constructor() { }

  ngOnInit() { }

}
