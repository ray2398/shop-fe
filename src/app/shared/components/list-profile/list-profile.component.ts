import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/interfaces/item.interface';

@Component({
  selector: 'app-list-profile',
  templateUrl: './list-profile.component.html',
  styleUrls: ['./list-profile.component.scss'],
})
export class ListProfileComponent  implements OnInit {

  @Input() items: Item[] = [];

  constructor() { }

  ngOnInit() {}

}
