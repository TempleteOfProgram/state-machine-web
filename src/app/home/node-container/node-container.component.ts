import { NodeService } from './../../shared/services/node-service.service';
import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';


@Component({
  selector: 'node-container',
  templateUrl: './node-container.component.html',
  styleUrls: ['./node-container.component.css']
})

export class NodeContainerComponent implements OnInit {

  @Input() nodes = [];
  @Input() connections = [];
  @ViewChild('nodes', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  constructor(private pClinet: NodeService) { }

  ngOnInit() {
    this.pClinet.setRootViewContainerRef(this.viewContainerRef);
  }

  createNode() {
    let temp = String.fromCharCode(Math.floor(Math.random() * 100));
    let node = { id: temp};
    this.pClinet.createNode(node);
  }
  saveNodeJson() {
    const container = this.viewContainerRef.element.nativeElement.parentNode;
    // tslint:disable-next-line: typedef
    const nodes = Array.from(container.querySelectorAll('.node')).map((node: any) => {
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
