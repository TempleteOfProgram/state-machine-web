import { jsPlumb } from 'jsplumb';
import { Component, OnInit, Input, ViewContainerRef, ViewChild, ComponentFactoryResolver } from "@angular/core";
import { NodeComponent, Node } from '../node/node.component';

@Component({
  selector: 'app-node-container',
  templateUrl: './node-container.component.html',
  styleUrls: ['./node-container.component.css']
})
export class NodeContainerComponent implements OnInit {

  @Input() nodes = [];
  @Input() connections = [];
  @ViewChild("nodes", { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  rootViewContainer: ViewContainerRef;
  jsPlumbInstance = jsPlumb.getInstance();

  constructor(private factoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.setRootViewContainerRef(this.viewContainerRef);
  }


  createNode() {
    var temp = String.fromCharCode(Math.floor(Math.random()*100));
    console.log("temp = ", temp);
    var node = { id: temp};
    this.PlumbCreateNode(node);
  }


  fillFromJson() {
    // tslint:disable-next-line: max-line-length
    // tslint:disable-next-line: typedef
    const json = `{"nodes":[{"id":"Step_0 id: b46a17"},
                  {"id":"Step_1 id: efd2ce"},
                  {"id":"Step id_2eb091"}],
                  "connections":[{"uuids":["Step_0 id: b46a17_bottom",
                  "Step_1 id: efd2ce_top"]},{"uuids":["Step id_2eb091_bottom","Step_0 id: b46a17_top"]}]}`;
    // tslint:disable-next-line: typedef
    const data = JSON.parse(json);
    this.nodes = data.nodes;
    this.connections = data.connections;
}


  setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }
  public PlumbCreateNode(node: Node) {
    // tslint:disable-next-line: typedef
    const factory = this.factoryResolver.resolveComponentFactory(NodeComponent);
    // tslint:disable-next-line: typedef
    const component = factory.create(this.rootViewContainer.parentInjector);
    (<any>component.instance).node = node;
    (<any>component.instance).jsPlumbInstance = this.jsPlumbInstance;
    this.rootViewContainer.insert(component.hostView);
    // console.log("in NodeService.." , component.instance );
  }
  // tslint:disable-next-line: typedef
  PlumbAddConnection(connection: any) {
    this.jsPlumbInstance.connect({ uuids: connection.uuids });
  }

  PlumbRemoveNode(node:Node){
    this.jsPlumbInstance.remove(node.id);
  }

  // tslint:disable-next-line: typedef
  public PlumbClear() {
    this.rootViewContainer.clear();
  }

}
