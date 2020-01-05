import { jsPlumb } from 'jsplumb';
import { NodeModel } from './../models/NodeModel';
import { NodeComponent} from './../../home/node/node.component';
import {ComponentFactoryResolver, Injectable} from '@angular/core';


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


}

