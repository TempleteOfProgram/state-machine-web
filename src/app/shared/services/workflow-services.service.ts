import { WorkflowModel } from './../models/workflowModel';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})

export class WorkflowServicesService {

  bs = new BehaviorSubject<number>(2);

  readonly rootUrl = environment.serverUrl;
  constructor(private http: HttpClient) { }

  welcome() {
    return this.http.get(this.rootUrl);
  }


SaveWorkflow( workflow_: string, workflowName: string) {
    const body: WorkflowModel = {
      name : workflowName,
      description : 'sending form front-end',
      workflow : workflow_
    };
    return this.http.put(this.rootUrl + 'SaveWorkflow', body);
  }

  UpdateWorkflow(workflow_ : string) {
    const body: WorkflowModel = {
      workflowId: 36,
      name : 'workflowName',
      description : 'sending form front-end',
      workflow : workflow_
    };
    return this.http.put(this.rootUrl + 'SaveWorkflow', body);
  }

  GetWorkflow(id: number) {
    console.log(id);
    return this.http.get(this.rootUrl + 'getWorkflow?id=' + id);
  }

  GetAllWorkflow( ) {
    return this.http.get(this.rootUrl + 'AllWorkflows');
  }

  DeletetWorkflow(id: number) {
    return this.http.delete(this.rootUrl + 'deleteWorkflow?id=' + id);
  }

}
