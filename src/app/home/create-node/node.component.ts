import { NodeModel } from './../../shared/models/NodeModel';
import { Component, AfterViewInit, Input } from '@angular/core';
import { WorkflowModel } from 'src/app/shared/models/workflowModel';
import { WorkflowServicesService } from './../../shared/services/workflow-services.service';


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
  </div>`
  ,
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
  constructor(private WorkFlowService: WorkflowServicesService) { }


  ngAfterViewInit() {

    const EndpointFrom = {
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

    const EndpointTO = {
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
    this.jsPlumbInstance.draggable(id);

    // creating dynamic connection among nodes
    this.WorkFlowService.bs.subscribe(data => {
      this.setConn(data['id']);
      // if(data['id'] != undefined) {
      //   this.setConn(data['id']);
      // }
    });

  }


  // function to establish connection for individual workflow
  setConn(wokflowid: number) {
        let common = {
          anchors: [ 'BottomCenter', 'TopCenter' ],
          endpoint: ['Rectangle', {width: 1, height: 1}],
          connector: ['Flowchart'],
          endpointStyle: {fillStyle: 'rgb(47, 79, 79)'}
        };

        this.WorkFlowService.GetWorkflow(wokflowid).subscribe((res: WorkflowModel) => {
                const obj = JSON.parse(res['workflow']);
                for( var i=0; i < obj.connections.length; i++) {
                    const conn = obj.connections[i]['uuids'];
                    this.jsPlumbInstance.connect({source: conn[0], target: conn[1]}, common );
                }
        });

  }

  removeNode(node: NodeModel) {
    this.jsPlumbInstance.remove(node.id);
  }

}
