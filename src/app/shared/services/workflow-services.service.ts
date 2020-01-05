import { WorkflowModel } from './../models/workflowModel';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class WorkflowServicesService {

  readonly rootUrl = environment.serverUrl;
  constructor(private http: HttpClient) { }


  SaveWorkflow(workflow: WorkflowModel) {

  }

  UpdateWorkflow(workflow: WorkflowModel) {

  }

  GetWorkflow(id: number) {
    return this.http.get(this.rootUrl + 'endpoint');
  }

  GetAllWorkflow( ) {

  }

  DeletetWorkflow(id: number) {

  }

}
