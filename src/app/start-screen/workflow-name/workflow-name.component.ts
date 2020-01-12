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
            <button class="mat-raised-button" mat-dialog-close>Cancel</button>
        </mat-dialog-actions>
      `
  })
export class WorkflowNameComponent {

  // default variables
  workflowName: string = null;

  constructor(private router: Router) { }

  AddWorkflowName( name: string) {
    if (name != null) {
      // console.log(name);
      this.router.navigate(['/plumb'], {queryParams: {workflowName: name}});
    } else {
      this.router.navigate(['']);
    }
  }
}
