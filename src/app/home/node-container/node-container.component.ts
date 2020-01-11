import 'rxjs/add/operator/filter';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkflowModel } from './../../shared/models/workflowModel';
import { NodeService } from './../../shared/services/node-service.service';
import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { WorkflowServicesService } from './../../shared/services/workflow-services.service';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'node-container',
  template: `
  <div class="container">
      <div style="position: relative;
                  height: 500px;">
          <ng-template #nodes></ng-template>
      </div>
  </div>
       `,
  styles: [`.container {
    margin-top:25px;
    margin-bottom: 30px;
    margin-left: 25%;
    margin-right: 25%;
  }`]
})

export class NodeContainerComponent implements OnInit {

  workflowId: number;
  @Input() nodes = [];
  @Input() connections = [];
  @ViewChild('nodes', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;


  constructor(private router: Router,
              private pClinet: NodeService,
              private activeRoute: ActivatedRoute,
              private WorkFlowService: WorkflowServicesService
              ) { }

  async ngOnInit() {
   await this.LoadWorkflow();

   this.pClinet.setRootViewContainerRef(this.viewContainerRef);

   this.WorkFlowService.bs.subscribe(data => {
      this.LoadWorkflow(data['id']);
  });


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
    const temp = Math.floor(Math.random() * (100000000 - 1 + 1) + 1).toString();
    const node = { id: temp, top: 165, left: 100};
    this.pClinet.createNode(node);
  }

  saveNodeJson() {
    const container = this.viewContainerRef.element.nativeElement.parentNode;
    // tslint:disable-next-line: typedef
    const nodes = Array.from(container.querySelectorAll('.node')).map((node: HTMLDivElement) => {
      return {
        id: node.id.toString(),
        top: node.offsetTop,
        left: node.offsetLeft,
      };
    });
      // tslint:disable-next-line: typedef
    const connections = (this.pClinet.jsPlumbInstance.getAllConnections() as any[])
                          .map((conn) => ({ uuids: conn.getUuids() }));
      // tslint:disable-next-line: typedef
    const json = JSON.stringify({ nodes, connections });

    this.activeRoute.queryParams
        .filter(params => params.workflowName)
        .subscribe(params => {
          // console.log(params.workflowName);
          this.WorkFlowService.SaveWorkflow(json, params.workflowName).subscribe(res => {
            console.log(res);
          });
      });
  }


  LoadWorkflow(id = 0) {
    // debugger;
    if (id == 0) {
      // taking workflowID form url
      this.activeRoute.queryParams
          .filter(params => params.workflowID)
          .subscribe((res => {
            this.workflowId = res.workflowID;
          }));
    } else {
      this.workflowId = id;

    }
    this.viewContainerRef.clear();
    this.pClinet.jsPlumbInstance.cleanupListeners();
    // connection properties
    let common = {
      connector: ['Flowchart'],
      // endpoint: ['Rectangle', {width: 1, height: 1}],
      // endpointStyle: {fillStyle: 'rgb(47, 79, 79)'}
    };

    // loading workflow
    if ( this.workflowId != null ) {
          this.WorkFlowService.GetWorkflow(id).subscribe((res: WorkflowModel) => {
            const obj = JSON.parse(res.workflow);
            for ( let i = 0; i < obj.nodes.length; i++) {
              this.pClinet.createNode(obj.nodes[i]);
            }
            for ( let i = 0; i < obj.connections.length; i++) {

              const conn = obj.connections[i].uuids;
              console.log(conn);
              this.pClinet.jsPlumbInstance.connect(obj.connections[i], common);
              // this.pClinet.jsPlumbInstance.connect({source: conn[0], target: conn[1], connector: "Straight" });
            }
        });
      }

  }

}
