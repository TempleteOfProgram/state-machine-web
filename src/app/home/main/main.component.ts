import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  template: `
          <node-container #nodeContainer [nodes]="nodes" [connections]="connections"></node-container>

          <div style="display: flex;
                      position: fixed;
                      align-self: flex-start;
                      margin-left: 60%;
                      margin-bottom: 50%;
                      width: 150px;
                      height: 100px;">
                      <ul >
                          <ol>
                            <button   (click)="nodeContainer.createNewNode()">
                              Add State
                            </button>
                          </ol>
                          <ol>
                            <button class="align-middle" (click)="nodeContainer.saveNodeJson()">
                              Save JSON
                            </button>
                          </ol>
                      </ul>
          </div>
  `
})
export class MainComponent {

  nodes = [];
  connections = [];

}
