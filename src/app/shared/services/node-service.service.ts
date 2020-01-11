import { jsPlumb } from 'jsplumb';
import { NodeModel } from './../models/NodeModel';
import {ComponentFactoryResolver, Injectable} from '@angular/core';
import { NodeComponent } from './../../home/create-node/node.component';


@Injectable({
  providedIn: 'root'
})
export class NodeService {

    private rootViewContainer: any;
    jsPlumbInstance = jsPlumb.getInstance();

    constructor(private factoryResolver: ComponentFactoryResolver) { }

    public setRootViewContainerRef(viewContainerRef) {
            this.rootViewContainer = viewContainerRef;
    }

    public createNode(node: NodeModel) {
        const factory = this.factoryResolver.resolveComponentFactory(NodeComponent);
        const component = factory.create(this.rootViewContainer.parentInjector);
        ( component.instance as any).node = node;
        ( component.instance as any).jsPlumbInstance = this.jsPlumbInstance;
        this.rootViewContainer.insert(component.hostView);
        // console.log("in NodeService.." , component.instance );
    }
    addConnection(connection) {
      this.jsPlumbInstance.connect({source: connection[0], target: connection[1] });
    }

    public clear() {
      this.rootViewContainer.clear();
    }


}

