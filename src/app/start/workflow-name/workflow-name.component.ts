import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-workflow-name',
  templateUrl: './workflow-name.component.html',
  styleUrls: ['./workflow-name.component.css']
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
