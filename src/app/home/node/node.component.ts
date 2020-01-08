import { NodeModel } from './../../shared/models/NodeModel';
import { Component, AfterViewInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'node',
  template: `
  <div class="node" id="{{node.id}}"  [style.top.px]="node.top" [style.left.px]="node.left">
      <button
        type="button"
        class="close"
        aria-label="Close"
        (click)="removeNode(node)"> <span aria-hidden="true">×</span>
      </button>

      <br>Status Name:
      <input
              style=" width: 60%;
                      height: 20%;"
                      (ngModel)="node.id"
          />
  </div>`,
  styles: [`.node {
                margin-top:20px;
                border:1px solid #000;
                position: absolute;
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

  @Input() node: NodeModel;
  @Input() jsPlumbInstance;

  constructor( ) { }


  ngAfterViewInit() {

    let EndpointFrom = {
      endpoint: ['Dot', {radius: 8}],
      paintStyle: { fill: '#008000' },
      isSource: true,
      scope: 'jsPlumb_DefaultScope',
      connectorStyle: { stroke: '#2F4F4F', strokeWidth: 3 },
      connector: ['Flowchart'],
      maxConnections: 10,
      isTarget: false,
      connectorOverlays: [['Arrow', { location: 1 }]]
    };


    let EndpointTO = {
      endpoint: ['Rectangle', {width: 10, height: 10}],
      paintStyle: { fill: '#FF0000' },
      isSource: false,
      scope: 'jsPlumb_DefaultScope',
      maxConnections: 10,
      isTarget: true
    };


    const { id } = this.node;
    this.jsPlumbInstance.addEndpoint(id, { anchor: 'Bottom', uuid: id }, EndpointFrom);
    this.jsPlumbInstance.addEndpoint(id, { anchor: 'Top', uuid: id }, EndpointTO);
    let common = {
      anchors: [ 'BottomCenter', 'TopCenter' ],
      endpoint: ['Rectangle', {width: 1, height: 1}],
      connector: ['Flowchart'],
      endpointStyle: {fillStyle: 'rgb(47, 79, 79)'}
    };
    this.jsPlumbInstance.connect({source: '32049495', target: '92922925'}, common );
    this.jsPlumbInstance.draggable(id);
  }


  removeNode(node: NodeModel) {
    console.log(node);
    this.jsPlumbInstance.remove(node.id);
  }


  /**
   * {"nodes":[
   *      {"blockId":"startpoint","nodetype":"startpoint","positionX":150,"positionY":20},
        * {"blockId":"endpoint","nodetype":"endpoint","positionX":150,"positionY":400},
        * {"blockId":"taskcontainer1","nodetype":"task","positionX":92,"positionY":142},
        * {"blockId":"taskcontainer2","nodetype":"task","positionX":459,"positionY":187}],
   * "connections":[
   *        {"connectionId":"con_16","pageSourceId":"taskcontainer1","pageTargetId":"taskcontainer2"},
          * {"connectionId":"con_24","pageSourceId":"taskcontainer2","pageTargetId":"endpoint"},
          * {"connectionId":"con_32","pageSourceId":"startpoint","pageTargetId":"taskcontainer1"}
          * ],
   * "numberOfElements":2}
   */

}
