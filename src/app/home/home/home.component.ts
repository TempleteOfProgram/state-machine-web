import { jsPlumb } from 'jsplumb';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  jsPlumbInstance = jsPlumb.getInstance();
  constructor() { }

  ngOnInit() {
  }

}
