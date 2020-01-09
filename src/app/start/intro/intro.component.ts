import { Router } from '@angular/router';
import { WorkflowModel } from './../../shared/models/workflowModel';
import { WorkflowServicesService } from './../../shared/services/workflow-services.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  workflowList: WorkflowModel [];
  constructor(private workfowService: WorkflowServicesService, private router: Router) { }


  ngOnInit() {
    this.LoadWorkflows();
  }

  LoadWorkflows( ) {
    this.workfowService.GetAllWorkflow().subscribe( (res: WorkflowModel[]) => {
        this.workflowList = res;
        // console.log(this.workflowList);
    });
  }

  GetWorkflow(id: number) {
    this.router.navigate(['/plumb', id]);

  }

  AddWorkflow() {
    this.router.navigate(['/plumb']);
  }

}
