import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class WorkflowServicesService {

  // readonly rootUrl = environment.serverUrl;
  constructor(private http: HttpClient) { }


}
