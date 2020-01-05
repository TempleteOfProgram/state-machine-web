import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  nodes = [];
  connections = [];
    // tslint:disable-next-line: typedef
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

}