import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WorkflowModel } from './../../shared/models/workflowModel';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { WorkflowNameComponent } from './../workflow-name/workflow-name.component';
import { WorkflowServicesService } from './../../shared/services/workflow-services.service';



@Component({
  selector: 'app-intro',
  template: `
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
