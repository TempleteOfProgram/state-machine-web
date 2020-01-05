import { NodeService } from './../../shared/services/node-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html'
})
export class GraphComponent implements OnInit {
  WorkflowList: [];
  constructor(private nodeService: NodeService) { }

  ngOnInit() {
  }

  LoadGraph(id: NodeModule['id']) {
    // 1. load graph from db using Workflow_id, eg. send => httpRequest
    // 2. create Node eg. nodeService.createNode()=> for each node
    // 3. create relation for each node
  }

}
