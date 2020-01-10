import 'rxjs/add/operator/filter';
import { WorkflowModel } from './../../shared/models/workflowModel';
import { WorkflowServicesService } from './../../shared/services/workflow-services.service';
import { NodeService } from './../../shared/services/node-service.service';
import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


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

  workflowId: number = null;
  @Input() nodes = [];
  @Input() connections = [];
  @ViewChild('nodes', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  constructor(private router: Router,
              private pClinet: NodeService,
              private activeRoute: ActivatedRoute,
              private WorkFlowService: WorkflowServicesService
              ) { }

  async ngOnInit() {

    await this.activeRoute.paramMap
      .subscribe( param => {
        if ( param.get('id') == null) {
            this.router.navigate(['/plumb']);
        } else {
          // taking workflowID form 'introComponent.ts'
          this.workflowId = parseInt(param.get('id'));
        }} );
    // loading workflow form database
    if ( this.workflowId != null ){
        this.WorkFlowService.GetWorkflow(this.workflowId).subscribe((res: WorkflowModel) => {
          const obj = JSON.parse(res.workflow);

          // tslint:disable-next-line: prefer-for-of
          for ( let i = 0; i < obj.nodes.length; i++) {
            this.pClinet.createNode(obj.nodes[i]);
          }
      });
    }

    await this.activeRoute.queryParams
        .filter(params => params.workflowName)
        .subscribe(params =>{
          console.log(params.workflowName);
        });

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

    this.WorkFlowService.SaveWorkflow(json).subscribe(res => {
      console.log(res);
    });
  }


  RetriveWorkflow() {
    this.WorkFlowService.GetWorkflow(72).subscribe((res: WorkflowModel) => {
          const obj = JSON.parse(res.workflow);

          for ( let i = 0; i < obj.nodes.length; i++) {

            this.pClinet.createNode(obj.nodes[i]);
          }
          // for( var i=0; i<obj.connections.length; i++) {
          //     this.pClinet.addConnection(obj.connections[i]['uuids']);
          // }
      });
  }

}
