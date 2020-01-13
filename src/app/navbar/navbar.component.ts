import { NodeService } from './../shared/services/node-service.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { WorkflowModel } from './../shared/models/workflowModel';
import { WorkflowServicesService } from './../shared/services/workflow-services.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('nodes', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
  CurrentWorkflow: string = null;
  workflowList: WorkflowModel[];
  behaviorSubject: any;

  constructor(private router: Router,
              private pClinet: NodeService,
              private workfowService: WorkflowServicesService) { }

  ngOnInit() {
    this.behaviorSubject = this.workfowService.bs;
    this.pClinet.setRootViewContainerRef(this.viewContainerRef);
    this.LoadWorkflows();
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
    this.behaviorSubject.next({id: id, workflowname: name});
    this.router.navigate(['/plumb']);
    // if ( id !=undefined || name != undefined || name != '') {
    //   this.behaviorSubject.next({id: id, workflowname: name});
    //   this.router.navigate(['/plumb']);
    // } else {
    //   this.router.navigate(['']);
    // }
  }


}
