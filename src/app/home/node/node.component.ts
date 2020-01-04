import { Component, AfterViewInit, Input } from '@angular/core';

export interface Node {
  id: any;
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'node',
  template: `
  <div class="node" id="{{node.id}}">
  <!-- <div class="node"> -->
      <button
        type="button"
        class="close"
        aria-label="Close"
        (click)="removeNode(node)"> <span aria-hidden="true">×</span>
      </button>
      <br>Status Name:
      <!--input tag here/ [(ngModel)]="node.id"-->
      <input
          style=" width: 60%;
                  height: 20%;"
                  [(ngModel)]="node.id"
      />
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
export class NodeComponent implements AfterViewInit {

  @Input() node: Node;
  @Input() jsPlumbInstance;

  constructor() { }


  ngAfterViewInit() {
    // tslint:disable-next-line: typedef
    const exampleDropOptions = {
      tolerance: 'touch',
      hoverClass: 'dropHover',
      activeClass: 'dragActive'
    };

    // tslint:disable-next-line: typedef
    let Endpoint_From = {
      endpoint: ['Dot', { radius: 7 }],
      paintStyle: { fill: '#99cb3a' },
      isSource: true,
      scope: 'jsPlumb_DefaultScope',
      connectorStyle: { stroke: '#99cb3a', strokeWidth: 3 },
      connector: ['Bezier', { curviness: 1 }],
      maxConnections: 10,
      isTarget: false,
      connectorOverlays: [['Arrow', { location: 1 }]],
      dropOptions: exampleDropOptions
    };

    // tslint:disable-next-line: typedef
    let Endpoint_TO = {
      endpoint: ['Dot', { radius: 4 }],
      paintStyle: { fill: '#ffcb3a' },
      isSource: false,
      scope: 'jsPlumb_DefaultScope',
      maxConnections: 10,
      isTarget: true,
      dropOptions: exampleDropOptions
    };
    const { id } = this.node;
    this.jsPlumbInstance.addEndpoint(id, { anchor: 'Bottom', uuid: id + '_bottom' }, Endpoint_From);
    this.jsPlumbInstance.addEndpoint(id, { anchor: 'Top', uuid: id + '_top' }, Endpoint_TO);
    this.jsPlumbInstance.draggable(id);


  }


}
