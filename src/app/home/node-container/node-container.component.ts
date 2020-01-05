import { NodeService } from './../../shared/services/node-service.service';
import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';

@Component({
  selector: 'node-container',
  templateUrl: './node-container.component.html'
})

export class NodeContainerComponent implements OnInit {

  @Input() nodes = [];
  @Input() connections = [];
  @ViewChild('nodes', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  constructor(private pClinet: NodeService,) { }

  ngOnInit() {
    this.pClinet.setRootViewContainerRef(this.viewContainerRef);
  }

  createNewNode( ) {
    // if (node.id)
    const temp = String.fromCharCode(Math.floor(Math.random() * 100));
    const nodef = { id: temp, top: 165, left: 100};
    this.pClinet.createNode(nodef);
  }
  saveNodeJson() {
    const container = this.viewContainerRef.element.nativeElement.parentNode;
    // tslint:disable-next-line: typedef
    const nodes = Array.from(container.querySelectorAll('.node')).map((node:HTMLDivElement) => {
      return {
        id: node.id,
        top: node.offsetTop,
        left: node.offsetLeft,
      };
    });
      // tslint:disable-next-line: typedef
    const connections = (this.pClinet.jsPlumbInstance.getAllConnections() as any[])
                          .map((conn) => ({ uuids: conn.getUuids() }));

      // tslint:disable-next-line: typedef
    const json = JSON.stringify({ nodes, connections });

    console.log(json);
  }

}
