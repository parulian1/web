import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Sla} from '@app/models/sla';
import {SlaService} from '@app/services/sla.service';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-sla',
  templateUrl: './sla.component.html',
  styleUrls: ['./sla.component.scss']
})
export class SlaComponent implements OnInit {
  public sla: Array<Sla> = [];

  constructor(private service: SlaService,
              private datePipe: DatePipe,
              @Inject(LOCALE_ID) private locale: string) {
  }

  ngOnInit(): void {
    this.fetchSla();
  }

  fetchSla() {
    this.service.fetchList(true).subscribe(resp => {
      this.sla = resp.filter(m => m.isActive === true);
      this.sla = this.sla.slice(0, 3);
    });
  }
}
