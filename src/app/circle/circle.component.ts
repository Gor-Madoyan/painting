import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css']
})
export class CircleComponent implements OnInit {

  _color!: string;

  @Input() set color(data: string) {
    this._color = data ? data : '#fff';
  };


 

  constructor() { }

  ngOnInit(): void {
  }

}
