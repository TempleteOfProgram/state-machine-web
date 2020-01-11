import { WorkflowModel } from './../shared/models/workflowModel';
import { WorkflowServicesService } from './../shared/services/workflow-services.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  workflowList: WorkflowModel[];
  behaviorSubject: any;
  constructor(private router: Router,
              private workfowService: WorkflowServicesService) { }

  ngOnInit() {
    this.behaviorSubject = this.workfowService.bs;
    this.LoadWorkflows();
  }
  LoadWorkflows( ) {
    this.workfowService.GetAllWorkflow().subscribe( (res: WorkflowModel[]) => {
        this.workflowList = res;
    });
  }

  home() {
    this.router.navigate(['']);
  }


  GetWorkflow(id: number) {
    //this.router.navigate(['/plumb'], {queryParams: {workflowID: id}});
    this.behaviorSubject.next({id:id});
    this.router.navigate(['/plumb']);
  }

}
