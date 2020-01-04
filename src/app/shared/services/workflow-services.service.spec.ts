import { TestBed } from '@angular/core/testing';

import { WorkflowServicesService } from './workflow-services.service';

describe('WorkflowServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkflowServicesService = TestBed.get(WorkflowServicesService);
    expect(service).toBeTruthy();
  });
});
