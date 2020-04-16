import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Sla} from "@app/models/sla";
import {SlaService} from "@app/services/sla.service";
import {DatePipe, formatDate} from "@angular/common";


@Component({
  selector: 'app-sla',
  templateUrl: './sla.component.html',
  styleUrls: ['./sla.component.scss']
})
export class SlaComponent implements OnInit {
  public sla: Array<Sla> = [];

  constructor(private slaService: SlaService,
              private datePipe: DatePipe,
              @Inject(LOCALE_ID) private locale: string) {
  }

  ngOnInit(): void {
    this.slaService.getSla()
      .subscribe(sla => {
        this.sla = sla;
      })


  }


}
