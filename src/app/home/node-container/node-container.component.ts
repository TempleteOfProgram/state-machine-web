import 'rxjs/add/operator/filter';
import { Router } from '@angular/router';
import { WorkflowModel } from './../../shared/models/workflowModel';
import { NodeService } from './../../shared/services/node-service.service';
import { Component, OnInit, Input, ViewContainerRef, ViewChild, AfterViewInit } from '@angular/core';
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

export class NodeContainerComponent implements OnInit, AfterViewInit {

  workflowId: number;
  workflowname: string = null;

  @Input() nodes = [];
  @Input() connections = [];
  @ViewChild('nodes', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;


  constructor(private router: Router,
              private pClinet: NodeService,
              private WorkFlowService: WorkflowServicesService
              ) { }

  ngOnInit() {
    // debugger;
    this.pClinet.setRootViewContainerRef(this.viewContainerRef);

    this.WorkFlowService.bs.subscribe(data => {
      if ( data.id > 0) {
        this.pClinet.setRootViewContainerRef(this.viewContainerRef);
        this.LoadWorkflow(data.id);
      }
    });
  }

  ngAfterViewInit() {

  }




  createNewNode( ) {
    const id_ = Math.floor(Math.random() * (100000000 - 1 + 1) + 1).toString();
    const node = { id: id_, top: 165, left: 100};
    this.pClinet.createNode(node);
  }

  saveNodeJson() {
    const container = this.viewContainerRef.element.nativeElement.parentNode;
    const nodes = Array.from(container.querySelectorAll('.node')).map((node: HTMLDivElement) => {
      return {
        id: node.id.toString(),
        top: node.offsetTop,
        left: node.offsetLeft,
      };
    });
    let connections = (this.pClinet.jsPlumbInstance.getAllConnections() as any[])
                          .map((conn) => ({ uuids: conn.getUuids() }));
    this.WorkFlowService.bs.subscribe(res => {
        if (res.workflowname == undefined || res.id == undefined) {
            this.router.navigate(['']);
        } else {
                console.log(res.id, res.workflowname);
                if ( res.id > 1) {
                      this.WorkFlowService.GetWorkflow(res.id).subscribe((data: WorkflowModel) => {
                        const workflow_ = JSON.parse(data.workflow);
                        const current = workflow_.connections;
                        for (let i = 0; i < connections.length; i++) {
                            if ( connections[i].uuids[0] != null) {
                              current.push(connections[i]);
                            }
                        }
                        connections = current;
                        const json = JSON.stringify({ nodes, connections });
                        this.WorkFlowService.SaveWorkflow(json, res.id, res.workflowname).subscribe(res => {
                                  console.log(res);
                        });
                      });
                } else {
                      const json = JSON.stringify({ nodes, connections});
                      this.WorkFlowService.SaveWorkflow(json, res.id, res.workflowname).subscribe(res => {
                            console.log(res);
                      });
                }
        }
    });
  }


  LoadWorkflow(workflowid: number) {
        //  debugger;
        // clear and reset before loading new workflow
         this.viewContainerRef.clear();
        // this.pClinet.jsPlumbInstance.reset();
        // debugger;
         this.pClinet.jsPlumbInstance.deleteEveryConnection();
         this.pClinet.jsPlumbInstance.deleteEveryEndpoint();


        // loading workflow
         console.log(workflowid);
         this.WorkFlowService.GetWorkflow(workflowid).subscribe((res: WorkflowModel) => {
          const obj = JSON.parse(res.workflow);
          for ( let i = 0; i < obj.nodes.length; i++) {
            this.pClinet.createNode(obj.nodes[i]);
          }
        });
  }

}
