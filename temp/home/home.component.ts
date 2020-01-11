import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { WorkflowNameComponent } from '../workflow-name/workflow-name.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
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
export class HomeComponent implements OnInit {

  constructor(private dialog: MatDialog,
              private router: Router) {}

        ngOnInit() {
        }

        AddWorkflow() {
            const dialogConfig = new MatDialogConfig();

            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;

            this.dialog.open(WorkflowNameComponent, dialogConfig);
            this.router.navigate(['/plumb']);
        }


}
