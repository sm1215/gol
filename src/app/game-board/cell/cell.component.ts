import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit, OnChanges {
  @Input() x: number;
  @Input() y: number;
  @Input() alive = false;
  @Input() aliveSince: number;

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {}

  toggleAlive() {
    this.alive = !this.alive;
  }

}
