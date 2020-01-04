import { Component, OnInit } from '@angular/core';

export interface node {
  id: any;
}

@Component({
  selector: "node",
  template: `
  <!-- <div class="node" id="{{node.id}}"> -->
  <div class="node">
      <button
        type="button"
        class="close"
        aria-label="Close"
        (click)="removeNode(node)"> <span aria-hidden="true">×</span>
      </button>
      <br>Status Name:
      <!--input tag here-->
  </div>`,
  styles: [`.node {
                margin-top:20px;
                border:1px solid #000;
                position: fixed;
                top: 30%;
                left:30%;
                width: 150px;
                height: 100px;
                padding: 4px;
                text-align: center;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                }`]
})
export class NodeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
