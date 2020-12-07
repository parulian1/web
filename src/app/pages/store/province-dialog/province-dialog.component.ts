import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-province-dialog',
  templateUrl: './province-dialog.component.html',
  styleUrls: ['./province-dialog.component.scss']
})
export class ProvinceDialogComponent implements OnInit {
  listProvinces: Set<string>;
  currentProvince: string = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {allProvinces: Set<string>, selected: string},
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.listProvinces = new Set(this.data.allProvinces);
    this.route.paramMap.subscribe((params) => {
      this.currentProvince = params.get('current-state');
    });
  }

}
