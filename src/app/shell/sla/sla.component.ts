import {Component, OnInit} from '@angular/core';
import {Sla} from "@app/models/sla";
import {SlaService} from "@app/services/sla.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-sla',
  templateUrl: './sla.component.html',
  styleUrls: ['./sla.component.scss']
})
export class SlaComponent implements OnInit {
  public sla: Array<Sla> = [];

  constructor(private slaService: SlaService) {
  }

  ngOnInit(): void {
    this.slaService.getSla()
      .subscribe(sla => {
        this.sla = sla;
      })
  }

}
