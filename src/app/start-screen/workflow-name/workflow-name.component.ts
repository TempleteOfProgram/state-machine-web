import { WorkflowServicesService } from './../../shared/services/workflow-services.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-workflow-name',
  template: `
        <h2 mat-dialog-title style="text-align: center;">Enter WorkflowName</h2>

        <mat-dialog-content>
            <div class="uploadPic">
                <input  type="text" class="hide_file" (change)="AddWorkflowName($event.target.value)">
            </div>
        </mat-dialog-content>

        <mat-dialog-actions>
            <button class="mat-raised-button mat-primary" mat-dialog-close>Submit</button>
            <div (click)="onCancel()">
                <button class="mat-raised-button" mat-dialog-close >Cancel</button>
            </div>
        </mat-dialog-actions>
      `
  })
export class WorkflowNameComponent implements OnInit {


  ngOnInit() {
    this.behaviorSubject = this.workfowService.bs;
  }

  // default variables
  // workflowName: string = null;
  behaviorSubject: any;

  constructor(private router: Router,
              private workfowService: WorkflowServicesService) { }

  AddWorkflowName( name: string) {
        if (name != null) {
          // this.behaviorSubject.next({workflowname: name});
          this.behaviorSubject.next({id: 0, workflowname: name});
        } else {
          this.router.navigate(['']);
        }
  }

  onCancel() {
    this.behaviorSubject.next({id: undefined, workflowname: undefined});
    this.router.navigate(['']);
  }


}
