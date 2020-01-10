import { WorkflowNameComponent } from './../workflow-name/workflow-name.component';
import { Router } from '@angular/router';
import { WorkflowModel } from './../../shared/models/workflowModel';
import { WorkflowServicesService } from './../../shared/services/workflow-services.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-intro',
  template: `
    <div *ngIf="workflowList !=null">
          <div *ngFor= "let workflow of workflowList">
            <button (click)="GetWorkflow(workflow.workflowId)">
              {{workflow.name}}
            </button>
          </div>

      <div style="
                  display: flex;
                  flex-wrap: wrap;
                  border-left: 50px solid white;
                  margin-top: 30px;">

          <div style="flex: 1;">
              <img src='assets/workflow.PNG' width="240" height="240">  <br>
          </div>
          <div style="flex: 1;">
              <img src='assets/workflow.PNG' width="240" height="240">  <br>
          </div>
      </div>


    </div>

    <div style="z-index: 5;
                position: fixed;
                display: flex;
                align-self: flex-end;
                bottom: 7%;
                margin-bottom: 5px;
                margin-left: 80%;">

                <a mat-fab color="primary" (click)="AddWorkflow()" style="margin-right: 14px">
                  <mat-icon>add</mat-icon>
                </a>
    </div>
  `
})
export class IntroComponent implements OnInit {

  workflowList: WorkflowModel [];
  constructor(private workfowService: WorkflowServicesService,
              private router: Router,
              private dialog: MatDialog) { }


  ngOnInit() {
    this.LoadWorkflows();
  }

  LoadWorkflows( ) {
    this.workfowService.GetAllWorkflow().subscribe( (res: WorkflowModel[]) => {
        this.workflowList = res;
    });
  }

  GetWorkflow(id: number) {
    this.router.navigate(['/plumb', id]);

  }

  AddWorkflow() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(WorkflowNameComponent, dialogConfig);
    this.router.navigate(['/plumb']);
  }

}
