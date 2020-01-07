import { NodeModel } from './../../shared/models/NodeModel';
import { WorkflowModel } from './../../shared/models/workflowModel';
import { WorkflowServicesService } from './../../shared/services/workflow-services.service';
import { NodeService } from './../../shared/services/node-service.service';
import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'node-container',
  template: `
      <div style="position: relative;
          height: 500px;">
          <ng-template #nodes></ng-template>
      </div>
       `
})

export class NodeContainerComponent implements OnInit {

  @Input() nodes = [];
  @Input() connections = [];
  @ViewChild('nodes', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  constructor(private pClinet: NodeService, private WorkFlowService: WorkflowServicesService) { }

  ngOnInit() {
    this.pClinet.setRootViewContainerRef(this.viewContainerRef);
    this.nodes.forEach(node => {
      this.pClinet.createNode(node);
      });

    setTimeout(() => {
        this.connections.forEach(connection => {
          this.pClinet.addConnection(connection);
        });
      });
  }

  createNewNode( ) {
    const temp = String.fromCharCode(Math.floor(Math.random() * 100));
    console.log(temp);
    const node = { id: temp, top: 165, left: 100};
    this.pClinet.createNode(node);
  }

  saveNodeJson() {
    const container = this.viewContainerRef.element.nativeElement.parentNode;
    // tslint:disable-next-line: typedef
    const nodes = Array.from(container.querySelectorAll('.node')).map((node: HTMLDivElement) => {
      return {
        id: node.id,
        top: node.offsetTop,
        left: node.offsetLeft,
      };
    });
      // tslint:disable-next-line: typedef
    const connections = (this.pClinet.jsPlumbInstance.getAllConnections() as any[])
                          .map((conn) => ({ uuids: conn.getUuids() }));

      // tslint:disable-next-line: typedef
    const json = JSON.stringify({ nodes, connections });
    console.log(json);
    this.WorkFlowService.SaveWorkflow(json).subscribe(res => {
      console.log(res);
    });
  }

  DisplayNodes(node: NodeModel) {
    // const node = { id: temp, top: 165, left: 100};
    this.pClinet.createNode(node);
  }

  RetriveWorkflow() {
    this.WorkFlowService.GetWorkflow(53).subscribe((res: WorkflowModel) => {
          let obj = JSON.parse(res['workflow']);
          for( var i=0; i<obj.nodes.length; i++) {
            this.DisplayNodes(obj.nodes[i]);
          }
      });
  }

}
