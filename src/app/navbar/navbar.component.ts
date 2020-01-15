import { Router } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { WorkflowModel } from './../shared/models/workflowModel';
import { WorkflowServicesService } from './../shared/services/workflow-services.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  CurrentWorkflow: string = null;
  workflowList: WorkflowModel[];
  behaviorSubject: any;

  constructor(private router: Router,
              private workfowService: WorkflowServicesService) { }

    ngOnInit() {
          this.behaviorSubject = this.workfowService.bs;
          this.LoadWorkflows();
          this.workfowService.bs.subscribe(res => {
              console.log('From navbar ts=> ', res['id'], res['workflowname']);
          });
    }
    LoadWorkflows( ) {
          this.workfowService.GetAllWorkflow().subscribe( (res: WorkflowModel[]) => {
              this.workflowList = res;
          });
    }

    home() {
          this.CurrentWorkflow = null;
          this.behaviorSubject.next({id: 0, workflowname: null});
          this.router.navigate(['']);
    }


    SetWorkflow(id: number, name: string) {
          // this.viewContainerRef.clear();
          // this.pClinet.jsPlumbInstance.deleteEveryEndpoint();
          // this.pClinet.jsPlumbInstance.deleteEveryConnection();


          this.CurrentWorkflow = name;
          this.behaviorSubject.next({id, workflowname: name});
          this.router.navigate(['/plumb']);
          // if ( id !=undefined || name != undefined || name != '') {
          //   this.behaviorSubject.next({id: id, workflowname: name});
          //   this.router.navigate(['/plumb']);
          // } else {
          //   this.router.navigate(['']);
          // }
    }
    DeleteWOrkflow(id: number) {
      this.workfowService.DeletetWorkflow(id).subscribe(res => {
          console.log(res);
      });
      this.delay(10).then(res => {
        this.LoadWorkflows();
      });
    }

  async delay(ms: number) {
      await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log(`sleeped ${ms}`));
  }

}
