import { WorkflowServicesService } from './../../shared/services/workflow-services.service';
import { Component } from '@angular/core';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent {

  message: string;

  constructor(private workflowService: WorkflowServicesService ) { }
  nodes = [];
  connections = [];
    fillFromJson() {
        const json = `{"nodes":[{"id":"Step_0 id: b46a17"},
                      {"id":"Step_1 id: efd2ce"},
                      {"id":"Step id_2eb091"}],
                      "connections":[{"uuids":["Step_0 id: b46a17_bottom",
                      "Step_1 id: efd2ce_top"]},{"uuids":["Step id_2eb091_bottom","Step_0 id: b46a17_top"]}]}`;
        const data = JSON.parse(json);
        this.nodes = data.nodes;
        this.connections = data.connections;
    }

    welcome( ) {
      this.workflowService.welcome().subscribe((data: any) => {
        this.message = data.message;
        // console.log(this.message);
      });
    }


}
